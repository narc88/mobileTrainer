import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import ReactDOM from 'react-dom';

import { Meteor } from 'meteor/meteor';

import AccountsUIWrapper from './AccountsUIWrapper.jsx';

class Menu extends Component {
  constructor(props) {
      super(props);
   
      this.state = {
          errors: {},
          data: {}
      };
  }
  render() {
    return (<div>
              
              <div id="render-target"></div>
            </div>);
    }
}

Menu.propTypes = {
  currentUser: PropTypes.object,
};

export default createContainer(() => {
  return {
    currentUser: Meteor.user(),
  };
}, Menu);