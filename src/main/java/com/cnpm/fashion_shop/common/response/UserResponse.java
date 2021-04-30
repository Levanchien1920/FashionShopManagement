package com.cnpm.fashion_shop.common.response;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserResponse {

    private boolean isSuccessful;

    private Integer id;

    private String errorMessage;

    private UserResponse(boolean isSuccessful, Integer id, String errorMessage){
        this.isSuccessful = isSuccessful;
        this.id = id;
        this.errorMessage = errorMessage;
    }

    public static UserResponse success(Integer id){
        return new UserResponse(true, id, null);
    }

    public static UserResponse fail(String errorMessage){
        return new UserResponse(false, null, errorMessage);
    }
}
