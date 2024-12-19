package com.naes.nesser.user;

import lombok.Data;

@Data
public class User {
    private int user_id;
    private String username;
    private String email;
    private String password;
}
