import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Container, Fade } from "react-bootstrap";
import Header from "../components/layout/Header";
import WinnerBanner from "../components/WinnerBanner";
import ScoreEntryForm from "../components/ScoreEntryForm";
import PlayerList from "../components/PlayerList";
import PreGame from "../components/PreGame";
import "./Home.css";

const Home = () => {
  const players = useSelector((state) => state.players.list);
  const gameStarted = useSelector((state) => state.players.gameStarted);

  const activePlayers = players.filter((p) => p.status === "active");

  const winner = activePlayers.length === 1 ? activePlayers[0] : null;

  const [showWinner, setShowWinner] = useState(true);

  return (
    <Container className="py-4 animate__animated animate__fadeIn">
      <Header />

      {!gameStarted ? (
        <Fade in={!gameStarted}>
          <PreGame players={players} />
        </Fade>
      ) : (
        <Fade in={gameStarted}>
          <div className="animate__animated animate__bounceIn">
            <WinnerBanner
              winner={winner}
              show={showWinner}
              onClose={() => setShowWinner(false)}
            />

            <ScoreEntryForm players={players} />
            <PlayerList players={players} />
          </div>
        </Fade>
      )}
    </Container>
  );
};

export default Home;
