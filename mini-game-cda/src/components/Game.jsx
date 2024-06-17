import React, { useState, useEffect, useCallback } from 'react';
import Sequence from './Sequence';
import Timer from './Timer';
import Feedback from './Feedback';

const Game = () => {
    const [sequence, setSequence] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [timeLeft, setTimeLeft] = useState(30);
    const [attempts, setAttempts] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [feedback, setFeedback] = useState('');
    const [highScores, setHighScores] = useState([]);
    const [gameStarted, setGameStarted] = useState(false); // Estado para controlar se o jogo começou

    // Salvar a pontuação atual no localStorage
    const saveScore = useCallback(() => {
        const score = currentIndex - attempts; // Pontuação é baseada nos acertos
        const newScore = { score, date: new Date().toLocaleDateString() };
        const updatedScores = [...highScores, newScore].sort((a, b) => b.score - a.score).slice(0, 6);
        setHighScores(updatedScores);
        localStorage.setItem('highScores', JSON.stringify(updatedScores));
    }, [attempts, currentIndex, highScores]);

    // Gerar uma nova sequência de letras aleatórias
    const generateSequence = useCallback(() => {
        const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const newSequence = Array.from({ length: 10 }, () => letters[Math.floor(Math.random() * letters.length)]);
        setSequence(newSequence);
    }, []);

    // Iniciar o timer
    const startTimer = useCallback(() => {
        setTimeLeft(30); // Definir o tempo inicial aqui
        setGameOver(false);
    }, []);

    // Iniciar o jogo
    const startGame = useCallback(() => {
        generateSequence();
        setCurrentIndex(0);
        setTimeLeft(30); // Tempo inicial
        setAttempts(0);
        setGameOver(false);
        setFeedback('');
        startTimer(); // Iniciar o timer quando o jogo começar
        setGameStarted(true); // Marcar que o jogo começou
    }, [generateSequence, startTimer]);

    // Parar o jogo
    const stopGame = useCallback(() => {
        setGameOver(true);
        setFeedback('Jogo parado.');
        saveScore(); // Salvar pontuação ao parar o jogo
    }, [saveScore]);

// Lidar com a tecla pressionada pelo usuário
const handleKeyPress = useCallback((event) => {
    if (gameOver || !gameStarted) return;

    const keyPressed = event.key.toUpperCase();
    const audioCorrect = new Audio('/correct.mp3');
    const audioWrong = new Audio('/wrong.mp3');

    if (keyPressed === sequence[currentIndex]) {
        audioCorrect.play();
        setFeedback('Você acertou!');
        setCurrentIndex(prev => prev + 1);

        // Verificar se completou a sequência
        if (currentIndex + 1 === sequence.length) {
            stopGame(); // Jogo completo
            setFeedback('Tudo certo!');
        }
    } else {
        audioWrong.play();
        setAttempts(prev => prev + 1);
        stopGame()
        setFeedback('Chave errada!'); // Atualizar feedback imediatamente ao errar a tecla
    }
}, [currentIndex, gameOver, sequence, stopGame, gameStarted]);


    // Efeito para lidar com o timer
    useEffect(() => {
        const stopTimer = () => {
            setGameOver(true);
            setFeedback('Tempo esgotado!');
            saveScore(); // Salvar pontuação ao parar o jogo
        };

        let timer;
        if (!gameOver && gameStarted) { // Verificar se o jogo começou antes de iniciar o timer
            timer = setInterval(() => {
                setTimeLeft(prevTime => {
                    if (prevTime > 0) {
                        return prevTime - 1;
                    } else {
                        stopTimer(); 
                        return 0;
                    }
                });
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [gameOver, saveScore, gameStarted]);

    // Efeito para lidar com as teclas pressionadas
    useEffect(() => {
        if (gameStarted) {
            window.addEventListener('keydown', handleKeyPress);
            return () => {
                window.removeEventListener('keydown', handleKeyPress);
            };
        }
    }, [handleKeyPress, gameStarted]);

    // Carregar as pontuações do localStorage ao iniciar
    useEffect(() => {
        const storedScores = JSON.parse(localStorage.getItem('highScores')) || [];
        setHighScores(storedScores);
    }, []);

    //Função para reiniciar o jogo
    const restartGame = () => {
        startGame(); // Reinia o jogo
    };

    return (
        <div className="game-container">
            <div className="game">
                {!gameStarted && <button className="button" onClick={startGame}>Iniciar Jogo</button>}
                {gameStarted && (
                    <>
                        <Sequence sequence={sequence} currentIndex={currentIndex} />
                        <Timer timeLeft={timeLeft} />
                        <button className="button" onClick={restartGame}>Reiniciar Jogo</button>
                        <Feedback feedback={feedback} />
                        {gameOver && (
                            <>
                                <div className="high-scores">
                                    <h2>High Scores</h2>
                                    <ol>
                                        {highScores.map((score, index) => (
                                            <li key={index}>{`${score.score} pontos em ${score.date}`}</li>
                                        ))}
                                    </ol>
                                </div>
                            </>
                        )}
                        {!gameOver && <button className="button" onClick={stopGame}>Parar Jogo</button>}
                    </>
                )}
            </div>
        </div>
    );
};

export default Game;
