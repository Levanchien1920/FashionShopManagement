package com.cnpm.fashion_shop.api.invoice.controller;

import com.cnpm.fashion_shop.api.brand.dto.BrandDto;
import com.cnpm.fashion_shop.api.brand.dto.BrandResponseDto;
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
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
@RestController
@RequestMapping(path = "/api/v1/invoice")
public class InvoiceController {
//    @Autowired
//    private BrandService brandService;
//
//    @ApiOperation(value = "Get all brands", authorizations = {@Authorization(value = SecurityConstants.SECURITY_JWT_NAME)})
//    @GetMapping
//    public PaginationResponse<BrandResponseDto> getBrand(RequestParamsForGettingList requestParamsForGettingList) {
//        Page<BrandResponseDto> data = brandService.findAllBrandDetails(requestParamsForGettingList.getPage(),
//                requestParamsForGettingList.getSize(),
//                requestParamsForGettingList.getSort(),
//                requestParamsForGettingList.getSearch());
//
//        return new PaginationResponse<>(data);
//    }
//
//
//    @ApiOperation(value = "Create brand", authorizations = {@Authorization(value = SecurityConstants.SECURITY_JWT_NAME)})
//    @PostMapping
//    public ResponseEntity<Response> createBrandDto(
//            @Valid @RequestBody BrandDto dto
//    ) {
//        return brandService.createBrandDto(dto);
//    }
//
//    @ApiOperation(value = "Update brand", authorizations = {@Authorization(value = SecurityConstants.SECURITY_JWT_NAME)})
//    @PatchMapping("/{id_brand}")
//    public ResponseEntity<Response> updateBrand(
//            @PathVariable("id_brand") Integer id,
//            @Valid @RequestBody BrandDto dto
//    ) {
//        return this.brandService.updateBrandDto(id, dto);
//    }
//
//    @ApiOperation(value = "Delete brand", authorizations = {@Authorization(value = SecurityConstants.SECURITY_JWT_NAME)})
//    @DeleteMapping("/{id_brand}")
//    public ResponseEntity<Response> deleteBrand(@PathVariable("id_brand") Integer id) {
//        return this.brandService.deleteBrandDto(id);
//    }
//
//    @ApiOperation(value = "Get brand by id", authorizations = {@Authorization(value = SecurityConstants.SECURITY_JWT_NAME)})
//    @GetMapping("/{id_brand}")
//    public ResponseEntity getOneBrand(@PathVariable("id_brand") Integer id) {
//        return brandService.getOne(id);
//    }
}
