package com.cnpm.fashion_shop.common.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.http.HttpStatus;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class BadRequestResponse {
    private HttpStatus status;
    private String message;
    private List<String> errors;
}
