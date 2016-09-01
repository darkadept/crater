import React, {Component} from 'react'
import {Meteor} from 'meteor/meteor'
import Counts from '../collections/Counts'

export default class App extends Component {
  state = {value: 0};

  componentWillMount() {
    if (__CLIENT__) {
      this.sub = Meteor.subscribe('counts', 'a')
      this.observer = Counts.find({_id: 'a'}).observeChanges({
        added: (id, fields) => this.setState(fields),
        changed: (id, fields) => this.setState(fields),
      })
    }
  }
  componentWillUnmount() {
    if (__CLIENT__) {
      this.observer.stop()
      this.sub.stop()
    }
  }
  render() {
    return (
      <div>
        <h1>Welcome to Crater!</h1>
        <h3>Counter: {this.state.value}</h3>
      </div>
    )
  }
}
