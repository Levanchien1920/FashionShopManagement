package com.cnpm.fashion_shop.entity;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.Entity;
import javax.persistence.MappedSuperclass;
import javax.persistence.Column;
import java.io.Serializable;
import java.time.Instant;

@MappedSuperclass
//@Entity(name = "base")
public abstract class BaseEntity implements Serializable {

    @Getter
    @Setter
    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private Instant createdAt;

    @Getter
    @Setter
    @UpdateTimestamp
    @Column(name = "updated_at")
    private Instant updatedAt;

    @Getter
    @Setter
    @Column(name = "is_deleted")
    private Boolean isDeleted = false;

}
