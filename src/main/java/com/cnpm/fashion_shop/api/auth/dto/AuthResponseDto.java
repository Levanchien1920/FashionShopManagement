package com.cnpm.fashion_shop.api.auth.dto;

public class AuthResponseDto {
//    final private String token ;
    final private LoginEmployeeDetailDto info ;
    public AuthResponseDto( LoginEmployeeDetailDto info) {
        super();
//        this.token = token;
        this.info = info;
    }
}
