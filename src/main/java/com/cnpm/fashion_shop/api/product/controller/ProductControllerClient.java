package com.cnpm.fashion_shop.api.product.controller;

import com.cnpm.fashion_shop.api.product.dto.ProductResponseDto;
import com.cnpm.fashion_shop.api.product.dto.ProductStarResponseDto;
import com.cnpm.fashion_shop.common.constant.SecurityConstants;
import com.cnpm.fashion_shop.common.request.RequestParamsForGettingList;
import com.cnpm.fashion_shop.common.response.PaginationResponse;
import com.cnpm.fashion_shop.core.category.service.CategoryService;
import com.cnpm.fashion_shop.core.product.service.ProductService;
import com.cnpm.fashion_shop.entity.Product;
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
@RequestMapping(path = "/api/v1/client/product")
public class ProductControllerClient {

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

    @ApiOperation(value = "Get all product")
    @GetMapping("/all")
    public List<ProductResponseDto> getProductsWithoutPage(RequestParamsForGettingList requestParamsForGettingList) {
        List<ProductResponseDto> data = productService.findAllProductDetailsWithOutPage(
                requestParamsForGettingList.getSort(),
                requestParamsForGettingList.getSearch());

        return data;
    }

    @ApiOperation(value = "Get all product")
    @GetMapping("/star")
    public PaginationResponse<ProductStarResponseDto> getProductStar(RequestParamsForGettingList requestParamsForGettingList) {
        Page<ProductStarResponseDto> data = productService.findAllProductStar(requestParamsForGettingList.getPage(),
                requestParamsForGettingList.getSize(),
                requestParamsForGettingList.getSort());

        return new PaginationResponse<>(data);
    }

    @ApiOperation(value = "Get product by id")
    @GetMapping("/{product_id}")
    public ResponseEntity getOneProduct(@PathVariable("product_id") Integer id) {
        return productService.getOne(id);
    }


    public Product getOne_pro(Integer id) {
        return productService.getOne_pro(id);
    }

    @ApiOperation(value = "Get relative products for client")
    @GetMapping("/relate/{id_product}")
    public PaginationResponse<ProductResponseDto> findAllProductbyCategory(@PathVariable("id_product") Integer id, RequestParamsForGettingList requestParamsForGettingList) {

        Product product=this.getOne_pro(id);
        Page<ProductResponseDto> data = productService.findRelateProductDto(id, product.getIdBrand(), product.getIdCategory(), product.getIdGender(),requestParamsForGettingList.getPage(),
                requestParamsForGettingList.getSize(),
                requestParamsForGettingList.getSort(),
                requestParamsForGettingList.getSearch());

        return new PaginationResponse<>(data);
    }



    @ApiOperation(value = "Get best selling products for client")
    @GetMapping("/best")
    public PaginationResponse<ProductResponseDto> getBestProducts(RequestParamsForGettingList requestParamsForGettingList) {
        Page<ProductResponseDto> data = productService.getBestProducts(requestParamsForGettingList.getPage(),
                requestParamsForGettingList.getSize(),
                requestParamsForGettingList.getSort(),
                requestParamsForGettingList.getSearch());

        return new PaginationResponse<>(data);
    }


    @ApiOperation(value = "Get new products for client")
    @GetMapping("/new")
    public PaginationResponse<ProductResponseDto> getNewProducts(RequestParamsForGettingList requestParamsForGettingList) {
        Page<ProductResponseDto> data = productService.getNewProducts(requestParamsForGettingList.getPage(),
                requestParamsForGettingList.getSize(),
                requestParamsForGettingList.getSort(),
                requestParamsForGettingList.getSearch());

        return new PaginationResponse<>(data);
    }

}
