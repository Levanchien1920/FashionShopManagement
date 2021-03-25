package com.cnpm.fashion_shop.common.response;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class EmployeeResponse {

    private boolean isSuccessful;

    private Integer id;

    private String errorMessage;

    private EmployeeResponse(boolean isSuccessful, Integer id, String errorMessage){
        this.isSuccessful = isSuccessful;
        this.id = id;
        this.errorMessage = errorMessage;
    }

    public static EmployeeResponse success(Integer id){
        return new EmployeeResponse(true, id, null);
    }

    public static EmployeeResponse fail(String errorMessage){
        return new EmployeeResponse(false, null, errorMessage);
    }
}
