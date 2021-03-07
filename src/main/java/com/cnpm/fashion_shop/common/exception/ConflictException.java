package com.cnpm.fashion_shop.common.exception;

import com.cnpm.fashion_shop.common.constant.ErrorMessageConstants;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.CONFLICT)
public class ConflictException extends RuntimeException {
    public ConflictException() {
        super(ErrorMessageConstants.CONFLICT_MESSAGE);
    }

    public ConflictException(String msg) {
        super(msg);
    }
}
