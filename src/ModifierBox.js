import React from "react"
import "./ModifierBox.css"

export class ModifierBox extends React.Component {
    constructor(props) {
        super(props)
        this.modifier = props.modifier
        this.small_desc = props.small_desc
        if (typeof (this.props.className) == "string") this.cn = this.props.className + " sheet-modifier"
        else this.cn = "sheet-modifier"
    }
    render() {
        return (
            <div className={this.cn} style={this.props.style}>
                <div className="sheet-mod"><p>{this.modifier}</p></div>
                <p className="sheet-small">{this.small_desc}</p>
            </div>)
    }
}

export class LargeModifierBox extends React.Component {
    constructor(props) {
        super(props)
        this.modifier = props.modifier
        this.small_desc = props.small_desc
        if (typeof (this.props.className) == "string") this.cn = this.props.className + " sheet-largeModifier"
        else this.cn = "sheet-largeModifier"
    }
    render() {
        return (
            <div className={this.cn} style={this.props.style}>
                <div className="sheet-mod"><p>{this.modifier}</p></div>
                {this.small_desc !== "" && <div className="sheet-small"><p>{this.small_desc}</p></div>}
            </div>)
    }
}

export class LongModifierBox extends React.Component {
    constructor(props) {
        super(props)
        this.modifier = props.modifier
        this.small_desc = props.small_desc
        if (typeof (this.props.className) == "string") this.cn = this.props.className + " sheet-longModifier"
        else this.cn = "sheet-longModifier"
    }
    render() {
        return (
            <div className={this.cn} style={this.props.style}>
                <p className="sheet-mod">{this.modifier}</p>
                <p className="sheet-small">{this.small_desc} <br />mod</p>
            </div>
        )
    }
}