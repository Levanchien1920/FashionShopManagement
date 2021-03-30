package com.cnpm.fashion_shop.api.auth.controller;

import com.cnpm.fashion_shop.api.auth.dto.AuthCustomerResponseDto;
import com.cnpm.fashion_shop.api.auth.dto.AuthEmployeeResponseDto;
import com.cnpm.fashion_shop.api.auth.dto.LoginDto;
import com.cnpm.fashion_shop.core.auth.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;


@RestController
@RequestMapping(path = "api/v1/auth")
public class AuthController {
    @Autowired
    private AuthService authService;

    @PostMapping("/loginEmployee")
    public AuthEmployeeResponseDto loginEmployee(
            @Valid @RequestBody LoginDto dto
    ) {
        return authService.loginEmployee(dto);
    }
    @PostMapping("/loginCustomer")
    public AuthCustomerResponseDto loginCustomer(
            @Valid @RequestBody LoginDto dto
    ) {
        return authService.loginCustomer(dto);
    }
}

