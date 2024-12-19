package com.naes.nesser.address;

public record Address(
        String username,
        String country,
        String city,
        int plz,
        String street,
        String phone_number
) {
}
