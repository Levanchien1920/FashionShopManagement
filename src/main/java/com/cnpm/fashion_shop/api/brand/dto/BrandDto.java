package com.cnpm.fashion_shop.api.brand.dto;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@NoArgsConstructor
public class BrandDto {
    @Getter
    @Setter
    private Long id;

    @Getter
    @Setter
    @Size(max = 50)
    @NotNull
    private String name;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public BrandDto(Long id, @Size(max = 50) @NotNull String name) {
        this.id = id;
        this.name = name;
    }
}
