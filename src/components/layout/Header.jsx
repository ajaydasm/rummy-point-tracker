import React, { useState } from "react";
import { Button, Row, Col, Modal } from "react-bootstrap";
import ThemeToggle from "../ThemeToggle";
import { RotateCcw, XCircle } from "lucide-react";
import { useDispatch } from "react-redux";
import { resetGame } from "../../store/slices/playersSlice";
import { toast } from "react-toastify";

function Header() {
  const dispatch = useDispatch();
  const [showResetModal, setShowResetModal] = useState(false);

  return (
    <>
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
            onClick={() => setShowResetModal(true)} 
            title="Reset Game"
          >
            <RotateCcw size={16} className="me-1" />
          </Button>
        </Col>

        <Col xs="auto" className="d-flex justify-content-end">
          <ThemeToggle />
        </Col>
      </Row>

      <Modal
        show={showResetModal}
        onHide={() => setShowResetModal(false)}
        centered
        backdrop="static"
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <XCircle className="text-danger me-2" size={20} /> Confirm Reset
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
          <Button
            variant="danger"
            onClick={() => {
              dispatch(resetGame());
              toast.success("Game has been reset.");
              setShowResetModal(false);
            }}
          >
            Yes, Reset
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Header;
