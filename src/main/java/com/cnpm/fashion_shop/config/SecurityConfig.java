package com.cnpm.fashion_shop.config;

import com.cnpm.fashion_shop.common.enums.RoleEnum;
import com.cnpm.fashion_shop.common.filter.JwtAuthenticationFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.BeanIds;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;
import java.util.List;

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {
    private static final List<String> LIST_METHOD_ALLOW = Arrays.asList("GET", "POST", "PUT", "PATCH", "DELETE");


    @Bean
    public BCryptPasswordEncoder bCryptPasswordEncoder() {
        return new BCryptPasswordEncoder();
    }


    @Bean
    public JwtAuthenticationFilter jwtAuthenticationFilter() {
        return new JwtAuthenticationFilter();
    }

    @Bean(BeanIds.AUTHENTICATION_MANAGER)
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManager();
    }

    public SecurityConfig() {
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .cors()
                .and()
                .authorizeRequests()
                .antMatchers("/api/v1/admin/user/**", "/api/v1/saleFigureByMonth/**", "/api/v1/saleFigureEmployee/**","/api/v1/invoice/**","/api/v1/role/**")
                .hasAnyAuthority(RoleEnum.admin.name())
                .antMatchers("/api/v1/user/**","/api/v1/brand/**", "/api/v1/category/**", "/api/v1/product/**", "/api/v1/post/**", "/api/v1/review/**", "/api/v1/invoice/**","/api/v1/customer/**","/api/v1/client/image/**")
                .hasAnyAuthority(RoleEnum.employee.name())
                .antMatchers( "/api/v1/customer/**")
                .hasAnyAuthority(RoleEnum.customer.name())
                .anyRequest().permitAll()
                .and()
                .csrf().disable()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .addFilterBefore(jwtAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class);
    }

    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        final UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();

        CorsConfiguration corsConfiguration = new CorsConfiguration().applyPermitDefaultValues();
        corsConfiguration.setAllowedMethods(LIST_METHOD_ALLOW);
        source.registerCorsConfiguration("/**", corsConfiguration);

        return source;
    }
}
