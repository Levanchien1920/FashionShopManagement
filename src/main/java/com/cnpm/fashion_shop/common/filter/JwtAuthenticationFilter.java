package com.cnpm.fashion_shop.common.filter;

import com.cnpm.fashion_shop.api.employee.dto.EmployeeDetail;
import com.cnpm.fashion_shop.core.employee.service.EmployeeDetailService;
import com.cnpm.fashion_shop.shared.JwtProvider;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.web.filter.OncePerRequestFilter;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

import static com.cnpm.fashion_shop.common.constant.SecurityConstants.HEADER_STRING;
import static com.cnpm.fashion_shop.common.constant.SecurityConstants.TOKEN_PREFIX;

@Slf4j
public class JwtAuthenticationFilter extends OncePerRequestFilter {
    @Autowired
    private JwtProvider jwtProvider;

    @Autowired
    private EmployeeDetailService employeeDetailService;

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain chain
    ) throws IOException, ServletException {
        String token = getJwtTokenFromReq(request);

        if (token != null && jwtProvider.validateToken(token) != null) {
            Long userId = jwtProvider.getUserIdFromJWT(token);

            EmployeeDetail detail = (EmployeeDetail) employeeDetailService.loadUserById(userId);

            if (detail != null) {
                UsernamePasswordAuthenticationToken authentication =
                        new UsernamePasswordAuthenticationToken(detail, null, detail.getAuthorities());

                authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

                SecurityContextHolder.getContext().setAuthentication(authentication);
            }
        }

        chain.doFilter(request, response);
    }

    String getJwtTokenFromReq(HttpServletRequest req) {
        String bearerToken = req.getHeader(HEADER_STRING);
        if (bearerToken != null && bearerToken.startsWith(TOKEN_PREFIX)) {
            return bearerToken.substring(7);
        }
        return null;
    }
}
