package com.cnpm.fashion_shop.api.auth.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;


@AllArgsConstructor
public class LoginEmployeeDetailDto {
    @Getter
    @Setter
    private Integer id;

    @Getter
    @Setter
    private String username;

    @Getter
    @Setter
    private String fullName;


    @Getter
    @Setter
    private List<String> roleNames;
}

