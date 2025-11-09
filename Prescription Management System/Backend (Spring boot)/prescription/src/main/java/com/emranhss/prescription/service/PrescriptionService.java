package com.emranhss.prescription.service;

import com.emranhss.prescription.entity.Medicine;
import com.emranhss.prescription.entity.Prescription;
import com.emranhss.prescription.repository.PrescriptionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class PrescriptionService {

    @Autowired
    private PrescriptionRepository repo;

    //Current month
    public List<Prescription> getAllByMonth(String from, String to) {
        LocalDate start = (from == null) ? LocalDate.now().withDayOfMonth(1) : LocalDate.parse(from);
        LocalDate end   = (to == null) ? LocalDate.now() : LocalDate.parse(to);
        return repo.findByPrescriptionDateBetween(start, end);
    }

    //All prescription
    public List<Prescription> getAll(String from, String to) {
        if (from == null && to == null) {
            return repo.findAll(); //Show All prescription
        }

        LocalDate start = (from == null) ? LocalDate.of(1970, 1, 1) : LocalDate.parse(from);
        LocalDate end   = (to == null) ? LocalDate.now() : LocalDate.parse(to);

        return repo.findByPrescriptionDateBetween(start, end);
    }


    public Optional<Prescription> getById(Long id) {
        return repo.findById(id);
    }

    public Prescription create(Prescription p) {
        if(p.getMedicines() != null){
            for(Medicine m : p.getMedicines()){
                m.setPrescription(p);
            }
        }
        return repo.save(p);
    }

    public Optional<Prescription> update(Long id, Prescription p) {
        return repo.findById(id).map(existing -> {
            existing.setPrescriptionDate(p.getPrescriptionDate());
            existing.setPatientName(p.getPatientName());
            existing.setPatientAge(p.getPatientAge());
            existing.setPatientGender(p.getPatientGender());
            existing.setDiagnosis(p.getDiagnosis());
            existing.setNextVisitDate(p.getNextVisitDate());

            existing.getMedicines().clear();
            if(p.getMedicines() != null){
                for(Medicine m : p.getMedicines()){
                    m.setPrescription(existing);
                    existing.getMedicines().add(m);
                }
            }
            return repo.save(existing);
        });
    }

    public boolean delete(Long id) {
        if(!repo.existsById(id)) return false;
        repo.deleteById(id);
        return true;
    }

}
