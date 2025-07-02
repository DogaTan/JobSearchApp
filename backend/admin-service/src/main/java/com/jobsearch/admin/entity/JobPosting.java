package com.jobsearch.admin.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "job_postings")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class JobPosting {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long userId;  // Company ID or Admin ID
    private String title;
    private String companyName;
    private String city;
    private String town;
    private String workingType;
    private String level;
    private String department;

    @Column(length = 2000)
    private String description;

    @Column(length = 2000)
    private String requirements;

    private String education;
    private String experience;
    private String militaryStatus;
}
