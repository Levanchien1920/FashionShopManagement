package com.cnpm.fashion_shop.common.exception;

import com.cnpm.fashion_shop.common.constant.ErrorMessageConstants;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.NOT_FOUND)
public class NotfoundException extends RuntimeException {
    public NotfoundException() {
        super(ErrorMessageConstants.NOTFOUND_MESSAGE);
    }

    public NotfoundException(String msg) {
        super(msg);
    }
}
