package com.personalproject.backend.controllers;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

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
	
	@GetMapping("/images/{id}")
	public Image3d findImageById(@PathVariable Long id) {
		return image3dService.findById(id);
	}
	
	@PostMapping("/images")
	@ResponseStatus(HttpStatus.CREATED)
	public Image3d addImage(@RequestBody Image3d image) {
		return image3dService.save(image);
	}
	
	@PutMapping("/images/{id}")
	@ResponseStatus(HttpStatus.CREATED)
	public Image3d updateImage(@RequestBody Image3d image, @PathVariable Long id) {
		Image3d currentImage3d = image3dService.findById(id);
		currentImage3d.setName(image.getName());
		currentImage3d.setDescription(image.getDescription());
		currentImage3d.setMtlPath(image.getMtlPath());
		currentImage3d.setObjPath(image.getObjPath());
		
		return image3dService.save(currentImage3d);
	}
	
	@DeleteMapping("/images/{id}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void deleteImage(@PathVariable Long id) {
		image3dService.delete(id);
	}
	
	@PostMapping("/images/mtl")
	public void handleMtlFileUpload(@RequestParam("file") MultipartFile mtlImage) {
		String message = "";
		try {
			image3dService.store(mtlImage);
			//files.add(file.getOriginalFilename());
 
			message = "You successfully uploaded " + mtlImage.getOriginalFilename() + "!";
			//return ResponseEntity.status(HttpStatus.OK).body(message);
		} catch (Exception e) {
			message = "FAIL to upload " + mtlImage.getOriginalFilename() + "!";
			//return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(message);
		}
	}
}