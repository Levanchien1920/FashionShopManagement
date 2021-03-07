package com.cnpm.fashion_shop.common.exception;

import com.cnpm.fashion_shop.common.constant.ErrorMessageConstants;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.BAD_REQUEST)
public class BadRequestException extends RuntimeException {
    public BadRequestException() {
        super(ErrorMessageConstants.BAD_PAYLOAD_MESSAGE);
    }

    public BadRequestException(String msg) {
        super(msg);
    }
}
