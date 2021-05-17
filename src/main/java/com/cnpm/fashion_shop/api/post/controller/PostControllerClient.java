package com.cnpm.fashion_shop.api.post.controller;

import com.cnpm.fashion_shop.api.post.dto.PostClientDto;
import com.cnpm.fashion_shop.api.post.dto.PostResponseDto;
import com.cnpm.fashion_shop.common.constant.SecurityConstants;
import com.cnpm.fashion_shop.common.request.RequestParamsForGettingList;
import com.cnpm.fashion_shop.common.response.PaginationResponse;
import com.cnpm.fashion_shop.core.post.service.PostService;
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
@RequestMapping(path = "/api/v1/client/post")
public class PostControllerClient {
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

    @ApiOperation(value = "Get post by id", authorizations = {@Authorization(value = SecurityConstants.SECURITY_JWT_NAME)})
    @GetMapping("/{id_post}")
    public List<PostClientDto> getOneByIdPost(RequestParamsForGettingList requestParamsForGettingList, @PathVariable("id_post") Integer id) {
        List<PostClientDto> data = postService.getOneByIdPost(
                requestParamsForGettingList.getSort(),id);

        return data;
    }
}