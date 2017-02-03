import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import ReactDOM from 'react-dom';
import { Tasks } from '../api/tasks.js';

import { Meteor } from 'meteor/meteor';
import Gim from './Gim.jsx';

import AccountsUIWrapper from './AccountsUIWrapper.jsx';

// GimForm component - represents the whole app
class GimForm extends Component {
  constructor(props) {
    super(props);
 
    this.state = {
      hideCompleted: false,
    };
  }
 
  handleSubmit(event) {
    event.preventDefault();
 
    const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();
    Meteor.call('tasks.insert', text);
    // Clear form
    ReactDOM.findDOMNode(this.refs.textInput).value = '';
  }
 
  renderGims() {
    let filteredGims = this.props.gims;
    return filteredGims.map((gim) => {
      return (
        <Gim
          key={gim._id._str}
          gim={gim}
        />
      );
    });
  }
 
  render() {
    return (
      <div className="container">
        <header>
          <h1>Gimnasios</h1>
        </header>

        <AccountsUIWrapper />
        
        <ul>
          {this.renderGims()}
        </ul>
      </div>
    );
  }
}


GimList.propTypes = {
  gims: PropTypes.array.isRequired
};

export default createContainer(() => {
  Meteor.subscribe('gims');
  return {
    gims: Gims.find({}, { sort: { createdAt: -1 } }).fetch()
  };
}, GimList);