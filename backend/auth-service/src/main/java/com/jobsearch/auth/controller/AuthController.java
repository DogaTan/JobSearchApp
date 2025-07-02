package com.jobsearch.auth.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jobsearch.auth.dto.AuthResponse;
import com.jobsearch.auth.dto.CompanyRegisterRequest;
import com.jobsearch.auth.dto.LoginRequest;
import com.jobsearch.auth.dto.RegisterRequest;
import com.jobsearch.auth.service.AuthService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    // Aday Kayıt
    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@RequestBody RegisterRequest request) {
        AuthResponse response = authService.register(request);
        return ResponseEntity.ok(response);
    }

    // Şirket Kayıt
    @PostMapping("/company-register")
    public ResponseEntity<AuthResponse> companyRegister(@RequestBody CompanyRegisterRequest request) {
        AuthResponse response = authService.companyRegister(request);
        return ResponseEntity.ok(response);
    }

    // Ortak Giriş
    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest request) {
        AuthResponse response = authService.login(request);
        return ResponseEntity.ok(response);
    }
}
