import "intersection-observer";
const scrollama = require("scrollama");

import React, { Component } from "react";

import ThreeRender from './three-model_2'


class Elements extends Component {

    constructor(props) {
        super(props)

        this.state = {
            'step': '0', 
            'progress': '0',
            'camera': {
                'position': [20.369, 26.707, 43.609],
                'rotation': [-30.31 * Math.PI / 180, 21.50  * Math.PI / 180, 12.09  * Math.PI / 180]
            }
        }

        this.changeCameraArgs = this.changeCameraArgs.bind(this)

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

                this.changeCameraArgs()
            })
            .onStepEnter((response) => {
                this.setState({ 'step': response.index })
                

                this.changeCameraArgs()
            })
            .onStepExit((response) => {
                
            })

        window.addEventListener('resize', scroller.resize)
    }


    changeCameraArgs() {
        const CameraCoord = [
            {
                'position': [166.206, 187.230, 120.114],
                'rotation': [-57.12 * Math.PI / 180, 36.77 * Math.PI / 180, 43.01 * Math.PI / 180]
            },
            {
                'position': [232.720, 150.484, -16.197],
                'rotation': [-91.64 * Math.PI / 180, 58.48 * Math.PI / 180, 91.92 * Math.PI / 180]
            },
            {
                'position': [232.720, 150.484, -16.197],
                'rotation': [-91.64 * Math.PI / 180, 58.48 * Math.PI / 180, 91.92 * Math.PI / 180]
            },
            {
                'position': [232.720, 150.484, -16.197],
                'rotation': [-91.64 * Math.PI / 180, 58.48 * Math.PI / 180, 91.92 * Math.PI / 180]
            },
            {
                'position': [232.720, 150.484, -16.197],
                'rotation': [-91.64 * Math.PI / 180, 58.48 * Math.PI / 180, 91.92 * Math.PI / 180]
            },
            {
                'position': [232.720, 150.484, -16.197],
                'rotation': [-91.64 * Math.PI / 180, 58.48 * Math.PI / 180, 91.92 * Math.PI / 180]
            },
            {
                'position': [166.206, 187.230, 120.114],
                'rotation': [-57.12 * Math.PI / 180, 36.77 * Math.PI / 180, 43.01 * Math.PI / 180]
            },
        ]

        let pres = this.state.step
        let prev = (this.state.step == 0 ) ? CameraCoord.length - 1 : this.state.step - 1

        let prevPos = CameraCoord[prev].position
        let prevRot = CameraCoord[prev].rotation

        let presPos = CameraCoord[pres].position
        let presRot = CameraCoord[pres].rotation
    
            this.setState({
                'camera': {
                    'position': [
                        prevPos[0] + (presPos[0] - prevPos[0]) * this.state.progress, 
                        prevPos[1] + (presPos[1] - prevPos[1]) * this.state.progress, 
                        prevPos[2] + (presPos[2] - prevPos[2]) * this.state.progress
                    ],
                    'rotation': [
                        prevRot[0] + (presRot[0] - prevRot[0]) * this.state.progress, 
                        prevRot[1] + (presRot[1] - prevRot[1]) * this.state.progress, 
                        prevRot[2] + (presRot[2] - prevRot[2]) * this.state.progress, 
                    ]
                }
            })
          


          //console.log('step: ' + this.state.step + ', progress: ' + this.state.progress + ', Position. x: ' + this.state.camera.position[0] + ', y: ' + this.state.camera.position[1] + ', z: ' + this.state.camera.position[2])
          //console.log('Rotation. x: ' + this.state.camera.rotation[0] * 180 / Math.PI + ', y: ' + this.state.camera.rotation[1] * 180 / Math.PI + ', z: ' + this.state.camera.rotation[2] * 180 / Math.PI)
    }
    
   

    render() {
        return(
        <div style={{ display: "inline-flex", height: "100vh" }}>
            <div className="story">
                <div className="step" data-step="1" style = {{ 'width': '100%', 'height': '400vh', }}>
                    <div className="story__block" style={{ marginTop: '40vh' }}>
                        <h1>Формирование дорожных линий</h1>
                        <p>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                    </div>
                    <div className="story__block" style={{ marginTop: '100vh' }}>
                        <h1>Формирование дорожных линий</h1>
                        <p>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                    </div>
                    <div className="story__block" style={{ marginTop: '100vh' }}>
                        <h1>Формирование дорожных линий</h1>
                        <p>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                    </div>
                </div>
                <div className="step" data-step="2" style = {{ 'width': '100%', 'height': '300vh', }}>
                <div className="story__block" style={{ marginTop: '40vh' }}>
                        <h1>Формирование благоустройства</h1>
                        <p>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                    </div>
                    <div className="story__block" style={{ marginTop: '100vh' }}>
                        <h1>Формирование благоустройства</h1>
                        <p>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                    </div>
                    <div className="story__block" style={{ marginTop: '100vh' }}>
                        <h1>Формирование благоустройства</h1>
                        <p>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                    </div>
                </div>
                <div className="step" data-step="3" style = {{ 'width': '100%', 'height': '400vh', }}>
                <div className="story__block" style={{ marginTop: '40vh' }}>
                        <h1>Изменение функции и объема</h1>
                        <p>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                    </div>
                    <div className="story__block" style={{ marginTop: '100vh' }}>
                        <h1>Изменение функции и объема</h1>
                        <p>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                    </div>
                    <div className="story__block" style={{ marginTop: '100vh' }}>
                        <h1>Изменение функции и объема</h1>
                        <p>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                    </div>
                </div>
                <div className="step" data-step="4" style = {{ 'width': '100%', 'height': '100vh', }}></div>
                <div className="step" data-step="5" style = {{ 'width': '100%', 'height': '100vh', }}></div>
                <div className="step" data-step="6" style = {{ 'width': '100%', 'height': '100vh', }}></div>
            </div>
            <div className = "Map" style={{ position: 'fixed', 'width': '100vw', left: 0 }}>
                <ThreeRender position={ this.state.camera.position } rotation={ this.state.camera.rotation } step={this.state.step} progress={this.state.progress}/>
            </div>
        </div>
        )
    }
}

export default Elements