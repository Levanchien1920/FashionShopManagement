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
    private Integer number;

    @Getter
    @Setter
    @NotNull
    private String des;

    public ProductRes(Integer id, String categoryName, String brandName, String genderName, String iamgeName, String link, Long price, @Size(max = 50) @NotNull String name, Integer number, @NotNull String des) {
        this.id = id;
        this.categoryName = categoryName;
        this.brandName = brandName;
        this.genderName = genderName;
        this.iamgeName = iamgeName;
        this.link = link;
        this.price = price;
        this.name = name;
        this.number = number;
        this.des = des;
    }
}
