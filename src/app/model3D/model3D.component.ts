import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import * as THREE from 'three';
import { GLTFLoader, GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

@Component({
  selector: 'app-model-3d',
  templateUrl: './model3D.component.html',
  styleUrls: ['./model3D.component.scss'],
})
export class Model3dComponent implements AfterViewInit, OnDestroy {
  public model3D: string = '3D модели';

  public modelUrl: string = 'assets/models3D/model3D.glb';

  public cameraFOV: number = 75; // поле зрения, Field of view, тут градусы

  public cameraNear: number = 0.9;

  public cameraFar: number = 1000;

  public cameraDistance: number = 400;

  @ViewChild('canvas') private canvasRef!: ElementRef;

  @ViewChild('cube') private canvasRefCube!: ElementRef;

  private scene!: THREE.Scene;

  private camera!: THREE.PerspectiveCamera;

  private renderer!: THREE.WebGLRenderer;

  private model!: THREE.Object3D;

  private requestAnimationId?: number;

  private get canvas(): HTMLCanvasElement {
    return this.canvasRef.nativeElement;
  }

  ngAfterViewInit(): void {
    this.createScene();
    this.createCamera();
    this.startRendering();
    this.createControls();
  }

  ngOnDestroy(): void {
    if (this.requestAnimationId) {
      cancelAnimationFrame(this.requestAnimationId);
    }
  }

  private createScene(): void {
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0xffffff);

    if (this.modelUrl) {
      const loaderGLTF = new GLTFLoader();
      loaderGLTF.load(this.modelUrl, (gltf: GLTF) => {
        this.model = gltf.scene.children[0];
        this.correctPosition();
        this.scene.add(this.model);
      });
    }

    const ambientLight = new THREE.AmbientLight(0x000000, 100);
    this.scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffdf04, 0.8);
    directionalLight.position.set(0, 1, 0);
    directionalLight.castShadow = true;
    this.scene.add(directionalLight);

    const light1 = new THREE.PointLight(0x4b371c, 5);
    light1.position.set(0, 200, 400);
    this.scene.add(light1);

    const light2 = new THREE.PointLight(0x4b371c, 5);
    light2.position.set(500, 100, 0);
    this.scene.add(light2);

    const light3 = new THREE.PointLight(0x4b371c, 5);
    light3.position.set(0, 100, -500);
    this.scene.add(light3);

    const light4 = new THREE.PointLight(0x4b371c, 5);
    light4.position.set(-500, 300, 500);
    this.scene.add(light4);

    const light5 = new THREE.PointLight(0x4b371c, 5);
    light5.position.set(-200, -500, -500);
    this.scene.add(light5);
  }

  private correctPosition(): void {
    let box = new THREE.Box3().setFromObject(this.model);
    box.getCenter(this.model.position); // re-sets the mesh position
    this.model.position.multiplyScalar(-1);
  }

  private createCamera(): void {
    this.camera = new THREE.PerspectiveCamera(
      this.cameraFOV,
      this.canvas.clientWidth / this.canvas.clientHeight,
      this.cameraNear,
      this.cameraFar,
    );

    this.camera.position.x = this.cameraDistance;
    this.camera.position.y = this.cameraDistance;
    this.camera.position.z = this.cameraDistance;
  }

  private startRendering(): void {
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
    });
    this.renderer.setPixelRatio(devicePixelRatio);
    this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);
    this.animate();
  }

  private createControls(): void {
    const controls = new OrbitControls(this.camera, this.renderer.domElement);
    controls.autoRotate = true;
    controls.enableZoom = true;
    controls.enablePan = false;
    controls.update();
  }

  // private createCube(): void {
  //   const geometry = new THREE.BoxGeometry( 1, 1, 1 );
  //   const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  //   const cube = new THREE.Mesh( geometry, material );
  //   this.scene.add(cube);
  // }

  private animate(): void {
    this.requestAnimationId = requestAnimationFrame(this.animate.bind(this));
    this.renderer.render(this.scene, this.camera);
  }

  // private createCube() {
  //   const scene = new THREE.Scene();
  //   const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

  //   const renderer = new THREE.WebGLRenderer();
  //   renderer.setSize( window.innerWidth, window.innerHeight );
  //   document.body.appendChild( renderer.domElement );

  //   const geometry = new THREE.BoxGeometry( 1, 1, 1 );
  //   const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
  //   const cube = new THREE.Mesh( geometry, material );
  //   scene.add( cube );

  //   camera.position.z = 5;
  // }

  // private animateCube() {
  //   requestAnimationFrame( animateCube );

  //   cube.rotation.x += 0.01;
  //   cube.rotation.y += 0.01;

  //   renderer.render( scene, camera );
  // };

  // animate();
}
