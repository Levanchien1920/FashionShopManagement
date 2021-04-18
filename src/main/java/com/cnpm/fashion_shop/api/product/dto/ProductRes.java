package com.cnpm.fashion_shop.api.product.dto;

import com.cnpm.fashion_shop.entity.BaseEntity;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@NoArgsConstructor
public class ProductRes extends BaseEntity {

    @Getter
    @Setter
    private Integer id;

    @Getter
    @Setter
    private String categoryName;

    @Getter
    @Setter
    private String brandName;

    @Getter
    @Setter
    private String genderName;

    @Getter
    @Setter
    private String iamgeName;

    @Getter
    @Setter
    private String link;

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
    private Float number_of_star;

    @Getter
    @Setter
    @NotNull
    private String XXL;

    @Getter
    @Setter
    @NotNull
    private String XXL_Number;

    @Getter
    @Setter
    @NotNull
    private String XL;

    @Getter
    @Setter
    @NotNull
    private String XL_Number;

    @Getter
    @Setter
    @NotNull
    private String L;

    @Getter
    @Setter
    @NotNull
    private String L_Number;

    @Getter
    @Setter
    @NotNull
    private String M;

    @Getter
    @Setter
    @NotNull
    private String M_Number;

}
