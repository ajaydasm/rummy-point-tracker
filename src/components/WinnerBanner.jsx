import React from "react";
import { Modal, Button, Image } from "react-bootstrap";
import { Trophy } from "lucide-react";
import images from "../data/playersWithAvatars";
import Confetti from "react-confetti";
import { motion } from "framer-motion";

const WinnerBanner = ({ winner, show, onClose }) => {
  if (!winner) return null;

  return (
    <Modal
      show={show}
      onHide={onClose}
      centered
      backdrop="static"
      dialogClassName="winner-modal"
      contentClassName="bg-dark text-light rounded-4 shadow-lg"
    >
      {/* 🎊 Confetti */}
      {show && <Confetti numberOfPieces={250} recycle={false} />}

      <Modal.Header
        closeButton
        className="border-bottom border-warning justify-content-center"
      >
        <Modal.Title className="d-flex align-items-center gap-2 text-warning">
          <Trophy size={28} className="text-warning" />
          <span className="fw-bold fs-5">🏆 Game Winner 🏆</span>
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className="text-center">
        <motion.div
          className="d-flex flex-column align-items-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Winner Avatar */}
          {winner.avatar && (
            <Image
              src={images[winner.avatar]}
              alt={winner.name}
              roundedCircle
              width={90}
              height={90}
              className="mb-3 border border-3 border-warning shadow"
            />
          )}

          {/* Winner Name */}
          <h3 className="fw-bold text-success mb-2">🎉 {winner.name} 🎉</h3>

          {/* Points */}
          <p className="text-light mb-4">
            Finished with{" "}
            <strong className="text-warning">{winner.points}</strong> points!
          </p>

          <Button
            variant="success"
            size="sm"
            className="px-3 fw-bold"
            onClick={onClose}
          >
            Continue 🚀
          </Button>
        </motion.div>
      </Modal.Body>
    </Modal>
  );
};

export default WinnerBanner;
