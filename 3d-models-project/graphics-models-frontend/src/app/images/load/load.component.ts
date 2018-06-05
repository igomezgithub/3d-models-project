import { Component, Input, ViewChild, ElementRef, AfterViewInit, OnDestroy, HostListener } from '@angular/core';
import { Image } from '../image';
import { ImageService } from '../image.service';
import { Router, ActivatedRoute } from '@angular/router';
// import { THREE } from '../../../assets/js/three.min';
import * as THREE from 'three';
import * as OBJLoader from 'three-obj-loader';

import "../../../assets/js/EnableThreeLibrary";
import "three/examples/js/controls/OrbitControls";
import "three/examples/js/loaders/ColladaLoader";
import "three/examples/js/loaders/MTLLoader";
import "three/examples/js/loaders/OBJLoader";

@Component({
  selector: 'app-load',
  templateUrl: './load.component.html',
  styleUrls: ['./load.component.css']
})
export class LoadComponent implements AfterViewInit, OnDestroy {
  public graphicModel: Image = new Image();

  private renderer: THREE.WebGLRenderer;
  private camera: THREE.PerspectiveCamera;
  private cameraTarget: THREE.Vector3;
  public scene: THREE.Scene;

  public fieldOfView: number = 60;
  public nearClippingPane: number = 1;
  public farClippingPane: number = 1100;

  public controls: THREE.OrbitControls;

  @ViewChild('canvas')
  private canvasRef: ElementRef;

  constructor(private imageService: ImageService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
    this.render = this.render.bind(this);
    this.onModelLoadingCompleted = this.onModelLoadingCompleted.bind(this);
  }

  ngOnDestroy() {
    console.log('GraphicModels logger (Load Component) --> ngOnDestroy called!');
  }

  loadGraphicModel(): void {
    this.activatedRoute.params.subscribe(params => {
      let id = params['id'];
      if(id) {
        this.imageService.getGraphicModelById(id).subscribe(
          (response) => {
            this.graphicModel = response;
            console.log('GraphicModels logger (Load Component) --> Id:' + this.graphicModel.name + ' Name: ' + this.graphicModel.name);
            this.showScene();
          }
        )
      }
    });
  }

  /* LIFECYCLE */
  ngAfterViewInit() {
      this.loadGraphicModel();
  }

  showScene() {
      this.createScene();
      this.createLight();
      this.createCamera();
      this.startRendering();
      this.addControls();
  }


  private get canvas(): HTMLCanvasElement {
    return this.canvasRef.nativeElement;
  }

  private createScene() {
    this.scene = new THREE.Scene();
    this.scene.add(new THREE.AxesHelper(200));

    // var loader = new THREE.ColladaLoader();
    var mtlLoader = new THREE.MTLLoader();
    // mtlloader.setBaseUrl('assets/image/mtl/');
    // mtlloader.setPath('assets/image/mtl/');

    console.log('GraphicModels logger (Load Component) --> MTL Path:' + this.graphicModel.mtlPath);
    // console.log('Graphic Model logger: ' + this.graphicModel.name + ' ' + this.graphicModel.path);
    mtlLoader.load(this.graphicModel.mtlPath, this.onModelLoadingCompleted);
  }

  private onModelLoadingCompleted(materials) {
    materials.preload();
    var objLoader = new (THREE as any).OBJLoader();
    // var objLoader = new THREE.OBJLoader();
    objLoader.setMaterials(materials);
    // objLoader.setPath('assets/image/obj/');

    console.log('GraphicModels logger (Load Component) --> OBJ Path:' + this.graphicModel.objPath);
    objLoader.load(this.graphicModel.objPath, (object) => {
        object.position.x = 0;
        object.position.y = 0;
        object.position.z = 0;
        // object.scale.set(80,80,80);
        object.rotation.x = 0.00;
        object.rotation.y = 30.00;
        object.rotation.z = 0.00;
        this.scene.add(object);
        this.render();
    });
  }

     private createLight() {
         var light = new THREE.PointLight(0xffffff, 1, 1000);
         light.position.set(0, 0, 100);
         this.scene.add(light);

         var light = new THREE.PointLight(0xffffff, 1, 1000);
         light.position.set(0, 0, -100);
         this.scene.add(light);
     }

     private createCamera() {
         let aspectRatio = this.getAspectRatio();
         this.camera = new THREE.PerspectiveCamera(
             this.fieldOfView,
             aspectRatio,
             this.nearClippingPane,
             this.farClippingPane
         );

         // Set position and look at
         this.camera.position.x = 10;
         this.camera.position.y = 10;
         this.camera.position.z = 100;
     }

     private getAspectRatio(): number {
         let height = this.canvas.clientHeight;
         if (height === 0) {
             return 0;
         }
         return this.canvas.clientWidth / this.canvas.clientHeight;
     }

     private startRendering() {
         this.renderer = new THREE.WebGLRenderer({
             canvas: this.canvas,
             antialias: true
         });
         this.renderer.setPixelRatio(devicePixelRatio);
         this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);

         this.renderer.shadowMap.enabled = true;
         this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
         this.renderer.setClearColor(0xffffff, 1);
         this.renderer.autoClear = true;

         let component: LoadComponent = this;

         (function render() {
             component.render();
         }());
     }

     public render() {
         this.renderer.render(this.scene, this.camera);
     }

     public addControls() {
         this.controls = new THREE.OrbitControls(this.camera);
         this.controls.rotateSpeed = 1.0;
         this.controls.zoomSpeed = 1.2;
         this.controls.addEventListener('change', this.render);

     }

     /* EVENTS */

         public onMouseDown(event: MouseEvent) {
             console.log("onMouseDown");
             event.preventDefault();

             // Example of mesh selection/pick:
             var raycaster = new THREE.Raycaster();
             var mouse = new THREE.Vector2();
             mouse.x = (event.clientX / this.renderer.domElement.clientWidth) * 2 - 1;
             mouse.y = - (event.clientY / this.renderer.domElement.clientHeight) * 2 + 1;
             raycaster.setFromCamera(mouse, this.camera);

             var obj: THREE.Object3D[] = [];
             this.findAllObjects(obj, this.scene);
             var intersects = raycaster.intersectObjects(obj);
             console.log("Scene has " + obj.length + " objects");
             console.log(intersects.length + " intersected objects found")
             intersects.forEach((i) => {
                 console.log(i.object); // do what you want to do with object
             });

         }

         private findAllObjects(pred: THREE.Object3D[], parent: THREE.Object3D) {
             // NOTE: Better to keep separate array of selected objects
             if (parent.children.length > 0) {
                 parent.children.forEach((i) => {
                     pred.push(i);
                     this.findAllObjects(pred, i);
                 });
             }
         }

         public onMouseUp(event: MouseEvent) {
             console.log("onMouseUp");
         }


         @HostListener('window:resize', ['$event'])
         public onResize(event: Event) {
             this.canvas.style.width = "100%";
             this.canvas.style.height = "100%";
             console.log("onResize: " + this.canvas.clientWidth + ", " + this.canvas.clientHeight);

             this.camera.aspect = this.getAspectRatio();
             this.camera.updateProjectionMatrix();
             this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);
             this.render();
         }

         @HostListener('document:keypress', ['$event'])
         public onKeyPress(event: KeyboardEvent) {
             console.log("onKeyPress: " + event.key);
         }
}
