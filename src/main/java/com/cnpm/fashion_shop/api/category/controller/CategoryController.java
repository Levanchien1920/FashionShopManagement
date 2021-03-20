package com.cnpm.fashion_shop.api.category.controller;

import com.cnpm.fashion_shop.api.brand.dto.BrandDto;
import com.cnpm.fashion_shop.api.brand.dto.BrandResponseDto;
import com.cnpm.fashion_shop.api.category.dto.CategoryDto;
import com.cnpm.fashion_shop.api.category.dto.CategoryResponseDto;
import com.cnpm.fashion_shop.common.constant.SecurityConstants;
import com.cnpm.fashion_shop.common.request.RequestParamsForGettingList;
import com.cnpm.fashion_shop.common.response.PaginationResponse;
import com.cnpm.fashion_shop.common.response.Response;
import com.cnpm.fashion_shop.core.brand.service.BrandService;
import com.cnpm.fashion_shop.core.category.service.CategoryService;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.Authorization;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;


@RestController
@RequestMapping(path = "/api/v1/category")
public class CategoryController {
    @Autowired
    private CategoryService categoryService;


    @ApiOperation(value = "Get all categorys", authorizations = {@Authorization(value = SecurityConstants.SECURITY_JWT_NAME)})
    @GetMapping
    public PaginationResponse<CategoryResponseDto> getCategorys(RequestParamsForGettingList requestParamsForGettingList) {
        Page<CategoryResponseDto> data = categoryService.findAllCategoryDetails(requestParamsForGettingList.getPage(),
                requestParamsForGettingList.getSize(),
                requestParamsForGettingList.getSort(),
                requestParamsForGettingList.getSearch());

        return new PaginationResponse<>(data);
    }


    @ApiOperation(value = "Create category", authorizations = {@Authorization(value = SecurityConstants.SECURITY_JWT_NAME)})
    @PostMapping
    public ResponseEntity<Response> createCategoryDto(@Valid @RequestBody CategoryDto dto) {
        return categoryService.createCategoryDto(dto);
    }

    @ApiOperation(value = "Update category", authorizations = {@Authorization(value = SecurityConstants.SECURITY_JWT_NAME)})
    @PatchMapping("/{category_id}")
    public ResponseEntity<Response> updateCategory(@PathVariable("category_id") Integer id,
                                                   @Valid @RequestBody CategoryDto dto
    ) {
        return this.categoryService.updateCategoryDto(id, dto);
    }

    @ApiOperation(value = "Delete category", authorizations = {@Authorization(value = SecurityConstants.SECURITY_JWT_NAME)})
    @DeleteMapping("/{category_id}")
    public ResponseEntity<Response> deleteCategory(@PathVariable("category_id") Integer id) {
        return this.categoryService.deleteCategoryDto(id);
    }

    @ApiOperation(value = "Get category by id", authorizations = {@Authorization(value = SecurityConstants.SECURITY_JWT_NAME)})
    @GetMapping("/{category_id}")
    public ResponseEntity getOneCategory(@PathVariable("category_id") Integer id) {
        return categoryService.getOne(id);
    }
}
