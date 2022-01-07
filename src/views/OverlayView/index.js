import React, { useCallback, useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import "./index.css";

function OverlayView() {
  const [fromLaneNumber, setFromLaneNumber] = useState();
  const [toLaneNumber, setToLaneNumber] = useState();
  const [selectedLanes, setSelectedLanes] = useState([]);

  const { alley, fromLane, toLane } = useParams();
  const location = useLocation();

  const debugMode = location?.search.includes("?debug");

  // const resetLanes = useCallback(() => {
  //   if (debugMode) console.log("Reset lanes");
  //   setFromLaneNumber(0);
  //   setToLaneNumber(0);
  // }, [debugMode]);

  const setLanes = useCallback(() => {
    if (debugMode) console.log("Set lanes", fromLane, toLane);

    const newFrom = parseInt(fromLane, 10);
    const newTo = parseInt(toLane, 10);
    setFromLaneNumber(newFrom);
    setToLaneNumber(newTo);
  }, [fromLane, toLane, debugMode]);

  useEffect(() => {
    if (fromLaneNumber === 0 || toLaneNumber === 0) return;

    const numberOfLanes = toLaneNumber - fromLaneNumber;

    if (debugMode)
      console.log(
        "Number of lanes:",
        numberOfLanes + 1,
        " - From Lane/To Lane",
        fromLaneNumber,
        toLaneNumber
      );

    setSelectedLanes(() => {
      let result = [];
      for (let index = 0; index <= numberOfLanes; index++) {
        result.push(fromLaneNumber + index);
      }
      return result;
    });
  }, [debugMode, fromLaneNumber, toLaneNumber]);

  useEffect(() => {
    if (debugMode) {
      console.log("Selected lanes:", selectedLanes);
    }
  }, [selectedLanes, debugMode]);

  useEffect(() => {
    setLanes();
  }, [fromLane, toLane, setLanes]);

  // useEffect(() => {
  //   const refresh = setInterval(() => {
  //     resetLanes();
  //     setLanes();
  //   }, 5000);
  //   return () => {
  //     clearInterval(refresh);
  //   };
  // }, [resetLanes, setLanes]);

  useEffect(() => {
    setTimeout(() => {
      window.location.reload();
    }, 5000);
  }, []);

  return (
    <div className="overlay-wrapper">
      <div
        className="lane-wrapper"
        style={
          selectedLanes.length % 4 === 0
            ? { justifyContent: "space-evenly" }
            : { justifyContent: "space-between" }
        }
      >
        {selectedLanes.map((lane) => (
          <img
            key={lane}
            className="lane"
            alt={lane}
            src={`https://scoring.lanetalk.com/upload/${alley}/VTVFile${lane}.jpg#${uuidv4()}`}
          />
        ))}
        {debugMode === true ? (
          <div className="debug-indicator">{uuidv4()}</div>
        ) : null}
      </div>
    </div>
  );
}

export default OverlayView;
