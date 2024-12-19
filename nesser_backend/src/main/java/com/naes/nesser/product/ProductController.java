package com.naes.nesser.product;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/products")
public class ProductController {
    private static final Logger logger = LogManager.getLogger(ProductController.class);
    private final ProductRepository productRepository;

    public ProductController(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @GetMapping()
    public List<Product> getAll() {
        logger.info("Getting all products");
        return productRepository.getAll();
    }

    @GetMapping("/{name}")
    public List<Product> getByName(@PathVariable String name) {
        logger.info("Getting product by name {}", name);
        return productRepository.findByName(name);
    }
}
