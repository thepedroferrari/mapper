import React, { Component } from 'react'

export default class OutputFormat extends Component {
  render() {
    const output = this.props

    // get outputFormat
    const getOutputFormat = Object.values(output)
      .forEach( (format) => {
        const content = (JSON.stringify(format, null, 2))
        console.log(content)
        return content
      });


    return (
      <pre className="output-format">
        {getOutputFormat}
      </pre>
    )
  }
}
