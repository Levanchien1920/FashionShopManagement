package com.cnpm.fashion_shop.api.auth.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class AuthCustomerResponseDto {
    private final String token;
    private final LoginCustomerDto info;
}
