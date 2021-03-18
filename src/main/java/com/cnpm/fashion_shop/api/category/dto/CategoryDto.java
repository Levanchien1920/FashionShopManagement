package com.cnpm.fashion_shop.api.category.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@NoArgsConstructor
public class CategoryDto {
    @Getter
    @Setter
    private int id;

    @Getter
    @Setter
    @Size(max = 50)
    @NotNull
    private String name;


    public CategoryDto(int id, @Size(max = 50) @NotNull String name) {
        this.id = id;
        this.name = name;
    }
}
