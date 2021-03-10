package com.cnpm.fashion_shop.api.auth.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

public class LoginEmployeeDetailDto {
    @Getter
    @Setter
    private int id;

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
    private String phone_number;




    public LoginEmployeeDetailDto(int id, String username, String fullName, String address, String phone_number, List<String> roleNames) {
        this.id = id;
        this.username = username;
        this.fullName = fullName;
        this.address = address;
        this.phone_number = phone_number;
        this.roleNames = roleNames;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getPhone_number() {
        return phone_number;
    }

    public void setPhone_number(String phone_number) {
        this.phone_number = phone_number;
    }
//
//	public String getEmail() {
//		return email;
//	}
//
//	public void setEmail(String email) {
//		this.email = email;
//	}




    @Getter
    @Setter
    private List<String> roleNames;
}
