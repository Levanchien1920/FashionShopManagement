package com.cnpm.fashion_shop.api.user.dto;

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
public class UserDto {
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

    @Getter
    @Setter
    @NotNull
    private String email;

    private Integer id_role;

    List<RoleDto> roles = new ArrayList<>();
    List<String> role = new ArrayList<>();


    public UserDto(int id, String fullName, String phone_number, String username, String address, int id_role) {
        this.id = id;
        this.username = username;
        this.fullname = fullName;
        this.address = address;
        this.phoneNumber = phone_number;
        this.id_role = id_role;
    }
}
