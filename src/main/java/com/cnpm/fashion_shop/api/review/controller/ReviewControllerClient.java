package com.cnpm.fashion_shop.api.review.controller;

import com.cnpm.fashion_shop.api.review.dto.ReviewResponseDto;
import com.cnpm.fashion_shop.common.request.RequestParamsForGettingList;
import com.cnpm.fashion_shop.common.response.PaginationResponse;
import com.cnpm.fashion_shop.core.review.service.ReviewService;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "/api/v1/client/review")
public class ReviewControllerClient {

    @Autowired
    private ReviewService reviewService;


    @ApiOperation(value = "Get active reviews ")
    @GetMapping
    public PaginationResponse<ReviewResponseDto> getActiveReviews(RequestParamsForGettingList requestParamsForGettingList) {
        Page<ReviewResponseDto> data = reviewService.findAllActiveReview(requestParamsForGettingList.getPage(),
                requestParamsForGettingList.getSize(),
                requestParamsForGettingList.getSort(),
                requestParamsForGettingList.getSearch());

        return new PaginationResponse<>(data);
    }
}
