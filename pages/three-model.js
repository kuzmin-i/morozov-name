import React, { useRef, useState, useEffect, Suspense } from 'react'
import { Canvas, useFrame, useLoader, useThree } from 'react-three-fiber'

import * as THREE from "three";


import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { PerspectiveCamera } from 'three';



function Building(props) {
  
  
  const mesh1 = useRef()
  const gltf = useLoader(GLTFLoader, props.model)

  gltf.scene.traverse( function(object) {

    if( object.isMesh ) {
      console.log(object.material)

      object.material.color.set( props.color );
      object.material.transparent = true;
      object.material.opacity = props.opacity;
    }

  })
  
  const changeColor = (e, status) => {
    if(props.pointer) {
      
      mesh1.current.traverse( function(object) {

        if( object.isMesh ) {
          if(status) {
            object.material.color.set( 0xF8C135 );
            object.material.transparent = true;
            object.material.opacity = .5;
          } else {
            object.material.color.set( props.color );
            object.material.transparent = true;
            object.material.opacity = props.opacity;
          }
        }
    
      })
    }
  }

  return (
      <primitive
        {...props}
        ref={mesh1}
        object = {gltf.scene}
        onPointerOver = {(e) => { changeColor(mesh1, true) }}
        onPointerOut = {(e) => { changeColor(mesh1, false) }}
        />
      
  )
}

function Landscape(props) {

  const mesh = useRef()
  const gltf = useLoader(GLTFLoader, props.model)

  gltf.scene.traverse( function(object) {

    if( object.isMesh && props.material) {
      console.log(object.material)

      object.material.color.set( props.color );
      object.material.transparent = true;
      object.material.opacity = props.opacity;
    }

  })

  const clock = useRef(new THREE.Clock())
  const mixer = useRef()

  useEffect(() => {
    mixer.current = new THREE.AnimationMixer(gltf.scene)
    const action = mixer.current.clipAction( gltf.animations[0] )

    action.play()

    console.log('c')

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

  const changeColor = (e, status) => {
    if(props.pointer) {
      mesh.current.traverse( function(object) {

        if( object.isMesh ) {
          if(status) {
            object.material.color.set( 0xF8C135 );
            object.material.transparent = true;
            object.material.opacity = .5;

            
          } else {
            object.material.color.set( props.color );
            object.material.transparent = true;
            object.material.opacity = props.opacity;

            
          }
        }
    
      })
    }
  }

  

  return (
    <primitive
      {...props}
      ref={mesh}
      object = {gltf.scene}
      onPointerOver = {(e) => { changeColor(mesh, true) }}
        onPointerOut = {(e) => { changeColor(mesh, false) }}
    />
    
)

}


function Box(props) {
  // This reference will give us direct access to the mesh
  const mesh = useRef()


  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)

  // Rotate mesh every frame, this is outside of React without overhead
  useFrame(() => {
    mesh.current.rotation.x = mesh.current.rotation.y += 0.01
  })

  return (
    <mesh
      {...props}
      ref={mesh}
      scale={active ? [1.5, 1.5, 1.5] : [1, 1, 1]}
      onClick={(event) => setActive(!active)}
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}>
      <boxBufferGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
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
          
            <Canvas>
                <Camera
                  position = { props.position }
                  rotation = { props.rotation }
                />
                <ambientLight />
                <pointLight position={[10, 10, 10]} intensity = {2} />
                <Box position={[-1.2, 0, 0]} />
                <Box position={[1.2, 0, 0]} />
                <Suspense fallback = {null}>
                  
                  <Building model = 'models/gltf/2.glb' pointer = 'true' opacity = '.8' color = { 0xffffff }/>
                  <Building model = 'models/gltf/3.glb' pointer = 'true' opacity = '.8' color = { 0xffffff }/>
                  <Building model = 'models/gltf/4.glb' pointer = 'true' opacity = '.8' color = { 0xffffff }/>
                  <Building model = 'models/gltf/5.glb' pointer = 'true' opacity = '.8' color = { 0xffffff }/>

                  <Building model = 'models/gltf/landscape_road.glb'/>
                  
                  
                  <Landscape 
                    model = 'models/gltf/central_building.glb' 
                    step={props.step} 
                    progress={props.progress}
                    material = {true}
                    pointer = 'true'
                    opacity = '.8'
                    color = { 0xffffff }
                    animation={
                      {
                        'step-0': { 'start': 20, 'end': 20 },
                        'step-1': { 'start': 20, 'end': 20 },
                        'step-2': { 'start': 20, 'end': 119},
                        'step-3': { 'start': 119, 'end': 119 },
                        'step-4': { 'start': 119, 'end': 119 },
                        'step-5': { 'start': 119, 'end': 0 },
                      }
                    }
                    
                    />

                    <Landscape 
                    model = 'models/gltf/road_f1.glb' 
                    step={props.step} 
                    progress={props.progress}
                    opacity = '1'
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
                    
                    />

                    <Landscape 
                    model = 'models/gltf/road_f2.glb' 
                    step={props.step} 
                    progress={props.progress}
                    opacity = '1'
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
                    
                    />

<Landscape 
                    model = 'models/gltf/landscape.glb' 
                    step={props.step} 
                    progress={props.progress}
                    material = {true}
                    opacity = '1'
                    color = { 0xffffff }
                    animation={
                      {
                        'step-0': { 'start': 100, 'end': 100 },
                        'step-1': { 'start': 100, 'end': 139 },
                        'step-2': { 'start': 139, 'end': 139},
                        'step-3': { 'start': 139, 'end': 139 },
                        'step-4': { 'start': 139, 'end': 139 },
                        'step-5': { 'start': 139, 'end': 139 },
                      }
                    }
                    
                    />
                </Suspense>
            </Canvas>
        </div>
    )
}

export default ThreeRender