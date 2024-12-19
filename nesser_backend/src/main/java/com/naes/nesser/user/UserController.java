package com.naes.nesser.user;

import com.naes.nesser.jwt.JwtService;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.*;

@RestController
public class UserController {
    private final static Logger logger = LogManager.getLogger(UserController.class);

    private final UserRepository userRepository;
    private final AuthenticationManager authManager;
    private final JwtService jwtService;

    public UserController(UserRepository userRepository, AuthenticationManager authManager, JwtService jwtService) {
        this.userRepository = userRepository;
        this.authManager = authManager;
        this.jwtService = jwtService;
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody Credential credential) {
        try{
            authManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            credential.getUsername(),
                            credential.getPassword()
                    ));

            jwtService.generateToken(credential.getUsername());
            return new ResponseEntity<>(jwtService.getCurrentJwtToken(), HttpStatus.OK);
        } catch (BadCredentialsException e){
            logger.warn("login request failed for user {}. Reason: {}",credential.getUsername(), e.getMessage());
            return new ResponseEntity<>("Wrong username or password!", HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody User user) {
        userRepository.register(user);
        logger.info("User: {} registered", user.getUsername());
        return new ResponseEntity<>("User registered successfully", HttpStatus.CREATED);
    }

    @DeleteMapping("/{username}/delete")
    public ResponseEntity<String> delete(@PathVariable String username) {
        if (jwtService.validateUsername(username)) {
            if (userRepository.delete(username) == 1) {
                logger.warn("User {} deleted", username);
                return new ResponseEntity<>("User deleted successfully", HttpStatus.OK);
            }
            return new ResponseEntity<>("Could not delete user. Try again", HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<>("User not authorized", HttpStatus.UNAUTHORIZED);
    }
}
