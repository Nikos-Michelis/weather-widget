package com.weather.weatherapi.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.weather.weatherapi.settings.exceptions.WeatherFetchException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.http.HttpStatusCode;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

@Service
@Slf4j
public class WeatherClientService {
    private final WebClient webClient;
    @Value("${application.api.weather.key}")
    private String apiKey;

    public WeatherClientService(
            WebClient.Builder webClientBuilder,
            @Value("${application.api.weather.url}") String url,
            @Value("${application.api.weather.version}") String version) {
        this.webClient = webClientBuilder
                .baseUrl(url + version)
                .build();
    }

    @Cacheable(value = "WEATHER_CACHE", key = "'cordinates-' + #lat + '-' + #lon")
    public JsonNode fetchWeatherByLatAndLon(Double lat, Double lon) {
        return webClient.get()
                .uri(uriBuilder -> uriBuilder
                        .path("/onecall")
                        .queryParam("lat", lat)
                        .queryParam("lon", lon)
                        .queryParam("exclude", "minutely,hourly,current,alerts")
                        .queryParam("units", "metric")
                        .queryParam("appid", apiKey)
                        .build())
                .retrieve()
                .onStatus(
                        this::isErrorStatus,
                        clientResponse -> clientResponse.bodyToMono(String.class)
                                .map(body -> new WeatherFetchException("Error fetching weather data: " + body,  clientResponse.statusCode()))
                )
                .bodyToMono(JsonNode.class)
                .block();
    }
    private boolean isErrorStatus(HttpStatusCode response) {
        return response.is4xxClientError() || response.is5xxServerError();
    }
}
