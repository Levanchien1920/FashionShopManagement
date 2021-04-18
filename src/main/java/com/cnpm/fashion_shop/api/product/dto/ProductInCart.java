package com.cnpm.fashion_shop.api.product.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@NoArgsConstructor
public class ProductInCart {
    @Getter
    @Setter
    private Integer id;

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

    public ProductInCart(Integer id, Long price, @Size(max = 50) @NotNull String name, Integer number) {
        this.id = id;
        this.price = price;
        this.name = name;
        this.number = number;
    }
}