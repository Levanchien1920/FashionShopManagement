/*
package com.cnpm.fashion_shop.api.customer.controller;

import com.cnpm.fashion_shop.api.customer.dto.CustomerDto;
import com.cnpm.fashion_shop.api.customer.dto.CustomerResponseDto;
import com.cnpm.fashion_shop.common.constant.SecurityConstants;
import com.cnpm.fashion_shop.common.request.RequestParamsForGettingList;
import com.cnpm.fashion_shop.common.response.PaginationResponse;
import com.cnpm.fashion_shop.common.response.Response;
import com.cnpm.fashion_shop.core.customer.service.CustomerService;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.Authorization;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping(path = "/api/v1/customer")
public class CustomerController {
    @Autowired
    private CustomerService customerService;

    @ApiOperation(value = "Get all customers", authorizations = {@Authorization(value = SecurityConstants.SECURITY_JWT_NAME)})
    @GetMapping
    public PaginationResponse<CustomerResponseDto> getCustomer(RequestParamsForGettingList requestParamsForGettingList) {
        Page<CustomerResponseDto> data = customerService.findAllCustomerDetails(requestParamsForGettingList.getPage(),
                requestParamsForGettingList.getSize(),
                requestParamsForGettingList.getSort(),
                requestParamsForGettingList.getSearch());

        return new PaginationResponse<>(data);
    }


    @ApiOperation(value = "Create customer")
    @PostMapping
    public ResponseEntity<Response> createCustomerDto(
            @Valid @RequestBody CustomerDto dto
    ) {
        return customerService.createCustomer(dto);
    }

    @ApiOperation(value = "Update customer", authorizations = {@Authorization(value = SecurityConstants.SECURITY_JWT_NAME)})
    @PatchMapping("/{id_customer}")
    public ResponseEntity<Response> updateCustomer(
            @PathVariable("id_customer") Integer id,
            @Valid @RequestBody CustomerDto dto
    ) {
        return this.customerService.updateCustomerDto(id, dto);
    }

    @ApiOperation(value = "Delete customer", authorizations = {@Authorization(value = SecurityConstants.SECURITY_JWT_NAME)})
    @DeleteMapping("/{id_customer}")
    public ResponseEntity<Response> deleteCustomer(@PathVariable("id_customer") Integer id) {
        return this.customerService.deleteCustomerDto(id);
    }

    @ApiOperation(value = "Get customer by id", authorizations = {@Authorization(value = SecurityConstants.SECURITY_JWT_NAME)})
    @GetMapping("/{id_customer}")
    public ResponseEntity getOneCustomer(@PathVariable("id_customer") Integer id) {
        return customerService.getOne(id);
    }
}
*/
