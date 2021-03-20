package com.cnpm.fashion_shop.api.post.dto;

import com.cnpm.fashion_shop.entity.BaseEntity;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;


@NoArgsConstructor
public class PostDto extends BaseEntity {
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

    @Getter
    @Setter
    private String Name;

    @Getter
    @Setter
    private String link;


    public PostDto(Integer id, @NotNull String content, Integer id_image, String name, String link) {
        this.id = id;
        this.content = content;
        this.id_image = id_image;
        this.Name = name;
        this.link = link;
    }
}
