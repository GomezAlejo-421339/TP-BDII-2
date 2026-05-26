package com.fakegraph.controller;

import com.fakegraph.DTO.requests.ClaimRequestDTO;
import com.fakegraph.model.Claim;
import com.fakegraph.service.ClaimService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/claims")
public class ClaimController {

    private final ClaimService claimService;

    public ClaimController(ClaimService claimService) {
        this.claimService = claimService;
    }

    @GetMapping
    public ResponseEntity<List<Claim>> listarClaims() {
        return ResponseEntity.ok(claimService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Claim> obtenerClaim(@PathVariable String id) {
        return claimService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Claim> crearClaim(@RequestBody ClaimRequestDTO claim) {
        return ResponseEntity.ok(claimService.save(claim));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Claim> actualizarClaim(@PathVariable String id, @RequestBody ClaimRequestDTO claim) {
        return ResponseEntity.ok(claimService.update(id, claim));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarClaim(@PathVariable String id) {
        claimService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
