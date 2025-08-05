import React, { useState } from "react";
import {
  Card,
  Button,
  Row,
  Col,
  Modal,
  Form,
  Badge,
  Stack,
} from "react-bootstrap";
import {
  Plus,
  Trophy,
  UserX,
  Trash2,
  XCircle,
  History,
  Pencil,
} from "lucide-react";

const PlayerList = ({ players, onAddScore, onDeletePlayer }) => {
  const [showScoreModal, setShowScoreModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [score, setScore] = useState("");
  const [showEditScoreModal, setShowEditScoreModal] = useState(false);
  const [editScore, setEditScore] = useState("");

  const openScoreModal = (player) => {
    setSelectedPlayer(player);
    setScore("");
    setShowScoreModal(true);
  };

  const handleScoreSubmit = () => {
    const numericScore = parseInt(score, 10);
    if (!isNaN(numericScore)) {
      onAddScore(selectedPlayer.name, numericScore);
      setScore("");
      setSelectedPlayer(null);
      setShowScoreModal(false);
    }
  };

  const openDeleteModal = (player) => {
    setSelectedPlayer(player);
    setShowDeleteModal(true);
  };

  const handleDelete = () => {
    onDeletePlayer(selectedPlayer.name);
    setSelectedPlayer(null);
    setShowDeleteModal(false);
  };

  const openEditModal = (player) => {
    const lastScore = player.scores?.[player.scores.length - 1] ?? "";
    setSelectedPlayer(player);
    setEditScore(lastScore);
    setShowEditScoreModal(true);
  };

  const handleEditScoreSubmit = () => {
    const numericScore = parseInt(editScore, 10);
    if (!isNaN(numericScore)) {
      const updatedScores = [...selectedPlayer.scores];
      const removedScore = updatedScores.pop();
      updatedScores.push(numericScore);

      const newPoints = selectedPlayer.points - removedScore + numericScore;

      const updatedPlayer = {
        ...selectedPlayer,
        scores: updatedScores,
        points: newPoints,
        status: newPoints > 320 ? "eliminated" : "active",
      };

      setSelectedPlayer(null);
      setEditScore("");
      setShowEditScoreModal(false);

      onAddScore(updatedPlayer.name, 0, updatedPlayer);
    }
  };

  return (
    <div className="mt-4">
      <h5 className="text-center mb-4 d-flex justify-content-center align-items-center gap-2">
        <Trophy size={20} fill="#FFC107" className="text-warning" />
        Player List
      </h5>

      {players.map((player, idx) => (
        <Card
          key={idx}
          className={`mb-3 shadow border-${
            player.points > 320 ? "danger" : "success"
          }`}
        >
          <Card.Body>
            <Row className="align-items-center">
              <Col xs={12} md={7}>
                <h6 className="text-capitalize mb-1">{player.name}</h6>
                <div>
                  Total Points: <Badge bg="dark">{player.points}</Badge>
                </div>
                <div className="my-1">
                  Status:{" "}
                  {player.points > 320 ? (
                    <Badge bg="danger">
                      <UserX size={12} className="me-1" />
                      Eliminated
                    </Badge>
                  ) : (
                    <Badge bg="success">Active</Badge>
                  )}
                </div>
                {player.scores?.length > 0 && (
                  <div className="mt-2 small">
                    <History size={14} className="me-1 mb-1" />
                    Score History:{" "}
                    {player.scores.map((s, i) => (
                      <Badge
                        key={i}
                        bg="light"
                        text="dark"
                        className="me-1 mb-1"
                      >
                        +{s}
                      </Badge>
                    ))}
                  </div>
                )}
              </Col>

              <Col xs={12} md={5} className="mt-3 mt-md-0">
                <Stack
                  direction="horizontal"
                  gap={2}
                  className="justify-content-md-end flex-wrap"
                >
                  {player.points <= 320 && (
                    <>
                      <Button
                        size="sm"
                        variant="primary"
                        onClick={() => openScoreModal(player)}
                      >
                        <Plus size={14} className="me-1" />
                        Score
                      </Button>
                      {player.scores?.length > 0 && (
                        <Button
                          size="sm"
                          variant="warning"
                          onClick={() => openEditModal(player)}
                        >
                          <Pencil size={14} className="me-1" />
                          Edit Last
                        </Button>
                      )}
                    </>
                  )}
                  <Button
                    size="sm"
                    variant="outline-danger"
                    onClick={() => openDeleteModal(player)}
                  >
                    <Trash2 size={14} />
                  </Button>
                </Stack>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      ))}

      {/* Score Modal */}
      <Modal
        show={showScoreModal}
        onHide={() => setShowScoreModal(false)}
        centered
        animation={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <Plus size={18} className="me-2" />
            Add Score - {selectedPlayer?.name}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control
            type="number"
            placeholder="Enter score"
            value={score}
            onChange={(e) => setScore(e.target.value)}
            autoFocus
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowScoreModal(false)}>
            Cancel
          </Button>
          <Button
            variant="success"
            onClick={handleScoreSubmit}
            disabled={!score}
          >
            Submit
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Edit Modal */}
      <Modal
        show={showEditScoreModal}
        onHide={() => setShowEditScoreModal(false)}
        centered
        animation={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <Pencil size={18} className="me-2" />
            Edit Score - {selectedPlayer?.name}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control
            type="number"
            value={editScore}
            onChange={(e) => setEditScore(e.target.value)}
            autoFocus
          />
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowEditScoreModal(false)}
          >
            Cancel
          </Button>
          <Button
            variant="warning"
            onClick={handleEditScoreSubmit}
            disabled={!editScore}
          >
            Update
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Delete Modal */}
      <Modal
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        centered
        animation={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <XCircle size={18} className="me-2 text-danger" />
            Confirm Delete
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete{" "}
          <strong>{selectedPlayer?.name}</strong>?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete Player
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default PlayerList;
