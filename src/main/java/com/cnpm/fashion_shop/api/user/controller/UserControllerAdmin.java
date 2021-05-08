package com.cnpm.fashion_shop.api.user.controller;

import com.cnpm.fashion_shop.api.user.dto.UserDto;
import com.cnpm.fashion_shop.api.user.dto.UserResponseDto;
import com.cnpm.fashion_shop.common.constant.SecurityConstants;
import com.cnpm.fashion_shop.common.request.RequestParamsForGettingList;
import com.cnpm.fashion_shop.common.response.PaginationResponse;
import com.cnpm.fashion_shop.common.response.Response;
import com.cnpm.fashion_shop.core.employee.service.UserService;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.Authorization;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

import static com.cnpm.fashion_shop.common.constant.SecurityConstants.SECURITY_JWT_NAME;

@RestController
@RequestMapping(path = "/api/v1/admin/user")
public class UserControllerAdmin {
    @Autowired
    private UserService userService;

    @ApiOperation(value = "Get all employees", authorizations = {@Authorization(value = SecurityConstants.SECURITY_JWT_NAME)})
    @GetMapping("/employee")
    public PaginationResponse<UserResponseDto> getEmployees(RequestParamsForGettingList requestParamsForGettingList) {
        Page<UserResponseDto> data = userService.findAllEmployeesDetails(requestParamsForGettingList.getPage(),
                requestParamsForGettingList.getSize(),
                requestParamsForGettingList.getSort(),
                requestParamsForGettingList.getSearch());

        return new PaginationResponse<>(data);
    }

    @ApiOperation(value = "Get all employees", authorizations = {@Authorization(value = SecurityConstants.SECURITY_JWT_NAME)})
    @GetMapping("/customer")
    public PaginationResponse<UserResponseDto> getCustomers(RequestParamsForGettingList requestParamsForGettingList) {
        Page<UserResponseDto> data = userService.findAllCustomerDetails(requestParamsForGettingList.getPage(),
                requestParamsForGettingList.getSize(),
                requestParamsForGettingList.getSort(),
                requestParamsForGettingList.getSearch());

        return new PaginationResponse<>(data);
    }

    @ApiOperation(value = "Create employee", authorizations = {@Authorization(value = SecurityConstants.SECURITY_JWT_NAME)})
    @PostMapping
    public ResponseEntity<Response> createEmployeeDto(
            @Valid @RequestBody UserDto dto
    ) {
        return userService.createUser(dto);
    }

    //
    @ApiOperation(value = "Update employee", authorizations = {@Authorization(value = SecurityConstants.SECURITY_JWT_NAME)})
    @PatchMapping("/{id}")
    public ResponseEntity<Response> updateEmployee(
            @PathVariable("id") Integer id,
            @Valid @RequestBody UserDto dto
    ) {
        return this.userService.updateUser(id, dto);
    }
    @ApiOperation(value = "Get employee by id", authorizations = {@Authorization(value = SecurityConstants.SECURITY_JWT_NAME)})
    @GetMapping("/{id}")
    public ResponseEntity getOneEmployee(@PathVariable("id") Integer id) {
        return userService.getOneEmployee(id);
    }

    @ApiOperation(value = "Get customer by id", authorizations = {@Authorization(value = SecurityConstants.SECURITY_JWT_NAME)})
    @GetMapping("/{id_customer}")
    public ResponseEntity getOneCustomer(@PathVariable("id_customer") Integer id) {
        return userService.getOneCustomer(id);
    }

    @ApiOperation(value = "Delete employee", authorizations = {@Authorization(value = SECURITY_JWT_NAME)})
    @DeleteMapping("/{id}")
    public ResponseEntity<Response> deleteEmployee(@PathVariable("id") Integer id) {
        return this.userService.deleteEmployee(id);
    }
    @ApiOperation(value = "Get customers", authorizations = {@Authorization(value = SecurityConstants.SECURITY_JWT_NAME)})
    @GetMapping("/getTotalCustomer")
    public int getTotalCustomers() {
        return userService.getTotalCustomers();
    }
}
