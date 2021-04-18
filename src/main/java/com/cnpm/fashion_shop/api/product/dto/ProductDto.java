package com.cnpm.fashion_shop.api.product.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

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

    public ProductDto(Integer id, Integer id_cate, Integer id_brand, Integer id_gender, Integer id_image, Integer id_color, Long price, @Size(max = 50) @NotNull String name, @NotNull String des, @NotNull String name_size) {
        this.id = id;
        this.id_cate = id_cate;
        this.id_brand = id_brand;
        this.id_gender = id_gender;
        this.id_image = id_image;
        this.id_color = id_color;
        this.price = price;
        this.name = name;
        this.des = des;
        this.name_size = name_size;;
    }
}
