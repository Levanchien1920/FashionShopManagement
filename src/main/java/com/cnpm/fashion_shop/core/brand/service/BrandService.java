package com.cnpm.fashion_shop.core.brand.service;

import com.cnpm.fashion_shop.api.brand.dto.BrandDto;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class BrandService {
    void insert(BrandDto brand) {

    }

    void edit(BrandDto brand) {

    }

    void delete(long id) {

    }

    BrandDto get(long id) {
        return null;
    }

    BrandDto get(String name) {
        return null;
    }

    public ArrayList<BrandDto> getListUser() {
//        ArrayList<BrandDto> result = new ArrayList<BrandDto>();
//
//        // Convert users -> result
//        for (BrandDto user : userrep.findAll()) {
//            result.add(Usermapper.toUserDto(user));
//        }
//
//        return result;
        return null;
    }

    BrandDto getUserById(long id){
        return null;
    }

    ArrayList<BrandDto> getByName(String searchUser) {
        return null;
    }
}
