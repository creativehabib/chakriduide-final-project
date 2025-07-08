import React from 'react';

const Snowfall = () => {
    return (
        <>
            <style>{`
        .snowfall {
          pointer-events: none;
          position: absolute;
          top: 0; left: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
          z-index: 0;
        }
        .snowflake {
          position: absolute;
          top: -10px;
          background: white;
          border-radius: 50%;
          opacity: 0.8;
          animation-name: fall;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
        @keyframes fall {
          0% {
            transform: translateY(0) translateX(0);
            opacity: 0.8;
          }
          100% {
            transform: translateY(100vh) translateX(20px);
            opacity: 0;
          }
        }
      `}</style>

            <div className="snowfall">
                {Array.from({ length: 50 }).map((_, i) => {
                    const size = Math.random() * 6 + 2; // 2 to 8 px
                    const left = Math.random() * 100; // vw %
                    const duration = Math.random() * 10 + 5; // 5 to 15 sec
                    const delay = Math.random() * 15; // stagger delay

                    return (
                        <div
                            key={i}
                            className="snowflake"
                            style={{
                                width: size,
                                height: size,
                                left: `${left}vw`,
                                animationDuration: `${duration}s`,
                                animationDelay: `${delay}s`,
                            }}
                        />
                    );
                })}
            </div>
        </>
    );
};

export default Snowfall;
