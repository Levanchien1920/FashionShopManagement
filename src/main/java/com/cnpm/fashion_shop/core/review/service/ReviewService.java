package com.cnpm.fashion_shop.core.review.service;

import com.cnpm.fashion_shop.api.post.dto.PostDto;
import com.cnpm.fashion_shop.api.review.dto.ReviewDto;
import com.cnpm.fashion_shop.api.review.dto.ReviewResponseDto;
import com.cnpm.fashion_shop.common.response.Response;
import com.cnpm.fashion_shop.common.response.SuccessfulResponse;
import com.cnpm.fashion_shop.core.review.repository.ReviewRepository;
import com.cnpm.fashion_shop.entity.Post;
import com.cnpm.fashion_shop.entity.Review;
import com.cnpm.fashion_shop.util.filterUtil.Implements.OrderFilterHelperImpl;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.lang.invoke.MethodHandles;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@Service
public class ReviewService {
    private static final Logger LOG = LoggerFactory.getLogger(MethodHandles.lookup().lookupClass());
    @Autowired
    private ReviewRepository reviewRepository;

    @Transactional
    public Page<ReviewResponseDto> findAllReviewDetails(int size, int page, String sort, String search) {
        List<String> columnsAllow = Arrays.asList(
                "id",
                "content",
                "number_of_star",
                "name_product",
                "name_user",
                "email"
        );
        OrderFilterHelperImpl orderFilterHelperImpl = new OrderFilterHelperImpl(sort, columnsAllow);
        orderFilterHelperImpl.validate();

        Pageable pageable = PageRequest.of(size, page, orderFilterHelperImpl.getSort());
        return reviewRepository.findAll(pageable, search);
    }

    @Transactional
    public Page<ReviewResponseDto> findAllReviewByProduct(Integer id,int size, int page, String sort, String search) {
        List<String> columnsAllow = Arrays.asList(
                "id",
                "content",
                "number_of_star",
                "name_product",
                "name_user",
                "email"
        );
        OrderFilterHelperImpl orderFilterHelperImpl = new OrderFilterHelperImpl(sort, columnsAllow);
        orderFilterHelperImpl.validate();

        Pageable pageable = PageRequest.of(size, page, orderFilterHelperImpl.getSort());
        return reviewRepository.findAllReviewByProduct(pageable, search,id);
    }

    @Transactional
    public ResponseEntity<Response> createReviewDto(ReviewDto dto) {
        Review review;

        if (StringUtils.trim(dto.getContent()).equals("")) {
            return ResponseEntity
                    .badRequest()
                    .body(Response.badRequest("Review content cannot be empty or contain only space"));
        }

        review = new Review();
        review.setContent(dto.getContent().trim());
        review.setNumberOfStar(dto.getNumber_of_star());
        review.setId_product(dto.getId_product());
        review.setId_user(dto.getId_user());

        try {
            reviewRepository.save(review);
            return ResponseEntity.ok(SuccessfulResponse.CREATED);
        } catch (Exception e) {
            LOG.error(e.getMessage());
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Response.internalError(e.getMessage()));
        }
    }
    @Transactional
    public ResponseEntity<Response> updateReview(Integer id, ReviewDto dto) {
        Optional<Review> reviewOptional = reviewRepository.findById(id);
        Review review;
        Review existingReview = reviewRepository.findByContent(StringUtils.trim(dto.getContent()));

        if (StringUtils.equals(StringUtils.trim(dto.getContent()), "")) {
            return ResponseEntity
                    .badRequest()
                    .body(Response.badRequest("Review's content cannot be empty"));
        }

        if (reviewOptional.isEmpty() || reviewOptional.get().getIsDeleted()) {
            return ResponseEntity
                    .badRequest()
                    .body(Response.badRequest("Not found review to be updated"));
        }

        // Compare old and new name
        if (reviewOptional.get().getContent().equals(StringUtils.trim(dto.getContent()))) {
            return ResponseEntity.ok(SuccessfulResponse.UPDATED);
        }

        if (existingReview != null) {
            return ResponseEntity
                    .badRequest()
                    .body(Response.badRequest("This review already exists"));
        }

        review = reviewOptional.get();
        review.setContent(dto.getContent().trim());
        review.setNumberOfStar(dto.getNumber_of_star());
        review.setId_product(dto.getId_product());
        review.setId_user(dto.getId_user());


        try {
            reviewRepository.save(review);
            return ResponseEntity.ok(SuccessfulResponse.UPDATED);
        } catch (Exception e) {
            LOG.error(e.getMessage());
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Response.internalError(e.getMessage()));
        }
    }

    @Transactional
    public ResponseEntity<Response> deleteReviewDto(Integer id) {
        Review review;
        Optional<Review> reviewOpt = reviewRepository.findById(id);

        if (reviewOpt.isEmpty()) {
            return ResponseEntity.badRequest()
                    .body(Response.badRequest("This review does not exist"));
        }

        review = reviewOpt.get();

        if (review.getIsDeleted()) {
            return ResponseEntity.badRequest()
                    .body(Response.badRequest("This review has been deleted"));
        }

        review.setIsDeleted(true);

        try {
            reviewRepository.save(review);
            return ResponseEntity.ok(SuccessfulResponse.DELETED);
        } catch (Exception e) {
            LOG.error(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Response.internalError(e.getMessage()));
        }
    }

    @Transactional
    public Optional<Review> findByIdOptional(Integer id) {
        return reviewRepository.findById(id);
    }


    @Transactional
    public Page<ReviewResponseDto> findAllActiveReview(int size, int page, String sort, String search) {
        List<String> columnsAllow = Arrays.asList(
                "id",
                "content",
                "number_of_star",
                "name_product",
                "name_user",
                "email"
        );
        OrderFilterHelperImpl orderFilterHelperImpl = new OrderFilterHelperImpl(sort, columnsAllow);
        orderFilterHelperImpl.validate();

        Pageable pageable = PageRequest.of(size, page, orderFilterHelperImpl.getSort());
        return reviewRepository.findAllGoodReview(pageable, search);
    }
}
