package com.cnpm.fashion_shop.api.employee.controller;

import com.cnpm.fashion_shop.api.customer.dto.CustomerResponseDto;
import com.cnpm.fashion_shop.api.employee.dto.EmployeeDetailDto;
import com.cnpm.fashion_shop.api.employee.dto.EmployeeDto;
import com.cnpm.fashion_shop.api.employee.dto.EmployeeResponseDto;
import com.cnpm.fashion_shop.common.constant.SecurityConstants;
import com.cnpm.fashion_shop.common.request.RequestParamsForGettingList;
import com.cnpm.fashion_shop.common.response.PaginationResponse;
import com.cnpm.fashion_shop.common.response.Response;
import com.cnpm.fashion_shop.core.employee.service.EmployeeService;
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
@RequestMapping(path = "/api/v1/employee")
public class EmployeeController {
    @Autowired
    private EmployeeService employeeService;

    @ApiOperation(value = "Get all employees", authorizations = {@Authorization(value = SecurityConstants.SECURITY_JWT_NAME)})
    @GetMapping
    public PaginationResponse<EmployeeResponseDto> getEmployees(RequestParamsForGettingList requestParamsForGettingList) {
        Page<EmployeeResponseDto> data = employeeService.findAllEmployeeDetails(requestParamsForGettingList.getPage(),
                requestParamsForGettingList.getSize(),
                requestParamsForGettingList.getSort(),
                requestParamsForGettingList.getSearch());

        return new PaginationResponse<>(data);
    }

    @ApiOperation(value = "Create employee", authorizations = {@Authorization(value = SecurityConstants.SECURITY_JWT_NAME)})
    @PostMapping
    public ResponseEntity<Response> createEmployeeDto(
            @Valid @RequestBody EmployeeDto dto
    ) {
        return employeeService.createEmployee(dto);
    }

    //
    @ApiOperation(value = "Update employee", authorizations = {@Authorization(value = SecurityConstants.SECURITY_JWT_NAME)})
    @PatchMapping("/{id}")
    public ResponseEntity<Response> updateEmployee(
            @PathVariable("id") Integer id,
            @Valid @RequestBody EmployeeDto dto
    ) {
        return this.employeeService.updateEmployee(id, dto);
    }
    @ApiOperation(value = "Get employee by id", authorizations = {@Authorization(value = SecurityConstants.SECURITY_JWT_NAME)})
    @GetMapping("/{id}")
    public ResponseEntity getOneCustomer(@PathVariable("id") Integer id) {
        return employeeService.getOne(id);
    }

    @ApiOperation(value = "Delete employee", authorizations = {@Authorization(value = SECURITY_JWT_NAME)})
    @DeleteMapping("/{id}")
    public ResponseEntity<Response> deleteEmployee(@PathVariable("id") Integer id) {
        return this.employeeService.deleteEmployee(id);
    }
}
