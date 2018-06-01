package com.personalproject.backend.models.services;

import java.util.List;
import com.personalproject.backend.models.entity.Image3d;

public interface IImage3dService {

	public List<Image3d> findAll();
	
	public Image3d findById(Long id);
	
	public Image3d save(Image3d image);
	
	public void delete(Long id);

}
