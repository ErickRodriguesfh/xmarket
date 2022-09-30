package br.com.seguranca.controller;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TesteController {

    @GetMapping("/")
    public String home() {
        return "Home page";
    }

    @GetMapping("/profile")
    @PreAuthorize("hasRole('USER')")
    public String profile(){
        return "profile page";
    }



    @GetMapping("/admin")
    @PreAuthorize("hasRole('ADMIN')")
    public String admin(){
        return "admin page";
    }


}
