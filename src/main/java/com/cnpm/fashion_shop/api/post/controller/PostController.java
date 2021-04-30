package com.cnpm.fashion_shop.api.post.controller;

import com.cnpm.fashion_shop.api.post.dto.PostDto;
import com.cnpm.fashion_shop.api.post.dto.PostResponseDto;
import com.cnpm.fashion_shop.common.constant.SecurityConstants;
import com.cnpm.fashion_shop.common.request.RequestParamsForGettingList;
import com.cnpm.fashion_shop.common.response.PaginationResponse;
import com.cnpm.fashion_shop.common.response.Response;
import com.cnpm.fashion_shop.core.post.service.PostService;
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
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;


@RestController
@RequestMapping(path = "/api/v1/post")
public class PostController {
    @Autowired
    private PostService postService;


    @ApiOperation(value = "Get all posts")
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
        return postService.createPost(dto);
    }

    @ApiOperation(value = "Update post", authorizations = {@Authorization(value = SecurityConstants.SECURITY_JWT_NAME)})
    @PatchMapping("/{post_id}")
    public ResponseEntity<Response> updatePost(@PathVariable("post_id") Integer id,
                                                   @Valid @RequestBody PostDto dto
    ) {
        return this.postService.updatePost(id, dto);
    }

    @ApiOperation(value = "Delete post", authorizations = {@Authorization(value = SecurityConstants.SECURITY_JWT_NAME)})
    @DeleteMapping("/{post_id}")
    public ResponseEntity<Response> deleteCategory(@PathVariable("post_id") Integer id) {
        return this.postService.deletePost(id);
    }

    @ApiOperation(value = "Get post by id")
    @GetMapping("/{post_id}")
    public ResponseEntity getOneBrand(@PathVariable("post_id") Integer id) {
        return postService.getOne(id);
    }
}
