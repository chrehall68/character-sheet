import React from 'react'
import "./Body.css"

import { ModifierBox, LargeModifierBox, LongModifierBox } from './ModifierBox'
import { LimitedTextarea } from './limitedTextarea'

class SmallAttr extends React.Component {
    constructor(props) {
        super(props)
        this.header = props.header
        this.small_desc = props.small_desc

        this.changeHandler = this.props.changeHandler || function (t) { console.log(t) }
    }

    render() {
        return (
            <span className='sheet-smallAttr'>
                <h4 className='sheet-header'>{this.header}</h4>
                <div className="sheet-contentRow">
                    <input name={"attr_raw_" + this.header.substring(this.header.indexOf("(") + 1, this.header.indexOf(")")).toLowerCase()} className="sheet-value" type="number" />
                    <ModifierBox small_desc={this.small_desc} className="sheet-attr_mod" style={{ "height": "44px" }}
                        name={"attr_" + this.header.substring(this.header.indexOf("(") + 1, this.header.indexOf(")")).toLowerCase() + "_mod"}
                        modifier={"(floor(@{raw_" + this.header.substring(this.header.indexOf("(") + 1, this.header.indexOf(")")).toLowerCase() + "}/2))"}
                    />
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

        this.number = this.props.number || 0;
        this.mods = this.props.mods
        this.small_descs = this.props.small_descs
        this.items = this.mods.map((element, index) => {
            if (this.small_descs[index] != null) {
                return <LargeModifierBox key={index} small_desc={this.small_descs[index]} modifier={element} name={"attr_" + this.small_descs[index].replace(" ", "_") + this.number} />
            }
            else return <h1>{this.modifier}</h1>
        });

        // add pluses and equals
        for (var i = 0; i < this.mods.length - 1; i++) {
            this.items.splice(i * 2 + 1, 0, <p key={"+" + i}>+</p>)
        }
        this.items.splice(this.items.length * 2 - 2, 0, <p key="=">=</p>)

        let calc_name = "";
        this.small_descs.forEach((val) => { calc_name += "(@{" + val.replace(" ", "_") + this.number + "})+" })
        calc_name = calc_name.substring(0, calc_name.lastIndexOf("+"));
        this.items.push(<ModifierBox key={this.items.length} style={{ width: "40px", height: "40 px" }} small_desc="" name={"attr_calculated" + this.number} modifier={calc_name} />)
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
            <HeaderCurMaxMod header="health" cur="1" max="25" mod="0" mod_label="Regen" curEditable={true} modEditable={true} maxEditable={true} curName="attr_cur_health" modName="attr_health_regen" maxName="attr_cur_health_max" />
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
        this.inputName = this.props.inputName || "";
    }

    render() {
        return <div className={this.className} >
            <input className="sheet-main" defaultValue={this.main} type="number" name={this.inputName} disabled={!this.editable} />
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
            <ChecksItem title="Interact" mod1name="acc" mod2name="misc" mod1val={this.accMod} mod2val="0" number={0} />
            <ChecksItem title="Talk" mod1name="spd" mod2name="misc" mod1val={this.spdMod} mod2val="0" number={1} />
            <ChecksItem title="Insight" mod1name="acc" mod2name="misc" mod1val={this.accMod} mod2val="0" number={2} />
            <ChecksItem title="Sneak" mod1name="MST" mod2name="misc" mod1val={this.mstMod} mod2val="0" number={3} />
            <ChecksItem title="Search" mod1name="MST" mod2name="misc" mod1val={this.mstMod} mod2val="0" number={4} />
            <ChecksItem title="Traverse" mod1name="SPD" mod2name="misc" mod1val={this.spdMod} mod2val="0" number={5} />
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

        this.number = props.number
        this.finalName = ""
        this.finalName = "(@{" + this.mod1name + this.number + "})+(@{" + this.mod2name + this.number + "})"
    }
    render() {
        return (
            <div className="sheet-checksItem">
                <h2 className='sheet-checksItemTitle'>{this.title}</h2>
                <LongModifierBox small_desc={this.mod1name} modifier={this.mod1val} className="sheet-val1" name={"attr_" + this.mod1name + this.number} />
                <p>+</p>
                <LongModifierBox small_desc={this.mod2name} modifier={this.mod2val} className="sheet-val2" name={"attr_" + this.mod2name + this.number} />
                <p>=</p>
                <LargeModifierBox small_desc="" name={"attr_calculatedLong" + this.number} modifier={this.finalName} className="sheet-val3" />
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
                <div className="sheet-die" >
                    <select name="attr_dtype" className="dtype">
                        <option value="d4">d4</option>
                        <option value="d6">d6</option>
                        <option value="d8">d8</option>
                        <option value="d10">d10</option>
                        <option value="d12">d12</option>
                    </select>
                </div>
                <ModifierBox className="sheet-dmgmd" name="attr_melee_dmgmd" modifier={"(@{dmg_mod})"} small_desc="+DMG" />
            </div>
        </div>
    }
}

class Grenades extends React.Component {
    render() {
        return <div className="sheet-grenades" style={this.props.style}>

            <div className='sheet-header'><h3>Grenades</h3></div>
            <div className="sheet-row1">
                <div className="sheet-type"><input type="text" name="attr_grenade_type"></input><p>TYPE</p></div>
                <div className="sheet-damage"><input type="number" name="attr_grenade_damage"></input><p>DAMAGE</p></div>
            </div>
            <div className="sheet-row2">
                <div className="sheet-info"><p>INFO</p><textarea name="attr_grenade_info" style={{ "resize": "none" }}></textarea></div>
                <div className='sheet-current'><input type="number" name="attr_grenade_current" /><p>CURRENT</p></div>
                <div className='sheet-max'><input type="number" name="attr_grenade_mx" /><p>MAX</p></div>
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
            <div className="sheet-txtbox"><input type="text" name="attr_potions_1" /></div>
            <div className="sheet-txtbox"><input type="text" name="attr_potions_2" /></div>
            <div className="sheet-txtbox"><input type="text" name="attr_potions_3" /></div>
            <div className="sheet-txtbox sheet-lockable"><input name="attr_potions_4" value={this.state.value1} type="text" onChange={(event) => { this.lock_text(1, event) }} /></div>
            <div className="sheet-txtbox sheet-lockable"><input name="attr_potions_5" value={this.state.value2} type="text" onChange={(event) => { this.lock_text(2, event) }} /></div>
        </div>
    }
}

class Shields extends React.Component {
    render() {
        return <div className="sheet-shields" style={this.props.style}>
            <div className='sheet-row1'>
                <HeaderCurMaxMod header="shields" cur="2" max="15" mod="5" mod_label="Recharge" style={{ border: "none" }} curEditable={true} modEditable={true} maxEditable={true} curName="attr_current_shields" modName="attr_shields_regen" maxName="attr_current_shields_max" />
            </div>
            <div className="sheet-row2" >
                <span className="sheet-shieldInput"><h5>shield type: </h5><p><input type="text" name="attr_shield_type" /></p></span>
                <span className="sheet-shieldInput"><h5>info: </h5><textarea name="attr_shield_info" style={{ resize: "none" }} /></span>
            </div>
        </div>
    }
}

class BARank extends React.Component {
    render() {
        return <div className="sheet-BARank">
            <div className="sheet-header"><h3>Baddass Rank</h3><input type="number" defaultValue={1} name="attr_BARank" /></div>
            <div className="sheet-tokens"><p>Badass Tokens</p><input type="number" name="attr_BATokens" /></div>
        </div>
    }
}

class Gold extends React.Component {
    render() {
        return <div className="sheet-gold" style={this.props.style}>
            <div className='sheet-header'><h3>Gold</h3></div>
            <div className='sheet-value'><input name='attr_goldVal' type="number" className="sheet-value" defaultValue={0} /></div>
        </div>
    }
}

class GunItem extends React.Component {
    constructor(props) {
        super(props)
        this.gun = props.gunName
        this.number = props.number
    }
    render() {
        return <label className="sheet-gunItem">
            <input type="checkbox" name={"attr_selected_gun" + this.number} />
            <img src={"https://raw.githubusercontent.com/chrehall68/character-sheet/main/public/images/" + this.gun.replace(" ", "%20") + ".png"} alt={this.gun} />
            <p>{this.gun.toUpperCase()}</p>
        </label>
    }
}
class FavoredGun extends React.Component {
    render() {
        return <div className='sheet-favoredGun' style={this.props.style}>
            <div className='sheet-header'><h4>Favored Gun</h4></div>
            <GunItem gunName='pistol' number={1} />
            <GunItem gunName='smg' number={2} />
            <GunItem gunName='combat rifle' number={3} />
            <GunItem gunName='shotgun' number={4} />
            <GunItem gunName='sniper' number={5} />
            <GunItem gunName='rocket launcher' number={6} />
        </div >
    }
}

class SkillsItem extends React.Component {
    constructor(props) {
        super(props)
        this.props = props;
        this.header = props.header;
        this.number = props.number;
    }

    render() {
        return <div className='sheet-item'>
            <div className='sheet-itemHeader'><input type="text" defaultValue={this.header} name={"attr_skillname_" + this.number} /></div>
            <div className='sheet-content'><textarea style={{ "resize": "none" }} defaultValue={this.props.children} name={"attr_skillcontent_" + this.number} /></div>
            <div className='sheet-level'>
                <input type="checkbox" title="level1" name={"attr_skillLevel" + this.number + "_1"} defaultValue="1" />
                <input type="checkbox" title="level3" name={"attr_skillLevel" + this.number + "_2"} defaultValue="1" />
                <input type="checkbox" title="level2" name={"attr_skillLevel" + this.number + "_3"} defaultValue="1" />
            </div>
        </div>
    }
}
class Skills extends React.Component {

    render() {
        return <div className='sheet-skills'>
            <div className='sheet-header'><h3>Skills</h3></div>
            <div className='sheet-itemWrapper'>
                <SkillsItem header="Quick Draw" number='1'>
                    +2 Initiative Mod/SL.<br />+1/SL on Interact Checks
                </SkillsItem>
                <SkillsItem header="Filled to The Brim" number='2'>
                    Increase max grenades by
                    1/SL. Increase max potions by 1+MST Mod
                </SkillsItem>
                <SkillsItem header="Incite" number='3'>
                    The first time you take
                    Damage during an encounter,
                    gain Extra Movement.
                    +1/SL on Traverse Checks.
                </SkillsItem>
                <SkillsItem header="Hard to Kill" number='4'>
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
            <h3>Archetype Feat</h3>
            <textarea name='attr_archetypeFeat' style={{ resize: 'none' }} />
        </div>
    }
}

class XPBar extends React.Component {
    constructor(props) {
        super(props)
        this.state = { xp: this.props.xp || 0, maxXp: this.props.maxXp || 100 }
    }

    updateBar = (event) => {
        this.setState({ xp: event.target.value, maxXp: this.state.maxXp });
    }
    updateBarMax = (event) => {
        this.setState({ xp: this.state.xp, maxXp: event.target.value });
    }

    render() {
        return <div className="sheet-xpbar">
            <div className='sheet-xpstuff' >
                <h5 className='sheet-lbel'>XP Bar</h5>
                <div className="sheet-curMax">
                    <label className="sheet-content" ><p>Cur:</p><input name="attr_curxp" type="number" value={this.state.xp} onChange={this.updateBar} /></label>
                    <label className='sheet-content' ><p>Max:</p><input name="attr_maxxp" type="number" value={this.state.maxXp} onChange={this.updateBarMax} /></label>
                </div>
            </div>
            <div className="sheet-barstuff">
                <input name="attr_curxpholder" type='hidden' disabled='true' defaultValue={"(@{curxpval})"} className="sheet-valholder sheet-hidden" />
                <div className='sheet-bar' key={[this.state.xp, this.state.maxXp]} />
            </div>
        </div>
    }

}

export class Body extends React.Component {
    render() {
        return (
            <div className="sheet-body">
                <SmallAttr header="Accuracy (ACC)" small_desc="mod" />
                <SmallAttr header="Damage (DMG)" small_desc="mod" />
                <SmallAttr header="Speed (SPD)" small_desc="mod" />
                <SmallAttr header="Mastery (MST)" small_desc="mod" />

                <LongAttrHeader title="Initiative" header_rows="2" />
                <LongAttr mods={["(@{BARank})", "(@{spd_mod})", 0]} small_descs={["Baddass Rank", "SPD Mod", "MISC Mod"]} number={0} />

                <GunBar>Current Gun</GunBar>
                <GunBar>Gun Slot 2</GunBar>
                <GunBar>Gun Slot 3</GunBar>

                <LongAttrHeader title="Movement" header_rows="1" style={{ gridColumn: "9/span 2", gridrow: "5 / span 2" }} />
                <LongAttr mods={[3, "(@{spd_mod})", 0]} small_descs={["static mod", "SPD Mod", "MISC Mod"]} style={{ gridColumn: "11 / span 4" }} number={1} />

                <Health style={{ gridRow: "7/span 4" }} />

                <Checks style={{ gridRow: "7/span 15" }} spdMod="(@{spd_mod})" mstMod="(@{mst_mod})" accMod="(@{acc_mod})" />

                <Melee style={{ gridRow: "9/span 4" }} />

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