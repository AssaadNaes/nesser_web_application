package com.naes.nesser.cart_item;

import com.naes.nesser.jwt.JwtService;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/cart")
public class CartItemController {
    private static final Logger logger = LogManager.getLogger(CartItemController.class);

    private final CartItemRepository cartItemRepository;
    private final JwtService jwtService;

    public CartItemController(CartItemRepository cartItemRepository, JwtService jwtService) {
        this.cartItemRepository = cartItemRepository;
        this.jwtService = jwtService;
    }

    @GetMapping("/{username}")
    public List<Product> getItemsByUsername(@PathVariable String username) {
        if (jwtService.validateUsername(username)) {
            logger.info("Getting cart items for user {}", username);
            return cartItemRepository.findByUsername(username);
        }
        return null;
    }

    @GetMapping("/{username}/total")
    public double getTotalByCartUsername(@PathVariable String username) {
        if (jwtService.validateUsername(username)) {
            logger.info("Getting total price of cart for user: {}", username);
            return cartItemRepository.getTotalByUsername(username);
        }
        return 0;
    }

    @PostMapping("/item/append")
    public ResponseEntity<String> addItemToCart(@RequestBody CartItem cartItem) {
        if (jwtService.validateUsername(cartItem.username())){
            cartItemRepository.save(cartItem);
            logger.info("Added Item to cart. username {}", cartItem.username());
            return new ResponseEntity<>("Item added successfully", HttpStatus.ACCEPTED);
        }
        return new ResponseEntity<>("User not authorized", HttpStatus.UNAUTHORIZED);
    }

    @PutMapping("/item/update/quantity")
    public ResponseEntity<String> updateQuantity(@RequestBody CartItem cartItem) {
        if (jwtService.validateUsername(cartItem.username())) {
            cartItemRepository.updateItemQuantity(cartItem.cart_item_id(), cartItem.quantity());
            logger.info("Updating item quantity for user {}", cartItem.username());
            return new ResponseEntity<>("Quantity updated successfully", HttpStatus.ACCEPTED);
        }
        return new ResponseEntity<>("User not authorized", HttpStatus.UNAUTHORIZED);
    }

    @DeleteMapping("/item/remove")
    public ResponseEntity<String> removeItemFromCart(@RequestBody CartItem cartItem) {
        if (jwtService.validateUsername(cartItem.username())) {
            cartItemRepository.removeItem(cartItem.cart_item_id());
            logger.info("Removed Item from cart of user {}", cartItem.username());
            return new ResponseEntity<>("Item deleted successfully", HttpStatus.ACCEPTED);
        }
        return new ResponseEntity<>("User not authorized", HttpStatus.UNAUTHORIZED);
    }

    @DeleteMapping("/clear/{username}")
    public ResponseEntity<String> clearCart(@PathVariable String username) {
        if (jwtService.validateUsername(username)) {
            cartItemRepository.clearCart(username);
            logger.info("Clearing cart of user {}", username);
            return new ResponseEntity<>("Cart cleared successfully", HttpStatus.ACCEPTED);
        }
        return new ResponseEntity<>("User not authorized", HttpStatus.UNAUTHORIZED);
    }
}
