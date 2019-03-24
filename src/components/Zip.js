import React, { Component } from 'react';
//import PropTypes from 'prop-types';

class Zip extends Component {

    constructor(props) {
        super(props);
        this.state = {value: ''};
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }

    handleChange(event) {
        this.zipCode = event.target.value;
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.updateAll(this.zipCode);
      }

    render() {
        return (
        <div> 
            <form onSubmit={this.handleSubmit}>
                <input type="text" id="zipCode" name="zipCode" required
                minLength="5" maxLength="5" size="10" onChange={this.handleChange}></input>
                <button type="submit" id="submitZip">Get Weather</button>
            </form>
        </div>
        );
    }
}

export default Zip;