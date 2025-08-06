import{r as i,j as e,$ as d}from"./app-r2G4E02G.js";import{A as h}from"./arrow-right-D5CZ2nkT.js";import{c as x}from"./createLucideIcon-DOId1EC8.js";import"./app-CdlUFKM1.js";/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const f=[["path",{d:"M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16",key:"jecpp"}],["rect",{width:"20",height:"14",x:"2",y:"6",rx:"2",key:"i6l2r4"}]],p=x("Briefcase",f),u=()=>e.jsxs(e.Fragment,{children:[e.jsx("style",{children:`
                /* Basic Snowfall CSS */
                .snowfall {
                    pointer-events: none;
                    position: absolute;
                    top: 0;
                    left: 0;
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
                        transform: translateY(100vh) translateX(20px); /* Adjust translateX for more variation */
                        opacity: 0;
                    }
                }
            `}),e.jsx("div",{className:"snowfall",children:Array.from({length:50}).map((l,o)=>{const r=Math.random()*6+2,n=Math.random()*100,a=Math.random()*10+5,c=Math.random()*15;return e.jsx("div",{className:"snowflake",style:{width:`${r}px`,height:`${r}px`,left:`${n}vw`,animationDuration:`${a}s`,animationDelay:`${c}s`}},o)})})]}),y=()=>{const[l,o]=i.useState([]),r=" চাকরি প্রার্থীদের জন্য সঠিক গাইডলাইন",n=i.useRef(0),a=i.useRef(null),[c,m]=i.useState(!1);return i.useEffect(()=>{if(n.current>=r.length)return;const t=setInterval(()=>{o(s=>[...s,r.charAt(n.current)]),n.current+=1,n.current>=r.length&&clearInterval(t)},80);return()=>clearInterval(t)},[l.length]),i.useEffect(()=>{const t=new IntersectionObserver(([s])=>m(s.isIntersecting),{threshold:.3});return a.current&&t.observe(a.current),()=>{a.current&&t.unobserve(a.current),t.disconnect()}},[]),e.jsxs("section",{ref:a,className:`relative overflow-hidden bg-gradient-to-r from-blue-300 via-purple-200 to-pink-300 dark:from-slate-900 dark:via-gray-800 dark:to-slate-900 ${c?"translate-y-0 opacity-100":"translate-y-10 opacity-0"} py-8 md:py-0 transition-all duration-700`,children:[e.jsx(u,{}),e.jsxs("div",{className:"relative z-10 container mx-auto flex flex-col-reverse items-center gap-4 px-4 md:min-h-screen md:flex-row",children:[" ",e.jsxs("div",{className:"w-full text-center md:w-1/2 md:text-left",children:[e.jsx("h1",{className:"mb-4 text-2xl leading-tight font-extrabold tracking-tight sm:text-3xl md:text-5xl",children:e.jsx("span",{className:"bg-gradient-to-r from-blue-700 via-purple-600 to-pink-500 bg-clip-text text-transparent dark:from-cyan-400 dark:via-purple-400 dark:to-pink-400",children:r.split("").map((t,s)=>e.jsx("span",{className:s<l.length?"":"invisible",children:t},s))})}),e.jsx("p",{className:"mb-6 text-base text-gray-700 sm:text-lg dark:text-gray-300",children:"চাকরির খোঁজ, প্রস্তুতি কুইজ, এবং অনুশীলন — সব এক প্ল্যাটফর্মে একসাথে।"}),e.jsxs("div",{className:"flex flex-wrap justify-center gap-4 md:justify-start",children:[e.jsxs(d,{href:"/quiz",className:"inline-flex items-center gap-2 rounded-full bg-green-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg transition duration-300 hover:scale-105 hover:bg-green-700 hover:ring-2 hover:ring-green-400 sm:text-base",children:["MCQ অনুশীলন করুন ",e.jsx(h,{size:18})]}),e.jsxs(d,{href:"/jobs",className:"inline-flex items-center gap-2 rounded-full bg-yellow-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg transition duration-300 hover:scale-105 hover:bg-yellow-500 hover:ring-2 hover:ring-yellow-400 sm:text-base",children:["চাকরির খবর দেখুন ",e.jsx(p,{size:18})]})]})]}),e.jsx("div",{className:"flex w-full justify-center md:w-1/2",children:e.jsx("img",{src:"https://img.freepik.com/free-vector/man-search-hiring-job-online-from-laptop_1150-52728.jpg?semt=ais_hybrid&w=740",alt:"Job Search Illustration",width:"740",height:"500",className:"w-full max-w-xs rounded-xl object-contain shadow-2xl transition duration-500 hover:scale-105 sm:max-w-md dark:brightness-90 dark:contrast-110",loading:"lazy"})})]})]})};export{y as default};
