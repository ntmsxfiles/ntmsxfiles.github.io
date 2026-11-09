(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[220],{1865:(e,r,t)=>{Promise.resolve().then(t.bind(t,7212)),Promise.resolve().then(t.bind(t,3975)),Promise.resolve().then(t.bind(t,9701)),Promise.resolve().then(t.t.bind(t,2730,23))},3975:(e,r,t)=>{"use strict";t.d(r,{NavLinks:()=>s});var a=t(3583),o=t(2730),i=t.n(o),l=t(2863);let n=[{href:"/works/",label:"Работы"},{href:"/about/",label:"Обо мне"},{href:"/contact/",label:"Контакты"}];function s(){let e=(0,l.usePathname)();return(0,a.jsx)("nav",{"aria-label":"Разделы",className:"nav__links",children:n.map(r=>{let t;return(0,a.jsx)(i(),{href:r.href,"aria-current":e===(t=r.href)||e===t.slice(0,-1)||"/works/"===t&&e.startsWith("/cases")?"page":void 0,children:r.label},r.href)})})}},7212:(e,r,t)=>{"use strict";t.d(r,{AboutArt:()=>f});var a=t(3583),o=t(4391);function i(e){let r=e;return()=>{let e=Math.imul((r=r+0x6d2b79f5|0)^r>>>15,1|r);return(((e=e+Math.imul(e^e>>>7,61|e)^e)^e>>>14)>>>0)/0x100000000}}function l(e,r,t,a){let o=[],i=r,l=t,n=e()*Math.PI*2;for(let r=0;r<a;r++){n+=(e()-.5)*1.3;let r=26+70*e();i=Math.max(-60,Math.min(1660,i+Math.cos(n)*r*.9)),l=Math.max(-60,Math.min(960,l+Math.sin(n)*r*.9)),o.push([Math.round(i),Math.round(l),Math.round(r),e()])}return o}function n(e,r,t,a,o){let i="";for(let l=r;l<r+a;l+=5+6*e()){let r=t+e()*o*.4,a=t+o*(.5+.5*e()),n=l;for(i+=`M${n.toFixed(1)} ${r.toFixed(1)}`;r<a;)n+=(e()-.5)*9,r+=3+7*e(),i+=`L${n.toFixed(1)} ${r.toFixed(1)}`,.3>e()&&(i+=`l${((e()-.5)*12).toFixed(1)} 0`)}return i}function s(){let e=i(21),r=[...l(e,1100,120,16),...l(e,700,700,14),...l(e,1450,600,10)].slice(0,40),t=r.filter((e,r)=>r%4==1).flatMap(r=>l(e,r[0],r[1],3)).map(([e,r,t,a])=>[e,r,Math.round(.55*t),a]).slice(0,30),a=Array.from({length:90},()=>({x:Math.round(1600*e()),y:Math.round(900*e()),r:+(1.5+3*e()).toFixed(1)})),o=[n(e,40,380,260,420),n(e,520,40,200,300),n(e,880,460,240,360),n(e,1330,60,220,260)],s=i(7);return{orange:r,lime:t,specks:a,scribbles:o,orbits:Array.from({length:11},()=>{let e=600+1300*s(),r=-300+700*s(),t=450+1e3*s(),a=[];for(let o=0;a.length<3+Math.floor(7*s())&&o<80;o++){let o=s()*Math.PI*2,i=e+Math.cos(o)*t,l=r+Math.sin(o)*t;i>0&&i<1600&&l>0&&l<900&&a.push({a:o,s:1.5+5.5*s(),faint:.35>s()})}return{cx:e,cy:r,r:t,dots:a,speed:2*Math.PI/(120+200*s())*(.5>s()?-1:1)}})}}let c=`
attribute vec2 aPos;
void main() { gl_Position = vec4(aPos, 0.0, 1.0); }`;function f(){let e=(0,o.useMemo)(s,[]),r=(0,o.useRef)(null),t=(0,o.useRef)(null);return(0,o.useEffect)(()=>{let a=r.current.parentElement,o=r.current,i=t.current,l=i.getContext("2d"),n=o.getContext("webgl",{antialias:!0,premultipliedAlpha:!0}),s=matchMedia("(prefers-reduced-motion: reduce)").matches,f=null,u={};if(n){let r=!!n.getExtension("OES_standard_derivatives"),t=(e,r)=>{let t=n.createShader(e);if(n.shaderSource(t,r),n.compileShader(t),!n.getShaderParameter(t,n.COMPILE_STATUS))throw Error(n.getShaderInfoLog(t)??"shader");return t};try{if(f=n.createProgram(),n.attachShader(f,t(n.VERTEX_SHADER,c)),n.attachShader(f,t(n.FRAGMENT_SHADER,`
${r?"#extension GL_OES_standard_derivatives : enable":""}
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
  float w = ${r?"max(fwidth(f), 1e-4)":"0.06"};
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
}`)),n.linkProgram(f),!n.getProgramParameter(f,n.LINK_STATUS))throw Error("link");n.useProgram(f);let a=n.createBuffer();n.bindBuffer(n.ARRAY_BUFFER,a),n.bufferData(n.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,1,1]),n.STATIC_DRAW);let o=n.getAttribLocation(f,"aPos");for(let e of(n.enableVertexAttribArray(o),n.vertexAttribPointer(o,2,n.FLOAT,!1,0,0),["uRes","uTime","uScale","uOffset","uOrange","uLime"]))u[e]=n.getUniformLocation(f,e);let i=(e,r)=>{let t=new Float32Array(4*r);return e.forEach((e,r)=>t.set(e,4*r)),t};n.uniform4fv(u.uOrange,i(e.orange,40)),n.uniform4fv(u.uLime,i(e.lime,30)),n.clearColor(0,0,0,0)}catch(e){console.error(e),f=null}}let h=0,d=0,m=1,v=1,b=0,g=0,p=r=>{n&&f&&(n.uniform1f(u.uTime,r),n.clear(n.COLOR_BUFFER_BIT),n.drawArrays(n.TRIANGLE_STRIP,0,4)),l.setTransform(m*v,0,0,m*v,m*b,m*g),l.clearRect(-b/v,-g/v,h/v,d/v);let t=1/v;for(let a of e.orbits){let e=a.speed*r;for(let r of(l.globalAlpha=.5,l.strokeStyle="#0a0a0a",l.lineWidth=t,l.beginPath(),l.arc(a.cx,a.cy,a.r,0,2*Math.PI),l.stroke(),l.globalAlpha=1,a.dots)){let t=r.a+e;l.fillStyle=r.faint?"#6f7385":"#0a0a0a",l.beginPath(),l.arc(a.cx+Math.cos(t)*a.r,a.cy+Math.sin(t)*a.r,r.s,0,2*Math.PI),l.fill()}}},x=0,M=!1,_=performance.now(),A=e=>{p((e-_)/1e3),x=M?requestAnimationFrame(A):0},R=new ResizeObserver(()=>{for(let e of(h=a.clientWidth,d=a.clientHeight,m=Math.min(devicePixelRatio||1,2),v=Math.max(h/1600,d/900),b=(h-1600*v)/2,g=(d-900*v)/2,[o,i]))e.width=Math.round(h*m),e.height=Math.round(d*m);n&&f&&(n.viewport(0,0,o.width,o.height),n.uniform2f(u.uRes,o.width,o.height),n.uniform1f(u.uScale,v*m),n.uniform2f(u.uOffset,b*m,g*m)),p(s?0:(performance.now()-_)/1e3)});R.observe(a);let P=new IntersectionObserver(([e])=>{M=e.isIntersecting,s?p(0):M&&!x&&(x=requestAnimationFrame(A))});return P.observe(a),()=>{cancelAnimationFrame(x),R.disconnect(),P.disconnect()}},[e]),(0,a.jsxs)("div",{className:"about__art","aria-hidden":!0,children:[(0,a.jsxs)("svg",{className:"about__layer",viewBox:"0 0 1600 900",preserveAspectRatio:"xMidYMid slice",children:[e.specks.map((e,r)=>(0,a.jsx)("circle",{cx:e.x,cy:e.y,r:e.r,className:"speck"},r)),e.scribbles.map((e,r)=>(0,a.jsx)("path",{d:e,className:"scribble"},r))]}),(0,a.jsx)("canvas",{ref:r,className:"about__layer"}),(0,a.jsx)("canvas",{ref:t,className:"about__layer"})]})}},9701:(e,r,t)=>{"use strict";t.r(r),t.d(r,{Reveal:()=>i});var a=t(3583),o=t(4391);function i({children:e,as:r="div",className:t=""}){let l=(0,o.useRef)(null);return(0,o.useEffect)(()=>{let e=l.current;if(!e)return;let r=new IntersectionObserver(([t])=>{t.isIntersecting&&(e.classList.add("is-in"),r.disconnect())},{rootMargin:"0px 0px -10% 0px"});return r.observe(e),()=>r.disconnect()},[]),(0,a.jsx)(r,{ref:l,className:`reveal ${t}`,children:e})}}},e=>{e.O(0,[536,576,530,358],()=>e(e.s=1865)),_N_E=e.O()}]);