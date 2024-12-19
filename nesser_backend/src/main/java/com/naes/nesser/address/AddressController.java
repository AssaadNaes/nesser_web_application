package com.naes.nesser.address;

import com.naes.nesser.jwt.JwtService;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/address")
public class AddressController {
    private static final Logger logger = LogManager.getLogger(AddressController.class);

    private final AddressRepository addressRepository;
    private final JwtService jwtService;

    public AddressController(AddressRepository addressRepository, JwtService jwtService) {
        this.addressRepository = addressRepository;
        this.jwtService = jwtService;
    }

    @GetMapping("/{username}")
    public Address getByUsername(@PathVariable String username) {
        if (jwtService.validateUsername(username)) {
            Optional<Address> address = addressRepository.findByUsername(username);
            logger.info("Getting address of user: {}", username);
            return address.orElseGet(() -> new Address("", "", "", 0, "", ""));
        }
        return null;
    }

    @PostMapping("/set")
    public ResponseEntity<String> set(@RequestBody Address address) {
        if (jwtService.validateUsername(address.username())){
            addressRepository.save(address);
            logger.info("Setting user address: {}", address);
            return new ResponseEntity<>("User information inserted successfully", HttpStatus.CREATED);
        }
        return new ResponseEntity<>("User not authorized", HttpStatus.UNAUTHORIZED);
    }
}
