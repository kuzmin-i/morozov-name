import React, { useRef, useState, useEffect, Suspense } from 'react'
import { Canvas, useFrame, useLoader, useThree } from 'react-three-fiber'

import * as THREE from "three";


import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'
import { PerspectiveCamera } from 'three';

const changeColor = (mesh, status, pointer, e, objectInfo, title) => {
  if(pointer) {
    mesh.current.traverse( function(object) {

      if( object.isMesh ) {
        if(status) {
          object.material.color.set( 0xF8C135 );
          object.material.opacity = .3;

          
        } else {
          object.material.color.set( {r: 1, g: 1, b: 1} );
          object.material.opacity = 1;

          
        }
      }
  
    })
    
    if(status) {
      if(typeof objectInfo === 'function') {
        objectInfo(e, status, title)
      }
    } else {
      if(typeof objectInfo === 'function') {
        objectInfo(null, false, null)
      }
    }
    
  }
  
}



function Building(props) {
  
  
  const mesh1 = useRef()

  const gltf = useLoader(GLTFLoader, props.model, loader => {
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('/decoder/');
    loader.setDRACOLoader(dracoLoader);
  })

  useEffect(() => {
    if(props.skip) {
      
      if(props.skip['step-' + props.step]) {
        gltf.scene.children[0].visible = false
      } else {
        if(!gltf.scene.children[0].visible) {
          gltf.scene.children[0].visible = true
        }
      }
    }
  })

  

  gltf.scene.traverse( function(object) {

    if( object.isMesh ) {

      object.material.receiveShadow = true;

    }

  })

  const _title = (props.title) ? props.title : null


  return (
      <primitive
        {...props}
        ref={mesh1}
        object = {gltf.scene}
        onPointerOver = {(e) => { changeColor(mesh1, true, props.pointer, e, props.objectInfo, _title) }}
        onPointerOut = {(e) => { changeColor(mesh1, false, props.pointer, null, props.objectInfo, _title) }}
        onPointerMove = {(e) => { (props.pointer) ? props.objectInfo(e, _title, true) : false }}
        onClick = {(e) => { (props.pointer) ? props.objectInfo(e, _title, true) : false }}
        />
        
      
  )
}


function Landscape(props) {

  const mesh = useRef()
  const gltf = useLoader(GLTFLoader, props.model)

  gltf.scene.traverse( function(object) {

    if( object.isMesh && props.nullMaterial) {

      gltf.scene.children[0].material.opacity = 1;
    }

  })


  const clock = useRef(new THREE.Clock())
  const mixer = useRef()

  useEffect(() => {
    mixer.current = new THREE.AnimationMixer(gltf.scene)
    const action = mixer.current.clipAction( gltf.animations[0] )

    action.play()


  })

  useFrame(state => {
    if(mixer.current) {
      let frames = props.animation['step-' + props.step]
 
      let ratio = 1 / 24

      let startFrame = frames['start'] * ratio
      let endFrame = frames.end * ratio

      
      if(startFrame != endFrame) {

      const delta = startFrame + ( endFrame - startFrame ) * props.progress
      mixer.current.setTime(delta) 
    
    }
      
    }
  })

  

      let frames = props.animation['step-' + props.step]
 
      let ratio = 1 / 24

      let startFrame = frames['start'] * ratio
      let endFrame = frames.end * ratio

      if(startFrame == endFrame) {
        gltf.scene.children[0].visible = false
      } else {
        if(!gltf.scene.children[0].visible) {
          gltf.scene.children[0].visible = true
        }
      }

  

  return (
    <primitive
      {...props}
      ref={mesh}
      object = {gltf.scene}
      onPointerOver = {(e) => { changeColor(mesh, true, props.pointer) }}
      onPointerOut = {(e) => { changeColor(mesh, false, props.pointer) }}
    />
    
)

}

function Camera(props) {
   
  

  let {position, rotation, ...other} = props

  if(!position) {
    position = [166.206, 187.230, 120.114]
  }

  if(!rotation) {
    rotation = [-57.32 * Math.PI / 180, 36.77 * Math.PI / 180, 43.01 * Math.PI / 180]
  }

  let _props = {position, rotation}

  const cameraRef = useRef()
  const { setDefaultCamera } = useThree()
  useEffect(() => void setDefaultCamera(cameraRef.current), [])
  useFrame(() => cameraRef.current.updateMatrixWorld())
  return <perspectiveCamera ref={cameraRef} {..._props} />
}

