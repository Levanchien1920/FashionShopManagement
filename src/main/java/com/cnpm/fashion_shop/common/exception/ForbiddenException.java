package com.cnpm.fashion_shop.common.exception;

import com.cnpm.fashion_shop.common.constant.ErrorMessageConstants;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.FORBIDDEN)
public class ForbiddenException extends RuntimeException {
    public ForbiddenException() {
        super(ErrorMessageConstants.FORBIDDEN_MESSAGE);
    }

    public ForbiddenException(String msg) {
        super(msg);
    }
}
