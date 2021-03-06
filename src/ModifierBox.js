import React from "react"
import "./ModifierBox.css"

export class ModifierBox extends React.Component {
    constructor(props) {
        super(props)
        this.modifier = props.modifier
        this.small_desc = props.small_desc
        if (typeof (this.props.className) == "string") this.cn = this.props.className + " sheet-modifier"
        else this.cn = "sheet-modifier"
        this.name = this.props.name || "";
    }
    render() {
        return (
            <div className={this.cn} style={this.props.style}>
                <div className="sheet-mod"><input name={this.name} type="number" defaultValue={Number(this.modifier) || this.modifier} disabled={true} /></div>
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
        this.name = this.props.name || "attr_";
        this.editable = this.props.editable || false;
        if (this.small_desc.toLowerCase() === "misc mod") {
            this.editable = true;
        }
    }
    render() {
        return (
            <div className={this.cn} style={this.props.style}>
                <div className="sheet-mod"><input type="number" defaultValue={this.modifier} disabled={!this.editable} name={this.name} /></div>
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
        this.name = this.props.name || "attr_"
        this.editable = this.props.editable || false;
        if (this.small_desc.toLowerCase().indexOf("misc") >= 0) {
            this.editable = true;
        }
    }
    render() {
        return (
            <div className={this.cn} style={this.props.style}>
                <p className="sheet-small">{this.small_desc} <br />mod</p>
                <input className="sheet-mod" type="number" defaultValue={this.modifier} disabled={!this.editable} name={this.name} />
            </div>
        )
    }
}