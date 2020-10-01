import React from "react";
import "./App.css";

function App() {
  setTimeout(() => {
    window.location.reload();
  }, 5000);

  const apiKey = "ifqUIAvwExByDEA0NLbqEXN2w8vSef2dQovE";

  const alley = {
    companyName: "Strike & Co Göteborg",
    country: "Sweden",
    countryCode: "se",
    lanes: 28,
    system: "vbs_viking",
    uuid: "cdab209b-f1f2-11e6-b920-0050569337ac",
  };

  const fromLane = 14;
  const toLane = 21;
  const numberOfLanes = Math.abs(fromLane - toLane);

  let selectedLanes = [];
  for (let index = 0; index <= numberOfLanes; index++) {
    selectedLanes.push(fromLane + index);
  }

  return (
    <div className="App">
      <div className="lane-wrapper">
        {selectedLanes.map((lane) => (
          <img
            key={lane}
            className="lane"
            alt={lane}
            src={`https://scoring.lanetalk.com/upload/${alley.uuid}/VTVFile${lane}.jpg`}
          />
        ))}
      </div>
    </div>
  );
}

export default App;

// Hämta lista med alla bowlinghallar
// Använd dropdowns för att välja hall och banor
// Klicka på knapp för att få länk till overlay för vald hall och banor
