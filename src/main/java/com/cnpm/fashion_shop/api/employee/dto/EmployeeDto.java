package com.cnpm.fashion_shop.api.employee.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.ArrayList;
import java.util.List;

@NoArgsConstructor
@Getter
@Setter
public class EmployeeDto {
    private Integer id;

    @NotNull
    @Size(max = 50)
    private String fullname;

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

    List<RoleDto> roles = new ArrayList<>();
    List<String> role = new ArrayList<>();

    public EmployeeDto(int id, String fullName, String phone_number, String username, String address) {
        this.id = id;
        this.username = username;
        this.fullname = fullName;
        this.address = address;
        this.phoneNumber = phone_number;
    }

    public EmployeeDto(int id, String fullName, String phone_number, String username, String address, List<String> mappingRolesToName) {
        this.id = id;
        this.username = username;
        this.fullname = fullName;
        this.address = address;
        this.phoneNumber = phone_number;
        this.role = mappingRolesToName;
    }
}
