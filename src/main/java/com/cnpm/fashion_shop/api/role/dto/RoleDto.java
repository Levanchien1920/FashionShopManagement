package com.cnpm.fashion_shop.api.role.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@AllArgsConstructor
public class RoleDto {
    @Getter
    @Setter
    private Integer id;

    @Getter
    @Setter
    @Size(max = 50)
    @NotNull
    private String name;

}
