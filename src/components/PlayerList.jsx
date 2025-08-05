import React, { useState } from "react";
import { Card, Button, Row, Col, Modal, Form, Badge } from "react-bootstrap";
import { Plus, Trophy, UserX, Trash2, XCircle, History } from "lucide-react";

const PlayerList = ({ players, onAddScore, onDeletePlayer }) => {
  const [showScoreModal, setShowScoreModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [score, setScore] = useState("");

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

  return (
    <div className="mt-4">
      <h5 className="text-center mb-3">
        <Trophy size={18} fill="#FFC107" className="mb-1 me-1 text-warning" />
        Player List
      </h5>

      {players.map((player, idx) => (
        <Card
          key={idx}
          className={`mb-3 shadow-sm border-${
            player.points > 320 ? "danger" : "success"
          }`}
        >
          <Card.Body>
            <Row className="align-items-center">
              <Col xs={7}>
                <strong className="text-capitalize">{player.name}</strong>
                <div>
                  Total Points: <Badge bg="secondary">{player.points}</Badge>
                </div>
                <div className="mb-1">
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

                {/* Show Score History */}
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

              <Col xs={5} className="text-end">
                <div className="d-flex justify-content-end gap-2">
                  {player.points <= 320 && (
                    <Button
                      size="sm"
                      variant="primary"
                      onClick={() => openScoreModal(player)}
                    >
                      <Plus size={14} className="me-1" />
                       Score
                    </Button>
                  )}
                  <Button
                    size="sm"
                    variant="outline-danger"
                    onClick={() => openDeleteModal(player)}
                  >
                    <Trash2 size={14} />
                  </Button>
                </div>
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
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <Plus size={18} className="me-2" />
            Add Score for {selectedPlayer?.name}
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

      {/* Delete Modal */}
      <Modal
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        centered
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
