package com.cnpm.fashion_shop;

import javax.persistence.Embeddable;
import javax.persistence.Entity;
import javax.persistence.Table;

@Embeddable
@Table(name="gender")
public class Gender {
    private int id;
    private String name;
}
