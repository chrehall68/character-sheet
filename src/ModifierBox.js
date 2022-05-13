import React from "react"
import "./ModifierBox.css"

export class ModifierBox extends React.Component {
    constructor(props) {
        super(props)
        this.modifier = props.modifier
        this.small_desc = props.small_desc
        if (typeof (this.props.className) == "string") this.cn = this.props.className + " modifier"
        else this.cn = "modifier"
    }
    render() {
        return (
            <span className={this.cn} style={this.props.style}>
                <div className="mod"><p>{this.modifier}</p></div>
                <p className="small">{this.small_desc}</p>
            </span>)
    }
}

export class LargeModifierBox extends React.Component {
    constructor(props) {
        super(props)
        this.modifier = props.modifier
        this.small_desc = props.small_desc
        if (typeof (this.props.className) == "string") this.cn = this.props.className + " largeModifier"
        else this.cn = "largeModifier"
    }
    render() {
        return (
            <span className={this.cn} style={this.props.style}>
                <p className="mod">{this.modifier}</p>
                <p className="small">{this.small_desc}</p>
            </span>)
    }
}

export class LongModifierBox extends React.Component {
    constructor(props) {
        super(props)
        this.modifier = props.modifier
        this.small_desc = props.small_desc
        if (typeof (this.props.className) == "string") this.cn = this.props.className + " longModifier"
        else this.cn = "longModifier"
    }
    render() {
        return (
            <span className={this.cn} style={this.props.style}>
                <p className="mod">{this.modifier}</p>
                <p className="small">{this.small_desc} <br />mod</p>
            </span>
        )
    }
}