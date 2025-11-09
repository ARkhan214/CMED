package com.emranhss.prescription.service;

import com.emranhss.prescription.entity.AppUser;
import com.emranhss.prescription.entity.Medicine;
import com.emranhss.prescription.entity.Status;
import com.emranhss.prescription.repository.UserRepository;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AuthService {
    @Autowired
    private UserRepository repo;

    @Autowired
    private BCryptPasswordEncoder encoder;

    // User registration
    public String registerUser(AppUser user) {
        if (repo.findByEmail(user.getEmail()) != null) {
            return "Username already exists";
        }
        user.setPassword(encoder.encode(user.getPassword()));
        repo.save(user);
        return "User registered successfully";
    }

    // Get all users
    public List<AppUser> getAllUsers() {
        return repo.findAll();
    }

    //Gt by id
    public Optional<AppUser> getUserById(Long id) {
        return repo.findById(id);
    }


    // Update user
//    public Optional<AppUser> updateUser(Long id, AppUser updatedUser) {
//        return repo.findById(id).map(existingUser -> {
//            existingUser.setUsername(updatedUser.getUsername());
//            existingUser.setEmail(updatedUser.getEmail());
//            existingUser.setPhone(updatedUser.getPhone());
//            existingUser.setGender(updatedUser.getGender());
//            existingUser.setStatus(updatedUser.getStatus());
//            existingUser.setStudy(updatedUser.getStudy());
//            existingUser.setChamber(updatedUser.getChamber());
//
//
//            //If update password then encode password
//            if (updatedUser.getPassword() != null && !updatedUser.getPassword().isEmpty()) {
//                existingUser.setPassword(encoder.encode(updatedUser.getPassword()));
//            }
//
//            //Update role
//            if (updatedUser.getRole() != null) {
//                existingUser.setRole(updatedUser.getRole());
//            }
//
//            return repo.save(existingUser);
//        });
//    }


    public Optional<AppUser> updateUser(Long id, AppUser updatedUser) {
        return repo.findById(id).map(existingUser -> {
            existingUser.setUsername(updatedUser.getUsername());
            existingUser.setEmail(updatedUser.getEmail());
            existingUser.setPhone(updatedUser.getPhone());
            existingUser.setGender(updatedUser.getGender());
            existingUser.setStatus(updatedUser.getStatus());
            existingUser.setStudy(updatedUser.getStudy());
            existingUser.setChamber(updatedUser.getChamber());

            // Handle password: change only if provided
            if (updatedUser.getPassword() != null && !updatedUser.getPassword().trim().isEmpty()) {
                existingUser.setPassword(encoder.encode(updatedUser.getPassword()));
            } else {
                // keep the old password
                existingUser.setPassword(existingUser.getPassword());
            }

            // Handle role
            if (updatedUser.getRole() != null) {
                existingUser.setRole(updatedUser.getRole());
            }

            return repo.save(existingUser);
        });
    }





    // Delete User (with response)
    public String deleteUser(Long id) {
        return repo.findById(id)
                .map(user -> {
                    repo.delete(user);
                    return "User with ID " + id + " deleted successfully.";
                })
                .orElse("User with ID " + id + " not found.");
    }



    // User login by user name
//    public AppUser loginUser(String username, String password) {
//        AppUser user = repo.findByUsername(username);
//        if (user == null) {
//            return null;
//        }
//        if (encoder.matches(password, user.getPassword())) {
//            return user;
//        } else {
//            return null;
//        }
//    }

    // User login By email
    public AppUser loginUserByEmail(String email, String password) {
        AppUser user = repo.findByEmail(email);
        if (user == null) {
            return null;
        }
        if (!user.getStatus().equals(Status.ACTIVE)) {
            // User found, but not active
            throw new RuntimeException("Your account is not active. Please contact admin.");
        }
        if (encoder.matches(password, user.getPassword())) {
            return user;
        }
        return null;
    }


    // Logout method
    public String logout(HttpSession session) {
        try {
            session.invalidate(); // session invalidate
            return "Logout successful!";
        } catch (Exception e) {
            return "Logout failed: " + e.getMessage();
        }
    }

}
