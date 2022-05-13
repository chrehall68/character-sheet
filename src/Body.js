import React from 'react'
import "./Body.css"

import { ModifierBox, LargeModifierBox, LongModifierBox } from './ModifierBox'
import { Editable } from './Editable'
import { LimitedTextarea } from './limitedTextarea'

class SmallAttr extends React.Component {
    constructor(props) {
        super(props)
        this.header = props.header
        this.small_desc = props.small_desc

        this.state = { value: props.value, modifier: props.value / 2 }
    }

    getModifier = (event) => {
        if (Math.abs(event.target.value) < 1000) { this.setState({ value: event.target.value, modifier: event.target.value / 2 }, () => console.log(this.state)) }
        else { this.setState({ value: 999 * Math.sign(event.target.value), modifier: 999 * Math.sign(event.target.value) / 2 }, () => console.log(this.state)) }
    }

    render() {
        return (
            <span className='smallAttr'>
                <h4 className='header'>{this.header}</h4>
                <div className="contentRow">
                    <input className="value" type="number" value={this.state.value} onChange={this.getModifier} />
                    <ModifierBox key={this.state.modifier} small_desc={this.small_desc} modifier={this.state.modifier} className="attr_mod" />
                </div>
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
                return <LargeModifierBox key={index} style={{ float: "left", margin: "auto auto" }} small_desc={this.small_descs[index]} modifier={element} />
            }
            else return <h1>{this.modifier}</h1>
        });

        // add pluses and equals
        for (var i = 0; i < this.mods.length - 1; i++) {
            this.items.splice(i * 2 + 1, 0, <p key={"+" + i}>+</p>)
        }
        this.items.splice(this.items.length * 2 - 2, 0, <p key="=">=</p>)

        // get total for the last box
        let total = 0
        this.mods.forEach((element) => { if (typeof (element) == "number") total += element })
        this.items.push(<ModifierBox key={this.items.length} style={{ float: "left", margin: "auto auto", width: "40px", height: "40 px" }} small_desc="" modifier={"+" + total} />)
    }

    render() {
        return <div className="longAttr" style={this.props.style}>
            {this.items}
        </div>
    }
}

class Health extends React.Component {
    render() {
        return <div className='health' style={this.props.style}>
            <HeaderCurMaxMod header="health" cur="1" max="25" mod="0" mod_label="Regen" curEditable={true} modEditable={true} />
        </div>
    }
}
class HeaderCurMaxMod extends React.Component {
    constructor(props) {
        super(props)
        this.cur = this.props.cur
        this.header = this.props.header
        this.max = this.props.max
        this.mod = this.props.mod
        this.mod_label = this.props.mod_label
        this.className = ""
        if (typeof (this.props.className) == "string") this.className = this.props.className

        this.curEditable = this.props.curEditable || false;
        this.maxEditable = this.props.maxEditable || false;
        this.modEditable = this.props.modEditable || false;
    }

    render() {
        return <div className='headerCurMaxMod' style={this.props.style}>
            <h3 className="header">{this.header}</h3>
            <div className="contentRow" >
                <MainAndLabelBox className="current" main={this.cur} label="current" editable={this.curEditable} />
                <MainAndLabelBox className="max" main={this.max} label="max" editable={this.maxEditable} />
                <MainAndLabelBox className="mod" main={this.mod} label={this.mod_label} editable={this.modEditable} />
            </div>
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
        this.editable = this.props.editable || false;
    }

    render() {
        return <span className={this.className} >
            {!this.editable && <p className="main" > {this.main}</p >}
            {this.editable && <input className="main" defaultValue={this.main} type="number" />}
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
                <h2 className='checksItemTitle'>{this.title}</h2>
                <LongModifierBox small_desc={this.mod1name} modifier={this.mod1val} className="val1" />
                <p>+</p>
                <LongModifierBox small_desc={this.mod2name} modifier={this.mod2val} className="val2" />
                <p>=</p>
                <LargeModifierBox small_desc="" modifier={this.finalVal} className="val3" />
            </div>
        )
    }
}

