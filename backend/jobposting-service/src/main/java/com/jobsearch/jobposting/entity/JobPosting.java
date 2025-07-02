package com.jobsearch.jobposting.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class JobPosting {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

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
