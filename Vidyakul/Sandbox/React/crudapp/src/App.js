import React, { useState } from "react";
import "./App.css";
import Button from "./components/Button";
import Header from "./components/Header";
import CreateForm from "./components/Forms/CreateForm";
import ViewForm from "./components/Forms/ViewForm";
import UpdateForm from "./components/Forms/UpdateForm";
import DeleteForm from "./components/Forms/DeleteForm";
const db = require("./config/db");

function App() {
  const [cf, setCf] = useState(true);
  const [vf, setVf] = useState(false);
  const [uf, setUf] = useState(false);
  const [df, setDf] = useState(false);
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [age, setAge] = useState("");
  const [state, setState] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (cf) {
      const data = { fname, lname, age, state };
      setMessage(db.add(data));
    } else if (vf) {
    } else if (uf) {
    } else if (df) {
    }
  };

  const handleCfClick = () => {
    setCf(true);
    setVf(false);
    setUf(false);
    setDf(false);
  };

  const handleVfClick = () => {
    setCf(false);
    setVf(true);
    setUf(false);
    setDf(false);
  };

  const handleUfClick = () => {
    setCf(false);
    setVf(false);
    setUf(true);
    setDf(false);
  };

  const handleDfClick = () => {
    setCf(false);
    setVf(false);
    setUf(false);
    setDf(true);
  };

  let Form = null;
  if (cf) {
    Form = (
      <CreateForm
        fname={fname}
        lname={lname}
        age={age}
        state={state}
        onChangeFname={(e) => setFname(e.target.value)}
        onChangeLname={(e) => setLname(e.target.value)}
        onChangeAge={(e) => setAge(e.target.value)}
        onChangeState={(e) => setState(e.target.value)}
      />
    );
  } else if (vf) {
    Form = <ViewForm />;
  } else if (uf) {
    Form = <UpdateForm />;
  } else if (df) {
    Form = <DeleteForm />;
  }
  return (
    <div className="bg-sky-200 h-screen w-screen">
      <Header title="Admin Dashboard" />
      <div className="ButtonContainer bg-teal-100 flex gap-4 p-6 justify-center items-center">
        <Button title="Add User Details" onClick={handleCfClick} />
        <Button title="View User Details" onClick={handleVfClick} />
        <Button title="Update User Details" onClick={handleUfClick} />
        <Button title="Delete User Details" onClick={handleDfClick} />
      </div>
      <div className="flex bg-inherit p-6 items-center justify-center">
        <form onSubmit={handleSubmit}>
          {Form}
          <div className="flex bg-inherit justify-center">
            <Button title="Proceed" />
          </div>
          <p className="text-center font-mono text-xs pt-2">{message}</p>
        </form>
      </div>
    </div>
  );
}

export default App;