class Melee extends React.Component {
    render() {
        return <div className='melee' style={this.props.style}>
            <h3 className="header">Melee Die</h3>
            <MainAndLabelBox main="1d10" label="" className="die" />
            <ModifierBox className="mod" modifier="+3" small_desc="+DMG" />
        </div>
    }
}

class Grenades extends React.Component {
    render() {
        return <div className="grenades" style={this.props.style}>

            <div className='header'><h3>Grenades</h3></div>
            <div className="row1">
                <div className="type"><input type="text"></input><p>TYPE</p></div>
                <div className="damage"><input type="number"></input><p>DAMAGE</p></div>
            </div>
            <div className="row2">
                <div className="info"><p>INFO</p><textarea style={{ "resize": "none" }}></textarea></div>
                <div className='current'><input type="number" /><p>CURRENT</p></div>
                <div className='max'><input type="number" /><p>MAX</p></div>
            </div>
        </div>
    }
}

class Potions extends React.Component {
    constructor(props) {
        super(props)
        this.state = { value1: "\t", value2: "\t" }
    }
    lock_text = (box, event) => {
        if (box === 1) {
            if (event.target.value.length !== 0 && event.target.value[0] === "\t") {
                this.setState({ value1: event.target.value, value2: this.state.value2 })
            }
            else {
                this.setState({ value1: "\t", value2: this.state.value2 })
            }
        }
        else {
            if (event.target.value.length !== 0 && event.target.value[0] === "\t") {
                this.setState({ value1: this.state.value1, value2: event.target.value })
            }
            else {
                this.setState({ value1: this.state.value1, value2: "\t" })
            }
        }
    }
    render() {
        return <div className="potions" style={this.props.style}>
            <div className="header"><h3>Potions</h3></div>
            <div className="txtbox"><input type="text" /></div>
            <div className="txtbox"><input type="text" /></div>
            <div className="txtbox"><input type="text" /></div>
            <div className="txtbox lockable"><input value={this.state.value1} type="text" onChange={(event) => { this.lock_text(1, event) }} /></div>
            <div className="txtbox lockable"><input value={this.state.value2} type="text" onChange={(event) => { this.lock_text(2, event) }} /></div>
        </div>
    }
}

class Shields extends React.Component {
    render() {
        return <div className="shields" style={this.props.style}>
            <div className='row1'>
                <HeaderCurMaxMod header="shields" cur="2" max="15" mod="5" mod_label="Recharge" style={{ border: "none" }} curEditable={true} />
            </div>
            <div className="row2" >
                <span className="shieldInput"><h5>shield type: </h5><p><Editable callback={() => { console.log("no") }} /></p></span>
                <span className="shieldInput"><h5>info: </h5><textarea style={{ resize: "none" }} /></span>
            </div>
        </div>
    }
}

class BARank extends React.Component {
    render() {
        return <div className="BARank">
            <div className="header"><h3>Baddass Rank</h3><input type="number" defaultValue={1} /></div>
            <div className="tokens"><p>Badass Tokens</p><input type="number" /></div>
        </div>
    }
}

class Gold extends React.Component {
    render() {
        return <div className="gold" style={this.props.style}>
            <div className='header'><h3>Gold</h3></div>
            <div className='value'><input title='goldVal' type="number" className="value" defaultValue={0} /></div>
        </div>
    }
}

class GunItem extends React.Component {
    constructor(props) {
        super(props)
        this.gun = props.gunName
    }
    render() {
        return <label className="gunItem">
            <input type="checkbox" />
            <img src={"images/" + this.gun + ".png"} alt={this.gun} />
            <p>{this.gun.toUpperCase()}</p>
        </label>
    }
}
class FavoredGun extends React.Component {
    render() {
        return <div className='favoredGun' style={this.props.style}>
            <div className='header'><h4>Favored Gun</h4></div>
            <GunItem gunName='pistol' />
            <GunItem gunName='smg' />
            <GunItem gunName='combat rifle' />
            <GunItem gunName='shotgun' />
            <GunItem gunName='sniper' />
            <GunItem gunName='rocket launcher' />
        </div >
    }
}

