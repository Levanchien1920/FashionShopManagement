package com.cnpm.fashion_shop.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity(name = "product")
public class Product extends BaseEntity{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Getter
    @Column(name = "id_product")
    private int id_product;

    @ManyToOne()
    @JoinColumn(name = "id_brand", insertable = false, updatable = false)
    private Brand brand;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_cate", insertable = false, updatable = false)
    private Category category;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_gender", insertable = false, updatable = false)
    private Gender gender;

    @Column(name = "id_brand")
    private int idBrand;

    @Column(name = "id_cate")
    private int idCategory;

    @Column(name = "id_gender")
    private int idGender;

    @Column(name = "id_review")
    private int idReview;

    @ManyToOne()
    @JoinColumn(name = "id_review", insertable = false, updatable = false)
    private Review review;

    @Column(name = "id_image")
    private int idImage;

    @Column(name = "name")
    private String name;

    @Column(name = "price")
    private Long price;

    @Column(name = "des")
    private String description;


}
