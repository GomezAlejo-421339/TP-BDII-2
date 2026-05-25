package com.fakegraph.config;

import com.fakegraph.model.MetricaConsulta;
import com.fakegraph.service.EstadisticasService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import java.time.LocalDateTime;
import java.util.UUID;

@Component
public class MetricsInterceptor implements HandlerInterceptor {

    private static final String START_TIME_ATTR = "startTime";

    private final EstadisticasService estadisticasService;

    public MetricsInterceptor(EstadisticasService estadisticasService) {
        this.estadisticasService = estadisticasService;
    }

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) {
        request.setAttribute(START_TIME_ATTR, System.currentTimeMillis());
        return true;
    }

    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response,
                                Object handler, Exception ex) {
        Long startTime = (Long) request.getAttribute(START_TIME_ATTR);
        if (startTime == null) return;

        long duracion = System.currentTimeMillis() - startTime;
        String path = request.getRequestURI();

        if (!path.startsWith("/api/v1/estadisticas")) {
            String entidad = extraerEntidad(path);
            MetricaConsulta metrica = new MetricaConsulta(
                    UUID.randomUUID().toString(),
                    path,
                    request.getMethod(),
                    LocalDateTime.now(),
                    duracion,
                    response.getStatus(),
                    entidad
            );
            estadisticasService.registrar(metrica);
        }
    }

    private String extraerEntidad(String path) {
        String[] partes = path.split("/");
        if (partes.length >= 4) {
            return partes[3];
        }
        return "desconocida";
    }
}
