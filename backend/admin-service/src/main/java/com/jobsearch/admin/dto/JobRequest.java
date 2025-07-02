package com.jobsearch.admin.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class JobRequest {

    private Long userId; // Company ID or Admin ID
    private String title;
    private String companyName;
    private String city;
    private String town;
    private String workingType;
    private String level;
    private String department;
    private String description;
    private String requirements;
    private String education;
    private String experience;
    private String militaryStatus;
}
