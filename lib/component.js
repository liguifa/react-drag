import React from "react";

export class Draggable extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            pos: {
                x: window.clientX - this.props.style.right ? parseInt(this.props.style.right) : 0,
                y: window.clientY - this.props.style.top ? parseInt(this.props.style.bottom) : 0
            }
        }
        this.vm = {
            status: 0, //0:正常  1:移动中 
            oldMousePos: {   //记录上一次的鼠标位置
                x: 0,
                y: 0
            }
        }
        this.startDrag = this.startDrag.bind(this);
        this.draggable = this.draggable.bind(this);
        this.endDrag = this.endDrag.bind(this);
    }

    render() {
        let position = this.props.type ? this.props.type : "absolute";
        let posStyle = this.vm.status == 1 ? { ...this.props.style, position: position, top: this.state.pos.y + "px", left: this.state.pos.x + "px" } : { ...this.props.style, position: position }
        return (
            <div onMouseDown={(e) => this.startDrag(e)} style={posStyle}>
                {this.props.children}
            </div>
        )
    }

    componentWillMount() {
        document.addEventListener("mousemove", this.draggable);
        document.addEventListener("mouseup", this.endDrag);
    }

    componentWillUnmount() {
        document.removeEventListener("mousemove", this.draggable);
        document.removeEventListener("mouseup", this.endDrag);
    }

    startDrag(e) {
        this.vm.status = 1;
        this.vm.oldMousePos = { x: e.clientX, y: e.clientY };
    }

    draggable(e) {
        if (this.vm.status == 1) {
            let mousePos = { x: e.clientX, y: e.clientY };
            let draggableDistance = { x: mousePos.x - this.vm.oldMousePos.x, y: mousePos.y - this.vm.oldMousePos.y };
            console.log(draggableDistance);
            this.setState({
                pos: {
                    x: this.state.pos.x + draggableDistance.x,
                    y: this.state.pos.y + draggableDistance.y,
                }
            });
        }
        this.vm.oldMousePos = { x: e.clientX, y: e.clientY };
    }

    endDrag(e) {
        this.vm.status = 0;
    }
}