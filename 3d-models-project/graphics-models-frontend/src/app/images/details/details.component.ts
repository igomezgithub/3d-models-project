import { Component, OnInit } from '@angular/core';
import { Image } from '../image';
import { ImageService } from '../image.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { HttpClient, HttpResponse, HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  public image: Image = new Image();
  public file: File;
  public title: string = "Create a new image";

  public selectedFiles: FileList;
  public currentFileUpload: File;
  public progress: { percentage: number } = { percentage: 0 };

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
    this.imageService.create(this.image).subscribe(
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

  public selectFile(event) {
    this.selectedFiles = event.target.files;
  }

  upload() {
    this.imageService.pushFileToStorage(this.currentFileUpload).subscribe(
      (file) => {
        this.router.navigate(['/images'])
      }
    );


    // this.progress.percentage = 0;
    //
    // this.currentFileUpload = this.selectedFiles.item(0)
    // this.imageService.pushFileToStorage(this.currentFileUpload).subscribe(event => {
    //   if (event.type === HttpEventType.UploadProgress) {
    //     this.progress.percentage = Math.round(100 * event.loaded / event.total);
    //   } else if (event instanceof HttpResponse) {
    //     console.log('File is completely uploaded!');
    //   }
    // })
    //
    // this.selectedFiles = undefined
  }
}
