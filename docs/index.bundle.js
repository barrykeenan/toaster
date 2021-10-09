"use strict";(self.webpackChunklearning_threejs_baz=self.webpackChunklearning_threejs_baz||[]).push([[826],{447:(e,t,s)=>{var a=s(212);function o(e){e.target.remove()}var n=s(79),i=s(11);class r{constructor(e){this.scene=new a.xsS,this.objLoader=new i.L(e),this.objLoader.setPath("assets/"),this.textureLoader=new a.dpR(e),this.textureLoader.setPath("assets/"),this.materials={shadowMaterial:new a.Tn7({opacity:.6}),chrome:new a.Wid({color:16777215,metalness:.15,roughness:.05})},this.pickableMeshes=[];const t=new a.VLJ(50,10);t.material.transparent=!0,t.material.opacity=.25;const s=new a._12(500,500);s.rotateX(-Math.PI/2);const o=new a.Kj0(s,this.materials.shadowMaterial);o.position.y=-52,o.receiveShadow=!0,this.scene.add(o),this.toaster(),this.environmentMap()}skybox(){const e=this.textureLoader.load("environments/CT-office.jpg");e.mapping=a.dSO,this.scene.background=e}environmentMap(){this.textureLoader.load("environments/CT-office-2k-sharper-90.webp",(e=>{e.mapping=a.dSO,this.scene.environment=e}))}cube(){this.objLoader.load("cube/cube1m.obj",(e=>{e.name="cube-1m",e.traverse((function(e){e.castShadow=!0})),e.children.forEach((e=>{e.material=this.materials.chrome,this.pickableMeshes.push(e)})),e.scale.set(.2,.2,.2),this.scene.add(e)}))}toaster(){this.materials.toaster=new a.Wid({normalMap:this.textureLoader.load("models/toaster/textures/v2/jpg/toaster_low_material_Normal.jpg"),metalnessMap:this.textureLoader.load("models/toaster/textures/v2/jpg/toaster_low_material_Metallic.jpg"),metalness:1,roughnessMap:this.textureLoader.load("models/toaster/textures/v2/jpg/toaster_low_material_Roughness.jpg"),map:this.textureLoader.load("models/toaster/textures/v2/jpg/toaster_low_material_BaseColor.jpg"),aoMap:this.textureLoader.load("models/toaster/textures/v2/jpg/toaster_low_material_Occlusion.jpg"),aoMapIntensity:.75,envMapIntensity:.9}),this.materials.toasterBody=this.materials.toaster.clone();const e=new a.ZAu;e.name="toaster",this.scene.add(e),this.objLoader.load("models/toaster/toaster.obj",(t=>{const s=t.children[0];s.geometry.attributes.uv2=s.geometry.attributes.uv,s.castShadow=!0,s.receiveShadow=!0,s.material=this.materials.toaster,this.pickableMeshes.push(s),e.add(s)})),this.objLoader.load("models/toaster/toaster_body.obj",(t=>{const s=t.children[0];s.geometry.attributes.uv2=s.geometry.attributes.uv,s.castShadow=!0,s.receiveShadow=!0,s.material=this.materials.toasterBody,this.pickableMeshes.push(s),e.add(s)}))}}class d{constructor(e,t,s){this.scene=e,this.camera=t,this.mouse=new a.FM8,this.raycaster=new a.iMs,this.pickableMeshes=s,this.rayMaterial=new a.vBJ({color:16711680,transparent:!0,opacity:.6}),this.ray=null,this.initComponents(),this.bindEvents()}initComponents(){this.clickableArea=document.querySelector("#webgl-output")}bindEvents(){this.clickableArea.addEventListener("mousemove",this.updateMousePosition.bind(this),!1),this.clickableArea.addEventListener("mousedown",this.pickObject.bind(this),!1)}updateMousePosition(e){this.mouse.x=e.clientX/window.innerWidth*2-1,this.mouse.y=-e.clientY/window.innerHeight*2+1}pickObject(e){this.raycaster.setFromCamera(this.mouse,this.camera);const t=this.raycaster.intersectObjects(this.pickableMeshes);t.length>0&&console.log("Picked:",t[0].object)}update(e){if(!e)return;this.raycaster.setFromCamera(this.mouse,this.camera);const t=this.raycaster.intersectObjects(this.pickableMeshes);if(t.length>0){this.ray&&this.scene.remove(this.ray);const e=this.camera.position.clone();e.y=e.y-.2;const s=[];s.push(e),s.push(t[0].point);const o=new a.WXh(new a.YT8(s),60,.001);this.ray=new a.Kj0(o,this.rayMaterial),this.scene.add(this.ray)}}}s(268);class c{constructor(e){this.materials=e,console.log("ColourPicker",this.materials),this.initComponents(),this.bindEvents()}initComponents(){this.swatches=document.querySelectorAll("[data-swatch]")}bindEvents(){this.swatches.forEach((e=>{e.addEventListener("click",(()=>{const t=getComputedStyle(e);this.materials.toasterBody.color.setStyle(t.backgroundColor),this.materials.toasterBody.metalness=.2,this.materials.toasterBody.roughness=1.1}))}))}}var h=s(365);document.addEventListener("DOMContentLoaded",(function(){const e=function(){const e=new a.lLk;return e.onStart=function(e,t,s){console.log("Started loading file: "+e+".\nLoaded "+t+" of "+s+" files.")},e.onLoad=function(){console.log("Loading complete!");const e=document.getElementById("loading-screen");e.classList.add("fade-out"),e.addEventListener("transitionend",o)},e.onProgress=function(e,t,s){console.log(e,t,s),console.log("Loaded:",Math.round(t/s*100,2)+"%")},e.onError=function(e){console.log("There was an error loading "+e)},e}(),t=function(e){var t=new n.Z;return t.showPanel(0),document.body.appendChild(t.dom),t}(),s=function(e){const t=new a.CP7({alpha:!0});return t.setSize(window.innerWidth,window.innerHeight),t.shadowMap.enabled=!0,t.shadowMapSoft=!0,t.shadowMap.type=a.ntZ,t.physicallyCorrectLights=!0,document.getElementById("webgl-output").appendChild(t.domElement),t}(),i=function(e){var t=void 0!==e?e:new a.Pa4(0,22,50),s=new a.cPb(45,window.innerWidth/window.innerHeight,.1,1e3);return s.position.copy(t),s.lookAt(new a.Pa4(0,0,0)),s}(new a.Pa4(-20,22,62)),l=new r(e),m=(function(e){const t=new a.vmT(11773855,6509891,3);t.position.set(0,150,0),t.intensity=.6;const s=new a.cek(16777177,2e4);s.name="shadow",s.position.set(0,150,0),s.decay=2,s.castShadow=!0,s.shadow.camera.near=5,s.shadow.camera.far=500,s.shadow.radius=20,s.shadow.mapSize.width=1024,s.shadow.mapSize.height=1024,e.add(s),new a.Rki(s.shadow.camera);const o=new a.cek(16777177,3e4);o.position.set(180,100,200),o.decay=2,e.add(o);const n=new a.cek(16777177,3e4);n.position.set(-180,120,220),n.decay=2,e.add(n);const i=new a.cek(16777177,15e3);i.position.set(190,150,-250),i.decay=2,e.add(i);const r=new a.cek(16777177,15e3);r.position.set(30,150,-400),r.decay=2,e.add(r);const d=new a.cek(16777177,15e3);d.position.set(-180,150,-250),d.decay=2,e.add(d)}(l.scene),new a.SUY),u=new h.z(i,s.domElement);u.target.y=-5,u.enablePan=!1,u.minDistance=35,u.maxDistance=120,u.minPolarAngle=a.M8C.degToRad(30),u.maxPolarAngle=a.M8C.degToRad(120),u.autoRotate=!0,u.enableDamping=!0,new d(l.scene,i,l.pickableMeshes),new c(l.materials);let w=0;window.addEventListener("resize",(function(){i.aspect=window.innerWidth/window.innerHeight,i.updateProjectionMatrix(),s.setSize(window.innerWidth,window.innerHeight)}),!1),function e(){const a=m.getDelta();t.update(),u.update(a),w+=.05;const o=l.scene.getObjectByName("toaster");o&&(o.position.y=.15*Math.sin(w)),s.render(l.scene,i),window.requestAnimationFrame(e)}()}))}},e=>{e.O(0,[813],(()=>(447,e(e.s=447)))),e.O()}]);