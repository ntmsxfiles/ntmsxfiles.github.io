(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,25071,e=>{"use strict";var t=e.i(43476),a=e.i(71645);function r(e){let t=e;return()=>{let e=Math.imul((t=t+0x6d2b79f5|0)^t>>>15,1|t);return(((e=e+Math.imul(e^e>>>7,61|e)^e)^e>>>14)>>>0)/0x100000000}}function o(e,t,a,r){let o=[],n=t,l=a,i=e()*Math.PI*2;for(let t=0;t<r;t++){i+=(e()-.5)*1.3;let t=26+70*e();n=Math.max(-60,Math.min(1660,n+Math.cos(i)*t*.9)),l=Math.max(-60,Math.min(960,l+Math.sin(i)*t*.9)),o.push([Math.round(n),Math.round(l),Math.round(t),e()])}return o}function n(e,t,a,r,o){let n="";for(let l=t;l<t+r;l+=5+6*e()){let t=a+e()*o*.4,r=a+o*(.5+.5*e()),i=l;for(n+=`M${i.toFixed(1)} ${t.toFixed(1)}`;t<r;)i+=(e()-.5)*9,t+=3+7*e(),n+=`L${i.toFixed(1)} ${t.toFixed(1)}`,.3>e()&&(n+=`l${((e()-.5)*12).toFixed(1)} 0`)}return n}function l(){let e=r(21),t=[...o(e,1100,120,16),...o(e,700,700,14),...o(e,1450,600,10)].slice(0,40),a=t.filter((e,t)=>t%4==1).flatMap(t=>o(e,t[0],t[1],3)).map(([e,t,a,r])=>[e,t,Math.round(.55*a),r]).slice(0,30),l=Array.from({length:90},()=>({x:Math.round(1600*e()),y:Math.round(900*e()),r:+(1.5+3*e()).toFixed(1)})),i=[n(e,40,380,260,420),n(e,520,40,200,300),n(e,880,460,240,360),n(e,1330,60,220,260)],s=r(7);return{orange:t,lime:a,specks:l,scribbles:i,orbits:Array.from({length:11},()=>{let e=600+1300*s(),t=-300+700*s(),a=450+1e3*s(),r=[];for(let o=0;r.length<3+Math.floor(7*s())&&o<80;o++){let o=s()*Math.PI*2,n=e+Math.cos(o)*a,l=t+Math.sin(o)*a;n>0&&n<1600&&l>0&&l<900&&r.push({a:o,s:1.5+5.5*s(),faint:.35>s()})}return{cx:e,cy:t,r:a,dots:r,speed:2*Math.PI/(120+200*s())*(.5>s()?-1:1)}})}}let i=`
attribute vec2 aPos;
void main() { gl_Position = vec4(aPos, 0.0, 1.0); }`;e.s(["AboutArt",0,function(){let e=(0,a.useMemo)(l,[]),r=(0,a.useRef)(null),o=(0,a.useRef)(null);return(0,a.useEffect)(()=>{let t=r.current.parentElement,a=r.current,n=o.current,l=n.getContext("2d"),s=a.getContext("webgl",{antialias:!0,premultipliedAlpha:!0}),c=matchMedia("(prefers-reduced-motion: reduce)").matches,u=null,d={};if(s){let t=!!s.getExtension("OES_standard_derivatives"),a=(e,t)=>{let a=s.createShader(e);if(s.shaderSource(a,t),s.compileShader(a),!s.getShaderParameter(a,s.COMPILE_STATUS))throw Error(s.getShaderInfoLog(a)??"shader");return a};try{if(u=s.createProgram(),s.attachShader(u,a(s.VERTEX_SHADER,i)),s.attachShader(u,a(s.FRAGMENT_SHADER,`
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
  vec3 col = vec3(0.937, 0.894, 1.0);
  float a = edge(fr);
  col = mix(col, vec3(1.0, 0.353, 0.122), edge(fo));
  float l = edge(fl);
  col = mix(col, vec3(0.831, 0.949, 0.227), l);
  a = max(a, l);
  gl_FragColor = vec4(col * a, a);
}`)),s.linkProgram(u),!s.getProgramParameter(u,s.LINK_STATUS))throw Error("link");s.useProgram(u);let r=s.createBuffer();s.bindBuffer(s.ARRAY_BUFFER,r),s.bufferData(s.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,1,1]),s.STATIC_DRAW);let o=s.getAttribLocation(u,"aPos");for(let e of(s.enableVertexAttribArray(o),s.vertexAttribPointer(o,2,s.FLOAT,!1,0,0),["uRes","uTime","uScale","uOffset","uOrange","uLime"]))d[e]=s.getUniformLocation(u,e);let n=(e,t)=>{let a=new Float32Array(4*t);return e.forEach((e,t)=>a.set(e,4*t)),a};s.uniform4fv(d.uOrange,n(e.orange,40)),s.uniform4fv(d.uLime,n(e.lime,30)),s.clearColor(0,0,0,0)}catch(e){console.error(e),u=null}}let f=0,m=0,h=1,v=1,g=0,p=0,x=t=>{s&&u&&(s.uniform1f(d.uTime,t),s.clear(s.COLOR_BUFFER_BIT),s.drawArrays(s.TRIANGLE_STRIP,0,4)),l.setTransform(h*v,0,0,h*v,h*g,h*p),l.clearRect(-g/v,-p/v,f/v,m/v);let a=1/v;for(let r of e.orbits){let e=r.speed*t;for(let t of(l.globalAlpha=.5,l.strokeStyle="#0a0a0a",l.lineWidth=a,l.beginPath(),l.arc(r.cx,r.cy,r.r,0,2*Math.PI),l.stroke(),l.globalAlpha=1,r.dots)){let a=t.a+e;l.fillStyle=t.faint?"#6f7385":"#0a0a0a",l.beginPath(),l.arc(r.cx+Math.cos(a)*r.r,r.cy+Math.sin(a)*r.r,t.s,0,2*Math.PI),l.fill()}}},y=0,M=!1,w=performance.now(),b=e=>{x((e-w)/1e3),y=M?requestAnimationFrame(b):0},S=new ResizeObserver(()=>{for(let e of(f=t.clientWidth,m=t.clientHeight,h=Math.min(devicePixelRatio||1,2),v=Math.max(f/1600,m/900),g=(f-1600*v)/2,p=(m-900*v)/2,[a,n]))e.width=Math.round(f*h),e.height=Math.round(m*h);s&&u&&(s.viewport(0,0,a.width,a.height),s.uniform2f(d.uRes,a.width,a.height),s.uniform1f(d.uScale,v*h),s.uniform2f(d.uOffset,g*h,p*h)),x(c?0:(performance.now()-w)/1e3)});S.observe(t);let A=new IntersectionObserver(([e])=>{M=e.isIntersecting,c?x(0):M&&!y&&(y=requestAnimationFrame(b))});return A.observe(t),()=>{cancelAnimationFrame(y),S.disconnect(),A.disconnect()}},[e]),(0,t.jsxs)("div",{className:"about__art","aria-hidden":!0,children:[(0,t.jsxs)("svg",{className:"about__layer",viewBox:"0 0 1600 900",preserveAspectRatio:"xMidYMid slice",children:[e.specks.map((e,a)=>(0,t.jsx)("circle",{cx:e.x,cy:e.y,r:e.r,className:"speck"},a)),e.scribbles.map((e,a)=>(0,t.jsx)("path",{d:e,className:"scribble"},a))]}),(0,t.jsx)("canvas",{ref:r,className:"about__layer"}),(0,t.jsx)("canvas",{ref:o,className:"about__layer"})]})}],25071)},57113,e=>{"use strict";var t=e.i(43476),a=e.i(71645);let r={soyuz:{variable:"--font-soyuz",weight:700},krasnodar:{variable:"--font-krasnodar",weight:400}},o=2*Math.PI;e.s(["DotText",0,function({text:e,font:n="soyuz",fitTo:l,color:i,accent:s,accentRatio:c=0,density:u=150,className:d=""}){let f=(0,a.useRef)(null),m=(0,a.useRef)(null);return(0,a.useEffect)(()=>{let t=f.current,a=m.current,d=a.getContext("2d"),h=matchMedia("(prefers-reduced-motion: reduce)").matches,{variable:v,weight:g}=r[n],p=getComputedStyle(document.documentElement).getPropertyValue(v).trim()||"sans-serif",x={x:-9999,y:-9999},y=!1,M=0,w=0,b=0,S=2,A=0,R=new Float32Array(0),C=new Float32Array(0),T=new Float32Array(0),_=new Float32Array(0),P=new Float32Array(0),E=new Float32Array(0),B=new Float32Array(0),D=new Uint8Array(0),L=performance.now(),F=(e,t)=>{e.font=`${g} ${t}px ${p}`},j=r=>{let o=t.clientWidth;if(!o)return;let n=document.createElement("canvas").getContext("2d");F(n,100);let i=.99*Math.floor(100*o/n.measureText(l??e).width);F(n,i);let s=n.measureText(e),f=Math.ceil(.08*i);w=Math.min(o,Math.ceil(s.actualBoundingBoxLeft+s.actualBoundingBoxRight)+2*f),b=Math.ceil(s.actualBoundingBoxAscent+s.actualBoundingBoxDescent)+2*f;let m=document.createElement("canvas");m.width=w,m.height=b;let v=m.getContext("2d",{willReadFrequently:!0});F(v,i),v.fillText(e,s.actualBoundingBoxLeft+f,s.actualBoundingBoxAscent+f);let g=v.getImageData(0,0,w,b).data,p=Math.max(3,Math.round(o/u));S=.42*p;let x=[],y=[];for(let e=Math.floor(p/2);e<b;e+=p)for(let t=Math.floor(p/2);t<w;t+=p)g[(e*w+t)*4+3]>110&&(x.push(t),y.push(e));R=new Float32Array(A=x.length),C=new Float32Array(A),T=new Float32Array(A),_=new Float32Array(A),P=Float32Array.from(x),E=Float32Array.from(y),B=new Float32Array(A),D=new Uint8Array(A);let M=r&&!h;for(let e=0;e<A;e++)D[e]=+(Math.random()<c),R[e]=M?Math.random()*w:P[e],C[e]=M?b+Math.random()*b*1.5:E[e],B[e]=M?P[e]/w*600+700*Math.random():0;L=performance.now();let j=Math.min(devicePixelRatio||1,2);a.width=Math.round(w*j),a.height=Math.round(b*j),a.style.width=`${w}px`,a.style.height=`${b}px`,d.setTransform(j,0,0,j,0,0)},U=()=>{let e=performance.now()-L;for(let[t,a]of(d.clearRect(0,0,w,b),s?[[0,i],[1,s]]:[[0,i]])){d.fillStyle=a,d.beginPath();for(let a=0;a<A;a++)(s?D[a]:0)!==t||e<B[a]||(d.moveTo(R[a]+S,C[a]),d.arc(R[a],C[a],S,0,o));d.fill()}},k=()=>{(()=>{let e=performance.now()-L,t=Math.max(48,.4*b),a=t*t;for(let r=0;r<A;r++){if(e<B[r])continue;let o=Math.sin(.0012*e+.02*P[r])*S*.5,n=Math.cos(.001*e+.03*E[r])*S*.4,l=(P[r]+o-R[r])*.06,i=(E[r]+n-C[r])*.06,s=R[r]-x.x,c=C[r]-x.y,u=s*s+c*c;if(u<a){let e=Math.sqrt(u)||1,a=(t-e)/t*5;l+=s/e*a,i+=c/e*a}T[r]=(T[r]+l)*.82,_[r]=(_[r]+i)*.82,R[r]+=T[r],C[r]+=_[r]}})(),U(),M=y?requestAnimationFrame(k):0},I=()=>{h?U():!M&&y&&(M=requestAnimationFrame(k))},z=e=>{let t=a.getBoundingClientRect();x.x=e.clientX-t.left,x.y=e.clientY-t.top},$=()=>{x.x=x.y=-9999},O=!1,N=0,W=new ResizeObserver(()=>{O&&t.clientWidth!==N&&(N=t.clientWidth,j(!1),I())}),q=new IntersectionObserver(([e])=>{(y=e.isIntersecting)&&!O&&(O=!0,N=t.clientWidth,j(!0)),I()}),H=!1;return document.fonts.load(`${g} 100px ${p}`,e).finally(()=>{H||(W.observe(t),q.observe(t))}),h||(a.addEventListener("pointermove",z),a.addEventListener("pointerleave",$)),()=>{H=!0,cancelAnimationFrame(M),W.disconnect(),q.disconnect(),a.removeEventListener("pointermove",z),a.removeEventListener("pointerleave",$)}},[e,n,l,i,s,c,u]),(0,t.jsx)("div",{ref:f,className:`dots ${d}`,"aria-hidden":!0,children:(0,t.jsx)("canvas",{ref:m})})}])},35532,e=>{"use strict";var t=e.i(43476),a=e.i(71645);let r=`
uniform sampler2D uDye;
uniform float uTime;
uniform vec2 uTexel;
uniform vec2 uSize;
varying vec2 vDyeUv;
float silkH(vec2 q) {
  vec3 c = texture2D(uDye, q).rgb;
  float l = dot(c, vec3(0.3, 0.5, 0.2));
  l = l / (1.0 + l);
  return l * 0.14
       + sin(q.x * 6.0 + uTime * 0.55) * 0.09
       + sin(q.y * 5.0 - uTime * 0.4 + q.x * 2.0) * 0.08;
}`,o=`
vDyeUv = uv;
vec2 e = uTexel * 2.0;
float sH = silkH(uv);
float hL = silkH(uv - vec2(e.x, 0.0));
float hR = silkH(uv + vec2(e.x, 0.0));
float hB = silkH(uv - vec2(0.0, e.y));
float hT = silkH(uv + vec2(0.0, e.y));
vec3 objectNormal = normalize(vec3(-(hR - hL) / (2.0 * e.x * uSize.x), -(hT - hB) / (2.0 * e.y * uSize.y), 1.0));
#ifdef USE_TANGENT
vec3 objectTangent = vec3(tangent.xyz);
#endif`,n=`
vec2 cellN = uDots * vec2(1.0, uSize.y / uSize.x);
vec2 cellP = vDyeUv * cellN;
vec2 cellC = (floor(cellP) + 0.5) / cellN;
vec3 dyeRaw = texture2D(uDye, vDyeUv).rgb;
vec3 dyeCell = texture2D(uDye, cellC).rgb;
float lumCell = dot(dyeCell, vec3(0.3, 0.5, 0.2));
float dotR = smoothstep(0.035, 0.45, lumCell) * 0.74;
float dotD = length(fract(cellP) - 0.5);
float dotAA = fwidth(dotD) * 1.2;
float dotM = 1.0 - smoothstep(dotR - dotAA, dotR + dotAA, dotD);
float solid = smoothstep(0.3, 0.46, dot(dyeRaw, vec3(0.3, 0.5, 0.2)));
dotM = max(dotM, solid);
vec3 dyeC = mix(dyeRaw, dyeCell, 0.6);
float dmx = max(dyeC.r, max(dyeC.g, dyeC.b));
dyeC = pow(dyeC * 1.5 / (1.0 + dmx * 0.9), vec3(2.2));
vec3 dyeLit = mix(dyeC, vec3(1.0, 0.8, 0.6) * dmx * 0.8, 0.12 * (1.0 - solid));
diffuseColor.rgb = vec3(0.01) + dyeC * 0.05 + dyeLit * 0.2 * dotM;`,l=`
varying vec2 vUv;
void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,i=`
uniform sampler2D uMap;
uniform sampler2D uDye;
uniform vec3 uColor;
uniform vec2 uRes;
uniform float uCell;
varying vec2 vUv;
float dyeL(vec2 q) { return dot(texture2D(uDye, q).rgb, vec3(0.3, 0.5, 0.2)); }
void main() {
  vec2 s = gl_FragCoord.xy / uRes;
  vec2 su = 0.5 + (s - 0.5) / 1.3;
  float l0 = dyeL(su);
  vec2 grad = vec2(dyeL(su + vec2(0.004, 0.0)) - l0, dyeL(su + vec2(0.0, 0.004)) - l0);
  vec4 t = texture2D(uMap, vUv + grad * 0.05);
  if (t.a < 0.5) discard;
  // the foot of the letters breaks up into the same halftone dots and sinks into the paint
  float d = length(fract(gl_FragCoord.xy / uCell) - 0.5);
  float foot = smoothstep(0.08, 0.46, vUv.y);
  if (foot < 1.0 && d > mix(0.12, 0.72, foot)) discard;
  vec3 dye = texture2D(uDye, su).rgb;
  float dmx = max(dye.r, max(dye.g, dye.b));
  vec3 dyeC = pow(dye * 1.5 / (1.0 + dmx * 0.9), vec3(2.2));
  vec3 col = mix(uColor, uColor * 0.5 + dyeC * 1.7, clamp(dmx * 1.2, 0.0, 0.68));
  col *= 0.86 + 0.14 * smoothstep(0.44, 0.3, d);
  gl_FragColor = vec4(col, 1.0);
}`,s=`
attribute float aSeed;
uniform float uTime;
uniform float uPixel;
uniform vec3 uBox;
varying float vSeed;
void main() {
  vec3 p = position;
  p.x += sin(uTime * 0.21 + aSeed * 40.0) * 0.35;
  p.z += cos(uTime * 0.17 + aSeed * 23.0) * 0.3;
  p.y = mod(p.y + uTime * (0.05 + aSeed * 0.12) + uBox.y, uBox.y * 2.0) - uBox.y;
  vec4 mv = modelViewMatrix * vec4(p, 1.0);
  gl_Position = projectionMatrix * mv;
  gl_PointSize = (1.2 + aSeed * 3.2) * uPixel * (7.0 / -mv.z);
  vSeed = aSeed;
}`,c=`
uniform float uTime;
varying float vSeed;
void main() {
  float d = length(gl_PointCoord - 0.5);
  float a = smoothstep(0.5, 0.0, d);
  float tw = 0.45 + 0.55 * sin(uTime * (1.2 + vSeed * 3.0) + vSeed * 60.0);
  vec3 c = mix(vec3(1.0, 0.95, 0.88), vec3(0.75, 0.9, 1.0), step(0.6, vSeed));
  gl_FragColor = vec4(c * a * tw * 0.7, a * tw);
}`,u={uniforms:{tDiffuse:{value:null},uTime:{value:0},uRes:{value:null}},vertexShader:`
varying vec2 vUv;
void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,fragmentShader:`
uniform sampler2D tDiffuse;
uniform float uTime;
uniform vec2 uRes;
varying vec2 vUv;
float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}
void main() {
  vec2 d = vUv - 0.5;
  float r2 = dot(d, d);
  vec2 off = d * r2 * 0.025;
  vec3 col;
  col.r = texture2D(tDiffuse, vUv - off).r;
  col.g = texture2D(tDiffuse, vUv).g;
  col.b = texture2D(tDiffuse, vUv + off).b;
  col *= 1.0 - r2 * 1.1;
  vec2 fc = vUv * uRes;
  col *= 0.95 + 0.05 * (0.5 + 0.5 * sin(fc.x * 1.25) * sin(fc.y * 1.25));
  col += (hash(fc + fract(uTime) * 97.0) - 0.5) * 0.03;
  gl_FragColor = vec4(max(col, 0.0), 1.0);
}`};e.s(["HeroScene",0,function(){let d=(0,a.useRef)(null);return(0,a.useEffect)(()=>{let t=d.current,a=t.parentElement,f=a.querySelector(".hero__name"),m=()=>{},h=!1;return(async()=>{let d,v=await e.A(21442),[{RoomEnvironment:g},{EffectComposer:p},{RenderPass:x},{UnrealBloomPass:y},{ShaderPass:M},{OutputPass:w},{createFluid:b,PALETTE:S}]=await Promise.all([e.A(2460),e.A(53369),e.A(12022),e.A(96706),e.A(12660),e.A(30481),e.A(72312)]),A=f?getComputedStyle(f):null,R=e=>`${A?.fontWeight??400} ${e}px ${A?.fontFamily??"sans-serif"}`;if(await document.fonts.load(R(100),f?.textContent??""),h)return;try{if(!(d=new v.WebGLRenderer({canvas:t,antialias:!1,powerPreference:"high-performance"})).extensions.has("EXT_color_buffer_float")&&!d.extensions.has("EXT_color_buffer_half_float"))throw Error("no float targets")}catch(r){let e=document.createElement("canvas").getContext("webgl2"),t=e?.getExtension("WEBGL_debug_renderer_info");console.warn("[leyn.dev] hero scene fallback:",r,{webgl2:!!e,webgl1:!!document.createElement("canvas").getContext("webgl"),gpu:e&&t?e.getParameter(t.UNMASKED_RENDERER_WEBGL):null,floatTargets:e?!!e.getExtension("EXT_color_buffer_float"):null,halfFloatTargets:e?!!e.getExtension("EXT_color_buffer_half_float"):null}),a.classList.add("no-webgl"),a.dataset.fallback=String(r?.message??r);return}d.toneMapping=v.NeutralToneMapping,d.toneMappingExposure=.95,d.outputColorSpace=v.SRGBColorSpace;let C=matchMedia("(prefers-reduced-motion: reduce)").matches,T=a.clientWidth<760,_=b(d),P=new v.Scene,E=new v.PerspectiveCamera(32,1,.1,100);E.position.set(0,0,7);let B=new v.PMREMGenerator(d),D=B.fromScene(new g,.04).texture;P.environment=D;let L={uDye:{value:null},uTime:{value:0},uTexel:{value:_.dyeTexel},uSize:{value:new v.Vector2(1,1)},uDots:{value:200}},F=new v.MeshPhysicalMaterial({roughness:.34,metalness:0,sheen:.6,sheenRoughness:.4,sheenColor:new v.Color(.12,.11,.12),clearcoat:.08,clearcoatRoughness:.3,envMapIntensity:.03});F.onBeforeCompile=e=>{Object.assign(e.uniforms,L),e.vertexShader=e.vertexShader.replace("#include <common>",`#include <common>
${r}`).replace("#include <beginnormal_vertex>",o).replace("#include <begin_vertex>","vec3 transformed = position + vec3(0.0, 0.0, sH);"),e.fragmentShader=e.fragmentShader.replace("#include <common>","#include <common>\nuniform sampler2D uDye;\nuniform vec2 uSize;\nuniform float uDots;\nvarying vec2 vDyeUv;").replace("#include <map_fragment>",n).replace("#include <emissivemap_fragment>","#include <emissivemap_fragment>\ntotalEmissiveRadiance += dyeC * 0.1 + dyeLit * dotM * 0.95;")};let j=new v.Mesh(new v.PlaneGeometry(1,1,T?140:260,T?100:170),F);j.position.z=-4.6,P.add(j);let U=new v.PointLight(0xff4f9a,6,12,1.6),k=new v.PointLight(5235711,5,12,1.6);P.add(U,k);let I=new v.DirectionalLight(0xffffff,.35);I.position.set(3,4,5),P.add(I);let z=document.createElement("canvas"),$=new v.CanvasTexture(z);$.colorSpace=v.SRGBColorSpace,$.anisotropy=4;let O=new v.Mesh(new v.PlaneGeometry(1,1),new v.ShaderMaterial({uniforms:{uMap:{value:$},uDye:L.uDye,uColor:{value:new v.Color(.82,.72,.62)},uRes:{value:new v.Vector2(1,1)},uCell:{value:7}},vertexShader:l,fragmentShader:i}));O.position.z=-2.2;let N=O.material.uniforms,W=document.createElement("canvas"),q=new v.CanvasTexture(W);q.colorSpace=v.SRGBColorSpace;let H=new v.Mesh(new v.PlaneGeometry(1,1),new v.MeshBasicMaterial({map:q,transparent:!0,opacity:.16,depthWrite:!1,blending:v.AdditiveBlending,color:new v.Color(1,.72,.7)}));H.renderOrder=1,O.renderOrder=2,P.add(H,O);let G=T?500:1400,V=new v.BufferGeometry,X=new Float32Array(3*G),Y=new Float32Array(G),K=new v.Vector3(6,4,3);for(let e=0;e<G;e++)X[3*e]=(2*Math.random()-1)*7,X[3*e+1]=(2*Math.random()-1)*5,X[3*e+2]=-3.8+6.5*Math.random(),Y[e]=Math.random();V.setAttribute("position",new v.BufferAttribute(X,3)),V.setAttribute("aSeed",new v.BufferAttribute(Y,1));let Z=new v.ShaderMaterial({uniforms:{uTime:{value:0},uPixel:{value:1},uBox:{value:K}},vertexShader:s,fragmentShader:c,transparent:!0,depthWrite:!1,blending:v.AdditiveBlending}),J=new v.Points(V,Z);J.frustumCulled=!1,P.add(J);let Q=new p(d);Q.addPass(new x(P,E));let ee=new y(new v.Vector2(1,1),.28,.45,.95);Q.addPass(ee);let et=new M({...u,uniforms:{...u.uniforms,uRes:{value:new v.Vector2}}});Q.addPass(et),Q.addPass(new w);let ea={W:1,H:1,halfW:1,halfH:1},er=e=>{let t=Math.tan(v.MathUtils.degToRad(E.fov/2))*e;return{h:t,w:t*E.aspect}},eo=[[2,6,0],[7,6,0],[2,7,0]],en=Math.floor(Math.random()*eo.length),el=e=>{let t=eo[en],a=S[t[Math.floor(Math.random()*t.length)]],r=T?.6*e:e;return[a[0]*r,a[1]*r,a[2]*r]},ei=[],es=(e,t)=>{let a=T?.7*t:t;return[e[0]*a,e[1]*a,e[2]*a]},ec=(e,t,a=1,r=0)=>{let o=eo[en];ei.push({x:e,y:t,size:.16*a*Math.min(1,.55+.45*(j.scale.x/j.scale.y)),t:-r,dur:1.4+.6*Math.random(),rot:Math.random()*Math.PI*2,petals:5+Math.floor(3*Math.random()),seed:100*Math.random(),color:es(S[o[Math.floor(2*Math.random())]],.7),core:es(S[0],.8)})},eu=[],ed=(e=0)=>{let t=[.5,.5],a=-1;for(let e=0;e<8;e++){let e=[.15+.7*Math.random(),.18+.64*Math.random()],r=eu.length?Math.min(...eu.map(([t,a])=>Math.hypot(t-e[0],a-e[1]))):1;r>a&&(a=r,t=e)}eu.push(t),eu.length>4&&eu.shift(),ec(t[0],t[1],.8+.5*Math.random(),e)},ef=new v.Raycaster,em=new v.Vector2,eh={has:!1,moved:!1,uv:new v.Vector2,prevUv:new v.Vector2,hasUv:!1},ev={x:0,y:0},eg=el(.27),ep={x:NaN,y:NaN},ex=-1e9,ey=e=>{let t=e.clientX===ep.x&&e.clientY===ep.y;ep.x=e.clientX,ep.y=e.clientY;let r=a.getBoundingClientRect();em.set((e.clientX-r.left)/r.width*2-1,-(2*((e.clientY-r.top)/r.height))+1),ef.setFromCamera(em,E),eh.has=!0;let o=ef.intersectObject(j,!1)[0];o?.uv&&(eh.hasUv&&!t&&(eh.prevUv.copy(eh.uv),eh.moved=!0,ex=performance.now()),eh.uv.copy(o.uv),eh.hasUv=!0)},eM=()=>{eh.has=!1,eh.hasUv=!1},ew=e=>{!e.target.closest("a")&&(ey(e),eh.hasUv&&ec(eh.uv.x,eh.uv.y,1.1))},eb=new v.Clock,eS=0,eA=0,eR=3,eC=!1,eT=0,e_=!1,eP=()=>{(()=>{let e=Math.min(eb.getDelta(),1/30),t=eb.elapsedTime;for(let t of((eS+=e)>7&&(eS=0,en=(en+1)%eo.length),(eA+=e)>.5&&(eA=0,eg=el(.27)),(eR-=e)<=0&&(ed(),eR=(performance.now()-ex>1500?1+.7*Math.random():2.6+1.4*Math.random())*(T?1.4:1)),ei)){if(t.t+=e,t.t<=0)continue;let a=Math.min(1,t.t/t.dur),r=1-Math.pow(1-a,3);_.flower(t.x,t.y,t.size*(.15+.85*r),{rot:t.rot+.25*r,petals:t.petals,seed:t.seed,color:t.color,core:t.core,push:8*e*(1-a)})}if(ei=ei.filter(e=>e.t<e.dur),eh.moved){eh.moved=!1;let e=eh.uv.x-eh.prevUv.x,t=eh.uv.y-eh.prevUv.y;(e||t)&&_.splat(eh.uv.x,eh.uv.y,2800*e,2800*t,eg,.11)}_.step(e),L.uDye.value=_.texture,L.uTime.value=t;let r=a.getBoundingClientRect(),o=Math.min(1,Math.max(0,-r.top/r.height)),n=Math.min(1,2.2*e),l=eh.has&&!document.documentElement.classList.contains("is-loading");ev.x+=((l?em.x:0)-ev.x)*n,ev.y+=((l?em.y:0)-ev.y)*n;let i=C?0:o;E.position.set(.45*ev.x,.28*ev.y-1.2*i,7+2.5*i),E.lookAt(0,-(.6*i),0),U.position.set(Math.sin(.37*t)*ea.halfW*1.2,Math.cos(.29*t)*ea.halfH,-2.2),k.position.set(Math.cos(.31*t)*ea.halfW*1.2,Math.sin(.43*t)*ea.halfH,-2.6),Z.uniforms.uTime.value=t,et.uniforms.uTime.value=t,eC&&document.documentElement.classList.contains("is-loading")||(Q.render(e),eC=!0)})(),eT=e_?requestAnimationFrame(eP):0},eE=new ResizeObserver(()=>{(()=>{let e=a.clientWidth,t=a.clientHeight;if(!e||!t)return;ea.W=e,ea.H=t;let r=Math.min(devicePixelRatio||1,e*t>14e5?1:1.25);d.setPixelRatio(r),d.setSize(e,t,!1),Q.setPixelRatio(r),Q.setSize(e,t),ee.resolution.set(e/2,t/2),et.uniforms.uRes.value.set(e*r,t*r),N.uRes.value.set(e*r,t*r),N.uCell.value=(T?6:7)*r,Z.uniforms.uPixel.value=r,E.aspect=e/t,E.updateProjectionMatrix();let o=er(7);ea.halfW=o.w,ea.halfH=o.h;let n=er(11.6);j.scale.set(2*n.w*1.3,2*n.h*1.3,1),L.uSize.value.set(j.scale.x,j.scale.y),K.set(7,1.1*n.h,3),L.uDots.value=1.3*e/(T?6:7),(()=>{if(!f)return;let e=a.getBoundingClientRect(),t=f.getBoundingClientRect(),r=parseFloat(getComputedStyle(f).fontSize),o=f.textContent??"",n=Math.min(devicePixelRatio||1,2),l=z.getContext("2d");l.font=R(r),l.letterSpacing=getComputedStyle(f).letterSpacing;let i=l.measureText(o),s=.1*r,c=Math.ceil(i.actualBoundingBoxLeft+i.actualBoundingBoxRight+2*s),u=Math.ceil(i.actualBoundingBoxAscent+i.actualBoundingBoxDescent+2*s);z.width=Math.round(c*n),z.height=Math.round(u*n),l.setTransform(n,0,0,n,0,0),l.font=R(r),l.letterSpacing=getComputedStyle(f).letterSpacing,l.fillStyle="#fff",l.fillText(o,s,s+i.actualBoundingBoxAscent),$.needsUpdate=!0,W.width=z.width,W.height=z.height;let d=W.getContext("2d");d.filter=`blur(${.035*r*n}px)`,d.drawImage(z,0,0),d.drawImage(z,0,0),q.needsUpdate=!0;let m=i.fontBoundingBoxAscent,h=i.fontBoundingBoxDescent,v=t.top-e.top+(t.height-(m+h))/2+m,g=t.left-e.left-s,p=v-i.actualBoundingBoxAscent-s,{w:x,h:y}=er(9.2);O.scale.set(c/ea.W*x*2,u/ea.H*y*2,1),O.position.set((g+c/2)/ea.W*2*x-x,y-(p+u/2)/ea.H*2*y,-2.2),H.scale.copy(O.scale),H.position.copy(O.position),H.position.z-=.02})(),_.resize(100*j.scale.x,100*j.scale.y,T?512:1024)&&(()=>{ei=[];for(let e=0;e<3;e++)ed(.7*e)})()})()});eE.observe(a);let eB=new IntersectionObserver(([e])=>{(e_=e.isIntersecting)&&!eT&&(eb.getDelta(),eT=requestAnimationFrame(eP))});eB.observe(a),a.addEventListener("pointermove",ey),a.addEventListener("pointerleave",eM),a.addEventListener("pointerdown",ew),a.classList.add("scene-ready"),m=()=>{cancelAnimationFrame(eT),eE.disconnect(),eB.disconnect(),a.removeEventListener("pointermove",ey),a.removeEventListener("pointerleave",eM),a.removeEventListener("pointerdown",ew),_.dispose(),Q.dispose(),B.dispose(),D.dispose(),$.dispose(),q.dispose(),d.dispose()}})(),()=>{h=!0,m()}},[]),(0,t.jsx)("canvas",{ref:d,className:"fluid","aria-hidden":!0})}])},57027,e=>{"use strict";var t=e.i(43476),a=e.i(71645);let r=new Intl.DateTimeFormat("ru-RU",{timeZone:"Europe/Moscow",hour:"2-digit",minute:"2-digit"});e.s(["MoscowTime",0,function(){let[e,o]=(0,a.useState)("");return(0,a.useEffect)(()=>{let e=()=>o(r.format(new Date));e();let t=setInterval(e,15e3);return()=>clearInterval(t)},[]),(0,t.jsxs)("span",{suppressHydrationWarning:!0,children:["Москва",e&&`, ${e}`]})}])},59095,e=>{"use strict";var t=e.i(43476),a=e.i(71645);e.s(["Reveal",0,function({children:e,as:r="div",className:o=""}){let n=(0,a.useRef)(null);return(0,a.useEffect)(()=>{let e=n.current;if(!e)return;let t=new IntersectionObserver(([a])=>{a.isIntersecting&&(e.classList.add("is-in"),t.disconnect())},{rootMargin:"0px 0px -10% 0px"});return t.observe(e),()=>t.disconnect()},[]),(0,t.jsx)(r,{ref:n,className:`reveal ${o}`,children:e})}])},74700,e=>{"use strict";var t=e.i(43476),a=e.i(71645);let r=[(e,t,a,r)=>(e/a+t/r)/2,(e,t,a,r)=>1-(e/a+t/r)/2,(e,t,a)=>e/a,(e,t,a)=>1-e/a,(e,t,a,r)=>1.6*Math.hypot(e/a-.5,r/a*(t/r-.5)),(e,t,a,r)=>1-1.6*Math.hypot(e/a-.5,r/a*(t/r-.5)),(e,t)=>(7*e+13*t)%17/17];e.s(["TileFlip",0,function({src:e,width:o,height:n,color:l,background:i,alt:s,cols:c=14,seed:u=1,loop:d=!0,eager:f=!1}){let m=(0,a.useRef)(null),h=Math.max(3,Math.round(c*n/o));return(0,a.useEffect)(()=>{let t=m.current,a=Array.from(t.querySelectorAll(".tf__t")),s="",v=!1,g=new Image,p=()=>{g.src||(t.style.setProperty("--tf-back",`url(${e})`),g.src=e)};f&&p();let x=new IntersectionObserver(([e])=>{e.isIntersecting&&(p(),x.disconnect())},{rootMargin:"600px 0px"});x.observe(t),g.onload=()=>{if(v)return;let e=Math.round(1400*n/o),a=Math.round(1400/110),r=Math.ceil(1400/a),c=Math.ceil(e/a),u=document.createElement("canvas");u.width=r,u.height=c;let d=u.getContext("2d",{willReadFrequently:!0});d.drawImage(g,0,0,r,c);let f=d.getImageData(0,0,r,c).data,m=document.createElement("canvas");m.width=1400,m.height=e;let h=m.getContext("2d");h.fillStyle=i,h.fillRect(0,0,1400,e),h.fillStyle=l,h.beginPath();for(let e=0;e<c;e++)for(let t=0;t<r;t++){let o=(e*r+t)*4,n=Math.min(.62,.03+.66*Math.sqrt((.2126*f[o]+.7152*f[o+1]+.0722*f[o+2])/255))*a,l=t*a+a/2,i=e*a+a/2;h.moveTo(l+n,i),h.arc(l,i,n,0,2*Math.PI)}h.fill(),m.toBlob(e=>{e&&!v&&(s=URL.createObjectURL(e),t.style.setProperty("--tf-front",`url(${s})`),t.classList.add("is-ready"))})};let y=Array(a.length).fill(!1),M=(e,t,r=0)=>{y[e]=t,a[e].style.transitionDelay=`${Math.round(r)}ms`,a[e].classList.toggle("on",t)},w=(e,t=900)=>{let o=r[Math.floor(Math.random()*r.length)];a.forEach((a,r)=>{let n=r%c,l=Math.floor(r/c);M(r,e,Math.min(1,Math.max(0,o(n,l,c,h)))*t+120*Math.random())})},b=[],S=(e,t)=>b.push(window.setTimeout(e,t)),A=()=>{b.forEach(clearTimeout),b=[]},R=!1,C=!1,T=e=>{if(!R||C)return;let t=e?1800+u%4*500:3600+2400*Math.random(),r=()=>{if(!R||C)return;let e=1+Math.floor(3*Math.random());for(let t=0;t<e;t++){let e=Math.floor(Math.random()*a.length);y[e]||(M(e,!0),S(()=>R&&!C&&M(e,!1),700+900*Math.random()))}S(r,160+220*Math.random())};r(),S(()=>{R&&!C&&(A(),w(!0),S(()=>{w(!1),S(()=>T(!1),1300)},3900))},t)},_=()=>{R=!1,A()},P=new IntersectionObserver(([e])=>{e.isIntersecting?(t.classList.add("is-in"),(()=>{if(!R){if(R=!0,!d){let e=()=>t.classList.contains("is-ready")?S(()=>w(!0,1100),900):S(e,100);e();return}T(!0)}})()):d&&_()});P.observe(t);let E=d?t.closest("a")??t:document.createElement("div"),B=()=>{C=!0,A(),w(!0,500)},D=()=>{C=!1,w(!1,500),R&&S(()=>T(!1),900)};return E.addEventListener("mouseenter",B),E.addEventListener("mouseleave",D),()=>{v=!0,_(),P.disconnect(),x.disconnect(),E.removeEventListener("mouseenter",B),E.removeEventListener("mouseleave",D),s&&URL.revokeObjectURL(s)}},[e,o,n,l,i,c,h,u,d,f]),(0,t.jsx)("div",{ref:m,className:"tf",role:"img","aria-label":s,style:{"--tf-size":`${100*c}% ${100*h}%`,aspectRatio:`${o} / ${n}`},children:(0,t.jsx)("div",{className:"tf__grid",style:{gridTemplateColumns:`repeat(${c}, 1fr)`,gridTemplateRows:`repeat(${h}, 1fr)`},"aria-hidden":!0,children:Array.from({length:c*h},(e,a)=>{let r=a%c,o=Math.floor(a/c),n=`${r/(c-1)*100}% ${o/(h-1)*100}%`;return(0,t.jsxs)("span",{className:"tf__t",style:{"--tf-pos":n,"--tf-in":`${(r+o)*35}ms`},children:[(0,t.jsx)("i",{className:"tf__f"}),(0,t.jsx)("i",{className:"tf__b"})]},a)})})})}])},72312,e=>{e.v(t=>Promise.all(["static/chunks/3qxv1af0k0w8v.js","static/chunks/0i-5efvfrwjiv.js"].map(t=>e.l(t))).then(()=>t(71780)))},21442,e=>{e.v(t=>Promise.all(["static/chunks/1ogzic9gn6tkm.js","static/chunks/0i-5efvfrwjiv.js"].map(t=>e.l(t))).then(()=>t(32009)))},2460,e=>{e.v(t=>Promise.all(["static/chunks/0maksf1-88vof.js","static/chunks/0i-5efvfrwjiv.js"].map(t=>e.l(t))).then(()=>t(31935)))},53369,e=>{e.v(t=>Promise.all(["static/chunks/3izd8lf4e-d-m.js","static/chunks/0i-5efvfrwjiv.js"].map(t=>e.l(t))).then(()=>t(25244)))},30481,e=>{e.v(t=>Promise.all(["static/chunks/2bxivwzw5n4j7.js","static/chunks/0i-5efvfrwjiv.js"].map(t=>e.l(t))).then(()=>t(16022)))},12022,e=>{e.v(t=>Promise.all(["static/chunks/368-xp6b6krk_.js","static/chunks/0i-5efvfrwjiv.js"].map(t=>e.l(t))).then(()=>t(27304)))},12660,e=>{e.v(t=>Promise.all(["static/chunks/0q4a4279ojqy2.js","static/chunks/0i-5efvfrwjiv.js"].map(t=>e.l(t))).then(()=>t(8930)))},96706,e=>{e.v(t=>Promise.all(["static/chunks/26a9lrc4bjf4n.js","static/chunks/0i-5efvfrwjiv.js"].map(t=>e.l(t))).then(()=>t(41330)))}]);