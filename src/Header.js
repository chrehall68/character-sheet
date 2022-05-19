import React from 'react'
import { ModifierBox } from './ModifierBox'

import "./Header.css"

class Item extends React.Component {
    constructor(props) {
        super(props)
        this.box_label = props.box_label
        this.main_content = props.main_content
        if (typeof (this.props.className) != "string") this.cn = "sheet-item"
        else this.cn = "sheet-item " + this.props.className
        this.inputType = props.inputType || "text";
    }

    render() {
        return <div className={this.cn} >
            <h3 className="sheet-box_label">{this.box_label}</h3>
            <h2 className="sheet-main_content"><input name={"attr_" + this.box_label.substr(0, this.box_label.indexOf(":")).replace(" ", "-")} defaultValue={this.main_content} type={this.inputType} /></h2>
        </div>
    }
}

export class Header extends React.Component {
    render() {
        return (
            <div id="sheet-header">
                <div className="sheet-row">
                    <div className="sheet-title sheet-item">
                        <h1 className="sheet-main_content">BNB</h1>
                    </div>
                    <Item box_label="Archetype: " main_content="Enforcer" className="sheet-arch" />
                    <Item box_label="Class: " main_content="Gunzerker" className="sheet-class" />
                </div>
                <div className="sheet-row">
                    <Item box_label="Name: " main_content="" className="sheet-name" />
                    <Item box_label="Background: " main_content="Buff" className="sheet-bg" />
                    <Item box_label="Level: " main_content="1" className="sheet-lvl" inputType="number" />
                </div>
                <div className="sheet-row">
                    <div className="sheet-item sheet-skill">
                        <h3 className="sheet-box_label">Action Skill: </h3>
                        <textarea name='attr_action_skill' className="sheet-main_content sheet-last" style={{ "resize": "none" }} />
                        <div className="sheet-mod_wrapper">
                            <ModifierBox modifier="+1" small_desc="MST" className="sheet-mod" />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}