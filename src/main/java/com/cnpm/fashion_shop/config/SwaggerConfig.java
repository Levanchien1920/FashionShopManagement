package com.cnpm.fashion_shop.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.service.ApiKey;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

import java.util.Collections;

import static com.cnpm.fashion_shop.common.constant.SecurityConstants.HEADER_STRING;
import static com.cnpm.fashion_shop.common.constant.SecurityConstants.SECURITY_JWT_NAME;

@Configuration
@EnableSwagger2
public class SwaggerConfig {
    @Bean
    public Docket api() {
        return new Docket(DocumentationType.SWAGGER_2)
                .select()
                .apis(RequestHandlerSelectors.any())
                .paths(PathSelectors.any())
                .build().apiInfo(apiEndPointsInfo())
                .securitySchemes(Collections.singletonList(apiKey()));
    }

    private ApiInfo apiEndPointsInfo() {
        return new ApiInfoBuilder().title("Spring Boot REST API")
                .description("Admin Inventory Management REST API")
                .license("Apache 2.0")
                .version("1.0.0")
                .build();
    }

    private ApiKey apiKey() {
        return new ApiKey(SECURITY_JWT_NAME, HEADER_STRING, "header");
    }
}
