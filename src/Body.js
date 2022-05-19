import React from 'react'
import "./Body.css"

import { ModifierBox, LargeModifierBox, LongModifierBox } from './ModifierBox'
import { Editable } from './Editable'
import { LimitedTextarea } from './limitedTextarea'
import { wait } from '@testing-library/user-event/dist/utils'

class SmallAttr extends React.Component {
    constructor(props) {
        super(props)
        this.header = props.header
        this.small_desc = props.small_desc

        this.state = { value: props.value, modifier: props.value / 2 }
        this.changeHandler = this.props.changeHandler || function (t) { console.log(t) }
    }

    getModifier = (event) => {
        if (Math.abs(event.target.value) < 1000) { this.setState({ value: event.target.value, modifier: event.target.value / 2 }, () => this.changeHandler(this)) }
        else { this.setState({ value: 999 * Math.sign(event.target.value), modifier: 999 * Math.sign(event.target.value) / 2 }, () => this.changeHandler(this)) }
    }

    render() {
        return (
            <span className='sheet-smallAttr'>
                <h4 className='sheet-header'>{this.header}</h4>
                <div className="sheet-contentRow">
                    <input name={"raw_" + this.header.substring(this.header.indexOf("(") + 1, this.header.indexOf(")")).toLowerCase()} className="sheet-value" type="number" value={this.state.value} onChange={this.getModifier} />
                    <ModifierBox key={this.state.modifier} small_desc={this.small_desc} modifier={this.state.modifier} className="sheet-attr_mod" style={{ "height": "44px" }} />
                </div>
            </span>)
    }
}

class GunBar extends React.Component {
    render() {
        return <span className='sheet-gunBar'><p >{this.props.children}</p></span>
    }
}

class LongAttrHeader extends React.Component {
    constructor(props) {
        super(props)
        if (this.props.header_rows === "1") this.header_class = "sheet-oneRow"
        else this.header_class = "sheet-twoRow"
        this.title = this.props.title
    }
    render() {
        return <h2 style={this.props.style} className={this.header_class + " sheet-longAttrHeader"}>{this.title}</h2>
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
                return <LargeModifierBox key={index} small_desc={this.small_descs[index]} modifier={element} />
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
        this.items.push(<ModifierBox key={this.items.length} style={{ width: "40px", height: "40 px" }} small_desc="" modifier={"+" + total} />)
    }

    render() {
        return <div className="sheet-longAttr" style={this.props.style}>
            {this.items}
        </div>
    }
}

class Health extends React.Component {
    render() {
        return <div className='sheet-health' style={this.props.style}>
            <HeaderCurMaxMod header="health" cur="1" max="25" mod="0" mod_label="Regen" curEditable={true} modEditable={true} curName="attr_cur_health" modName="attr_health_regen" />
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

        this.curName = this.props.curName || "";
        this.maxName = this.props.maxName || "";
        this.modName = this.props.modName || "";
    }

    render() {
        return <div className='sheet-headerCurMaxMod' style={this.props.style}>
            <h3 className="sheet-header">{this.header}</h3>
            <div className="sheet-contentRow" >
                <MainAndLabelBox className="sheet-current" main={this.cur} label="current" editable={this.curEditable} inputName={this.curName} />
                <MainAndLabelBox className="sheet-max" main={this.max} label="max" editable={this.maxEditable} inputName={this.maxName} />
                <MainAndLabelBox className="sheet-mod" main={this.mod} label={this.mod_label} editable={this.modEditable} inputName={this.modName} />
            </div>
        </div>
    }
}
class MainAndLabelBox extends React.Component {
    constructor(props) {
        super(props)
        this.main = props.main
        this.label = props.label
        this.className = "sheet-mainAndLabelBox"
        if (typeof (this.props.className) == "string") this.className += " " + this.props.className
        this.editable = this.props.editable || false;
        this.inputName = this.props.editable ? (this.props.inputName || "") : "";
    }

