import React, { useState, useEffect } from "react";
import "./TableComponent.css";

interface Person {
  id: string;
  name: string;
  gender: string;
  company: string;
  email: string;
  isActive: boolean;
  picture: string;
}

const TableComponent: React.FunctionComponent<{ people: Person[] }> = (props: {
  people: Person[];
}) => {
  const [people, setPeople] = useState<Person[]>(props.people);
  const [sortState, setSortState] = useState<string>("None");
  const [filterInput, setFilterInput] = useState<string>("");

  let peopleArray: Person[] = props.people;

  //delaying input update(900ms)
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      inputFilterMethod();
    }, 900);
    return () => clearTimeout(delayDebounce);
  }, [filterInput]);

  // Input filtering method
  const inputFilterMethod = () => {
    if (filterInput.toLowerCase() !== "male") {
      let newArray = [...peopleArray].filter(
        (p) =>
          p.name.toLowerCase().includes(filterInput.toLowerCase()) ||
          p.company.toLowerCase().includes(filterInput.toLowerCase()) ||
          p.email.toLowerCase().includes(filterInput.toLowerCase()) ||
          p.gender.toLowerCase().includes(filterInput.toLowerCase())
      );
      setPeople(newArray);
    }
    // This exists so that if you search "male" you will sort only males since the string is also inside the word "fe(male)"
    // Checking through every value incase someone has "Male" in their name, email etc (Name: "(Male)ina Manning" in json as example)
    else {
      let newArray = [...peopleArray].filter(
        (p) =>
          p.name.toLowerCase().includes(filterInput.toLowerCase()) ||
          p.company.toLowerCase().includes(filterInput.toLowerCase()) ||
          p.email.toLowerCase().includes(filterInput.toLowerCase()) ||
          p.gender.toLowerCase() === filterInput.toLowerCase()
      );
      setPeople(newArray);
    }
  };

  // Sorting method
  const sortTable = (propName: keyof Person) => {
    if (sortState === "None" || sortState === "Ascending") {
      let newArray = [...people].sort((a, b) =>
        a[propName] > b[propName] ? 1 : -1
      );
      setSortState("Descending");
      setPeople(newArray);
    } else {
      let newArray = [...people].sort((a, b) =>
        a[propName] < b[propName] ? 1 : -1
      );
      setSortState("Ascending");
      setPeople(newArray);
    }
  };

  return (
    <div className="container">
      <div className="input-div">
        <input
          type="text"
          className="custom-input"
          value={filterInput}
          onChange={(e) => setFilterInput(e.target.value)}
          placeholder="Filter table"
        ></input>
      </div>
      <table>
        <thead>
          <tr>
            <th onClick={() => sortTable("name")}>
              Full Name{" "}
              <button className="custom-button">
                <i className="fas fa-sort fa-lg"></i>
              </button>
            </th>
            <th onClick={() => sortTable("email")} className="border-th">
              Email{" "}
              <button className="custom-button">
                <i className="fas fa-sort fa-lg"></i>
              </button>
            </th>
            <th onClick={() => sortTable("company")} className="border-th">
              Company{" "}
              <button className="custom-button">
                <i className="fas fa-sort fa-lg"></i>
              </button>
            </th>
            <th onClick={() => sortTable("gender")}>
              Gender{" "}
              <button className="custom-button">
                <i className="fas fa-sort fa-lg"></i>
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {people.map((person: Person) => (
            <tr key={person.id}>
              <td>{person.name}</td>
              <td>{person.email}</td>
              <td>{person.company}</td>
              <td>{person.gender}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableComponent;
