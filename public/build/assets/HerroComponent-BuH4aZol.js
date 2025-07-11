import{r as t,j as e,$ as d}from"./app-CPznV8uF.js";import{A as h}from"./arrow-right-C_b5UdwT.js";import{c as x}from"./createLucideIcon-CiPrHNEp.js";/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const f=[["path",{d:"M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16",key:"jecpp"}],["rect",{width:"20",height:"14",x:"2",y:"6",rx:"2",key:"i6l2r4"}]],p=x("Briefcase",f),u=()=>e.jsxs(e.Fragment,{children:[e.jsx("style",{children:`
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
      `}),e.jsx("div",{className:"snowfall",children:Array.from({length:50}).map((c,i)=>{const r=Math.random()*6+2,a=Math.random()*100,n=Math.random()*10+5,o=Math.random()*15;return e.jsx("div",{className:"snowflake",style:{width:r,height:r,left:`${a}vw`,animationDuration:`${n}s`,animationDelay:`${o}s`}},i)})})]}),y=()=>{const[c,i]=t.useState(""),r=" চাকরি জীবনের জন্য সঠিক গাইডলাইন",a=t.useRef(0),n=t.useRef(null),[o,m]=t.useState(!1);return t.useEffect(()=>{const s=setInterval(()=>{i(l=>l+r.charAt(a.current)),a.current+=1,a.current>=r.length&&clearInterval(s)},80);return()=>clearInterval(s)},[]),t.useEffect(()=>{const s=new IntersectionObserver(([l])=>m(l.isIntersecting),{threshold:.3});return n.current&&s.observe(n.current),()=>s.disconnect()},[]),e.jsxs("section",{ref:n,className:`relative min-h-screen flex flex-col-reverse md:flex-row items-center justify-between
        px-6 md:px-20 py-16 transition-all duration-700 overflow-hidden
        bg-gradient-to-r from-blue-300 via-purple-200 to-pink-300
        dark:from-slate-900 dark:via-gray-800 dark:to-slate-900
        ${o?"opacity-100 translate-y-0":"opacity-0 translate-y-10"}`,children:[e.jsx(u,{}),e.jsxs("div",{className:"relative z-10 text-center md:text-left max-w-xl",children:[e.jsxs("h1",{className:"text-3xl sm:text-4xl md:text-5xl font-extrabold mb-6 leading-tight tracking-tight",children:[e.jsx("span",{className:"text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-purple-600 to-pink-500 dark:from-cyan-400 dark:via-purple-400 dark:to-pink-400",children:c}),e.jsx("span",{className:"ml-1 border-r-2 border-blue-900 dark:border-white animate-pulse"})]}),e.jsx("p",{className:"text-lg text-gray-700 dark:text-gray-300 mb-8",children:"চাকরির খোঁজ, প্রস্তুতি কুইজ, এবং অনুশীলন — সব এক প্ল্যাটফর্মে একসাথে।"}),e.jsxs("div",{className:"flex justify-center md:justify-start gap-4 flex-wrap",children:[e.jsxs(d,{href:"/quiz",className:"inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full text-base font-semibold shadow-lg transition duration-300 hover:scale-105 hover:ring-2 hover:ring-green-400",children:["MCQ অনুশীলন করুন ",e.jsx(h,{size:18})]}),e.jsxs(d,{href:"/jobs",className:"inline-flex items-center gap-2 bg-yellow-600 hover:bg-yellow-400 text-white px-6 py-3 rounded-full text-base font-semibold shadow-lg transition duration-300 hover:scale-105 hover:ring-2 hover:ring-yellow-600",children:["চাকরির খবর দেখুন ",e.jsx(p,{size:18})]})]})]}),e.jsx("div",{className:"relative z-10 mt-10 md:mt-0 w-full md:w-1/2 max-w-md",children:e.jsx("img",{src:"https://img.freepik.com/free-vector/man-search-hiring-job-online-from-laptop_1150-52728.jpg?semt=ais_hybrid&w=740",alt:"Job Search Illustration",className:"rounded-xl shadow-2xl w-full h-auto object-contain hover:scale-105 transition duration-500 dark:brightness-90 dark:contrast-110",loading:"lazy"})})]})};export{y as default};
