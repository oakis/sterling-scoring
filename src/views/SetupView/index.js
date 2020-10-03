import React, { useEffect, useState } from "react";
import "./index.css";

const apiKey = "ifqUIAvwExByDEA0NLbqEXN2w8vSef2dQovE";
// const apiKey = "8tLtPc8UwWvdvbpzRIr0ifCWy250TXUXrGUn";

function SetupView() {
  const [alleys, setAlleys] = useState([]);
  const [selectedAlley, setSelectedAlley] = useState("");
  const [selectedFrom, setSelectedFrom] = useState("");
  const [selectedTo, setSelectedTo] = useState("");

  const selectedUrl = `${window.location.origin}/sterling-scoring/#/${selectedAlley}/${selectedFrom}/${selectedTo}/`;

  useEffect(() => {
    fetch("https://api.lanetalk.com/v1/bowlingcenters/", {
      headers: {
        "Content-Type": "application/json",
        apiKey: apiKey,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const swedishAlleys = data
          .filter((alley) => alley.countryCode === "se")
          .map((alley) => ({
            lanes: alley.lanes,
            name: `${alley.companyName} (${alley.location})`,
            uuid: alley.uuid,
          }))
          .sort((a, b) => {
            if (b.name > a.name) {
              return -1;
            }
            if (a.name > b.name) {
              return 1;
            }
            return 0;
          });
        setAlleys(swedishAlleys);
        setSelectedFrom(1);
        setSelectedTo(1);
        setSelectedAlley(swedishAlleys[0].uuid);
      });
  }, []);

  const selectAlley = (e) => {
    e.preventDefault();
    setSelectedAlley(e.target.value);
  };

  const selectFromLane = (e) => {
    e.preventDefault();
    setSelectedFrom(e.target.value);
  };

  const selectToLane = (e) => {
    e.preventDefault();
    setSelectedTo(e.target.value);
  };

  const getLanes = () => {
    const numberOfLanes = alleys.find((alley) => alley.uuid === selectedAlley)
      .lanes;
    let lanes = [];
    for (let index = 1; index < numberOfLanes + 1; index++) {
      lanes.push(index);
    }
    return lanes;
  };

  const renderSelectFromLane = () => {
    const lanes = getLanes();
    return (
      <>
        <label htmlFor="select-from-lane">Från bana</label>
        <select id="select-from-lane" onChange={selectFromLane}>
          {lanes.map((lane) => (
            <option key={lane} value={lane}>
              {lane}
            </option>
          ))}
        </select>
      </>
    );
  };

  const renderSelectToLane = () => {
    const lanes = getLanes();
    return (
      <>
        <label htmlFor="select-to-lane">Till bana</label>
        <select id="select-to-lane" onChange={selectToLane}>
          {lanes.map((lane) => (
            <option key={lane} value={lane}>
              {lane}
            </option>
          ))}
        </select>
      </>
    );
  };

  const copyUrl = () => {
    window.navigator.clipboard.writeText(selectedUrl);
  };

  const viewUrl = () => {
    window.open(selectedUrl, "blank");
  };

  return (
    <div className="setup-wrapper">
      <label htmlFor="select-alleys">Välj hall</label>
      <select id="select-alleys" onChange={selectAlley}>
        {alleys.map((alley) => (
          <option key={alley.uuid} value={alley.uuid}>
            {alley.name}
          </option>
        ))}
      </select>
      {selectedAlley.length > 0 && renderSelectFromLane()}
      {selectedAlley.length > 0 && renderSelectToLane()}
      <div className="current-setup">
        <button
          onClick={viewUrl}
          disabled={
            selectedAlley === "" || selectedFrom === "" || selectedTo === ""
          }
        >
          Visa scoreboard
        </button>
        <button
          onClick={copyUrl}
          disabled={
            selectedAlley === "" || selectedFrom === "" || selectedTo === ""
          }
        >
          Kopiera URL
        </button>
      </div>
    </div>
  );
}

export default SetupView;
