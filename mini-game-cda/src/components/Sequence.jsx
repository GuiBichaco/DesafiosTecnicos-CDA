import React from 'react';

const Sequence = ({ sequence, currentIndex }) => {
    return (
        <div className="sequence">
            {sequence.map((letter, index) => (
                <span key={index} className={index === currentIndex ? 'active' : ''}>
                    {letter}
                </span>
            ))}
        </div>
    );
};

export default Sequence;