    render() {
        return <div className={this.className} >
            {!this.editable && <p className="sheet-main" > {this.main}</p >}
            {this.editable && <input className="sheet-main" defaultValue={this.main} type="number" name={this.inputName} />}
            <p className="sheet-lbel">{this.label}</p>
        </div>
    }
}

class Checks extends React.Component {
    constructor(props) {
        super(props)
        this.spdMod = props.spdMod;
        this.accMod = props.accMod;
        this.mstMod = props.mstMod;
    }

    render() {
        // the lists in the keys are merely to provide stability to the key system
        // by making each key unique
        return <div className="sheet-checks" style={this.props.style}>
            <p className="sheet-header">Checks</p>
            <ChecksItem title="Interact" mod1name="acc" mod2name="misc" mod1val={this.accMod} mod2val="0" key={[this.accMod, 0]} />
            <ChecksItem title="Talk" mod1name="spd" mod2name="misc" mod1val={this.spdMod} mod2val="0" key={[this.spdMod, 1]} />
            <ChecksItem title="Insight" mod1name="acc" mod2name="misc" mod1val={this.accMod} mod2val="0" key={[this.accMod, 2]} />
            <ChecksItem title="Sneak" mod1name="MST" mod2name="misc" mod1val={this.mstMod} mod2val="0" key={[this.mstMod, 3]} />
            <ChecksItem title="Search" mod1name="MST" mod2name="misc" mod1val={this.mstMod} mod2val="0" key={[this.mstMod, 4]} />
            <ChecksItem title="Traverse" mod1name="SPD" mod2name="misc" mod1val={this.spdMod} mod2val="0" key={[this.spdMod, 5]} />
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
            <div className="sheet-checksItem">
                <h2 className='sheet-checksItemTitle'>{this.title}</h2>
                <LongModifierBox small_desc={this.mod1name} modifier={this.mod1val} className="sheet-val1" />
                <p>+</p>
                <LongModifierBox small_desc={this.mod2name} modifier={this.mod2val} className="sheet-val2" />
                <p>=</p>
                <LargeModifierBox small_desc="" modifier={this.finalVal} className="sheet-val3" />
            </div>
        )
    }
}

class Melee extends React.Component {
    constructor(props) {
        super(props)
        this.mod = props.mod
    }
    render() {
        return <div className='sheet-melee' style={this.props.style}>
            <h3 className="sheet-header">Melee Die</h3>
            <div className='sheet-row1'>
                <MainAndLabelBox main="1d10" label="" className="sheet-die" />
                <ModifierBox className="sheet-dmgmd" modifier={"+" + this.mod} small_desc="+DMG" />
            </div>
        </div>
    }
}

class Grenades extends React.Component {
    render() {
        return <div className="sheet-grenades" style={this.props.style}>

            <div className='sheet-header'><h3>Grenades</h3></div>
            <div className="sheet-row1">
                <div className="sheet-type"><input type="text"></input><p>TYPE</p></div>
                <div className="sheet-damage"><input type="number"></input><p>DAMAGE</p></div>
            </div>
            <div className="sheet-row2">
                <div className="sheet-info"><p>INFO</p><textarea style={{ "resize": "none" }}></textarea></div>
                <div className='sheet-current'><input type="number" /><p>CURRENT</p></div>
                <div className='sheet-max'><input type="number" /><p>MAX</p></div>
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
        return <div className="sheet-potions" style={this.props.style}>
            <div className="sheet-header"><h3>Potions</h3></div>
            <div className="sheet-txtbox"><input type="text" /></div>
            <div className="sheet-txtbox"><input type="text" /></div>
            <div className="sheet-txtbox"><input type="text" /></div>
            <div className="sheet-txtbox sheet-lockable"><input value={this.state.value1} type="text" onChange={(event) => { this.lock_text(1, event) }} /></div>
            <div className="sheet-txtbox sheet-lockable"><input value={this.state.value2} type="text" onChange={(event) => { this.lock_text(2, event) }} /></div>
        </div>
    }
}

