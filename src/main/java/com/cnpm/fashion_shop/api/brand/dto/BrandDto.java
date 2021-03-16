package com.cnpm.fashion_shop.api.brand.dto;


import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@NoArgsConstructor
public class BrandDto {
    @Getter
    @Setter
    private Integer id;

    @Getter
    @Setter
    @Size(max = 50)
    @NotNull
    private String name;



    public BrandDto(int id, @Size(max = 50) @NotNull String name) {
        this.id = id;
        this.name = name;
    }
}
