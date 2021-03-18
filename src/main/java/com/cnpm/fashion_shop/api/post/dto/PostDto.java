package com.cnpm.fashion_shop.api.post.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@NoArgsConstructor
public class PostDto {
    @Getter
    @Setter
    private Integer id;

    @Getter
    @Setter
    @NotNull
    private String content;

    @Getter
    @Setter
    private Integer id_image;


    public PostDto(Integer id,  @NotNull String content, Integer id_image) {
        this.id = id;
        this.content = content;
        this.id_image=id_image;
    }
}
