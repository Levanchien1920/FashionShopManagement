package com.cnpm.fashion_shop.api.review.controller;


import com.cnpm.fashion_shop.api.review.dto.ReviewDto;
import com.cnpm.fashion_shop.api.review.dto.ReviewResponseDto;
import com.cnpm.fashion_shop.common.constant.SecurityConstants;
import com.cnpm.fashion_shop.common.request.RequestParamsForGettingList;
import com.cnpm.fashion_shop.common.response.PaginationResponse;
import com.cnpm.fashion_shop.common.response.Response;
import com.cnpm.fashion_shop.core.review.service.ReviewService;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.Authorization;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@RequestMapping(path = "/api/v1/review")
public class ReviewController {
    @Autowired
    private ReviewService reviewService;


    @ApiOperation(value = "Get all reviews")
    @GetMapping
    public PaginationResponse<ReviewResponseDto> getReviews(RequestParamsForGettingList requestParamsForGettingList) {
        Page<ReviewResponseDto> data = reviewService.findAllReviewDetails(requestParamsForGettingList.getPage(),
                requestParamsForGettingList.getSize(),
                requestParamsForGettingList.getSort(),
                requestParamsForGettingList.getSearch());

        return new PaginationResponse<>(data);
    }


    @ApiOperation(value = "Create review")
    @PostMapping
    public ResponseEntity<Response> createReviewDto(@Valid @RequestBody ReviewDto dto) {
        return reviewService.createReviewDto(dto);
    }

    @ApiOperation(value = "Delete review", authorizations = {@Authorization(value = SecurityConstants.SECURITY_JWT_NAME)})
    @DeleteMapping("/{review_id}")
    public ResponseEntity<Response> deleteReview(@PathVariable("review_id") Integer id) {
        return this.reviewService.deleteReviewDto(id);
    }


    @ApiOperation(value = "Get all reviews by id_product")
    @GetMapping("/{product_id}")
    public PaginationResponse<ReviewResponseDto> getReviewsbyProduct(@PathVariable("product_id") Integer id,RequestParamsForGettingList requestParamsForGettingList) {
        Page<ReviewResponseDto> data = reviewService.findAllReviewByProduct(id,requestParamsForGettingList.getPage(),
                requestParamsForGettingList.getSize(),
                requestParamsForGettingList.getSort(),
                requestParamsForGettingList.getSearch());

        return new PaginationResponse<>(data);
    }

}
