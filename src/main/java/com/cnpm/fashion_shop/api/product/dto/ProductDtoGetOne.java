package com.cnpm.fashion_shop.api.product.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@NoArgsConstructor
public class ProductDtoGetOne {

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


    public ProductDtoGetOne(Integer idCategory, Integer idBrand, Integer idGender, Integer idImage, Integer idColor, Integer number, Long price, String name, String description, String name_size) {
        this.id_cate = idCategory;
        this.id_brand = idBrand;
        this.id_gender = idGender;
        this.id_image = idImage;
        this.id_color = idColor;
        this.number = number;
        this.price = price;
        this.name = name;
        this.des = description;
        this.name_size = name_size;
    }
}
