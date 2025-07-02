package com.jobsearch.api_gateway.config;

import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class GatewayConfig {

    @Bean
    public RouteLocator gatewayRoutes(RouteLocatorBuilder builder) {
        return builder.routes()
                .route("auth-service", r -> r.path("/api/v1/auth/**")
                        .uri("http://localhost:8081"))
                .route("admin-service", r -> r.path("/api/v1/admin/jobs/**")
                        .uri("http://localhost:8082"))
                .route("jobposting-service", r -> r.path("/api/v1/jobs/**")
                        .uri("http://localhost:8083"))
                .route("application-service", r -> r.path("/api/v1/applications/**")
                        .uri("http://localhost:8084"))
                .route("notification-service", r -> r.path("/api/v1/notifications/**")
                        .uri("http://localhost:8085"))
                .route("search-service", r -> r.path("/api/v1/search/**")
                        .uri("http://localhost:8086"))
                .route("ai-agent-service", r -> r.path("/api/v1/ai/**")
                        .uri("http://localhost:8087"))
                .build();
    }
}
