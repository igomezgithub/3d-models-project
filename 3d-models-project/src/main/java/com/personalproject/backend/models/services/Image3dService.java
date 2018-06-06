package com.personalproject.backend.models.services;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.personalproject.backend.models.dao.IImage3dDAO;
import com.personalproject.backend.models.entity.Image3d;

@Service
public class Image3dService implements IImage3dService {

	private final Path rootLocation = Paths.get("src//main//static//assets//images//mtl");
	
	@Autowired
	private IImage3dDAO image3dDAO;
	
	@Override
	@Transactional(readOnly = true)
	public List<Image3d> findAll() {
		return (List<Image3d>) image3dDAO.findAll();
	}

	@Override
	@Transactional(readOnly = true)
	public Image3d findById(Long id) {
		return image3dDAO.findById(id).orElse(null);
	}

	@Override
	@Transactional
	public Image3d save(Image3d image) {
		return image3dDAO.save(image);
	}

	@Override
	@Transactional
	public void delete(Long id) {
		image3dDAO.deleteById(id);
	}
	
	@Override
	public void store(MultipartFile file) {
		try {
			Files.copy(file.getInputStream(), this.rootLocation.resolve(file.getOriginalFilename()));
		} catch (Exception e) {
			throw new RuntimeException("FAIL!");
		}
	}
}
