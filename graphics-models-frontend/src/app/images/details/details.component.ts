import { Component, OnInit } from '@angular/core';
import { Image } from '../image';
import { ImageService } from '../image.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  private image: Image = new Image();
  private title: string = "Create a new image";

  constructor(private imageService: ImageService,
              private router: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.loadImage();
  }

  loadImage(): void {
    this.activatedRoute.params.subscribe(params => {
      let id = params['id']
      if(id) {
        this.imageService.getImageById(id).subscribe(
          (response) => this.image = response
        )
      }
    });
  }

  create(): void {
    this.imageService.crate(this.image).subscribe(
      (image) => {
        this.router.navigate(['/images'])
        swal({
            title: 'New Image',
            text: `Image ${image.name} created successfully!`,
            type: 'success',
            confirmButtonText: 'OK'
        })
      }
    );
  }

  update(): void {
    this.imageService.update(this.image).subscribe(
      (image) => {
        this.router.navigate(['/images'])
        swal({
            title: 'Image updated',
            text: `Image ${image.name} has been updated successfully!`,
            type: 'success',
            confirmButtonText: 'OK'
        })
      }
    );
  }

  public onMouseClick(event: MouseEvent) {
      console.log('GraphicModels logger (Details Component)--> onMouseClick');
  }
}
