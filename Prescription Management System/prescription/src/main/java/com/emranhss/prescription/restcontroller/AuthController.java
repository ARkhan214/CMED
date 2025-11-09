package com.emranhss.prescription.restcontroller;

import com.emranhss.prescription.entity.AppUser;
import com.emranhss.prescription.entity.Medicine;
import com.emranhss.prescription.service.AuthService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/user")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("")
    public ResponseEntity<String> register(@RequestBody AppUser user) {
        String result = authService.registerUser(user);
        if (result.equals("Username already exists")) {
            return ResponseEntity.badRequest().body(result);
        }
        return ResponseEntity.ok(result);
    }

    @GetMapping("")
    public List<AppUser> getUsers() {
        return authService.getAllUsers();
    }

    // Read by ID
    @GetMapping("/{id}")
    public ResponseEntity<AppUser> getById(@PathVariable Long id) {
        return authService.getUserById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

//    @GetMapping("/{id}")
//    public ResponseEntity<?> getUserById(@PathVariable Long id) {
//        Optional<AppUser> user = repo.findById(id);
//        if (user.isPresent()) {
//            return ResponseEntity.ok(user.get());
//        } else {
//            return ResponseEntity.status(404).body("User not found");
//        }
//    }

    //Update (PUT) User
    @PutMapping("/{id}")
    public ResponseEntity<AppUser> updateUser(@PathVariable Long id, @RequestBody AppUser user) {
        return authService.updateUser(id, user)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }


    // Delete user by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable Long id) {
        String result = authService.deleteUser(id);

        if (result.contains("not found")) {
            return ResponseEntity.status(404).body(result);
        } else {
            return ResponseEntity.ok(result);
        }
    }

//    Delete with conformation from Backend
//    @DeleteMapping("/{id}")
//    public ResponseEntity<String> deleteUser(
//            @PathVariable Long id,
//            @RequestParam(defaultValue = "false") boolean confirm
//    ) {
//        if (!confirm) {
//            return ResponseEntity.badRequest().body("Please confirm deletion by setting ?confirm=true");
//        }
//
//        String result = authService.deleteUser(id);
//        if (result.contains("not found")) {
//            return ResponseEntity.status(404).body(result);
//        } else {
//            return ResponseEntity.ok(result);
//        }
//    }


//Login with User name
//    @PostMapping("/login")
//    public ResponseEntity<Map<String, Object>> login(@RequestBody Map<String, String> loginRequest) {
//        String username = loginRequest.get("username");
//        String password = loginRequest.get("password");
//
//        AppUser user = authService.loginUser(username, password);
//        Map<String, Object> response = new HashMap<>();
//
//        if (user != null) {
//            response.put("status", "success");
//            response.put("user", user);
//            return ResponseEntity.ok(response); // সবসময় JSON পাঠাও
//        } else {
//            response.put("status", "error");
//            response.put("message", "Invalid username or password");
//            return ResponseEntity.status(401).body(response);
//        }
//    }



    //Login with User email
    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody Map<String, String> loginRequest) {

        String email = loginRequest.get("email");
        String password = loginRequest.get("password");

        Map<String, Object> response = new HashMap<>();

        try {
            AppUser user = authService.loginUserByEmail(email, password);

            response.put("status", "success");
            response.put("message", "Login successful! Welcome back, " + user.getUsername());
            response.put("user", user);
            return ResponseEntity.ok(response);

        } catch (RuntimeException ex) {
            response.put("status", "error");

            // Customize message based on exception
            if (ex.getMessage().contains("not active")) {
                response.put("message", " Your account is currently inactive. Please contact the admin.");
            } else if (ex.getMessage().contains("Invalid")) {
                response.put("message", " Invalid email or password. Please try again.");
            } else {
                response.put("message", " Login failed. " + ex.getMessage());
            }

            return ResponseEntity.status(403).body(response);
        }
    }


//Logout
    @PostMapping("/logout")
    public ResponseEntity<Map<String, Object>> logout(HttpSession session) {
        Map<String, Object> response = new HashMap<>();
        String result = authService.logout(session);

        if (result.contains("successful")) {
            response.put("status", "success");
            response.put("message", result);
            return ResponseEntity.ok(response);
        } else {
            response.put("status", "error");
            response.put("message", result);
            return ResponseEntity.status(500).body(response);
        }
    }


}
