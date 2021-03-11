package com.cnpm.fashion_shop.common.filter;

import com.cnpm.fashion_shop.shared.JwtProvider;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;

import static com.cnpm.fashion_shop.common.constant.SecurityConstants.HEADER_STRING;
import static com.cnpm.fashion_shop.common.constant.SecurityConstants.TOKEN_PREFIX;


public class JwtAuthorizationFilter extends BasicAuthenticationFilter {
    private final JwtProvider jwtProvider;

    public JwtAuthorizationFilter(
            AuthenticationManager authenticationManager,
            JwtProvider jwtProvider
    ) {
        super(authenticationManager);
        this.jwtProvider = jwtProvider;
    }

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain chain
    ) throws IOException, ServletException {
        String header = request.getHeader(HEADER_STRING);

        if (header == null || !header.startsWith(TOKEN_PREFIX)) {
            chain.doFilter(request, response);
            return;
        }

        UsernamePasswordAuthenticationToken authenticationContext = getAuthentication(header);

        SecurityContextHolder.getContext().setAuthentication(
                authenticationContext
        );

        chain.doFilter(request, response);
    }

    private UsernamePasswordAuthenticationToken getAuthentication(String token) {
        if (token.startsWith(TOKEN_PREFIX)) {
            token = token.replace(TOKEN_PREFIX, "");
        }

        String userId = jwtProvider.validateToken(token);

        if (userId != null) {
            return new UsernamePasswordAuthenticationToken(
                    userId,
                    null,
                    new ArrayList<>()
            );
        }

        return null;
    }
}
