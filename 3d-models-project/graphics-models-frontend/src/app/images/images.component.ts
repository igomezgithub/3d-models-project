import { Component, OnInit } from '@angular/core';
import { Image } from './image';
import { ImageService } from './image.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.css']
})
export class ImagesComponent implements OnInit {

  images: Image[] = [];

  constructor(private imageService: ImageService) { }

  ngOnInit() {
    this.imageService.getImages().subscribe(
      (allImages) => {
        this.images = allImages
      }
    );
  }

  delete(image: Image): void {
       swal({
          title: 'Are you sure?',
          text: "You won't be able to revert this!",
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
          if (result.value) {
            this.imageService.delete(image.id).subscribe(
              response => {

                this.images = this.images.filter(img => img !== image)
                swal(
                  'Image deleted!',
                  `Your image ${image.name} has been deleted.`,
                  'success'
                )
              }
            )
          }
        })
    }
}
