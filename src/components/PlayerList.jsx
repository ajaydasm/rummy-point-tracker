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
import { useDispatch, useSelector } from "react-redux";
import { updatePoints, deletePlayer } from "../store/slices/playersSlice";
import availablePlayers from "../data/playersWithAvatars"; // ✅ avatars list

const PlayerList = () => {
  const dispatch = useDispatch();
  const players = useSelector((state) => state.players.list);
  const targetScore = useSelector((state) => state.players.targetScore); // ✅ take from redux

  const [showScoreModal, setShowScoreModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [score, setScore] = useState("");
  const [showEditScoreModal, setShowEditScoreModal] = useState(false);
  const [editScore, setEditScore] = useState("");

  // 👉 Add Score Modal
  const openScoreModal = (player) => {
    setSelectedPlayer(player);
    setScore("");
    setShowScoreModal(true);
  };

  const handleScoreSubmit = () => {
    const numericScore = parseInt(score, 10);
    if (!isNaN(numericScore)) {
      dispatch(
        updatePoints({ name: selectedPlayer.name, pointsToAdd: numericScore })
      );
      setScore("");
      setSelectedPlayer(null);
      setShowScoreModal(false);
    }
  };

  // 👉 Delete Modal
  const openDeleteModal = (player) => {
    setSelectedPlayer(player);
    setShowDeleteModal(true);
  };

  const handleDelete = () => {
    dispatch(deletePlayer(selectedPlayer.name));
    setSelectedPlayer(null);
    setShowDeleteModal(false);
  };

  // 👉 Edit Last Score Modal
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
        status: newPoints > targetScore ? "eliminated" : "active", // 
      };

      dispatch(updatePoints({ name: updatedPlayer.name, updatedPlayer }));

      setSelectedPlayer(null);
      setEditScore("");
      setShowEditScoreModal(false);
    }
  };

  return (
    <div className="mt-4">
      <h5 className="text-center mb-4 d-flex justify-content-center align-items-center gap-2">
        <Trophy size={20} fill="#FFC107" className="text-warning" />
        Player List
      </h5>
      <div className="text-end mb-4">
        <Badge bg="info" className="p-2 fs-9">
          🎯 Target Score: {targetScore}
        </Badge>
      </div>

      <Row xs={1} md={2} lg={3} className="g-3">
        {players.map((player, idx) => {
          const playerData = availablePlayers.find(
            (ap) => ap.name === player.name
          );

          return (
            <Col key={idx}>
              <Card
                className={`h-100 shadow-sm border-${
                  player.points > targetScore ? "danger" : "success"
                } position-relative`}
                style={{ borderRadius: "1rem" }}
              >
                <div className="position-absolute top-0 end-0 p-2">
                  {player.points > targetScore ? (
                    <Badge
                      bg="danger"
                      className="d-flex align-items-center gap-1"
                    >
                      <UserX size={12} />
                      Eliminated
                    </Badge>
                  ) : (
                    <Badge bg="success">Active</Badge>
                  )}
                </div>

                <Card.Body className="text-center">
                  {/* ✅ Avatar */}
                  <img
                    src={playerData?.avatar || "/default-avatar.png"}
                    alt={player.name}
                    className="rounded-circle mb-2"
                    style={{
                      width: "70px",
                      height: "70px",
                      objectFit: "cover",
                      border: "2px solid #ddd",
                    }}
                  />

                  <h6 className="fw-semibold text-capitalize mb-1">
                    {player.name}
                  </h6>
                  <div>
                    Total Points: <Badge bg="dark">{player.points}</Badge>
                  </div>

                  {player.scores?.length > 0 && (
                    <div className="mt-2 small">
                      <History size={14} className="me-1 mb-1" />
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
                </Card.Body>

                {/* ✅ Actions aligned at bottom */}
                <Card.Footer className="bg-white border-0">
                  <Stack
                    direction="horizontal"
                    gap={2}
                    className="justify-content-center flex-wrap"
                  >
                    {player.points <= targetScore && (
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
                            Edit
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
                </Card.Footer>
              </Card>
            </Col>
          );
        })}
      </Row>

      {/* ✅ Score Modal */}
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

      {/* ✅ Edit Modal */}
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

      {/* ✅ Delete Modal */}
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
