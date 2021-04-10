package com.cnpm.fashion_shop.api.product.dto;

import com.cnpm.fashion_shop.api.size.dto.SizeDto;
import com.cnpm.fashion_shop.entity.BaseEntity;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.List;

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
    private Integer sold_out;

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
    private SizeDto name_size;

    public ProductRes(Integer id, String categoryName, String brandName, String genderName, String iamgeName, String link, Long price, @Size(max = 50) @NotNull String name, Integer number, Integer sold_out, @NotNull String des, Float number_of_star, @NotNull SizeDto name_size) {
        this.id = id;
        this.categoryName = categoryName;
        this.brandName = brandName;
        this.genderName = genderName;
        this.iamgeName = iamgeName;
        this.link = link;
        this.price = price;
        this.name = name;
        this.number = number;
        this.sold_out = sold_out;
        this.des = des;
        this.number_of_star = number_of_star;
        this.name_size = name_size;
    }
}
