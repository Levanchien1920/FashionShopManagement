package com.cnpm.fashion_shop.core.review.repository;

import com.cnpm.fashion_shop.api.review.dto.ReviewResponseDto;
import com.cnpm.fashion_shop.entity.Review;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {
    @Query(value = "SELECT r.id,r.content,r.number_of_star AS Number_Of_Star,p.name AS Name_Product,c.fullname AS Name_User,c.email AS Email FROM review r inner join product p on r.id_product=p.id " +
            "inner join customer c on r.id_user=c.id WHERE LOWER(r.content) LIKE %:keyword% AND r.is_deleted = FALSE", nativeQuery = true)
    Page<ReviewResponseDto> findAll(Pageable pageable, @Param("keyword") String keyword);

    Review findByContent(String content);

    @Query(value = "SELECT * FROM review r WHERE r.id = :id AND r.is_deleted = FALSE", nativeQuery = true)
    Optional<Review> findById(@Param("id") Integer id);

    @Query(value = "SELECT r.id,r.content,r.number_of_star AS Number_Of_Star,p.name AS Name_Product,c.fullname AS Name_User,c.email AS Email FROM review r inner join product p on r.id_product=p.id " +
            "inner join customer c on r.id_user=c.id WHERE r.id_product=:id and LOWER(r.content) LIKE %:keyword% AND r.is_deleted = FALSE", nativeQuery = true)
    Page<ReviewResponseDto> findAllReviewByProduct(Pageable pageable, @Param("keyword") String keyword,@Param("id") Integer id);


    @Query(value = "SELECT r.id, r.content as content,  AVG(r.number_of_star) as number_of_star, r.id_product as id_product, r.id_user as id_user, r.created_at as created_at, r.is_deleted as is_deleted, r.updated_at  FROM review r inner join product p on r.id_product=p.id WHERE p.id = :id AND p.is_deleted = FALSE group by p.id", nativeQuery = true)
    Review findById_Product(@Param("id") Integer id);
}
