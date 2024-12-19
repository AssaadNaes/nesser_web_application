package com.naes.nesser.address;

import org.springframework.jdbc.core.simple.JdbcClient;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public class AddressRepository {
    JdbcClient jdbcClient;

    public AddressRepository(JdbcClient jdbcClient) {
        this.jdbcClient = jdbcClient;
    }

    public Optional<Address> findByUsername(String username) {
        return jdbcClient.sql("SELECT username, country, city, street, plz, phone_number " +
                "FROM addresses " +
                "WHERE username = ?")
                .param(username)
                .query(Address.class)
                .optional();
    }

    public void save(Address address) {
        jdbcClient.sql("DELETE FROM addresses WHERE username = ?")
                .param(address.username())
                .update();

        jdbcClient.sql("INSERT INTO addresses (username, country, city, plz, street, phone_number) " +
                "VALUES (?, ?, ?, ?, ?, ?)")
                .params(List.of(address.username(),
                        address.country(),
                        address.city(),
                        address.plz(),
                        address.street(),
                        address.phone_number()))
                .update();
    }
}
