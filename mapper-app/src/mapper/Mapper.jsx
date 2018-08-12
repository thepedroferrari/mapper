//import * as React from 'react'
import React, {Component} from 'react'
import InputFormat from '../components/InputFormat'
import OutputFormat from '../components/OutputFormat'
//import type { Mapping, Schema } from '../types'


/* type Props = {
  inputFormat: Schema,
  outputFormat: Schema,
  add: Mapping => void,
  remove: Mapping => void,
  data: Schema
} */


class Mapper extends Component {

  componentWillMount() {
    this.setState( { input: 'null' })
    this.setState( { output: null })
  }


  render() {
    // ES6 Destructuring
    const { /* inputFormat, outputFormat, */ add, remove, data } = this.props;

    // get vehicles
    const getVehicles = Object.values(data)
      .map( (vehicle) =>
        <option value={vehicle.id} key={vehicle.id}>{vehicle.id}</option>
      );

    const handleSelectChange = (e) => {
      const vehicle = e.target.value;
      Object.values(data).forEach(selectedVehicle => {
        if (selectedVehicle.id === vehicle) {
          const input = selectedVehicle.inputFormat
          const output = selectedVehicle.outputFormat
          this.setState( { input } )
          this.setState( { output } )
        }
      })

      this.setState( { vehicle } )
    }
    return(
    <React.Fragment>
      <h1 style={{ textAlign: 'center' }}>&#60;Mapper /&#62;</h1>
      <div className="mapper-select" onChange={handleSelectChange}>
        <div className="select-dropdown">
          <select className="vehicles-dropdown">
            <option value="index">Mappers Dropdown</option>
            { getVehicles }
          </select>
        </div>
      </div>
      <InputFormat props={this.state.input} />
      <OutputFormat props={this.state.output} />
      <button onClick={add} disabled>Add</button>
      <button onClick={remove} disabled>Remove</button>
    </React.Fragment>
    )
  }
}

export default Mapper
