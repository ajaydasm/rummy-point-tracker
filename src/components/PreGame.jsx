// src/components/PreGame.jsx
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  addPlayer,
  startGame,
  deletePlayer,
} from "../store/slices/playersSlice";
import { Card, Button, Row, Col, Form, Modal, Collapse } from "react-bootstrap";
import { Users, Target, UserPlus } from "lucide-react";
import { toast } from "react-toastify";
import initialPlayers from "../data/playersWithAvatars";
import defaultAvatar from "../assets/players/default-avatar.png"; // fallback

const PreGame = ({ players }) => {

  console.log("PreGame players prop:", players); // Debugging line
  
  const dispatch = useDispatch();
  const [targetScore, setTargetScore] = useState(320);
  const [showModal, setShowModal] = useState(false);
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newPlayerName, setNewPlayerName] = useState("");
  const [newPlayerAvatar, setNewPlayerAvatar] = useState(defaultAvatar);

  // ✅ keep available players in state (fixes mutation issue)
  const [availablePlayers, setAvailablePlayers] = useState(initialPlayers);

  // Toggle checkbox selection
  const togglePlayerSelection = (id) => {
    setSelectedPlayers((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  // Sync selectedPlayers with Redux players before opening modal
  const handleOpenModal = () => {
    if (selectedPlayers.length === 0) {
      const alreadyAdded = players
        .map((p) => {
          const found = availablePlayers.find((ap) => ap.name === p.name);
          return found ? found.id : null;
        })
        .filter(Boolean);
      setSelectedPlayers(alreadyAdded);
    }
    setShowModal(true);
  };

  // Add/remove players to Redux
  const handleAddPlayers = () => {
    if (selectedPlayers.length === 0) {
      toast.error("Please select at least one player.");
      return;
    }

    // Add new ones
    selectedPlayers.forEach((id) => {
      const player = availablePlayers.find((p) => p.id === id);
      if (player && !players.some((pl) => pl.name === player.name)) {
        dispatch(addPlayer(player)); // ✅ send full object
      }
    });

    // Remove unselected ones
    players.forEach((pl) => {
      const found = availablePlayers.find((ap) => ap.name === pl.name);
      if (found && !selectedPlayers.includes(found.id)) {
        dispatch(deletePlayer(pl.name));
      }
    });

    setShowModal(false);
  };

  // Add a new custom player
  const handleCustomAdd = () => {
    if (!newPlayerName.trim()) {
      toast.error("Enter a valid player name.");
      return;
    }
    const newId = Date.now();
    const newPlayer = {
      id: newId,
      name: newPlayerName.trim(),
      avatar: newPlayerAvatar || defaultAvatar,
    };

    setAvailablePlayers((prev) => [...prev, newPlayer]); // ✅ update state
    setSelectedPlayers((prev) => [...prev, newId]); // auto-select
    setNewPlayerName("");
    setNewPlayerAvatar(defaultAvatar);
    setShowAddForm(false);
    toast.success(`${newPlayer.name} added!`);
  };

  return (
    <Card className="p-4 glass-card animate__animated animate__fadeInUp">
      {/* 🎯 Target + Add Players Row */}
      <Row className="align-items-end g-2 mb-3">
        <Col xs={6} sm={8}>
          <div className="d-flex flex-column">
            <h6 className="fw-semibold mb-2 d-flex align-items-center">
              <Target size={18} className="me-2 text-primary" />
              Set Elimination Target
            </h6>
            <Form.Control
              type="number"
              value={targetScore}
              min={50}
              step={10}
              onChange={(e) =>
                setTargetScore(parseInt(e.target.value, 10) || 0)
              }
              className="rounded-pill"
              placeholder="Elimination Target"
            />
          </div>
        </Col>

        <Col xs={6} sm={4} className="d-flex align-items-end">
          <Button
            variant="primary"
            className="w-100 rounded-pill"
            onClick={handleOpenModal}
          >
            <UserPlus size={16} className="me-1" /> Add Players
          </Button>
        </Col>
      </Row>

      {/* 👥 Players Joined */}
      {players.length > 0 && (
        <div className="mt-4">
          <h6 className="text-muted mb-3 fw-bold d-flex align-items-center">
            <Users size={18} className="me-2" /> Players Joined
          </h6>

          <Row xs={4} sm={4} md={6} lg={8} className="g-3">
            {players.map((p, i) => (
              <Col key={i}>
                <Card
                  className="h-100 text-center border-0 shadow-sm p-2 glass-card animate__animated animate__fadeIn"
                  style={{ borderRadius: "1rem" }}
                >
                  <Card.Img
                    variant="top"
                    src={p.avatar || defaultAvatar}
                    alt={p.name}
                    className="rounded-circle mx-auto mb-2"
                    style={{
                      width: "70px",
                      height: "70px",
                      objectFit: "cover",
                      border: "2px solid #ddd",
                    }}
                  />
                  <Card.Body className="p-2">
                    <h6 className="fw-semibold text-capitalize mb-1">
                      {p.name}
                    </h6>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      )}

      {/* 🚀 Start Button */}
      <Button
        variant="success"
        className="mt-4 w-100 rounded-pill fw-semibold animate__animated animate__pulse animate__repeat-2"
        onClick={() => {
          if (players.length < 2) {
            toast.error("At least two players are required to start the game.");
            return;
          }
          if (targetScore <= 0) {
            toast.error("Please set a valid target score.");
            return;
          }
          dispatch(startGame(targetScore));
        }}
      >
        🚀 Start Game
      </Button>

      {/* 🏷️ Modal for selecting players */}
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Select Players</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Row xs={4} sm={4} md={6} lg={8} className="g-3">
            {availablePlayers.map((player) => (
              <Col key={player.id}>
                <Card
                  onClick={() => togglePlayerSelection(player.id)}
                  className={`h-100 text-center p-2 shadow-sm glass-card cursor-pointer position-relative ${
                    selectedPlayers.includes(player.id)
                      ? "border-primary border-2"
                      : ""
                  }`}
                  style={{ borderRadius: "1rem" }}
                >
                  <Form.Check
                    type="checkbox"
                    checked={selectedPlayers.includes(player.id)}
                    readOnly
                    className="position-absolute top-0 end-0 m-2"
                    style={{ transform: "scale(1.2)" }}
                  />

                  <Card.Img
                    src={player.avatar || defaultAvatar}
                    alt={player.name}
                    className="rounded-circle mx-auto mb-2"
                    style={{
                      width: "70px",
                      height: "70px",
                      objectFit: "cover",
                    }}
                  />

                  <Card.Body className="p-2">
                    <h6 className="fw-semibold text-capitalize mb-1">
                      {player.name}
                    </h6>
                  </Card.Body>
                </Card>
              </Col>
            ))}

            {/* ➕ Add Player Card */}
            <Col>
              <Card
                className="h-100 text-center p-3 d-flex align-items-center justify-content-center border-dashed cursor-pointer"
                style={{ borderRadius: "1rem" }}
                onClick={() => setShowAddForm((prev) => !prev)}
              >
                <div
                  className="rounded-circle d-flex align-items-center justify-content-center mb-2 bg-light"
                  style={{
                    width: "70px",
                    height: "70px",
                    border: "2px dashed #aaa",
                  }}
                >
                  <Users size={28} className="text-muted" />
                </div>
                <h6 className="fw-semibold text-muted mb-0">Add Player</h6>
              </Card>

              {/* Collapsible Form */}
              <Collapse in={showAddForm}>
                <div
                  className="mt-3 p-2 border rounded bg-light"
                  style={{ width: "200px" }}
                >
                  <Form.Group className="mb-2">
                    <Form.Control
                      type="text"
                      placeholder="Enter player name"
                      value={newPlayerName}
                      onChange={(e) => setNewPlayerName(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group className="mb-2">
                    <Form.Select
                      value={newPlayerAvatar}
                      onChange={(e) => setNewPlayerAvatar(e.target.value)}
                    >
                      <option value={defaultAvatar}>Default Avatar</option>
                      <option value="https://randomuser.me/api/portraits/men/32.jpg">
                        Male Avatar
                      </option>
                      <option value="https://randomuser.me/api/portraits/women/44.jpg">
                        Female Avatar
                      </option>
                    </Form.Select>
                  </Form.Group>

                  <Button
                    size="sm"
                    variant="primary"
                    className="w-100 rounded-pill"
                    onClick={handleCustomAdd}
                  >
                    Add
                  </Button>
                </div>
              </Collapse>
            </Col>
          </Row>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleAddPlayers}>
            Add Selected
          </Button>
        </Modal.Footer>
      </Modal>
    </Card>
  );
};

export default PreGame;