const ThreeRender = (props) => {

    const [MouseTooltip, showMouseTooltip] = React.useState(false)

    return (
        <div style={{width: '100vw', height: '100vh'}}>
          
            <Canvas  style={{'background': '#E3DED3'}}>
              <Camera
                  position = { props.position }
                  rotation = { props.rotation }
                />

              <Suspense fallback = {null}>
                  <Building model = 'models/gltf/Build_1.gltf' pointer = { true } objectInfo = { props.objectInfo } title = "Офисное здание"/>
                  <Building model = 'models/gltf/Build_2.gltf' pointer = { true } objectInfo = { props.objectInfo } title = "Торговый ряд"/>
                  <Building 
                    step={props.step} 
                    model = 'models/gltf/Build_3.gltf'
                    pointer = { true }
                    skip = {
                      {
                        'step-2': true,
                        'step-3': true,
                        'step-4': true,
                        'step-5': true
                      }
                    }
                    objectInfo = { props.objectInfo }
                    title = "Морозовский центр"
                  />
                  <Building 
                    step={props.step} 
                    model = 'models/gltf/1_2.gltf'
                    pointer = { true }
                    skip = {
                      {
                        'step-0': true,
                        'step-1': true,
                        'step-2': true,
                      }
                    }
                    objectInfo = { props.objectInfo }
                  />
                  <Building model = 'models/gltf/Build_4.gltf' pointer = { true } objectInfo = { props.objectInfo } title = "Проектируемое здание #1"/>
                  <Building model = 'models/gltf/Build_5.gltf' pointer = { true } objectInfo = { props.objectInfo } title = "Проектируемое здание #2"/>
                  <Building model = 'models/gltf/Plane.gltf' pointer = { false } objectInfo = { props.objectInfo } title = "Проектируемое здание #3"/>

                  <Landscape 
                    model = 'models/gltf/central_building.gltf' 
                    step={props.step} 
                    progress={props.progress}
                    material = {true}
                    pointer = 'true'
                    opacity = '1'
                    nullMaterial = { true }
                    pointer = { true }
                    pointer = { true }
                    animation={
                      {
                        'step-0': { 'start': 20, 'end': 20 },
                        'step-1': { 'start': 20, 'end': 20 },
                        'step-2': { 'start': 20, 'end': 119},
                        'step-3': { 'start': 119, 'end': 119 },
                        'step-4': { 'start': 119, 'end': 119 },
                        'step-5': { 'start': 119, 'end': 119 },
                      }
                    }
                    objectInfo = { props.objectInfo }
                    />

                  

                  <Landscape 
                    model = 'models/gltf/road_f3.gltf' 
                    step={props.step} 
                    progress={props.progress}
                    opacity = '1'
                    live = { null }
                    pointer = { false }
                    animation={
                      {
                        'step-0': { 'start': 0, 'end': 94 },
                        'step-1': { 'start': 94, 'end': 0 },
                        'step-2': { 'start': 0, 'end': 0},
                        'step-3': { 'start': 0, 'end': 0 },
                        'step-4': { 'start': 0, 'end': 0 },
                        'step-5': { 'start': 0, 'end': 0 },
                      }
                    }
                    objectInfo = { props.objectInfo }
                    />

                    <Landscape 
                    model = 'models/gltf/road_f4.gltf' 
                    step={props.step} 
                    progress={props.progress}
                    opacity = '1'
                    pointer = { false }
                    animation={
                      {
                        'step-0': { 'start': 0, 'end': 94 },
                        'step-1': { 'start': 94, 'end': 0 },
                        'step-2': { 'start': 0, 'end': 0},
                        'step-3': { 'start': 0, 'end': 0 },
                        'step-4': { 'start': 0, 'end': 0 },
                        'step-5': { 'start': 0, 'end': 0 },
                      }
                  
                    }
                    objectInfo = { props.objectInfo }
                    />
                  
                  
                  
                </Suspense>
            </Canvas>
        </div>
    )
}

export default ThreeRender

