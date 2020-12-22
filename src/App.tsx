import React from "react";
import "./App.css";
import TableComponent from "./components/TableComponent";
import PeopleData from "./JsonReact.json";

function App() {
  return (
    <div>
      <TableComponent people={PeopleData} />
    </div>
  );
}

export default App;
