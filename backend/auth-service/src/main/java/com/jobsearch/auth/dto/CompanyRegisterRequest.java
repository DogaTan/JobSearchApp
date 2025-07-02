package com.jobsearch.auth.dto;

import lombok.Data;

@Data
public class CompanyRegisterRequest {
    private String companyName;
    private String email;
    private String password;
    private String phoneNumber;
}
