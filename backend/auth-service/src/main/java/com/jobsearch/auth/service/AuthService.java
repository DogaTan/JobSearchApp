package com.jobsearch.auth.service;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.jobsearch.auth.dto.AuthResponse;
import com.jobsearch.auth.dto.CompanyRegisterRequest;
import com.jobsearch.auth.dto.LoginRequest;
import com.jobsearch.auth.dto.RegisterRequest;
import com.jobsearch.auth.entity.Role;
import com.jobsearch.auth.entity.User;
import com.jobsearch.auth.repository.UserRepository;
import com.jobsearch.auth.security.JwtUtil;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final JwtUtil jwtUtil;
    private final PasswordEncoder passwordEncoder;

    public AuthResponse register(RegisterRequest request) {
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new RuntimeException("Bu e-posta adresi zaten kayıtlı.");
        }

        Role role = Role.ROLE_USER;

        User user = new User();
        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(role);

        userRepository.save(user);

        String token = jwtUtil.generateToken(user.getEmail(), role.name());
        return new AuthResponse(token, role.name(), user.getId()); // Added user ID to the response
    }

    public AuthResponse companyRegister(CompanyRegisterRequest request) {
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new RuntimeException("Bu e-posta adresi zaten kayıtlı.");
        }

        Role role = Role.ROLE_COMPANY;

        User user = new User();
        user.setCompanyName(request.getCompanyName());
        user.setPhoneNumber(request.getPhoneNumber());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(role);

        userRepository.save(user);

        String token = jwtUtil.generateToken(user.getEmail(), role.name());
        return new AuthResponse(token, role.name(), user.getId()); // Added user ID to the response
    }

    public AuthResponse login(LoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Kullanıcı bulunamadı."));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Geçersiz e-posta veya şifre.");
        }

        String token = jwtUtil.generateToken(user.getEmail(), user.getRole().name());
        return new AuthResponse(token, user.getRole().name(), user.getId()); // Added user ID to the response
    }
}
