package com.cnpm.fashion_shop.api.review.controller;

import com.cnpm.fashion_shop.api.category.dto.CategoryDto;
import com.cnpm.fashion_shop.api.category.dto.CategoryResponseDto;
import com.cnpm.fashion_shop.api.review.dto.ReviewDto;
import com.cnpm.fashion_shop.api.review.dto.ReviewResponseDto;
import com.cnpm.fashion_shop.common.constant.SecurityConstants;
import com.cnpm.fashion_shop.common.request.RequestParamsForGettingList;
import com.cnpm.fashion_shop.common.response.PaginationResponse;
import com.cnpm.fashion_shop.common.response.Response;
import com.cnpm.fashion_shop.core.category.service.CategoryService;
import com.cnpm.fashion_shop.core.review.service.ReviewService;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.Authorization;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping(path = "/api/v1/review")
public class ReviewController {
    @Autowired
    private ReviewService reviewService;


    @ApiOperation(value = "Get all reviews", authorizations = {@Authorization(value = SecurityConstants.SECURITY_JWT_NAME)})
    @GetMapping
    public PaginationResponse<ReviewResponseDto> getReviews(RequestParamsForGettingList requestParamsForGettingList) {
        Page<ReviewResponseDto> data = reviewService.findAllReviewDetails(requestParamsForGettingList.getPage(),
                requestParamsForGettingList.getSize(),
                requestParamsForGettingList.getSort(),
                requestParamsForGettingList.getSearch());

        return new PaginationResponse<>(data);
    }


    @ApiOperation(value = "Create review", authorizations = {@Authorization(value = SecurityConstants.SECURITY_JWT_NAME)})
    @PostMapping
    public ResponseEntity<Response> createReviewDto(@Valid @RequestBody ReviewDto dto) {
        return reviewService.createReviewDto(dto);
    }

//    @ApiOperation(value = "Update review", authorizations = {@Authorization(value = SecurityConstants.SECURITY_JWT_NAME)})
//    @PatchMapping("/{review_id}")
//    public ResponseEntity<Response> updateReview(@PathVariable("review_id") Integer id,
//                                                   @Valid @RequestBody ReviewDto dto
//    ) {
//        return this.reviewService.updateReviewDto(id, dto);
//    }

    @ApiOperation(value = "Delete review", authorizations = {@Authorization(value = SecurityConstants.SECURITY_JWT_NAME)})
    @DeleteMapping("/{review_id}")
    public ResponseEntity<Response> deleteReview(@PathVariable("review_id") Integer id) {
        return this.reviewService.deleteReviewDto(id);
    }

    @ApiOperation(value = "Get review by id", authorizations = {@Authorization(value = SecurityConstants.SECURITY_JWT_NAME)})
    @GetMapping("/{review_id}")
    public ResponseEntity getOneReview(@PathVariable("review_id") Integer id) {
        return reviewService.getOne(id);
    }
}
