import "intersection-observer";
const scrollama = require("scrollama");

import React, { Component } from "react";
import ReactDOM, { render } from "react-dom";

import Map from '../components/map'

class Elements extends Component {

    constructor(props) {
        super(props)

        this.state = {
            'step': '0', 
            'progress': '0',
            'webgl': false, 
            'scene': null,
            'camera': null,
            'renderer': null,
            'object': null
        }

        this.webglCreated = this.webglCreated.bind(this)
        this.add3DObject = this.add3DObject.bind(this)
        this.rotate3DObject = this.rotate3DObject.bind(this)
        this.threeRender = this.threeRender.bind(this)

    }

    componentDidMount() {
        const scroller = scrollama();

        scroller.
            setup({ 
                step: ".step",
                progress: true 
            })
            .onStepProgress((response) => {
                
                this.setState({ 'progress': response.progress })
            })
            .onStepEnter((response) => {
                this.setState({ 'step': response.index })
            })
            .onStepExit((response) => {
                
            })

        window.addEventListener('resize', scroller.resize)
    }

    webglCreated() {
        this.setState({ 'webgl': true })
    }

    add3DObject( {scene, camera, renderer, object, threeRender} ) {

        this.setState({ 
            scene: scene,
            camera: camera,
            renderer: renderer,
            object: object
        }, () => {
            threeRender( { 'step': this.state.step } )
        })

    }

    rotate3DObject( { threeRender } ) {
        let _object = this.state.object
        
        console.log(this.state)

        /* if( this.state.step == 0 ) {
            _object.rotation.x = 10 * this.state.progress - 0;
            _object.rotation.y = 10 * this.state.progress - 0;
            _object.rotation.z = 10 * this.state.progress - 0;
          } else if( this.state.step == 1 ) {
            _object.rotation.x = 40 * this.state.progress - 10;
            _object.rotation.y = 40 * this.state.progress - 10;
            _object.rotation.z = 40 * this.state.progress - 10;
          } else if( this.state.step == 2 ) {
            _object.rotation.x = 80 * this.state.progress - 40;
            _object.rotation.y = 80 * this.state.progress - 40;
            _object.rotation.z = 80 * this.state.progress - 40;
          }
          */

          threeRender({'step': this.state.step})
          
    }

    threeRender({ step }) {
        let _threeRender = this.state.renderer
        let _scene = this.state.scene
        let _camera = this.state.camera

        let _object = _scene.children[0]

        if( this.state.step == 0 ) {
            _object.rotation.x = 1.39626 * this.state.progress - 0;
            _object.rotation.y = 1.39626 * this.state.progress - 0;
            _object.rotation.z = 1.39626 * this.state.progress - 0;
          } else if( this.state.step == 1 ) {
            _object.rotation.x = 2.79253 * this.state.progress - 1.39626;
            _object.rotation.y = 2.79253 * this.state.progress - 1.39626;
            _object.rotation.z = 2.79253 * this.state.progress - 1.39626;
          } else if( this.state.step == 2 ) {
            _object.rotation.x = 4 * this.state.progress - 2.79253;
            _object.rotation.y = 4 * this.state.progress - 2.79253;
            _object.rotation.z = 4 * this.state.progress - 2.79253;
          }
          

          _scene.children[0] = _object

        _threeRender.render(_scene, _camera) 
    }
    
   

    render() {
        return(
        <div style={{ display: "inline-flex", height: "100vh" }}>
            <div>
                <div className="step" data-step="a" style = {{ 'width': '50vw', 'height': '100vh', 'background': 'orange' }}></div>
                <div className="step" data-step="b" style = {{ 'width': '50vw', 'height': '100vh', 'background': 'grey' }}></div>
                <div className="step" data-step="c" style = {{ 'width': '50vw', 'height': '100vh', 'background': 'black' }}></div>
            </div>
            <div className = "Map" style={{ position: 'fixed', right: 0 }}>
                <Map 
                    step = { this.state.step } 
                    webgl = { this.state.webgl } 
                    object = { this.state.object }
                    webglCreated = { this.webglCreated } 
                    rotate3DObject = { this.rotate3DObject }
                    add3DObject = { this.add3DObject }
                    threeRender = { this.threeRender }
                    />
            </div>
        </div>
        )
    }
}

export default Elements