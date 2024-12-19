package com.naes.nesser.paypal;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.paypal.sdk.PaypalServerSdkClient;
import com.paypal.sdk.controllers.OrdersController;
import com.paypal.sdk.exceptions.ApiException;
import com.paypal.sdk.http.response.ApiResponse;
import com.paypal.sdk.models.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.Arrays;
import java.util.Map;

@RestController
@RequestMapping("/")
public class CheckoutController {
    private final ObjectMapper objectMapper;
    private final PaypalServerSdkClient client;

    public CheckoutController(ObjectMapper objectMapper, PaypalServerSdkClient client) {
        this.objectMapper = objectMapper;
        this.client = client;
    }

    @PostMapping("/api/orders")
    public ResponseEntity<Order> createOrder(@RequestBody Map<String, Object> request) {
        try {
            String totalPrice = request.get("totalPrice").toString();
            Order response = createOrder(totalPrice);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/api/orders/{orderID}/capture")
    public ResponseEntity<Order> captureOrder(@PathVariable String orderID) {
        try {
            System.out.println("orderID: " + orderID);
            Order response = captureOrders(orderID);
            return new ResponseEntity<Order>(response, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    private Order createOrder(String totalPrice) throws IOException, ApiException {

        OrdersCreateInput ordersCreateInput = new OrdersCreateInput.Builder(
                null,
                new OrderRequest.Builder(
                        CheckoutPaymentIntent.CAPTURE,
                        Arrays.asList(
                                new PurchaseUnitRequest.Builder(
                                        new AmountWithBreakdown.Builder(
                                                "EUR",
                                                totalPrice)
                                                .build())
                                        .build()))
                        .build())
                .build();

        OrdersController ordersController = client.getOrdersController();

        ApiResponse<Order> apiResponse = ordersController.ordersCreate(ordersCreateInput);

        return apiResponse.getResult();
    }

    private Order captureOrders(String orderID) throws IOException, ApiException {
        OrdersCaptureInput ordersCaptureInput = new OrdersCaptureInput.Builder(
                orderID,
                null)
                .build();
        OrdersController ordersController = client.getOrdersController();
        ApiResponse<Order> apiResponse = ordersController.ordersCapture(ordersCaptureInput);
        return apiResponse.getResult();
    }
}
