package com.cnpm.fashion_shop.common.response;

import org.springframework.http.HttpStatus;

import static com.cnpm.fashion_shop.common.constant.ResponseMessage.*;

public class SuccessfulResponse extends Response {
    public static SuccessfulResponse CREATED = new SuccessfulResponse(SUCCESS_CREATED);
    public static SuccessfulResponse DELETED = new SuccessfulResponse(SUCCESS_DELETED);
    public static SuccessfulResponse UPDATED = new SuccessfulResponse(SUCCESS_UPDATED);

    private SuccessfulResponse(String message){
        super(HttpStatus.OK.value(), message);
    }
}
