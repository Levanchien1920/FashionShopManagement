package com.cnpm.fashion_shop.api.user.controller;

import com.cnpm.fashion_shop.api.user.dto.CustomerDto;
import com.cnpm.fashion_shop.api.user.dto.UserDto;
import com.cnpm.fashion_shop.common.constant.SecurityConstants;
import com.cnpm.fashion_shop.common.response.Response;
import com.cnpm.fashion_shop.core.employee.service.UserService;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.Authorization;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@RequestMapping(path = "/api/v1/client/user")
public class UserControllerClient {
    @Autowired
    private UserService userService;

    @ApiOperation(value = "Create customer", authorizations = {@Authorization(value = SecurityConstants.SECURITY_JWT_NAME)})
    @PostMapping
    public ResponseEntity<Response> createCustomer(
            @Valid @RequestBody UserDto dto
    ) {
        return userService.createUser(dto);
    }

    @ApiOperation(value = "Update customer", authorizations = {@Authorization(value = SecurityConstants.SECURITY_JWT_NAME)})
    @PatchMapping("/{id}")
    public ResponseEntity<Response> updateEmployee(
            @PathVariable("id") Integer id,
            @Valid @RequestBody CustomerDto dto
    ) {
        return this.userService.updateUser(id, dto);
    }
    @ApiOperation(value = "Get customer by id", authorizations = {@Authorization(value = SecurityConstants.SECURITY_JWT_NAME)})
    @GetMapping("/{id}")
    public ResponseEntity getOneCustomer(@PathVariable("id") Integer id) {
        return userService.getOneCustomer(id);
    }
}
