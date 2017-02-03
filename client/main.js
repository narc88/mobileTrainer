import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
 
import App from '../imports/ui/App.jsx';
import TrainerApp from '../imports/ui/TrainerApp.jsx';
 
import '../imports/startup/accounts-config.js';

Meteor.startup(() => {
  render(<TrainerApp />, document.getElementById('render-target'));
});