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
    private String Name_Category;

    @Getter
    @Setter
    private String Name_Brand;

    @Getter
    @Setter
    private String Name_Gender;

    @Getter
    @Setter
    private String Name_Image;

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

    public ProductRes(Integer id, String name_Category, String name_Brand, String name_Gender, String name_Image, String link, Long price, @Size(max = 50) @NotNull String name, Integer number, @NotNull String des) {
        this.id = id;
        this.Name_Category = name_Category;
        this.Name_Brand = name_Brand;
        this.Name_Gender = name_Gender;
        this.Name_Image = name_Image;
        this.link = link;
        this.price = price;
        this.name = name;
        this.number = number;
        this.des = des;
    }
}
