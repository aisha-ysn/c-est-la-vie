import React, { Component } from 'react';
import Entries from './pages/Entries';
import Form from './pages/Journal';

class App extends Component {
  state = {
    entries: [

    ]
  }

  removeEntry = index => {
    const { entries } = this.state

    this.setState({
      entries: entries.filter ((entry, i) => {
        return i != index
      })
    })
  }

  handleSubmit = entry => {
    this.setState({ entries: [...this.state.entries, entry]})
  }

  render () {
    const { entries } = this.state;
    
    return (
      <div className="App">
        <h1>My Life Today</h1>
        <Form handleSubmit={this.handleSubmit}/>
        <Entries entryData={entries} removeEntry={this.removeEntry}/>
      </div>
    );
  }

}

export default App;
