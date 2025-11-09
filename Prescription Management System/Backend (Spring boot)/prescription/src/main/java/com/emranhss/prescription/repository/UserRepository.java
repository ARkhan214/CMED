package com.emranhss.prescription.repository;

import com.emranhss.prescription.entity.AppUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<AppUser, Long> {
//    // User login by user name
//    AppUser findByUsername(String username);

    // User login By email
    AppUser findByEmail(String email);
}
