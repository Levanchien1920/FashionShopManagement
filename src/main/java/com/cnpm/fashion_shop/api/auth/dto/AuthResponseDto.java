package com.cnpm.fashion_shop.api.auth.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class AuthResponseDto {
    private final String token;
    private final LoginEmployeeDetailDto info;
}
