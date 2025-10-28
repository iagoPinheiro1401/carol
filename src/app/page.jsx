'use client';
import styled, { keyframes } from "styled-components";
import { useState } from "react";

// ====== ESTILOS ======
const Button = styled.button`
  position: absolute;
  background-color: #ff8fab;
  border: none;
  padding: 14px 22px;
  border-radius: 12px;
  font-size: 1rem;
  color: white;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 4px 8px rgba(0,0,0,0.2);

  @media (max-width: 600px) {
    padding: 12px 18px;
    font-size: 0.9rem;
    border-radius: 10px;
  }
`;

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
  overflow: hidden;
  background-color: #fff0f5;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Message = styled.div`
  font-size: 1.4rem;
  font-weight: bold;
  color: #ff4d6d;
  text-align: center;
  padding: 0 10px;
  max-width: 90%;
`;

// animação para o texto flutuante
const float = keyframes`
  0% { transform: translate(0, 0); }
  25% { transform: translate(30vw, -20vh); }
  50% { transform: translate(-20vw, 20vh); }
  75% { transform: translate(25vw, 25vh); }
  100% { transform: translate(0, 0); }
`;

const FloatingText = styled.div`
  position: absolute;
  font-size: 2rem;
  font-weight: bold;
  color: #ff3366;
  animation: ${float} 8s ease-in-out infinite;
  text-shadow: 0 0 10px #ff8fab, 0 0 20px #ff4d6d;
`;

const Image = styled.img`
  max-width: 80%;
  border-radius: 16px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.3);
  margin-top: 20px;
`;

// ====== COMPONENTE ======
export default function Home() {
  const [position, setPosition] = useState({ top: "50%", left: "50%" });
  const [clicks, setClicks] = useState(0);
  const [showMessage, setShowMessage] = useState("");
  const [showImage, setShowImage] = useState(false);
  const [showFinal, setShowFinal] = useState(false);
  const [showButton, setShowButton] = useState(true);

  // 🔹 Mensagens personalizáveis:
  const messages = {
    10: "Estamos quase lá ❤️",
    20: "Está estressada né? Que bom, mas continue por favor!!",
    30: "Só mais um pouco. Você é uma gostosa",
    40: "Estamos mais perto, Ana Carolynne.                    Eu acho!!",
  };

  function moveButton() {
    const newCount = clicks + 1;
    setClicks(newCount);

    // Move o botão para nova posição
    const randomTop = Math.random() * 80 + 10;
    const randomLeft = Math.random() * 80 + 10;
    setPosition({ top: `${randomTop}%`, left: `${randomLeft}%` });

    // Mostrar mensagens conforme o número de cliques
    if (messages[newCount]) {
      setShowButton(false);
      setShowMessage(messages[newCount]);

      // Após a segunda mensagem (20 cliques), mostrar a foto
      if (newCount === 20) {
        setTimeout(() => {
          setShowMessage("");
          setShowImage(true);
          setTimeout(() => {
            setShowImage(false);
            setShowButton(true);
          }, 5000);
        }, 4000);
      } else {
        setTimeout(() => {
          setShowMessage("");
          setShowButton(true);
        }, 4000);
      }
    }

    // Após 50 cliques → mostra "Eu te amo" e a foto
    if (newCount === 50) {
      setShowButton(false);
      setShowFinal(true);
    }
  }

  return (
    <Container>
      {/* Botão */}
      {showButton && (
        <Button
          onClick={moveButton}
          style={{
            top: position.top,
            left: position.left,
            transform: "translate(-50%, -50%)",
          }}
        >
          Ana Carolynne, toque aqui 💖
        </Button>
      )}

      {/* Mensagem normal */}
      {showMessage && <Message>{showMessage}</Message>}

      {/* Foto após a segunda mensagem */}
      {showImage && (
        <Image
          src="foto.JPG" // 👉 coloque aqui a imagem que quiser
          alt="Surpresa"
        />
      )}

      {/* Final: Eu te amo + imagem */}
      {showFinal && (
        <>
          <FloatingText>Eu te amo!!! 💘</FloatingText>
          <Image
            src="foto1.jpeg" // 👉 coloque aqui a foto final
            alt="Amor"
          />
        </>
      )}
    </Container>
  );
}
