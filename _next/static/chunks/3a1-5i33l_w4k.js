(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,25071,e=>{"use strict";var t=e.i(43476),r=e.i(71645);function a(e){let t=e;return()=>{let e=Math.imul((t=t+0x6d2b79f5|0)^t>>>15,1|t);return(((e=e+Math.imul(e^e>>>7,61|e)^e)^e>>>14)>>>0)/0x100000000}}function o(e,t,r,a){let o=[],i=t,l=r,n=e()*Math.PI*2;for(let t=0;t<a;t++){n+=(e()-.5)*1.3;let t=26+70*e();i=Math.max(-60,Math.min(1660,i+Math.cos(n)*t*.9)),l=Math.max(-60,Math.min(960,l+Math.sin(n)*t*.9)),o.push([Math.round(i),Math.round(l),Math.round(t),e()])}return o}function i(e,t,r,a,o){let i="";for(let l=t;l<t+a;l+=5+6*e()){let t=r+e()*o*.4,a=r+o*(.5+.5*e()),n=l;for(i+=`M${n.toFixed(1)} ${t.toFixed(1)}`;t<a;)n+=(e()-.5)*9,t+=3+7*e(),i+=`L${n.toFixed(1)} ${t.toFixed(1)}`,.3>e()&&(i+=`l${((e()-.5)*12).toFixed(1)} 0`)}return i}function l(){let e=a(21),t=[...o(e,1100,120,16),...o(e,700,700,14),...o(e,1450,600,10)].slice(0,40),r=t.filter((e,t)=>t%4==1).flatMap(t=>o(e,t[0],t[1],3)).map(([e,t,r,a])=>[e,t,Math.round(.55*r),a]).slice(0,30),l=Array.from({length:90},()=>({x:Math.round(1600*e()),y:Math.round(900*e()),r:+(1.5+3*e()).toFixed(1)})),n=[i(e,40,380,260,420),i(e,520,40,200,300),i(e,880,460,240,360),i(e,1330,60,220,260)],s=a(7);return{orange:t,lime:r,specks:l,scribbles:n,orbits:Array.from({length:11},()=>{let e=600+1300*s(),t=-300+700*s(),r=450+1e3*s(),a=[];for(let o=0;a.length<3+Math.floor(7*s())&&o<80;o++){let o=s()*Math.PI*2,i=e+Math.cos(o)*r,l=t+Math.sin(o)*r;i>0&&i<1600&&l>0&&l<900&&a.push({a:o,s:1.5+5.5*s(),faint:.35>s()})}return{cx:e,cy:t,r,dots:a,speed:2*Math.PI/(120+200*s())*(.5>s()?-1:1)}})}}let n=`
attribute vec2 aPos;
void main() { gl_Position = vec4(aPos, 0.0, 1.0); }`;e.s(["AboutArt",0,function(){let e=(0,r.useMemo)(l,[]),a=(0,r.useRef)(null),o=(0,r.useRef)(null);return(0,r.useEffect)(()=>{let t=a.current.parentElement,r=a.current,i=o.current,l=i.getContext("2d"),s=r.getContext("webgl",{antialias:!0,premultipliedAlpha:!0}),c=matchMedia("(prefers-reduced-motion: reduce)").matches,f=null,u={};if(s){let t=!!s.getExtension("OES_standard_derivatives"),r=(e,t)=>{let r=s.createShader(e);if(s.shaderSource(r,t),s.compileShader(r),!s.getShaderParameter(r,s.COMPILE_STATUS))throw Error(s.getShaderInfoLog(r)??"shader");return r};try{if(f=s.createProgram(),s.attachShader(f,r(s.VERTEX_SHADER,n)),s.attachShader(f,r(s.FRAGMENT_SHADER,`
${t?"#extension GL_OES_standard_derivatives : enable":""}
precision highp float;
uniform vec2 uRes;
uniform float uTime;
uniform float uScale;
uniform vec2 uOffset;
uniform vec4 uOrange[40];
uniform vec4 uLime[30];

vec2 blob(vec4 b, out float r) {
  float s = b.w;
  float sp = 0.26 + s * 0.37;
  float ph = s * 40.0;
  r = b.z * (1.0 + 0.09 * sin(uTime * sp * 0.7 + ph));
  return b.xy + vec2(sin(uTime * sp + ph), cos(uTime * sp * 0.8 + ph * 1.3)) * (18.0 + s * 20.0);
}

float edge(float f) {
  float w = ${t?"max(fwidth(f), 1e-4)":"0.06"};
  return smoothstep(1.0 - w, 1.0 + w, f);
}

void main() {
  vec2 px = vec2(gl_FragCoord.x, uRes.y - gl_FragCoord.y);
  vec2 v = (px - uOffset) / uScale;
  float fo = 0.0;
  float fr = 0.0;
  float fl = 0.0;
  for (int i = 0; i < 40; i++) {
    vec4 b = uOrange[i];
    if (b.z > 0.0) {
      float r;
      vec2 d = v - blob(b, r);
      float d2 = dot(d, d) + 1.0;
      float g = r * r / d2;
      fo += g * g;
      float rr = r + 10.0;
      float gr = rr * rr / d2;
      fr += gr * gr;
    }
  }
  for (int i = 0; i < 30; i++) {
    vec4 b = uLime[i];
    if (b.z > 0.0) {
      float r;
      vec2 d = v - blob(b, r);
      float g = r * r / (dot(d, d) + 1.0);
      fl += g * g;
    }
  }
  vec3 col = vec3(0.922, 0.910, 0.941);
  float a = edge(fr);
  col = mix(col, vec3(0.812, 0.478, 0.345), edge(fo));
  float l = edge(fl);
  col = mix(col, vec3(0.851, 0.875, 0.604), l);
  a = max(a, l);
  gl_FragColor = vec4(col * a, a);
}`)),s.linkProgram(f),!s.getProgramParameter(f,s.LINK_STATUS))throw Error("link");s.useProgram(f);let a=s.createBuffer();s.bindBuffer(s.ARRAY_BUFFER,a),s.bufferData(s.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,1,1]),s.STATIC_DRAW);let o=s.getAttribLocation(f,"aPos");for(let e of(s.enableVertexAttribArray(o),s.vertexAttribPointer(o,2,s.FLOAT,!1,0,0),["uRes","uTime","uScale","uOffset","uOrange","uLime"]))u[e]=s.getUniformLocation(f,e);let i=(e,t)=>{let r=new Float32Array(4*t);return e.forEach((e,t)=>r.set(e,4*t)),r};s.uniform4fv(u.uOrange,i(e.orange,40)),s.uniform4fv(u.uLime,i(e.lime,30)),s.clearColor(0,0,0,0)}catch(e){console.error(e),f=null}}let d=0,h=0,m=1,g=1,v=0,b=0,p=t=>{s&&f&&(s.uniform1f(u.uTime,t),s.clear(s.COLOR_BUFFER_BIT),s.drawArrays(s.TRIANGLE_STRIP,0,4)),l.setTransform(m*g,0,0,m*g,m*v,m*b),l.clearRect(-v/g,-b/g,d/g,h/g);let r=1/g;for(let a of e.orbits){let e=a.speed*t;for(let t of(l.globalAlpha=.5,l.strokeStyle="#0a0a0a",l.lineWidth=r,l.beginPath(),l.arc(a.cx,a.cy,a.r,0,2*Math.PI),l.stroke(),l.globalAlpha=1,a.dots)){let r=t.a+e;l.fillStyle=t.faint?"#6f7385":"#0a0a0a",l.beginPath(),l.arc(a.cx+Math.cos(r)*a.r,a.cy+Math.sin(r)*a.r,t.s,0,2*Math.PI),l.fill()}}},x=0,M=!1,A=performance.now(),R=e=>{p((e-A)/1e3),x=M?requestAnimationFrame(R):0},_=new ResizeObserver(()=>{for(let e of(d=t.clientWidth,h=t.clientHeight,m=Math.min(devicePixelRatio||1,2),g=Math.max(d/1600,h/900),v=(d-1600*g)/2,b=(h-900*g)/2,[r,i]))e.width=Math.round(d*m),e.height=Math.round(h*m);s&&f&&(s.viewport(0,0,r.width,r.height),s.uniform2f(u.uRes,r.width,r.height),s.uniform1f(u.uScale,g*m),s.uniform2f(u.uOffset,v*m,b*m)),p(c?0:(performance.now()-A)/1e3)});_.observe(t);let S=new IntersectionObserver(([e])=>{M=e.isIntersecting,c?p(0):M&&!x&&(x=requestAnimationFrame(R))});return S.observe(t),()=>{cancelAnimationFrame(x),_.disconnect(),S.disconnect()}},[e]),(0,t.jsxs)("div",{className:"about__art","aria-hidden":!0,children:[(0,t.jsxs)("svg",{className:"about__layer",viewBox:"0 0 1600 900",preserveAspectRatio:"xMidYMid slice",children:[e.specks.map((e,r)=>(0,t.jsx)("circle",{cx:e.x,cy:e.y,r:e.r,className:"speck"},r)),e.scribbles.map((e,r)=>(0,t.jsx)("path",{d:e,className:"scribble"},r))]}),(0,t.jsx)("canvas",{ref:a,className:"about__layer"}),(0,t.jsx)("canvas",{ref:o,className:"about__layer"})]})}],25071)},59095,e=>{"use strict";var t=e.i(43476),r=e.i(71645);e.s(["Reveal",0,function({children:e,as:a="div",className:o=""}){let i=(0,r.useRef)(null);return(0,r.useEffect)(()=>{let e=i.current;if(!e)return;let t=new IntersectionObserver(([r])=>{r.isIntersecting&&(e.classList.add("is-in"),t.disconnect())},{rootMargin:"0px 0px -10% 0px"});return t.observe(e),()=>t.disconnect()},[]),(0,t.jsx)(a,{ref:i,className:`reveal ${o}`,children:e})}])}]);