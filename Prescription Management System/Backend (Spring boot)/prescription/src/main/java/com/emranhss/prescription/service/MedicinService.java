package com.emranhss.prescription.service;

import com.emranhss.prescription.entity.Medicine;
import com.emranhss.prescription.entity.Prescription;
import com.emranhss.prescription.repository.MedicineRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MedicinService {

    @Autowired
    private MedicineRepository repo;



    // Create
    public Medicine createMedicine(Medicine m) {
        return repo.save(m);
    }

    // Read all
    public List<Medicine> getAllMedicines() {
        return repo.findAll();
    }

    // Read by ID
    public Optional<Medicine> getMedicineById(Long id) {
        return repo.findById(id);
    }

    //Get Prescription By Medicine Id
    public Prescription getPrescriptionByMedicineId(Long medicineId) {
        return repo.findPrescriptionByMedicineId(medicineId);
    }

    // Update
    public Optional<Medicine> updateMedicine(Long id, Medicine m) {
        return repo.findById(id).map(existing -> {
            existing.setMedicineName(m.getMedicineName());
            existing.setDosage(m.getDosage());
            existing.setFrequency(m.getFrequency());
            existing.setDuration(m.getDuration());
            existing.setPrescription(m.getPrescription());
            repo.save(existing);
            return existing;
        });
    }

    // Delete
    public boolean deleteMedicine(Long id) {
        if (!repo.existsById(id)) return false;
        repo.deleteById(id);
        return true;
    }

}
