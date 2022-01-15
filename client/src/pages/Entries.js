import React from 'react';
import '../assets/css/entries.css';

const EntryHeader = () => {
	return <h3 />;
};

const EntryBody = (props) => {
	const lines = props.entryData.map((line, index) => {
		return (
			<div key={index}>
				<h2>{line.title}</h2>
				<p>{line.body}</p>
				<button onClick={() => props.removeEntry(index)} className="remove">
					Remove
				</button>
			</div>
		);
	});

	return <div>{lines}</div>;
};

const Entries = (props) => {
	const { entryData, removeEntry } = props;

	return (
		<div className="past" >
			<div className="prompts" contentEditable>
				<ul>
					<h1>Writing Prompts:</h1>
					<li>What do I know to be true that I didn&apos;t know a year ago? </li>
					<li>What distractions get in the way of being my most productive? </li>
					<li>When do I feel most in tune with myself?</li>
					<li>If someone described me, what would they say? </li>
					<li>What can wait until next week? </li>
					<li> Do I see myself in the same job in 10 years? </li>
					<li> What part of my workday is most enjoyable? </li>
					<li>What does my work teach me? </li>
				</ul>
			</div>
			<h2>My Entries</h2>
			<div contentEditable>
				<EntryHeader />
				<EntryBody entryData={entryData} removeEntry={removeEntry} />
			</div>
		</div>
	);
};

export default Entries;
