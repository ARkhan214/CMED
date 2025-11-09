package com.emranhss.prescription.restcontroller;

import com.emranhss.prescription.entity.Medicine;
import com.emranhss.prescription.service.MedicinService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/medicines")
public class MedicineRestController {


    @Autowired
    private MedicinService service;

    // Create
    @PostMapping("")
    public Medicine create(@RequestBody Medicine m) {
        return service.createMedicine(m);
    }

    // Read all
    @GetMapping("")
    public List<Medicine> getAll() {
        return service.getAllMedicines();
    }

    // Read by ID
    @GetMapping("/{id}")
    public ResponseEntity<Medicine> getById(@PathVariable Long id) {
        return service.getMedicineById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Get Prescription By Medicine Id
    @GetMapping("/{id}/prescription")
    public ResponseEntity<?> getPrescriptionByMedicine(@PathVariable("id") Long medicineId) {
        var prescription = service.getPrescriptionByMedicineId(medicineId);
        if (prescription == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(prescription);
    }

    // Update
    @PutMapping("/{id}")
    public ResponseEntity<Medicine> update(@PathVariable Long id, @RequestBody Medicine m) {
        return service.updateMedicine(id, m)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Delete
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        boolean deleted = service.deleteMedicine(id);
        return deleted ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
    }

}
