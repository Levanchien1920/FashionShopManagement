package com.cnpm.fashion_shop.api.auth.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class AuthEmployeeResponseDto {
    private final String token;
    private final LoginEmployeeDetailDto info;
}
