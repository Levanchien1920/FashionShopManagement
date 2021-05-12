package com.cnpm.fashion_shop.api.product.controller;

import com.cnpm.fashion_shop.api.product.dto.ProductResponseDto;
import com.cnpm.fashion_shop.common.request.RequestParamsForGettingList;
import com.cnpm.fashion_shop.common.response.PaginationResponse;
import com.cnpm.fashion_shop.core.product.service.ProductService;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "/api/v1/admin/product")
public class ProductControllerAdmin {

    @Autowired
    private ProductService productService;

    @ApiOperation(value = "Get best selling products for client")
    @GetMapping("/best")
    public PaginationResponse<ProductResponseDto> getBestProducts(RequestParamsForGettingList requestParamsForGettingList) {
        Page<ProductResponseDto> data = productService.getBestProducts(requestParamsForGettingList.getPage(),
                requestParamsForGettingList.getSize(),
                requestParamsForGettingList.getSort(),
                requestParamsForGettingList.getSearch());

        return new PaginationResponse<>(data);
    }
}
