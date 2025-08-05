import React, { useState } from "react";
import { Form, Button, Row, Col, Modal } from "react-bootstrap";

const ScoreEntryForm = ({ players, onAddScore, addPlayer }) => {
  const [showModal, setShowModal] = useState(false);
  const [playerName, setPlayerName] = useState("");
  const [playerPoints, setPlayerPoints] = useState(0);

  const handleAdd = () => {
    if (!playerName.trim()) return;

    addPlayer(playerName.trim(), parseInt(playerPoints));
    setPlayerName("");
    setPlayerPoints(0);
    setShowModal(false);
  };

  const highestScore = players.reduce((max, p) => Math.max(max, p.points), 0);

  return (
    <>
      <Button
        variant="outline-primary"
        className="w-100 mb-3"
        onClick={() => {
          setPlayerPoints(highestScore);
          setShowModal(true);
        }}
      >
        ➕ Add New Player
      </Button>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add Player</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Player Name</Form.Label>
              <Form.Control
                type="text"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Starting Points</Form.Label>
              <Form.Control
                type="number"
                value={playerPoints}
                onChange={(e) => setPlayerPoints(e.target.value)}
                min={0}
              />
              <Form.Text muted>
                Default is highest score among current players:{" "}
                <strong>{highestScore}</strong>
              </Form.Text>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="success" onClick={handleAdd}>
            Add Player
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ScoreEntryForm;
