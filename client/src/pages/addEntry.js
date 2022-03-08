import React, { useState } from "react";
// import "../assets/css/journal.css";
import { useMutation, useQuery } from "@apollo/client";
import { GET_ME } from "../utils/queries";
import { SAVE_ENTRIES } from "../utils/mutations";
import Auth from "../utils/auth";

const Form = () => {
  const { loading, data } = useQuery(GET_ME);
  const [saveEntry, { error }] = useMutation(SAVE_ENTRIES);
  const [entry, setEntry] = useState({
    title: "",
    content: "",
  });
  const userData = data?.me || {};
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
    try {
      const { data } = await saveEntry({
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
    </div>
  );
};

export default Form;

