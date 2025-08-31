package com.weather.weatherapi.controller;

import com.fasterxml.jackson.databind.JsonNode;
import com.weather.weatherapi.security.RateLimited;
import com.weather.weatherapi.service.WeatherClientService;
import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("public")
@RequiredArgsConstructor
@Validated
public class PublicController {
    private final WeatherClientService weatherClientService;


    @GetMapping("/weather/location")
    @RateLimited(requests = 5, durationSeconds = 60)
    public ResponseEntity<?> getLocation(
            @RequestParam
            @NotNull(message = "Latitude is required")
            @DecimalMin(value = "-90.0", message = "Latitude cannot be less than -90")
            @DecimalMax(value = "90.0", message = "Latitude cannot be more than 90") Double lat,
            @RequestParam
            @NotNull(message = "Latitude is required")
            @DecimalMin(value = "-180.0", message = "Longitude cannot be less than -180")
            @DecimalMax(value = "180.0", message = "Longitude cannot be more than 180")
            Double lon
    ) {
        JsonNode jsonNode = weatherClientService.fetchWeatherByLatAndLon(lat, lon);
        return ResponseEntity.ok(jsonNode);
    }
}
