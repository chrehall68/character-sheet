import React from 'react'
import { PropTypes } from 'prop-types';
import "./Editable.css"

export class Editable extends React.Component {
    constructor(props) {
        super(props)
        this.callback = this.props.callback || Editable.defaultProps.callback
        this.maxChars = this.props.maxChars || Editable.defaultProps.maxChars
        this.pass_props = {};
        this.state = { value: this.props.initialVal || Editable.defaultProps.initialVal }

    }

    render() {
        return <input type="text" maxLength={this.maxChars} onKeyPress={this.onKeyPress} onChange={this.onChange}
            val={this.state.value} className="editable"
            defaultValue={this.state.value}
            style={{
                borderBottom: (this.state.value.length > 0 ? "none" : "1px solid black"),
                width: Math.max(10, this.getCharacterLength()) + "ch"
            }}>

        </input>
    }

    onKeyPress = (event) => {
        if (event.key === "Enter") {
            event.preventDefault()
            document.activeElement.blur()
            this.callback()
        }
    }

    onChange = (event) => {
        this.setState({ value: event.target.value })
        console.log(this.state.value)
    }

    getCharacterLength() {
        var count = 0;
        [...this.state.value].forEach(element => {
            if (element === element.toUpperCase()) {
                // it's upper case
                count += 1.5
            }
            else count += 1.15
        });
        return count;
    }
}

Editable.defaultProps = {
    callback: () => { },
    maxChars: 12,
    initialVal: ""
}

Editable.propTypes = {
    callback: PropTypes.func,
    maxChars: PropTypes.number,
    initialVal: PropTypes.string
}