class Shields extends React.Component {
    render() {
        return <div className="sheet-shields" style={this.props.style}>
            <div className='sheet-row1'>
                <HeaderCurMaxMod header="shields" cur="2" max="15" mod="5" mod_label="Recharge" style={{ border: "none" }} curEditable={true} curName="attr_current_shields" />
            </div>
            <div className="sheet-row2" >
                <span className="sheet-shieldInput"><h5>shield type: </h5><p><Editable /></p></span>
                <span className="sheet-shieldInput"><h5>info: </h5><textarea style={{ resize: "none" }} /></span>
            </div>
        </div>
    }
}

class BARank extends React.Component {
    render() {
        return <div className="sheet-BARank">
            <div className="sheet-header"><h3>Baddass Rank</h3><input type="number" defaultValue={1} /></div>
            <div className="sheet-tokens"><p>Badass Tokens</p><input type="number" /></div>
        </div>
    }
}

class Gold extends React.Component {
    render() {
        return <div className="sheet-gold" style={this.props.style}>
            <div className='sheet-header'><h3>Gold</h3></div>
            <div className='sheet-value'><input name='goldVal' type="number" className="sheet-value" defaultValue={0} /></div>
        </div>
    }
}

class GunItem extends React.Component {
    constructor(props) {
        super(props)
        this.gun = props.gunName
    }
    render() {
        return <label className="sheet-gunItem">
            <input type="checkbox" />
            <img src={"https://raw.githubusercontent.com/chrehall68/character-sheet/main/public/images/" + this.gun.replace(" ", "%20") + ".png"} alt={this.gun} />
            <p>{this.gun.toUpperCase()}</p>
        </label>
    }
}
class FavoredGun extends React.Component {
    render() {
        return <div className='sheet-favoredGun' style={this.props.style}>
            <div className='sheet-header'><h4>Favored Gun</h4></div>
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
        return <div className='sheet-item'>
            <div className='sheet-itemHeader'>{this.header}</div>
            <div className='sheet-content'><textarea style={{ "resize": "none" }} defaultValue={this.props.children} /></div>
            <div className='sheet-level'>
                <input type="checkbox" title="level1" name="skillLevel" />
                <input type="checkbox" title="level3" name="skillLevel" />
                <input type="checkbox" title="level2" name="skillLevel" />
            </div>
        </div>
    }
}
class Skills extends React.Component {

    render() {
        return <div className='sheet-skills'>
            <div className='sheet-header'><h3>Skills</h3></div>
            <div className='sheet-itemWrapper'>
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
        return <div className='sheet-bgtraits'>
            <div className="sheet-header"><h3>Background & Traits</h3></div>
            <div className="sheet-bgbox">
                <div className="sheet-bgbar"><p>Background</p></div>
                <div className="sheet-bginfo"><LimitedTextarea maxLines={5} style={{ "resize": "none" }} /></div>
            </div>
            <div className="sheet-traitsbox">
                <div className="sheet-traitsbar"><p>Traits</p></div>
                <div className="sheet-traitsinfo"><LimitedTextarea maxLines={5} style={{ "resize": "none" }} /></div>
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
        return <div className='sheet-archetypeFeat'>
            <div className='sheet-header'><h3>Archetype Feat</h3></div>
            <div className='sheet-content'><p id="title">{this.props.title}</p><p>: {this.props.children}</p></div>
        </div>
    }
}

class XPBar extends React.Component {
    constructor(props) {
        super(props)
        this.XP_PER_BOX = 100
        this.BOXES = 10
        this.state = { xp: this.props.xp || 0 }
        this.good = true
    }

    updateBar = async (event) => {
        if (event.target.value < 0 || event.target.value > 1000) return;

        if (event.target.value < this.state.xp) {
            for (let i = this.state.xp; i >= event.target.value && this.good; i--) {
                this.setState({ xp: i })
                await wait(0.001)
            }
        }
        else {
            for (let i = this.state.xp; i <= event.target.value && this.good; i++) {
                this.setState({ xp: i })
                await wait(0.001)
            }
        }
    }

