import React from 'react';

const Timer = ({ timeLeft }) => {
    return (
        <div className="timer">
            Tempo restante: {timeLeft}s
        </div>
    );
};

export default Timer;
