import React from "react";
import { Card } from "react-bootstrap";

const GameCard = ({ gameId, playerCount }) => (
  <Card className="mb-3">
    <Card.Body>
      <Card.Title>Game #{gameId}</Card.Title>
      <Card.Text>{playerCount} players</Card.Text>
    </Card.Body>
  </Card>
);

export default GameCard;