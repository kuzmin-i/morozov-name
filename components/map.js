import React, { Component } from "react";
import ReactDOM from "react-dom";
import * as THREE from "three";

import GLTFLoader from 'three-gltf-loader';


class Map extends Component {
  constructor(props) {
    super(props)

    this.state = {'step': this.props.step}
  }

  componentDidMount() {
    
    if( !this.props.webgl ) {
      console.log('Up')
      var scene = new THREE.Scene();
      var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / 2 / window.innerHeight, 0.1, 1000 );
      var renderer = new THREE.WebGLRenderer();

      renderer.setSize( window.innerWidth / 2, window.innerHeight );
      document.querySelector('.Map').appendChild( renderer.domElement );

      var geometry = new THREE.BoxGeometry( 1, 1, 1 );
      var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );

      const loader = new GLTFLoader();

      var cube;

      

      /*var cube = new THREE.Mesh( geometry, material );*/
      
      camera.position.z = 1045;

      const _add3DObject = this.props.add3DObject;
      const _webglCreated = this.props.webglCreated;
      const __threeRender = this.props.threeRender

      console.log(_add3DObject)

     loader.load( 'models/1.glb', function ( gltf ) {

     cube = gltf.scene

     scene.add( cube );
      
      console.log(camera, 'Camera__')

      _add3DObject( {'scene': scene, 'camera': camera, 'renderer': renderer, 'object': cube, 'threeRender': __threeRender} )

      
   
      _webglCreated()

         
      }, undefined, function ( error ) {
      
        console.error( error );
      
      } );

    
      

      



      
    }
   }
   
   componentDidUpdate() {
    if( this.props.webgl ) {
      console.log('webglCreated')

      this.props.rotate3DObject( { threeRender: this.props.threeRender} )

    }
  }

    

    
  
  render() {
    return (
      <div />
    )
  }
}

export default Map