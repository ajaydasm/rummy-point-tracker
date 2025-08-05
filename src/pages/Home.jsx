import React, { useState, useEffect } from "react";
import ScoreEntryForm from "../components/ScoreEntryForm";
import PlayerList from "../components/PlayerList";
import WinnerBanner from "../components/WinnerBanner";
import ThemeToggle from "../components/ThemeToggle";
import { Container, Card, Button, Row, Col, Form, Fade ,Modal } from "react-bootstrap";
import { RotateCcw ,XCircle } from "lucide-react";
import { toast } from "react-toastify";

const LOCAL_STORAGE_KEY = "rummy_players";

const Home = () => {
  const [players, setPlayers] = useState(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  });
  const [showResetModal, setShowResetModal] = useState(false);

  const [newPlayerName, setNewPlayerName] = useState("");
  const [gameStarted, setGameStarted] = useState(players.length > 1);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(players));
  }, [players]);

  const addPlayer = (name, startingPoints = 0) => {
    if (!name.trim()) return;

    const isDuplicate = players.some(
      (p) => p.name.trim().toLowerCase() === name.trim().toLowerCase()
    );
    if (isDuplicate) {
      toast.error("A player with this name already exists.");
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
      toast.error("At least two players are required to start the game.");
      return;
    }
    setGameStarted(true);
  };

  const updatePoints = (name, pointsToAdd = 0, updatedPlayer = null) => {
    let updatedPlayers;

    if (updatedPlayer) {
      updatedPlayers = players.map((p) =>
        p.name === name ? updatedPlayer : p
      );
    } else {
      updatedPlayers = players.map((p) => {
        if (p.name === name) {
          const newPoints = p.points + pointsToAdd;
          return {
            ...p,
            points: newPoints,
            scores: [...(p.scores || []), pointsToAdd],
            status: newPoints > 320 ? "eliminated" : "active",
          };
        }
        return p;
      });
    }

    setPlayers(updatedPlayers);
  };

  const confirmResetGame = () => {
    setShowResetModal(true);
  };

  const handleResetConfirmed = () => {
    setPlayers([]);
    setGameStarted(false);
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    toast.success("Game has been reset.");
    setShowResetModal(false);
  };

  const activePlayers = players.filter((p) => p.status === "active");
  const winner = activePlayers.length === 1 ? activePlayers[0] : null;

  return (
    <Container className="py-4 animate__animated animate__fadeIn">
      {/* Header */}
      <Row className="align-items-center mb-4">
        <Col xs={8}>
          <h4 className="mb-0 text-start text-sm-center fw-bold">
            🃏 RummyPointBook
          </h4>
        </Col>
        <Col xs={2} className="text-end">
          <Button
            variant="outline-danger"
            size="sm"
            onClick={confirmResetGame}
            title="Reset Game"
          >
            <RotateCcw size={16} className="me-1" />
          </Button>
        </Col>
        <Col xs={2} className="text-end">
          <ThemeToggle />
        </Col>
      </Row>

      {/* Game State */}
      {!gameStarted ? (
        <Fade in={!gameStarted}>
          <Card className="p-4 shadow-sm rounded-4 border-light bg-light-subtle animate__animated animate__fadeInUp">
            <h5 className="mb-3 fw-semibold">👥 Add Players</h5>
            <Form
              onSubmit={(e) => {
                e.preventDefault();
                addPlayer(newPlayerName);
                setNewPlayerName("");
              }}
            >
              <Row className="g-2">
                <Col xs={8}>
                  <Form.Control
                    type="text"
                    placeholder="Enter player name"
                    value={newPlayerName}
                    onChange={(e) => setNewPlayerName(e.target.value)}
                    className="rounded-pill"
                  />
                </Col>
                <Col xs={4}>
                  <Button
                    type="submit"
                    variant="primary"
                    className="w-100 rounded-pill"
                  >
                    ➕ Add
                  </Button>
                </Col>
              </Row>
            </Form>

            {/* Player Preview List */}
            <div className="mt-3">
              <ul className="list-unstyled mb-0">
                {players.map((p, i) => (
                  <li key={i} className="text-muted small">
                    🔹 {p.name}
                  </li>
                ))}
              </ul>
            </div>

            <Button
              variant="success"
              className="mt-4 w-100 rounded-pill fw-semibold"
              onClick={startGame}
            >
              🚀 Start Game
            </Button>
          </Card>
        </Fade>
      ) : (
        <Fade in={gameStarted}>
          <div className="animate__animated animate__fadeInUp">
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
          </div>
        </Fade>
      )}

      <Modal
        show={showResetModal}
        onHide={() => setShowResetModal(false)}
        centered
        backdrop="static"
        animation={true}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <XCircle className="text-danger me-2" size={20} />
            Confirm Reset
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to reset the game? All players and scores will
          be lost.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowResetModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleResetConfirmed}>
            Yes, Reset
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Home;
