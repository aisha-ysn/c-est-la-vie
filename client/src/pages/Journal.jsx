import React, { Component } from 'react';
import '../assets/css/journal.css'

class Form extends Component {
    constructor(props) {
        super(props)

        this.initialState = {
            title: '',
            body: ''
        }

        this.state = this.initialState
    }

    handleChange = event => {
        const {name, value } = event.target 

        this.setState({
            [name]: value
        })
    }

    submitForm = () => {
        this.props.handleSubmit(this.state)
        this.setState(this.initialState)
    }

    render() {
        const {title, body } = this.state;

        return (
            <div>
                <form>
                    {/* <label>Title</label> */}
                        <input 
                            placeholder="Date"
                            type="text"
                            name="title"
                            id="title"
                            value={title}
                            onChange={this.handleChange} />
                        <textarea
                            placeholder= "Journal Text..."
                            type="textarea"
                            name="body"
                            id="body"
                            value={body}
                            onChange={this.handleChange} />
                </form>
                <button onClick={this.submitForm} className='button'>Log Journal</button>
            </div>
        )
    }
}

export default Form;