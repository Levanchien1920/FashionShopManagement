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
    private int id;

    @Getter
    @Setter
    @Size(max = 50)
    @NotNull
    private String name;


    public ProductDto(int id, @Size(max = 50) @NotNull String name) {
        this.id = id;
        this.name = name;
    }
}
