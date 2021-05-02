package com.cnpm.fashion_shop.core.post.repository;

import com.cnpm.fashion_shop.api.post.dto.PostResponseDto;
import com.cnpm.fashion_shop.entity.Post;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {

    @Query(value = "SELECT post.content, post.id, image.link as image_link, image.name as name_image FROM (post inner join image on post.id_image = image.id) WHERE post.id_deleted = false ", nativeQuery = true)
    Page<PostResponseDto> findAll(Pageable pageable, @Param("keyword") String keyword);


    Post findByContent(String content);

    @Query(value = "SELECT * FROM post p where p.id = :id AND p.is_deleted = FALSE", nativeQuery = true)
    Optional<Post> findById(@Param("id") Integer id);

}
