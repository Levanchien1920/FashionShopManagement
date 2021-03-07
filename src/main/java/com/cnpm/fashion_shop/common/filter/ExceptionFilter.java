package com.cnpm.fashion_shop.common.filter;

import com.cnpm.fashion_shop.common.response.BadRequestResponse;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.util.ArrayList;
import java.util.List;

import static com.cnpm.fashion_shop.common.constant.ErrorMessageConstants.BAD_PAYLOAD_MESSAGE;

@ControllerAdvice
public class ExceptionFilter extends ResponseEntityExceptionHandler {
    public ExceptionFilter() {
        super();
    }

    @Override
    protected ResponseEntity<Object> handleMethodArgumentNotValid(
            MethodArgumentNotValidException ex,
            HttpHeaders headers,
            HttpStatus status,
            WebRequest request) {
        List<String> errors = new ArrayList<>();
        for (FieldError error : ex.getBindingResult().getFieldErrors()) {
            errors.add(error.getField() + ": " + error.getDefaultMessage());
        }
        for (ObjectError error : ex.getBindingResult().getGlobalErrors()) {
            errors.add(error.getObjectName() + ": " + error.getDefaultMessage());
        }

        BadRequestResponse apiError = new BadRequestResponse(HttpStatus.BAD_REQUEST, BAD_PAYLOAD_MESSAGE, errors);

        return handleExceptionInternal(
                ex, apiError, headers, apiError.getStatus(), request);
    }
}
