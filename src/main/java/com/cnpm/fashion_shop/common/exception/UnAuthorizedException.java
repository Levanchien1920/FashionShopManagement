package com.cnpm.fashion_shop.common.exception;

import com.cnpm.fashion_shop.common.constant.ErrorMessageConstants;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.UNAUTHORIZED)
public class UnAuthorizedException extends RuntimeException {
    public UnAuthorizedException() {
        super(ErrorMessageConstants.UNAUTHENTICATED_MESSAGE);
    }

    public UnAuthorizedException(String msg) {
        super(msg);
    }
}
