import React from 'react'
import { ModifierBox } from './ModifierBox'
import { Editable } from './Editable'

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
        return <div className={this.cn} >
            <h3 className="box_label">{this.box_label}</h3>
            <h2 className="main_content"><Editable initialVal={this.main_content} /></h2>
        </div>
    }
}

export class Header extends React.Component {

    render() {
        return (
            <div id="header">
                <div className="row">
                    <div className="title item">
                        <h1 className="main_content">BNB</h1>
                    </div>
                    <Item box_label="Archetype: " main_content="Enforcer" className="arch" />
                    <Item box_label="Class: " main_content="Gunzerker" className="class" />
                </div>
                <div className="row">
                    <Item box_label="Name: " main_content="" className="name" />
                    <Item box_label="Background: " main_content="Buff" className="bg" />
                    <Item box_label="Level: " main_content="1" className="lvl" />
                </div>
                <div className="row">
                    <div className="item skill">
                        <h3 className="box_label">Action Skill: </h3>
                        <textarea className="main_content last" style={{ "resize": "none" }} />
                        <div className="mod_wrapper">
                            <ModifierBox modifier="+1" small_desc="MST" className="mod" />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}