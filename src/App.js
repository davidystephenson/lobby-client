/* global EventSource */

import React, { Component } from 'react'
import superagent from 'superagent'

class App extends Component {
  url = 'http://localhost:4000'

  stream = new EventSource(
    `${this.url}/stream`
  )

  state = {
    text: ''
  }

  componentDidMount () {
    this.stream.onmessage = event => {
      const { data } = event

      const action = JSON.parse(data)

      console.log(action)
    }
  }

  onSubmit = async (event) => {
    event.preventDefault()

    try {
      const response = await superagent
        .post(`${this.url}/gameroom`)
        .send({
          name: this.state.text
        })

      console.log(
        'response test:',
        response
      )
    } catch (error) {
      console.warn(
        'error test:', error
      )
    }
  }

  onChange = (event) => {
    // const value = event.target.value
    const { value } = event.target
    // const { target: { value } } = event

    this.setState({ text: value })
  }

  render () {
    return <form
      onSubmit={this.onSubmit}
    >
      <input
        type='text'
        onChange={this.onChange}
        value={this.state.text}
      />
      <button>Submit</button>
    </form>
  }
}

export default App
