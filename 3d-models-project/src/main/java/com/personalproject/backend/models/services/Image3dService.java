package com.personalproject.backend.models.services;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.personalproject.backend.models.dao.IImage3dDAO;
import com.personalproject.backend.models.entity.Image3d;

@Service
public class Image3dService implements IImage3dService {

	@Autowired
	private IImage3dDAO image3dDAO;
	
	@Override
	@Transactional(readOnly = true)
	public List<Image3d> findAll() {
		return (List<Image3d>) image3dDAO.findAll();
	}
}
