import React from 'react'
import { ModifierBox } from './ModifierBox'
import "./Header.css"

class Item extends React.Component {
    constructor(props) {
        super(props)
        this.box_label = props.box_label
        this.main_content = props.main_content
        if (typeof (this.props.className) != "string") this.cn = "item"
        else this.cn = "item " + this.props.className
    }

    render() {
        return <span className={this.cn} >
            <h3 className="box_label">{this.box_label}</h3>
            <h2 className="main_content" contentEditable="true" suppressContentEditableWarning={true} onKeyPress={this.onKeyPress}>{this.main_content}</h2>
        </span>
    }

    onKeyPress = (event) => {
        if (event.key === "Enter") {
            event.preventDefault()
            console.log("yes")
            document.activeElement.blur()
        }
    }
}

export class Header extends React.Component {

    render() {
        return (
            <div id="header">
                <span className="item">
                    <h1 className="main_content title">BNB</h1>
                </span>
                <Item box_label="Archetype: " main_content="Enforcer" className="arch" />
                <Item box_label="Class: " main_content="Gunzerker" className="class" />
                <Item box_label="Name: " main_content="" className="name" />
                <Item box_label="Background: " main_content="Buff" className="bg" />
                <Item box_label="Level: " main_content="1" className="lvl" />
                <span className="item skill">
                    <h3 className="box_label">Action Skill: </h3>
                    <p className="main_content">Gunzerking: Gunzerker gains the ability to wield 2 equipped guns at once for 2
                        turns. Each Ranged Attack fires both guns at a single target.
                        While Gunzerking, Gunzerker gains Health Regen. (MST Mod per Day+Once per Encounter)
                    </p>
                    <ModifierBox modifier="+1" small_desc="MST" style={{ transform: "translateY(-38px)" }} />
                </span>
            </div>
        )
    }
}