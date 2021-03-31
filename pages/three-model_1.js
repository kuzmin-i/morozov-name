import React, { useRef, useState, useEffect, useCallback, Suspense } from 'react'
import { Canvas, useFrame, useLoader, useThree, extend } from 'react-three-fiber'
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import * as THREE from "three";


import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import { PerspectiveCamera } from 'three';

extend({ OrbitControls });


const onBeforeCompile = (shader) => {
  const token = '#include <begin_vertex>'
  const customTransform = 'vec3 transformed = position + objectNormal*0.02;'
  shader.vertexShader =  shader.vertexShader.replace(token,customTransform)
}


function Building(props) {
  
  
  const mesh1 = useRef()

  const gltf = useLoader(GLTFLoader, props.model, loader => {
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('/decoder/');
    loader.setDRACOLoader(dracoLoader);
  })

  const oBC = useCallback(onBeforeCompile, [])

  gltf.scene.traverse( function(object) {

    if( object.isMesh ) {
      console.log(object.material)

      object.material.receiveShadow = true;

    }

  })


  return (
      <primitive
        {...props}
        ref={mesh1}
        object = {gltf.scene}
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

  console.log(useThree)

  return <perspectiveCamera ref={cameraRef} {..._props} />
}

function CameraOrbit(props) {
  const {
    camera, gl
  } = useThree

  useEffect(
    () => {
      const controls = new OrbitControls(camera, gl.domElement)

      return () => {
        controls.dispose()
      }
    }, [camera, gl]
  )
  return null

}

const ThreeRender = (props) => {

    const [MouseTooltip, showMouseTooltip] = React.useState(false)

    return (
        <div style={{width: '100vw', height: '100vh'}}>
          
            <Canvas style={{'background': '#E3DED3'}}>
                <Camera
                  position = { props.position }
                  rotation = { props.rotation }
                />
                
                <Suspense fallback = {null}>
                  
                  <Building model = 'models/gltf/Build_1.gltf'/>
                  <Building model = 'models/gltf/Build_2.gltf'/>
                  <Building model = 'models/gltf/Build_3.gltf'/>
                  <Building model = 'models/gltf/Build_4.gltf'/>
                  <Building model = 'models/gltf/Build_5.gltf'/>
                  <Building model = 'models/gltf/Plane.gltf'/>
                  
                  
                  
                  
                </Suspense>
            </Canvas>
        </div>
    )
}

export default ThreeRender