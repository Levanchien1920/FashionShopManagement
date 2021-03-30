package com.cnpm.fashion_shop.api.auth.dto;

import lombok.Getter;
import lombok.Setter;

public class LoginCustomerDto {
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
    private String address;

    @Getter
    @Setter
    private String phoneNumber;

    @Getter
    @Setter
    private String email;

    public LoginCustomerDto(Integer id_cus, String username, String fullname, String address, String phoneNumber, String email) {
        this.id = id_cus;
        this.username = username;
        this.address = address;
        this.fullName = fullname;
        this.phoneNumber = phoneNumber;
        this.email = email;
    }
}
