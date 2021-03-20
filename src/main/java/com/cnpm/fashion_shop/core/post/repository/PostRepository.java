package com.cnpm.fashion_shop.core.post.repository;

import com.cnpm.fashion_shop.api.post.dto.PostDto;
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
//    @Query(value = "SELECT * FROM post b WHERE LOWER(b.content) LIKE %:keyword% AND b.is_deleted = FALSE", nativeQuery = true)
//    Page<PostResponseDto> findAllByName(Pageable pageable, @Param("keyword") String keyword);

    @Query(value = "SELECT p.content,p.id,i.link,i.name FROM post p inner join image i on p.id_image=i.id ", nativeQuery = true)
    Page<PostResponseDto> findAll(Pageable pageable, @Param("keyword") String keyword);

//    @Query(value = "SELECT * FROM post inner join image on post.id=image.id WHERE post.id = :id AND b.is_deleted = FALSE", nativeQuery = true)
//    Post findByContent(@Param("content") String content);

    @Query(value = "SELECT new PostDto(p.id,p.content,i.id,i.name,i.link) FROM post p inner join image i on p.id_image=i.id  where p.id = :id AND p.is_deleted = FALSE", nativeQuery = true)
    Optional<PostDto> findById(@Param("id") Integer id);

}
