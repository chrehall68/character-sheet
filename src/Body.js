import React from 'react'
import "./Body.css"

import { ModifierBox, LargeModifierBox, LongModifierBox } from './ModifierBox'

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
        return <h2 style={this.props.style} className={this.header_class + " longAttrHeader"}>{this.title}</h2>
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
                return <LargeModifierBox style={{ float: "left", margin: "auto auto" }} small_desc={this.small_descs[index]} modifier={element} />
            }
            else return <h1>{this.modifier}</h1>
        });

        // add pluses and equals
        for (var i = 0; i < this.mods.length - 1; i++) {
            this.items.splice(i * 2 + 1, 0, <p>+</p>)
        }
        this.items.splice(this.items.length * 2 - 2, 0, <p>=</p>)

        // get total for the last box
        let total = 0
        this.mods.forEach((element) => { if (typeof (element) == "number") total += element })
        this.items.push(<ModifierBox style={{ float: "left", margin: "auto auto", width: "40px", height: "40 px" }} small_desc="" modifier={"+" + total} />)
    }

    render() {
        return <div className="longAttr" style={this.props.style}>
            {this.items}
        </div>
    }
}

class Health extends React.Component {
    render() {
        return <HeaderCurMaxMod header="health" cur="1" max="25" oth="_" oth_label="Regen" style={this.props.style} />
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
        return <div className='headerCurMaxMod' style={this.props.style}>
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

    render() {
        return <div className="checks" style={this.props.style}>
            <p className="header">Checks</p>
            <ChecksItem title="Interact" mod1name="acc" mod2name="misc" mod1val="1" mod2val="0" />
            <ChecksItem title="Talk" mod1name="spd" mod2name="misc" mod1val="1" mod2val="0" />
            <ChecksItem title="Insight" mod1name="acc" mod2name="misc" mod1val="1" mod2val="0" />
            <ChecksItem title="Sneak" mod1name="MST" mod2name="misc" mod1val="1" mod2val="0" />
            <ChecksItem title="Search" mod1name="MST" mod2name="misc" mod1val="1" mod2val="0" />
            <ChecksItem title="Traverse" mod1name="SPD" mod2name="misc" mod1val="2" mod2val="0" />
        </div>
    }
}
class ChecksItem extends React.Component {
    constructor(props) {
        super(props)
        this.title = this.props.title
        this.mod1name = this.props.mod1name
        this.mod2name = this.props.mod2name
        this.mod1val = this.props.mod1val
        this.mod2val = this.props.mod2val

        this.finalVal = `${Number(this.mod1val) + Number(this.mod2val)}`
        this.finalVal = (this.finalVal >= 0 ? "+" + this.finalVal : "" + this.finalVal)
    }
    render() {
        return (
            <div className="checksItem">
                <h2 className='ChecksItemTitle'>{this.title}</h2>
                <LongModifierBox small_desc={this.mod1name} modifier={this.mod1val} className="val1" style={{ height: "40px" }} />
                <p className="plus">+</p>
                <LongModifierBox small_desc={this.mod2name} modifier={this.mod2val} className="val2" style={{ height: "40px" }} />
                <p className="equals">=</p>
                <LargeModifierBox small_desc="" modifier={this.finalVal} className="val3" style={{ height: "40px" }} />
            </div>
        )
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

                <LongAttrHeader title="Movement" header_rows="1" style={{ gridColumn: "9/span 2", gridrow: "5 / span 2" }} />
                <LongAttr mods={[3, 2, "_"]} small_descs={["static mod", "SPD Mod", "MISC Mod"]} style={{ gridColumn: "11 / span 4" }} />

                <Health style={{ gridRow: "7/span 4" }} />
                <Checks style={{ gridRow: "7/span 15" }} />

            </div>
        )
    }
}