package com.emranhss.prescription.restcontroller;

import com.emranhss.prescription.entity.Medicine;
import com.emranhss.prescription.entity.Prescription;
import com.emranhss.prescription.repository.PrescriptionRepository;
import com.emranhss.prescription.service.PrescriptionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/v1/prescription")
public class PrescriptionRestController {

    @Autowired
    private PrescriptionService service;

    @GetMapping("/allbymonth")
    public List<Prescription> getAllByMonth(
            @RequestParam(required=false) String from,
            @RequestParam(required=false) String to
    ){
        return service.getAllByMonth(from, to);
    }


    @GetMapping("")
    public List<Prescription> getAll(
            @RequestParam(required=false) String from,
            @RequestParam(required=false) String to
    ){
        return service.getAll(from, to);
    }


    @GetMapping("/{id}")
    public ResponseEntity<Prescription> getById(@PathVariable Long id){
        return service.getById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("")
    public Prescription create(@RequestBody Prescription p){
        return service.create(p);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Prescription> update(@PathVariable Long id, @RequestBody Prescription p){
        return service.update(id, p)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id){
        if(!service.delete(id)) return ResponseEntity.notFound().build();
        return ResponseEntity.noContent().build();
    }

}