class SkillsItem extends React.Component {
    constructor(props) {
        super(props)
        this.props = props;
        this.header = props.header;
    }

    render() {
        return <div className='item'>
            <div className='itemHeader'>{this.header}</div>
            <div className='content'>{this.props.children}</div>
            <div className='level'>
                <input type="checkbox" title="level1" name="skillLevel" />
                <input type="checkbox" title="level3" name="skillLevel" />
                <input type="checkbox" title="level2" name="skillLevel" />
            </div>
        </div>
    }
}
class Skills extends React.Component {

    render() {
        return <div className='skills'>
            <div className='header'><h3>Skills</h3></div>
            <div className='itemWrapper'>
                <SkillsItem header="Quick Draw">
                    +2 Initiative Mod/SL.<br />+1/SL on Interact Checks
                </SkillsItem>
                <SkillsItem header="Filled to The Brim">
                    Increase max grenades by
                    1/SL. Increase max potions by 1+MST Mod
                </SkillsItem>
                <SkillsItem header="Incite">
                    The first time you take
                    Damage during an encounter,
                    gain Extra Movement.
                    +1/SL on Traverse Checks.
                </SkillsItem>
                <SkillsItem header="Hard to Kill">
                    10+MST Mod Health.<br />
                    +5 Health Regen/SL.
                </SkillsItem>

            </div>

        </div>
    }
}

class BGandTraits extends React.Component {
    render() {
        return <div className='bgtraits'>
            <div className="header"><h3>Background & Traits</h3></div>
            <div className="bgbox">
                <div className="bgbar"><p>Background</p></div>
                <div className="bginfo"><LimitedTextarea maxLines={5} style={{ "resize": "none" }} /></div>
            </div>
            <div className="traitsbox">
                <div className="traitsbar"><p>Traits</p></div>
                <div className="traitsinfo"><LimitedTextarea maxLines={5} style={{ "resize": "none" }} /></div>
            </div>
        </div>
    }
}

class ArchetypeFeat extends React.Component {
    constructor(props) {
        super(props)
        this.props = props
    }
    render() {
        return <div className='archetypeFeat'>
            <div className='header'><h3>Archetype Feat</h3></div>
            <div className='content'><p id="title">{this.props.title}</p><p>: {this.props.children}</p></div>
        </div>
    }
}

export class Body extends React.Component {
    render() {
        return (
            <div className="body">
                <SmallAttr header="Accuracy (ACC)" value="4" small_desc="mod" />
                <SmallAttr header="Damage (DMG)" value="6" small_desc="mod" />
                <SmallAttr header="Speed (SPD)" value="4" small_desc="mod" />
                <SmallAttr header="Mastery (MST)" value="2" small_desc="mod" />

                <LongAttrHeader title="Initiative" header_rows="2" />
                <LongAttr mods={[1, 2, "_"]} small_descs={["Baddass Rank", "SPD Mod", "MISC Mod"]} />

                <GunBar>Current Gun</GunBar>
                <GunBar>Gun Slot 2</GunBar>
                <GunBar>Gun Slot 3</GunBar>

                <LongAttrHeader title="Movement" header_rows="1" style={{ gridColumn: "9/span 2", gridrow: "5 / span 2" }} />
                <LongAttr mods={[3, 2, "_"]} small_descs={["static mod", "SPD Mod", "MISC Mod"]} style={{ gridColumn: "11 / span 4" }} />

                <Health style={{ gridRow: "7/span 4" }} />
                <Checks style={{ gridRow: "7/span 15" }} />
                <Melee style={{ gridRow: "9/span 4" }} />
                <Shields style={{ gridRow: "11 / span 7" }} />
                <Grenades />
                <Potions />
                <BARank />
                <Gold style={{ gridRow: "13/ span 3" }} />
                <Skills />
                <BGandTraits />
                <FavoredGun />
                <ArchetypeFeat title="FLEX">
                    The first time your Shields
                    are depleted in an encounter, gain 1 Badass Token.
                </ArchetypeFeat>
            </div>
        )
    }
}