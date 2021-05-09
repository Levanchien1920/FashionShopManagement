package com.cnpm.fashion_shop.api.user.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@AllArgsConstructor
@Getter
@Setter
@NoArgsConstructor
public class CustomerDto {
    private Integer id;

    @NotNull
    @Size(max = 50)
    private String fullName;

    @NotNull
    @Size(max = 50)
    private String phoneNumber;

    @NotNull
    @Size(max = 30)
    private String username;

    @NotNull
    @Size(max = 30)
    private String password;

    @NotNull
    @Size(max = 50)
    private String address;

    @Getter
    @Setter
    @NotNull
    private String email;
}
