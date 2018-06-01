package com.personalproject.backend.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.personalproject.backend.models.entity.Image3d;
import com.personalproject.backend.models.services.IImage3dService;

@CrossOrigin(origins = {"http://localhost:4200"})
@RestController
@RequestMapping("/api")
public class Image3dRestController {

	@Autowired
	private IImage3dService image3dService;
	
	@GetMapping("/images")
	public List<Image3d> allImages() {
		return image3dService.findAll();
	}
}