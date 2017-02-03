import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import classnames from 'classnames';

// Gim component - represents a single todo item
export default class Gim extends Component {
  toggleChecked() {
    // Set the checked property to the opposite of its current value
    Meteor.call('gims.setChecked', this.props.gim._id._str, !this.props.gim.checked);
  }

  deleteThisGim() {
    Meteor.call('gims.remove', this.props.gim._id._str);
  }

  togglePrivate() {
    Meteor.call('gims.setPrivate', this.props.gim._id._str, ! this.props.gim.private);
  }

  render() {
    // Give gims a different className when they are checked off,
    // so that we can style them nicely in CSS
    const gimClassName = classnames({
      checked: this.props.gim.checked,
      private: this.props.gim.private,
    });

    return (
      <li className={gimClassName}>
        <button className="delete" onClick={this.deleteThisGim.bind(this)}>
          &times;
        </button>

        <input
          type="checkbox"
          readOnly
          checked={this.props.gim.checked}
          onClick={this.toggleChecked.bind(this)}
        />

        { this.props.showPrivateButton ? (
          <button className="toggle-private" onClick={this.togglePrivate.bind(this)}>
            { this.props.gim.private ? 'Private' : 'Public' }
          </button>
        ) : ''}

        <span className="text">
          <strong>{this.props.gim.username}</strong>: {this.props.gim.text}
        </span>
      </li>
    );
  }
}

Gim.propTypes = {
  // This component gets the gim to display through a React prop.
  // We can use propTypes to indicate it is required
  gim: PropTypes.object.isRequired,
  showPrivateButton: React.PropTypes.bool.isRequired,
};