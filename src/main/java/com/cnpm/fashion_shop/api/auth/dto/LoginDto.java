package com.cnpm.fashion_shop.api.auth.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
public class LoginDto {
    @Getter
    @Setter
    private final String username;

    @Getter
    @Setter
    private String password;
}
