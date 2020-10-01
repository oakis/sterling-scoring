import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./index.css";

function OverlayView() {
  setTimeout(() => {
    window.location.reload();
  }, 5000);

  const [fromLaneNumber, setFromLaneNumber] = useState();
  const [toLaneNumber, setToLaneNumber] = useState();

  const { alley, fromLane, toLane } = useParams();

  useEffect(() => {
    setFromLaneNumber(parseInt(fromLane, 10));
    setToLaneNumber(parseInt(toLane, 10));
  }, [fromLane, toLane]);

  const numberOfLanes = Math.abs(fromLaneNumber - toLaneNumber);

  let selectedLanes = [];
  for (let index = 0; index <= numberOfLanes; index++) {
    selectedLanes.push(fromLaneNumber + index);
  }

  return (
    <div className="overlay-wrapper">
      <div className="lane-wrapper">
        {selectedLanes.map((lane) => (
          <img
            key={lane}
            className="lane"
            alt={lane}
            src={`https://scoring.lanetalk.com/upload/${alley}/VTVFile${lane}.jpg`}
          />
        ))}
      </div>
    </div>
  );
}

export default OverlayView;
