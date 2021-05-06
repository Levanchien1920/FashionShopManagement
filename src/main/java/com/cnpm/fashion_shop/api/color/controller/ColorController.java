package com.cnpm.fashion_shop.api.color.controller;

import com.cnpm.fashion_shop.api.color.dto.ColorResponse;
import com.cnpm.fashion_shop.api.color.dto.Color_Dto;
import com.cnpm.fashion_shop.common.constant.SecurityConstants;
import com.cnpm.fashion_shop.common.request.RequestParamsForGettingList;
import com.cnpm.fashion_shop.common.response.PaginationResponse;
import com.cnpm.fashion_shop.common.response.Response;
import com.cnpm.fashion_shop.core.color.service.ColorService;
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
@RequestMapping(path = "/api/v1/color")
public class ColorController {


    @Autowired
    private ColorService colorService;

    @ApiOperation(value = "Get all colors", authorizations = {@Authorization(value = SecurityConstants.SECURITY_JWT_NAME)})
    @GetMapping()
    public PaginationResponse<ColorResponse> getColor(RequestParamsForGettingList requestParamsForGettingList) {
        Page<ColorResponse> data = colorService.findAllColorDetails(requestParamsForGettingList.getPage(),
                requestParamsForGettingList.getSize(),
                requestParamsForGettingList.getSort(),
                requestParamsForGettingList.getSearch());
        return new PaginationResponse<>(data);
    }


    @ApiOperation(value = "Create color", authorizations = {@Authorization(value = SecurityConstants.SECURITY_JWT_NAME)})
    @PostMapping
    public ResponseEntity<Response> createColor(
            @Valid @RequestBody Color_Dto dto
    ) {
        return colorService.createColor(dto);
    }

    @ApiOperation(value = "Update color", authorizations = {@Authorization(value = SecurityConstants.SECURITY_JWT_NAME)})
    @PatchMapping("/{id_color}")
    public ResponseEntity<Response> updateColor(
            @PathVariable("id_color") Integer id,
            @Valid @RequestBody Color_Dto dto
    ) {
        return this.colorService.updateColor(id, dto);
    }

    @ApiOperation(value = "Delete color", authorizations = {@Authorization(value = SecurityConstants.SECURITY_JWT_NAME)})
    @DeleteMapping("/{id_color}")
    public ResponseEntity<Response> deleteColor(@PathVariable("id_color") Integer id) {
        return this.colorService.deleteColor(id);
    }

    @ApiOperation(value = "Get color by id")
    @GetMapping("/{id_color}")
    public ResponseEntity getOneColor(@PathVariable("id_color") Integer id) {
        return colorService.getOne(id);
    }

}