import React from 'react'
import "./Body.css"

import { ModifierBox, LargeModifierBox } from './ModifierBox'

class SmallAttr extends React.Component {
    constructor(props) {
        super(props)
        this.header = props.header
        this.value = props.value
        this.modifier = props.modifier
        this.small_desc = props.small_desc
    }

    render() {
        return (
            <span className='smallAttr'>
                <h4 className="header">{this.header}</h4>
                <h1 className="value">{this.value}</h1>
                <ModifierBox small_desc={this.small_desc} modifier={this.modifier} className="attr_mod" />
            </span>)
    }
}

class GunBar extends React.Component {
    render() {
        return <span className='gunBar'><p >{this.props.children}</p></span>
    }
}

class LongAttrHeader extends React.Component {
    constructor(props) {
        super(props)
        if (this.props.header_rows === "1") this.header_class = "oneRow"
        else this.header_class = "twoRow"
        this.title = this.props.title
    }
    render() {
        return <h2 className={this.header_class + " longAttrHeader"}>{this.title}</h2>
    }
}
class LongAttr extends React.Component {

    /**
     * 
     * @param {*} props - include mods (array), small_descs (array)
     */
    constructor(props) {
        super(props)

        this.mods = this.props.mods
        this.small_descs = this.props.small_descs
        this.items = this.mods.map((element, index) => {
            if (this.small_descs[index] != null) {
                return <LargeModifierBox style={{ float: "left", margin: "auto 0.5px" }} small_desc={this.small_descs[index]} modifier={element} />
            }
            else return <h1>{this.modifier}</h1>
        });
        let total = 0
        this.mods.forEach((element) => { if (typeof (element) == "number") total += element })
        this.items.push(<LargeModifierBox style={{ float: "left", margin: "auto 0.5px" }} small_desc="" modifier={"+" + total} />)
    }

    render() {
        return <div className="longAttr">
            {this.items}
        </div>
    }
}

class Health extends React.Component {
    render() {
        return <HeaderCurMaxMod header="health" cur="1" max="25" oth="_" oth_label="Regen" />
    }
}
class HeaderCurMaxMod extends React.Component {
    constructor(props) {
        super(props)
        this.cur = this.props.cur
        this.header = this.props.header
        this.max = this.props.max
        this.mod = this.props.mod
        this.oth = this.props.oth
        this.oth_label = this.props.oth_label
    }

    render() {
        return <div className='headerCurMaxMod'>
            <h3 className="header">{this.header}</h3>
            <MainAndLabelBox className="current" main={this.cur} label="current" />
            <MainAndLabelBox className="max" main={this.max} label="max" />
            <MainAndLabelBox className="mod" main={this.oth} label={this.oth_label} />
        </div>
    }
}
class MainAndLabelBox extends React.Component {
    constructor(props) {
        super(props)
        this.main = props.main
        this.label = props.label
        this.className = "mainAndLabelBox"
        if (typeof (this.props.className) == "string") this.className += " " + this.props.className
    }

    render() {
        return <span className={this.className} >
            <p className="main" > {this.main}</p >
            <p className="label">{this.label}</p>
        </span >
    }
}

class Checks extends React.Component {
    constructor(props) {
        super(props)
        // todo
    }

    render() {
        return <div></div>
    }
}

export class Body extends React.Component {
    render() {
        return (
            <div className="body">
                <SmallAttr header="Accuracy (ACC)" value="2" modifier="+1" small_desc="mod" />
                <SmallAttr header="Damage (DMG)" value="6" modifier="+3" small_desc="mod" />
                <SmallAttr header="Speed (SPD)" value="4" modifier="+2" small_desc="mod" />
                <SmallAttr header="Mastery (MST)" value="2" modifier="+1" small_desc="mod" />

                <LongAttrHeader title="Initiative" header_rows="2" />
                <LongAttr mods={[1, 2, "_"]} small_descs={["Baddass Rank", "SPD Mod", "MISC Mod"]} />

                <GunBar>Current Gun</GunBar>

                <Health />
            </div>
        )
    }
}