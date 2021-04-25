package com.cnpm.fashion_shop.api.product.controller;

import com.cnpm.fashion_shop.api.product.dto.ProductDto;
import com.cnpm.fashion_shop.api.product.dto.ProductResponseDto;
import com.cnpm.fashion_shop.common.constant.SecurityConstants;
import com.cnpm.fashion_shop.common.request.RequestParamsForGettingList;
import com.cnpm.fashion_shop.common.response.PaginationResponse;
import com.cnpm.fashion_shop.common.response.Response;
import com.cnpm.fashion_shop.core.product.service.ProductService;
import com.cnpm.fashion_shop.entity.Product;
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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@RequestMapping(path = "/api/v1/product")
public class ProductController {

    @Autowired
    private ProductService productService;

    @ApiOperation(value = "Get all product")
    @GetMapping
    public PaginationResponse<ProductResponseDto> getProducts(RequestParamsForGettingList requestParamsForGettingList) {
        Page<ProductResponseDto> data = productService.findAllProductDetails(requestParamsForGettingList.getPage(),
                requestParamsForGettingList.getSize(),
                requestParamsForGettingList.getSort(),
                requestParamsForGettingList.getSearch());

        return new PaginationResponse<>(data);
    }


    @ApiOperation(value = "Create product", authorizations = {@Authorization(value = SecurityConstants.SECURITY_JWT_NAME)})
    @PostMapping
    public ResponseEntity<Response> createDto(@Valid @RequestBody ProductDto dto) {
        return productService.createProductDto(dto);
    }

    @ApiOperation(value = "Update product", authorizations = {@Authorization(value = SecurityConstants.SECURITY_JWT_NAME)})
    @PatchMapping("/{product_id}")
    public ResponseEntity<Response> updateProductProduct(@PathVariable("product_id") Integer id, @Valid @RequestBody ProductDto dto) {
        return this.productService.updateProductDto(id, dto);
    }

    @ApiOperation(value = "Delete product", authorizations = {@Authorization(value = SecurityConstants.SECURITY_JWT_NAME)})
    @DeleteMapping("/{product_id}")
    public ResponseEntity<Response> deleteProduct(@PathVariable("product_id") Integer id) {
        return this.productService.deleteProductDto(id);
    }


    @ApiOperation(value = "Get product by id")
    @GetMapping("/{product_id}")
    public ResponseEntity getOneProduct(@PathVariable("product_id") Integer id) {
        return productService.getOne(id);
    }


}
