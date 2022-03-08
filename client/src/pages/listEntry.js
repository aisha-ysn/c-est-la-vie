import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_ME } from '../utils/queries'
import { REMOVE_ENTRIES } from '../utils/mutations';
import Auth from '../utils/auth'
import {
    Button,
} from "react-bootstrap";
import { Link } from 'react-router-dom'
// import '../assets/css/entries.css';


const savedEntries = () => {
    const { loading, data } = useQuery(GET_ME)
    const userData = data?.me || {};

    const [removeEntries, { erro }] = useMutation(REMOVE_ENTRIES)
    const handleDeleteEntries = async (entriesId) => {
        const token = Auth.loggedIn() ? Auth.getToken() : null;
        try {
            const { data } = await removeEntries({
                variables: { entriesId },
            })
        } catch (err) {
            console.error(err);
        }

    }
    if (loading) {
        return <h2>LOADING...</h2>
    }

    return (
        <div className="past" >
            <Button className="m-3 p-3" type="submit" variant="primary" size="lg">
                <Link className="text-light" to="/journal"> Add Journal </Link>
            </Button>
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
                {userData.savedEntries?.map((entry) => {
                    return (<div >
                        <h2>{title}</h2>
                        <p>body</p>
                        <button className="remove">
                            Remove
                        </button>
                    </div>)
                })}
            </div>

        </div>)
}


export default savedEntries;
