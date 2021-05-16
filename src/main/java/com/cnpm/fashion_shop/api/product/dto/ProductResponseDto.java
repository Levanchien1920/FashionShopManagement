package com.cnpm.fashion_shop.api.product.dto;

import java.util.List;

public interface ProductResponseDto {
    Integer getId();

    String getName();

    Long getPrice();

    Integer getNumber();

    String getName_Size();

    String getDes();

    String getName_Brand();

    String getName_Category();

    String getName_Gender();

    String getName_Image();

    String getName_Color();

    String getlink();

    List<Float> getNumberOfStar();


}
