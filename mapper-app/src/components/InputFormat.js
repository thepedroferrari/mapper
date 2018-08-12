import React, { Component } from 'react'

export default class InputFormat extends Component {
  render() {
    const input = this.props


    // get inputFormat
    const getInputFormat = Object.values(input)
      .forEach( (format) => {
        const content = (JSON.stringify(format, null, 2))
        console.log(content)
        return content
      });

    return (
      <pre className="input-format">
        {getInputFormat}
      </pre>
    )
  }
}
