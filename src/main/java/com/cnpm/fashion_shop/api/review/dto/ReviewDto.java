package com.cnpm.fashion_shop.api.review.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@NoArgsConstructor
public class ReviewDto {
    @Getter
    @Setter
    private int id;

    @Getter
    @Setter
    private int id_product;

    @Getter
    @Setter
    private int id_user;

    @Getter
    @Setter
    @NotNull
    private String content;

    @Getter
    @Setter
    private float number_of_star;


    public ReviewDto(int id, int id_product, int id_user, @NotNull String content, float number_of_star) {
        this.id = id;
        this.id_product = id_product;
        this.id_user = id_user;
        this.content = content;
        this.number_of_star = number_of_star;
    }
}
