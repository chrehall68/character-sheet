import React from 'react'

export class LimitedTextarea extends React.Component {
    constructor(props) {
        super(props)
        this.props = props
        this.maxLines = props.maxLines
        this.state = { value: '' }
    }

    handleChange = (event) => {
        let lines = event.target.value.split('\n').length;
        if (lines > this.maxLines) {
            return false;
        }
        this.setState({ value: event.target.value })
    }
    render() {
        return <textarea className={this.props.className || ""} style={this.props.style}
            value={this.state.value} onChange={this.handleChange} />
    }
}