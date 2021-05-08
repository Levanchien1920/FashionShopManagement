package com.cnpm.fashion_shop.api.role.controller;


import com.cnpm.fashion_shop.api.brand.dto.BrandDto;
import com.cnpm.fashion_shop.api.brand.dto.BrandResponseDto;
import com.cnpm.fashion_shop.api.product.dto.ProductResponseDto;
import com.cnpm.fashion_shop.api.role.dto.RoleDto;
import com.cnpm.fashion_shop.api.role.dto.RoleResponseDto;
import com.cnpm.fashion_shop.api.user.dto.UserResponseDto;
import com.cnpm.fashion_shop.common.constant.SecurityConstants;
import com.cnpm.fashion_shop.common.request.RequestParamsForGettingList;
import com.cnpm.fashion_shop.common.response.PaginationResponse;
import com.cnpm.fashion_shop.common.response.Response;
import com.cnpm.fashion_shop.core.role.service.RoleService;
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

@RestController
@RequestMapping(path = "/api/v1/role")
public class RoleController {

    @Autowired
    private RoleService roleService;

    @ApiOperation(value = "Get all roles")
    @GetMapping()
    public PaginationResponse<RoleResponseDto> getRole(RequestParamsForGettingList requestParamsForGettingList) {
        Page<RoleResponseDto> data = roleService.findAllRoleDetails(requestParamsForGettingList.getPage(),
                requestParamsForGettingList.getSize(),
                requestParamsForGettingList.getSort(),
                requestParamsForGettingList.getSearch());
        return new PaginationResponse<>(data);
    }

    @ApiOperation(value = "Get all users by role")
    @GetMapping("/userRole/{id_role}")
    public PaginationResponse<UserResponseDto> findAllUserByRole(@PathVariable("id_role") Integer id, RequestParamsForGettingList requestParamsForGettingList) {
        Page<UserResponseDto> data = roleService.findAllUserByRole(id, requestParamsForGettingList.getPage(),
                requestParamsForGettingList.getSize(),
                requestParamsForGettingList.getSort());

        return new PaginationResponse<>(data);
    }

    @ApiOperation(value = "Create role", authorizations = {@Authorization(value = SecurityConstants.SECURITY_JWT_NAME)})
    @PostMapping
    public ResponseEntity<Response> createRole(
            @Valid @RequestBody RoleDto dto
    ) {
        return roleService.createRole(dto);
    }

    @ApiOperation(value = "Update role", authorizations = {@Authorization(value = SecurityConstants.SECURITY_JWT_NAME)})
    @PatchMapping("/{id_role}")
    public ResponseEntity<Response> updateRole(
            @PathVariable("id_role") Integer id,
            @Valid @RequestBody RoleDto dto
    ) {
        return this.roleService.updateRole(id, dto);
    }

    @ApiOperation(value = "Delete role", authorizations = {@Authorization(value = SecurityConstants.SECURITY_JWT_NAME)})
    @DeleteMapping("/{id_role}")
    public ResponseEntity<Response> deleteRole(@PathVariable("id_role") Integer id) {
        return this.roleService.deleteRole(id);
    }

    @ApiOperation(value = "Get role by id")
    @GetMapping("/{id_role}")
    public ResponseEntity getOneRole(@PathVariable("id_role") Integer id) {
        return roleService.getOne(id);
    }

}
