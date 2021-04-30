package com.cnpm.fashion_shop.api.user.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@NoArgsConstructor
@Getter
@Setter
public class UserDetailDto {
    Integer id;

    String employeeName;

    String phoneNumber;

    String address;

    List<RoleDto> roles = new ArrayList<>();
}
