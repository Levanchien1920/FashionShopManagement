package com.cnpm.fashion_shop.api.employee.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigInteger;
import java.util.ArrayList;
import java.util.List;

@NoArgsConstructor
@Getter
@Setter
public class EmployeeDetailDto {
    Integer id;

    String employeeName;

    String phoneNumber;

    String address;

    List<RoleDto> roles = new ArrayList<>();
}
