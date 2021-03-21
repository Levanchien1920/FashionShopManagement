package com.cnpm.fashion_shop.api.brand.controller;

import com.cnpm.fashion_shop.api.brand.dto.BrandDto;
import com.cnpm.fashion_shop.api.brand.dto.BrandResponseDto;
import com.cnpm.fashion_shop.api.product.dto.ProductDto;
import com.cnpm.fashion_shop.api.product.dto.ProductResponseDto;
import com.cnpm.fashion_shop.common.constant.SecurityConstants;
import com.cnpm.fashion_shop.common.request.RequestParamsForGettingList;
import com.cnpm.fashion_shop.common.response.PaginationResponse;
import com.cnpm.fashion_shop.common.response.Response;
import com.cnpm.fashion_shop.core.brand.service.BrandService;

import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.Authorization;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;

import javax.validation.Valid;


@RestController
@RequestMapping(path = "/api/v1/brand")
public class BrandController {


    @Autowired
    private BrandService brandService;

    @ApiOperation(value = "Get all brands", authorizations = {@Authorization(value = SecurityConstants.SECURITY_JWT_NAME)})
    @GetMapping
    public PaginationResponse<BrandResponseDto> getBrand(RequestParamsForGettingList requestParamsForGettingList) {
        Page<BrandResponseDto> data = brandService.findAllBrandDetails(requestParamsForGettingList.getPage(),
                requestParamsForGettingList.getSize(),
                requestParamsForGettingList.getSort(),
                requestParamsForGettingList.getSearch());

        return new PaginationResponse<>(data);
    }


    @ApiOperation(value = "Create brand", authorizations = {@Authorization(value = SecurityConstants.SECURITY_JWT_NAME)})
    @PostMapping
    public ResponseEntity<Response> createBrandDto(
            @Valid @RequestBody BrandDto dto
    ) {
        return brandService.createBrandDto(dto);
    }

    @ApiOperation(value = "Update brand", authorizations = {@Authorization(value = SecurityConstants.SECURITY_JWT_NAME)})
    @PatchMapping("/{id_brand}")
    public ResponseEntity<Response> updateBrand(
            @PathVariable("id_brand") Integer id,
            @Valid @RequestBody BrandDto dto
    ) {
        return this.brandService.updateBrandDto(id, dto);
    }

    @ApiOperation(value = "Delete brand", authorizations = {@Authorization(value = SecurityConstants.SECURITY_JWT_NAME)})
    @DeleteMapping("/{id_brand}")
    public ResponseEntity<Response> deleteBrand(@PathVariable("id_brand") Integer id) {
        return this.brandService.deleteBrandDto(id);
    }

    @ApiOperation(value = "Get brand by id", authorizations = {@Authorization(value = SecurityConstants.SECURITY_JWT_NAME)})
    @GetMapping("/{id_brand}")
    public ResponseEntity getOneBrand(@PathVariable("id_brand") Integer id) {
        return brandService.getOne(id);
    }

    //    end admin




}
