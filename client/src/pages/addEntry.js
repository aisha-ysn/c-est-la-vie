import React, { useState } from "react";
import "../assets/css/journal.css";
import { useMutation } from "@apollo/client";
import { SAVE_ENTRIES } from "../utils/mutations";
import Auth from "../utils/auth";
import { Link } from 'react-router-dom'
import { GET_ME } from "../utils/queries"
import { v4 as uuidv4 } from "uuid"


const Form = () => {
  const [saveEntries, { error }] = useMutation(SAVE_ENTRIES);
  const { loading, data } = useQuery(GET_ME)
  const userData = data?.me || {}
  const [entry, setEntry] = useState({
    title: "",
    content: "",
    EntriesId: `${uuidv4()}`,
    userId: `${userData._id}`
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setEntry({
      ...entry,
      [name]: value,
    });
  };
  const handleEntrySave = async () => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;
    if (!token) {
      return false;
    }
    console.log(entry)
    try {
      const { data } = await saveEntries({
        variables: { input: { ...entry } },
      });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <form>
        <p className="line-1 anim-typewriter"> C&apos;est La Vie </p>
        <input
          placeholder="Date"
          type="text"
          name="title"
          id="title"
          onChange={handleChange}
        />

        <textarea
          placeholder="Journal Text..."
          type="textarea"
          name="content"
          id="body"
          onChange={handleChange}
        />
      </form>
      <button onClick={handleEntrySave} className="button">
        Log Journal
      </button>
      <button className="button">
        <Link to="/"> See Entries </Link>
      </button>

    </div>
  );
};

export default Form;

