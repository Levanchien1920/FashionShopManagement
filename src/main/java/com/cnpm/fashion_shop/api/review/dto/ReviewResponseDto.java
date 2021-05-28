package com.cnpm.fashion_shop.api.review.dto;

import java.sql.Date;

public interface ReviewResponseDto {
    Integer getId();

    String getContent();

    Integer getNumber_Of_Star();

    String getName_Product();

    String getName_User();

    String getEmail();

    Date getTimeReview();
}
