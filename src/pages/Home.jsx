import React, { useState } from "react";
import ScoreEntryForm from "../components/ScoreEntryForm";
import PlayerList from "../components/PlayerList";
import WinnerBanner from "../components/WinnerBanner";
import { Container, Card, Button, Row, Col, Form } from "react-bootstrap";
import ThemeToggle from "../components/ThemeToggle";

const Home = () => {
  const [players, setPlayers] = useState([]);
  const [newPlayerName, setNewPlayerName] = useState("");
  const [gameStarted, setGameStarted] = useState(false);

const addPlayer = (name, startingPoints = 0) => {
  if (!name.trim()) return;

  // Check for duplicate (case-insensitive)
  const isDuplicate = players.some(
    (p) => p.name.trim().toLowerCase() === name.trim().toLowerCase()
  );

  if (isDuplicate) {
    alert("A player with this name already exists.");
    return;
  }

  const newPlayer = {
    name,
    points: startingPoints,
    scores: startingPoints > 0 ? [startingPoints] : [],
    status: startingPoints > 320 ? "eliminated" : "active",
  };

  setPlayers([...players, newPlayer]);
};

const deletePlayer = (name) => {
  const updated = players.filter((p) => p.name !== name);
  setPlayers(updated);
};


  const startGame = () => {
    if (players.length < 2) {
      alert("Add at least 2 players to start the game.");
      return;
    }
    setGameStarted(true);
  };

  const updatePoints = (name, pointsToAdd) => {
    const updatedPlayers = players.map((p) => {
      if (p.name === name) {
        const newPoints = p.points + pointsToAdd;
        return {
          ...p,
          points: newPoints,
          scores: [...(p.scores || []), pointsToAdd], // track history
          status: newPoints > 320 ? "eliminated" : "active",
        };
      }
      return p;
    });
    setPlayers(updatedPlayers);
  };

  const activePlayers = players.filter((p) => p.status === "active");
  const winner = activePlayers.length === 1 ? activePlayers[0] : null;

  return (
    <Container className="py-4">
      <Row className="align-items-center mb-3">
        <Col xs={10}>
          <h4 className="mb-0 text-start text-sm-center">
            🃏 Rummy Point Tracker
          </h4>
        </Col>
        <Col xs={2} className="text-end">
          <ThemeToggle />
        </Col>
      </Row>

      {!gameStarted ? (
        <Card className="p-3 mb-4">
          <h5 className="mb-3">Add Players</h5>
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              addPlayer(newPlayerName);
              setNewPlayerName("");
            }}
          >
            <Row>
              <Col xs={8}>
                <Form.Control
                  type="text"
                  placeholder="Player name"
                  value={newPlayerName}
                  onChange={(e) => setNewPlayerName(e.target.value)}
                />
              </Col>
              <Col xs={4}>
                <Button type="submit" variant="primary" className="w-100">
                  Add Player
                </Button>
              </Col>
            </Row>
          </Form>

          <ul className="mt-3">
            {players.map((p, i) => (
              <li key={i}>{p.name}</li>
            ))}
          </ul>

          <Button variant="success" className="mt-3" onClick={startGame}>
            Start Game
          </Button>
        </Card>
      ) : (
        <>
          <WinnerBanner winner={winner} />
          <ScoreEntryForm
            players={players}
            onAddScore={updatePoints}
            addPlayer={addPlayer}
          />
          <PlayerList
            players={players}
            onAddScore={updatePoints}
            onDeletePlayer={deletePlayer}
          />
        </>
      )}
    </Container>
  );
};

export default Home;
