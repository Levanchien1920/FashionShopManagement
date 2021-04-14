package com.cnpm.fashion_shop.api.customer.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@NoArgsConstructor
public class CustomerDto {
    @Getter
    @Setter
    private Integer id;

    @Getter
    @Setter
    @Size(max = 50)
    private String username;

    @Getter
    @Setter
    private String password;

    @Getter
    @Setter
    private String fullname;

    @Getter
    @Setter
    private String address;

    @Getter
    @Setter
    @NotNull
    private String email;

    @Getter
    @Setter
    @NotNull
    private String phone_number;


    public CustomerDto(Integer id, @Size(max = 50) @NotNull String username, @NotNull String password, @NotNull String fullname, @NotNull String address, @NotNull String email, @NotNull String phone_number) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.fullname = fullname;
        this.address = address;
        this.email = email;
        this.phone_number = phone_number;
    }
}
