package com.cnpm.fashion_shop.api.category.controller;

import com.cnpm.fashion_shop.api.category.dto.CategoryResponseDto;
import com.cnpm.fashion_shop.api.product.dto.ProductResponseDto;
import com.cnpm.fashion_shop.common.constant.SecurityConstants;
import com.cnpm.fashion_shop.common.request.RequestParamsForGettingList;
import com.cnpm.fashion_shop.common.response.PaginationResponse;
import com.cnpm.fashion_shop.core.category.service.CategoryService;
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
@RequestMapping(path = "/api/v1/client/category")
public class CategoryControllerClient {
    @Autowired
    private CategoryService categoryService;

    @ApiOperation(value = "Get all products by category")
    @GetMapping("/relateProduct/{id_category}")
    public PaginationResponse<ProductResponseDto> findAllProductbyCategory(@PathVariable("id_category") Integer id, RequestParamsForGettingList requestParamsForGettingList) {
        Page<ProductResponseDto> data = categoryService.findAllProductbyCategory(id, requestParamsForGettingList.getPage(),
                requestParamsForGettingList.getSize(),
                requestParamsForGettingList.getSort(),
                requestParamsForGettingList.getSearch());

        return new PaginationResponse<>(data);
    }
    @ApiOperation(value = "Get all category")
    @GetMapping
    public PaginationResponse<CategoryResponseDto> getCategorys(RequestParamsForGettingList requestParamsForGettingList) {
        Page<CategoryResponseDto> data = categoryService.findAllCategoryDetails(requestParamsForGettingList.getPage(),
                requestParamsForGettingList.getSize(),
                requestParamsForGettingList.getSort(),
                requestParamsForGettingList.getSearch());

        return new PaginationResponse<>(data);
    }
    @ApiOperation(value = "Get category by id")
    @GetMapping("/{category_id}")
    public ResponseEntity getOneCategory(@PathVariable("category_id") Integer id) {
        return categoryService.getOne(id);
    }

    @ApiOperation(value = "Get all category")
    @GetMapping("/all")
    public List<CategoryResponseDto> getCategoryWithoutPage(RequestParamsForGettingList requestParamsForGettingList) {
        List<CategoryResponseDto> data = categoryService.findAllCategoryNoPageDetails(
                requestParamsForGettingList.getSort(),
                requestParamsForGettingList.getSearch());

        return data;
    }
}
