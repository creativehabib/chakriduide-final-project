import{j as t}from"./app-xvY0nST3.js";import"./app-Cgjs6Ips.js";const m=()=>t.jsxs(t.Fragment,{children:[t.jsx("style",{children:`
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
      `}),t.jsx("div",{className:"snowfall",children:Array.from({length:50}).map((s,n)=>{const a=Math.random()*6+2,o=Math.random()*100,i=Math.random()*10+5,e=Math.random()*15;return t.jsx("div",{className:"snowflake",style:{width:a,height:a,left:`${o}vw`,animationDuration:`${i}s`,animationDelay:`${e}s`}},n)})})]});export{m as default};
