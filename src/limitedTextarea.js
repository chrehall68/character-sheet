import React from 'react'

export class LimitedTextarea extends React.Component {
    constructor(props) {
        super(props)
        this.props = props
        this.maxLines = props.maxLines
        this.state = { value: '' }
    }

    handleChange = (event) => {
        // STACK OVERFLOW!!  
        // https://stackoverflow.com/questions/42110855/how-to-set-max-rows-to-textarea-input-tag   

        console.log("maxlines" + this.maxLines);
        let lines = event.target.value.split('\n').length;
        console.log(lines);
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