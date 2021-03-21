package com.cnpm.fashion_shop.api.product.controller;

import com.cnpm.fashion_shop.api.product.dto.ProductResponseDto;
import com.cnpm.fashion_shop.common.constant.SecurityConstants;
import com.cnpm.fashion_shop.common.request.RequestParamsForGettingList;
import com.cnpm.fashion_shop.common.response.PaginationResponse;
import com.cnpm.fashion_shop.core.category.service.CategoryService;
import com.cnpm.fashion_shop.core.product.service.ProductService;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.Authorization;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "/api/v1/client/product")
public class ProductControllerClient {
    @Autowired
    private ProductService productService;

//    @ApiOperation(value = "Get all products for client", authorizations = {@Authorization(value = SecurityConstants.SECURITY_JWT_NAME)})
//    @GetMapping("/{id_product}")
//    public PaginationResponse<ProductResponseDto> findAllProductbyCategory(@PathVariable("id_category") Integer id, RequestParamsForGettingList requestParamsForGettingList) {
//        Page<ProductResponseDto> data = productService.RelateProductDto(id, requestParamsForGettingList.getPage(),
//                requestParamsForGettingList.getSize(),
//                requestParamsForGettingList.getSort(),
//                requestParamsForGettingList.getSearch());
//
//        return new PaginationResponse<>(data);
//    }
}