    componentWillUnmount() {
        this.good = false;
    }
    componentDidMount() {
        this.good = true;
    }

    render() {
        return <div className="sheet-xpbar">
            <div className='sheet-xpstuff' >
                <h5 className='sheet-lbel'>XP Bar</h5>
                <input className="sheet-content" type="number" value={this.props.xp} onChange={this.updateBar} />
            </div>
            <div className='sheet-bar'>
                <div key={this.state.xp} style={{ width: (this.state.xp / 100 * this.XP_PER_BOX / this.BOXES) + "%" }} />
            </div>
        </div>
    }

}

export class Body extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            spdMod: 0,
            accMod: 0,
            dmgMod: 0,
            mstMod: 0
        }
    }
    attrChangeHandler = (obj) => {
        if (obj.header === "Accuracy (ACC)") {
            this.setState({ spdMod: this.state.spdMod, accMod: obj.state.modifier, dmgMod: this.state.dmgMod, mstMod: this.state.mstMod })
        }
        if (obj.header === "Damage (DMG)") {
            this.setState({ spdMod: this.state.spdMod, accMod: this.state.accMod, dmgMod: obj.state.modifier, mstMod: this.state.mstMod })
        }
        if (obj.header === "Speed (SPD)") {
            this.setState({ spdMod: obj.state.modifier, accMod: this.state.accMod, dmgMod: this.state.dmgMod, mstMod: this.state.mstMod })
        }
        if (obj.header === "Mastery (MST)") {
            this.setState({ spdMod: this.state.spdMod, accMod: this.state.accMod, dmgMod: this.state.dmgMod, mstMod: obj.state.modifier })
        }
    }
    render() {
        return (
            <div className="sheet-body">
                <SmallAttr header="Accuracy (ACC)" value={this.state.accMod} small_desc="mod" changeHandler={this.attrChangeHandler} />
                <SmallAttr header="Damage (DMG)" value={this.state.dmgMod} small_desc="mod" changeHandler={this.attrChangeHandler} />
                <SmallAttr header="Speed (SPD)" value={this.state.spdMod} small_desc="mod" changeHandler={this.attrChangeHandler} />
                <SmallAttr header="Mastery (MST)" value={this.state.mstMod} small_desc="mod" changeHandler={this.attrChangeHandler} />

                <LongAttrHeader title="Initiative" header_rows="2" />
                <LongAttr mods={[1, this.state.spdMod, "_"]} small_descs={["Baddass Rank", "SPD Mod", "MISC Mod"]} key={[this.state.spdMod, 0]} />

                <GunBar>Current Gun</GunBar>
                <GunBar>Gun Slot 2</GunBar>
                <GunBar>Gun Slot 3</GunBar>

                <LongAttrHeader title="Movement" header_rows="1" style={{ gridColumn: "9/span 2", gridrow: "5 / span 2" }} />
                <LongAttr mods={[3, this.state.spdMod, "_"]} small_descs={["static mod", "SPD Mod", "MISC Mod"]} style={{ gridColumn: "11 / span 4" }}
                    key={[this.state.spdMod, 1]} />

                <Health style={{ gridRow: "7/span 4" }} />

                <Checks style={{ gridRow: "7/span 15" }} spdMod={this.state.spdMod}
                    accMod={this.state.accMod} mstMod={this.state.mstMod}
                    key={[this.state.accMod, this.state.dmgMod, this.state.spdMod, this.state.mstMod]} />

                <Melee style={{ gridRow: "9/span 4" }} key={this.state.dmgMod} mod={this.state.dmgMod} />

                <Shields style={{ gridRow: "11 / span 7" }} />

                <Grenades />

                <Potions />

                <BARank />

                <Gold style={{ gridRow: "17/ span 3" }} />

                <Skills />

                <BGandTraits />

                <FavoredGun />

                <ArchetypeFeat title="FLEX">
                    The first time your Shields
                    are depleted in an encounter, gain 1 Badass Token.
                </ArchetypeFeat>

                <XPBar />
            </div>
        )
    }
}