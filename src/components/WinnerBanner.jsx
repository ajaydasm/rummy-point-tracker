import React from "react";
import { Alert } from "react-bootstrap";

const WinnerBanner = ({ winner }) => {
  if (!winner) return null;
  return (
    <Alert variant="success" className="text-center">
      🎉 Winner: {winner.name} with {winner.points} points!
    </Alert>
  );
};

export default WinnerBanner;