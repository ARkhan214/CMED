package com.emranhss.prescription.repository;

import com.emranhss.prescription.entity.Medicine;
import com.emranhss.prescription.entity.Prescription;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MedicineRepository extends JpaRepository<Medicine, Long> {

//    Find Prescription ByMedicine Id(Way two)
    @Query("SELECT m.prescription FROM Medicine m WHERE m.id = :medicineId")
    Prescription findPrescriptionByMedicineId(@Param("medicineId") Long medicineId);
}
