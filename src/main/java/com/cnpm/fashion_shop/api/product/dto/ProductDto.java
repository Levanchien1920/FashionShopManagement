package com.cnpm.fashion_shop.api.product.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@AllArgsConstructor
@NoArgsConstructor
public class ProductDto {
    @Getter
    @Setter
    private Integer id;

    @Getter
    @Setter
    private Integer id_cate;

    @Getter
    @Setter
    private Integer id_brand;

    @Getter
    @Setter
    private Integer id_gender;

    @Getter
    @Setter
    private Integer id_image;

    @Getter
    @Setter
    private Integer id_color;

    @Getter
    @Setter
    private Integer number;


    @Getter
    @Setter
    private Long price;


    @Getter
    @Setter
    @Size(max = 50)
    @NotNull
    private String name;


    @Getter
    @Setter
    @NotNull
    private String des;

    @Getter
    @Setter
    @NotNull
    private String name_size;


}
