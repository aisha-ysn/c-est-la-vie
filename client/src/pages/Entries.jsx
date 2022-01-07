import React, { Component } from 'react';
import '../assets/css/entries.css'


const EntryHeader = () => {
return <h3></h3>
}

const EntryBody = props => {
    const lines = props.entryData.map((line, index) => {
        return (
            <div key={index}>
                <h2>{line.title}</h2>
                <p>{line.body}</p>
                <button onClick={() => props.removeEntry(index)} className='remove'>Remove</button>
            </div>
        )
    })

    return (
        <div>
            {lines}  
        </div>
    )
}

const Entries = (props) => {
    
        const { entryData, removeEntry } = props;

        return (
            <div className='past'>
                <h2>My Entries</h2>
               
                <EntryHeader />
                <EntryBody entryData={entryData} removeEntry={removeEntry}/>
            </div>

        )
    
}

export default Entries