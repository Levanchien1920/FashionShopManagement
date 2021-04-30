package com.cnpm.fashion_shop.core.employee.service;

import com.cnpm.fashion_shop.api.user.dto.UserDetail;
import com.cnpm.fashion_shop.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class UserDetailService implements UserDetailsService {
    @Autowired
    private UserService userService;

    public UserDetails loadUserById(Integer id) throws UsernameNotFoundException {
        Optional<User> user = userService.findByIdOptional(id);

        if (user.isEmpty()) {
            throw new UsernameNotFoundException("Username is not found");
        }

        return new UserDetail(
                user.get().getUsername(),
                user.get().getPassword(),
                userService.mappingRolesToName(user.get().getRole())
        );
    }

    @Override
    public UserDetails loadUserByUsername(String s) throws UsernameNotFoundException {
        return null;
    }
}
