import React, { useState, useEffect } from "react";
import ScoreEntryForm from "../components/ScoreEntryForm";
import PlayerList from "../components/PlayerList";
import WinnerBanner from "../components/WinnerBanner";
import ThemeToggle from "../components/ThemeToggle";
import {
  Container,
  Card,
  Button,
  Row,
  Col,
  Form,
  Fade,
  Modal,
  Badge,
  ListGroup,
} from "react-bootstrap";
import { RotateCcw, XCircle , Plus , Users} from "lucide-react";
import { toast } from "react-toastify";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "./Home.css";

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
      <Row className="align-items-center mb-4 g-2 flex-nowrap">
        <Col xs="auto" className="d-flex align-items-center">
          <h4 className="mb-0 fw-bold">🃏</h4>
        </Col>

        <Col className="d-flex align-items-center justify-content-center">
          <h5 className="mb-0 fw-bold text-nowrap">RummyPointBook</h5>
        </Col>

        <Col xs="auto" className="d-flex justify-content-end">
          <Button
            variant="outline-danger"
            size="sm"
            onClick={confirmResetGame}
            title="Reset Game"
          >
            <RotateCcw size={16} className="me-1" />
          </Button>
        </Col>

        <Col xs="auto" className="d-flex justify-content-end">
          <ThemeToggle />
        </Col>
      </Row>

      {/* Game State */}
      {!gameStarted ? (
        <Fade in={!gameStarted}>
          <Card className="p-4 glass-card animate__animated animate__fadeInUp">
            <h5 className="mb-3 fw-semibold">
              <Users size={18} fill="#0d6efd" stroke="#0d6efd" /> Add Players
            </h5>
            <Form
              onSubmit={(e) => {
                e.preventDefault();
                addPlayer(newPlayerName);
                setNewPlayerName("");
              }}
            >
              <Row className="g-2">
                <Col xs={10}>
                  <Form.Control
                    type="text"
                    placeholder="Enter player name"
                    value={newPlayerName}
                    onChange={(e) => setNewPlayerName(e.target.value)}
                    className="rounded-pill"
                  />
                </Col>
                <Col xs={2} className="d-flex align-items-center">
                  <Button
                    type="submit"
                    variant="primary"
                    className="w-100  text-center p-1"
                    title="Add Player"
                  >
                    <Plus size={18} />
                  </Button>
                </Col>
              </Row>
            </Form>

            {/* Player Preview List */}
            {players.length > 0 && (
              <div className="mt-4">
                <h6 className="text-muted mb-2 fw-bold">
                  <Users size={18} fill="#8052ffff" stroke="#413c3cff" />{" "}
                  Players Joined
                </h6>
                <ListGroup variant="flush" className="border rounded shadow-sm">
                  <TransitionGroup component={null}>
                    {players.map((p, i) => (
                      <CSSTransition
                        key={i}
                        timeout={500}
                        classNames="shake-badge"
                      >
                        <ListGroup.Item className="d-flex justify-content-between align-items-center">
                          <div className="d-flex align-items-center">
                            <span className="me-2">🔹</span>
                            <span className="text-capitalize fw-medium">
                              {p.name}
                            </span>
                          </div>
                          <Badge
                            bg={
                              p.status === "eliminated" ? "danger" : "secondary"
                            }
                          >
                            {p.status === "eliminated" ? "Eliminated" : "Ready"}
                          </Badge>
                        </ListGroup.Item>
                      </CSSTransition>
                    ))}
                  </TransitionGroup>
                </ListGroup>
              </div>
            )}

            <Button
              variant="success"
              className="mt-4 w-100 rounded-pill fw-semibold animate__animated animate__pulse animate__repeat-2"
              onClick={startGame}
            >
              🚀 Start Game
            </Button>
          </Card>
        </Fade>
      ) : (
        <Fade in={gameStarted}>
          <div className="animate__animated animate__bounceIn">
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
