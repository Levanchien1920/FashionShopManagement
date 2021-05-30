package com.cnpm.fashion_shop.core.post.repository;

import com.cnpm.fashion_shop.api.invoice.dto.InvoiceEmployeeResponseDto;
import com.cnpm.fashion_shop.api.post.dto.PostClientDto;
import com.cnpm.fashion_shop.api.post.dto.PostResponseDto;
import com.cnpm.fashion_shop.entity.Post;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {

    @Query(value = "SELECT post.title, post.content, post.id, image.link as Link, image.name as Name FROM (post inner join image on post.id_image = image.id) WHERE post.is_deleted = false ", nativeQuery = true)
    Page<PostResponseDto> findAll(Pageable pageable, @Param("keyword") String keyword);


    Post findByTitle(String title);

    @Query(value = "SELECT * FROM post p where p.id = :id AND p.is_deleted = FALSE", nativeQuery = true)
    Optional<Post> findById(@Param("id") Integer id);


    @Query(value = "SELECT p.id as id, p.title as title, p.content as content, i.link as linkImage , p.id_image as idImage FROM (post p inner join image i on p.id_image = i.id) where p.id =:id AND p.is_deleted = FALSE", nativeQuery = true)
    List<PostClientDto> getOneByIdPost(@Param("id") Integer id);
}
