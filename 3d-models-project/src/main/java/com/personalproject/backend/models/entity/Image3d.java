package com.personalproject.backend.models.entity;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.PrePersist;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

/**
 * Image3d Class
 *
 * It contains information of a 3d image
 *
 * @author Ivan Gomez
 * @version 1.0
 */
@Entity
@Table(name="images_3d")
public class Image3d implements Serializable{
	
	/**
	 * The serialVersionUID is used during deserialization to verify 
	 * that the sender and receiver of a serialized object have loaded 
	 * classes for that object that are compatible with respect to 
	 * serialization.
	 */
	private static final long serialVersionUID = 1L;
	
	/**
	 * The image identification 
	 */
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long id;
	
	/**
	 * The image name
	 */
	private String name;
	
	/**
	 * The image description
	 */
	private String description;
	
	/**
	 * The .MTL image path
	 */
	@Column(name="mtl_path")
	private String mtlPath;
	
	/**
	 * The .OBJ image path
	 */
	@Column(name="obj_path")
	private String objPath;
	
	/**
	 * The date of the image creation 
	 */
	@Column(name="creation_date")
	@Temporal(TemporalType.DATE)
	private Date creationDate;


	/**
	 * Generate the current date before save 
	 */
	@PrePersist
	public void prePersist() {
		creationDate = new Date();
	}
	
	/**
	 * @return current key to identify the image
	 */
	public Long getId() {
		return id;
	}

	/**
	 * @param id key to identify the image
	 */
	public void setId(Long id) {
		this.id = id;
	}

	/**
	 * @return current name
	 */
	public String getName() {
		return name;
	}

	/**
	 * @param name name of the image
	 */
	public void setName(String name) {
		this.name = name;
	}

	/**
	 * @return current description
	 */
	public String getDescription() {
		return description;
	}

	/**
	 * @param description description of the image
	 */
	public void setDescription(String description) {
		this.description = description;
	}

	/**
	 * @return current .MTL file path
	 */
	public String getMtlPath() {
		return mtlPath;
	}
	
	/**
	 * @return current .OBJ file path
	 */
	public String getObjPath() {
		return objPath;
	}

	/**
	 * @param path .MTL path of the image
	 */
	public void setMtlPath(String mtlPath) {
		this.mtlPath = mtlPath;
	}
	
	/**
	 * @param path .OBJ path of the image
	 */
	public void setObjPath(String objPath) {
		this.objPath = objPath;
	}

	/**
	 * @return the creation date
	 */
	public Date getCreationDate() {
		return creationDate;
	}

	/**
	 * @param creationDate the creation date of the image
	 */
	public void setCreationDate(Date creationDate) {
		this.creationDate = creationDate;
	}

}
