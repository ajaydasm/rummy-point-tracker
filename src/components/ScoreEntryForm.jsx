// src/components/ScoreEntryForm.jsx

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button, Modal, Card, Row, Col, Collapse } from "react-bootstrap";
import { addPlayer, deletePlayer } from "../store/slices/playersSlice";
import { Users } from "lucide-react";
import { toast } from "react-toastify";
import availablePlayers from "../data/playersWithAvatars";
import defaultAvatar from "../assets/players/default-avatar.png";

const ScoreEntryForm = () => {
  const dispatch = useDispatch();
  const players = useSelector((state) => state.players.list);

  const [showModal, setShowModal] = useState(false);
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newPlayerName, setNewPlayerName] = useState("");
  const [newPlayerAvatar, setNewPlayerAvatar] = useState(defaultAvatar);

  // highest score among existing players
  const highestScore = useSelector((state) =>
    state.players.list.reduce(
      (max, p) => Math.max(max, ...(p.scores?.length ? p.scores : [0])),
      0
    )
  );

  // default score state
  const [defaultScore, setDefaultScore] = useState(highestScore);

  // update default score whenever highestScore changes
  useEffect(() => {
    setDefaultScore(highestScore);
  }, [highestScore]);

  // toggle selection
  const togglePlayerSelection = (id) => {
    setSelectedPlayers((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  // open modal + pre-select existing redux players
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

  // add/remove players in redux based on selection
  const handleAddPlayers = () => {
    
    if (selectedPlayers.length === 0) {
      toast.error("Please select at least one player.");
      return;
    }

    // add missing ones with defaultScore
    selectedPlayers.forEach((id) => {
      const player = availablePlayers.find((p) => p.id === id);
      if (player && !players.some((pl) => pl.name === player.name)) {
        dispatch(addPlayer({ name: player.name, points: defaultScore }));
      }
    });

    // remove unselected ones
    players.forEach((pl) => {
      const found = availablePlayers.find((ap) => ap.name === pl.name);
      if (found && !selectedPlayers.includes(found.id)) {
        dispatch(deletePlayer(pl.name));
      }
    });

    setShowModal(false);
  };

  // add custom player
  const handleCustomAdd = () => {
    if (!newPlayerName.trim()) {
      toast.error("Enter a valid player name.");
      return;
    }
    if (
      availablePlayers.some(
        (p) => p.name.toLowerCase() === newPlayerName.trim().toLowerCase()
      )
    ) {
      toast.error("Player already exists.");
      return;
    }

    const newId = Date.now();
    const newPlayer = {
      id: newId,
      name: newPlayerName.trim(),
      avatar: newPlayerAvatar || defaultAvatar,
    };

    availablePlayers.push(newPlayer);

    setSelectedPlayers((prev) => [...prev, newId]);
    dispatch(addPlayer({ name: newPlayer.name, points: defaultScore }));

    setNewPlayerName("");
    setNewPlayerAvatar(defaultAvatar);
    setShowAddForm(false);
    toast.success(`${newPlayer.name} added with ${defaultScore} points!`);
  };

  return (
    <>
      <Button
        variant="outline-primary"
        className="w-100 mb-3"
        onClick={handleOpenModal}
      >
        ➕ Add / Select Players
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
          <Row xs={2} sm={3} md={4} lg={5} className="g-3">
            {/* player cards */}
            {availablePlayers
              .filter((player) => !players.some((p) => p.name === player.name))
              .map((player) => (
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
          <Row className="mt-4">
            {/* Default Score Input */}
            <Col>
              <Form.Group>
                <Form.Label>Default Score</Form.Label>
                <Form.Control
                  type="text"
                  value={defaultScore}
                  onChange={(e) => setDefaultScore(Number(e.target.value))}
                />
              </Form.Group>
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
    </>
  );
};

export default ScoreEntryForm;
