package com.fakegraph.service;

import com.fakegraph.DTO.requests.ClaimRequestDTO;
import com.fakegraph.model.Claim;
import com.fakegraph.repository.ClaimRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class ClaimService {

    private final ClaimRepository claimRepository;

    public ClaimService(ClaimRepository claimRepository) {
        this.claimRepository = claimRepository;
    }

    @Transactional(readOnly = true)
    public List<Claim> findAll() {
        return claimRepository.findAll();
    }

    @Transactional(readOnly = true)
    public Optional<Claim> findById(String id) {
        return claimRepository.findById(id);
    }

    @Transactional
    public Claim save(ClaimRequestDTO claimDto) {
        Claim claim = new Claim();
        claim.setId(UUID.randomUUID().toString());
        claim.setHash(claimDto.getHash());
        claim.setTexto(claimDto.getTexto());
        return claimRepository.save(claim);
    }

    @Transactional
    public Claim update(String id, ClaimRequestDTO claimDto) {
        Claim existente = claimRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Claim no encontrado: " + id));
        existente.setTexto(claimDto.getTexto());
        existente.setHash(claimDto.getHash());
        return claimRepository.save(existente);
    }

    @Transactional
    public void deleteById(String id) {
        claimRepository.deleteById(id);
    }
}
