package com.cnpm.fashion_shop.api.brand.controller;

import com.cnpm.fashion_shop.api.brand.dto.BrandResponseDto;
import com.cnpm.fashion_shop.api.category.dto.CategoryResponseDto;
import com.cnpm.fashion_shop.api.product.dto.ProductResponseDto;
import com.cnpm.fashion_shop.common.constant.SecurityConstants;
import com.cnpm.fashion_shop.common.request.RequestParamsForGettingList;
import com.cnpm.fashion_shop.common.response.PaginationResponse;
import com.cnpm.fashion_shop.core.brand.service.BrandService;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.Authorization;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(path = "/api/v1/client/brand")
public class BrandControllerClient {
    @Autowired
    private BrandService brandService;

    @ApiOperation(value = "Get all products by brand")
    @GetMapping("/relateProduct/{id_brand}")
    public PaginationResponse<ProductResponseDto> findAllProductbyBrand(@PathVariable("id_brand") Integer id, RequestParamsForGettingList requestParamsForGettingList) {
        Page<ProductResponseDto> data = brandService.findAllProductbyBrand(id, requestParamsForGettingList.getPage(),
                requestParamsForGettingList.getSize(),
                requestParamsForGettingList.getSort(),
                requestParamsForGettingList.getSearch());

        return new PaginationResponse<>(data);
    }
    @ApiOperation(value = "Get all brands")
    @GetMapping()
    public PaginationResponse<BrandResponseDto> getBrand(RequestParamsForGettingList requestParamsForGettingList) {
        Page<BrandResponseDto> data = brandService.findAllBrandDetails(requestParamsForGettingList.getPage(),
                requestParamsForGettingList.getSize(),
                requestParamsForGettingList.getSort(),
                requestParamsForGettingList.getSearch());
        return new PaginationResponse<>(data);
    }
    @ApiOperation(value = "Get brand by id")
    @GetMapping("/{id_brand}")
    public ResponseEntity getOneBrand(@PathVariable("id_brand") Integer id) {
        return brandService.getOne(id);
    }

    @ApiOperation(value = "Get all brand")
    @GetMapping("/all")
    public List<BrandResponseDto> getBrandWithoutPage(RequestParamsForGettingList requestParamsForGettingList) {
        List<BrandResponseDto> data = brandService.findAllBrandDetailNoPage(
                requestParamsForGettingList.getSort(),
                requestParamsForGettingList.getSearch());

        return data;
    }
}
