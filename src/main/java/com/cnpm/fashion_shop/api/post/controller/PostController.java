package com.cnpm.fashion_shop.api.post.controller;

import com.cnpm.fashion_shop.api.brand.dto.BrandDto;
import com.cnpm.fashion_shop.api.brand.dto.BrandResponseDto;
import com.cnpm.fashion_shop.api.category.dto.CategoryDto;
import com.cnpm.fashion_shop.api.category.dto.CategoryResponseDto;
import com.cnpm.fashion_shop.api.post.dto.PostDto;
import com.cnpm.fashion_shop.api.post.dto.PostResponseDto;
import com.cnpm.fashion_shop.common.constant.SecurityConstants;
import com.cnpm.fashion_shop.common.request.RequestParamsForGettingList;
import com.cnpm.fashion_shop.common.response.PaginationResponse;
import com.cnpm.fashion_shop.common.response.Response;
import com.cnpm.fashion_shop.core.brand.service.BrandService;
import com.cnpm.fashion_shop.core.category.service.CategoryService;
import com.cnpm.fashion_shop.core.post.service.PostService;
import com.cnpm.fashion_shop.entity.Post;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.Authorization;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

public class PostController {
    @Autowired
    private PostService postService;


    @ApiOperation(value = "Get all posts", authorizations = {@Authorization(value = SecurityConstants.SECURITY_JWT_NAME)})
    @GetMapping
    public PaginationResponse<PostResponseDto> getPosts(RequestParamsForGettingList requestParamsForGettingList) {
        Page<PostResponseDto> data = postService.findAllPostDetails(requestParamsForGettingList.getPage(),
                requestParamsForGettingList.getSize(),
                requestParamsForGettingList.getSort(),
                requestParamsForGettingList.getSearch());

        return new PaginationResponse<>(data);
    }


    @ApiOperation(value = "Create post", authorizations = {@Authorization(value = SecurityConstants.SECURITY_JWT_NAME)})
    @PostMapping
    public ResponseEntity<Response> createPostDto(@Valid @RequestBody PostDto dto) {
        return postService.createPostDto(dto);
    }

    @ApiOperation(value = "Update post", authorizations = {@Authorization(value = SecurityConstants.SECURITY_JWT_NAME)})
    @PatchMapping("/{post_id}")
    public ResponseEntity<Response> updatePost(@PathVariable("post_id") Integer id,
                                                   @Valid @RequestBody PostDto dto
    ) {
        return this.postService.updatePostDto(id, dto);
    }

    @ApiOperation(value = "Delete post", authorizations = {@Authorization(value = SecurityConstants.SECURITY_JWT_NAME)})
    @DeleteMapping("/{post_id}")
    public ResponseEntity<Response> deleteCategory(@PathVariable("post_id") Integer id) {
        return this.postService.deletePostDto(id);
    }

    @ApiOperation(value = "Get post by id", authorizations = {@Authorization(value = SecurityConstants.SECURITY_JWT_NAME)})
    @GetMapping("/{post_id}")
    public ResponseEntity getOneBrand(@PathVariable("post_id") Integer id) {
        return postService.getOne(id);
    }
}
