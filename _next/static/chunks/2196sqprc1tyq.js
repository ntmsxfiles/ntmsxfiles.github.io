(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,25071,e=>{"use strict";var t=e.i(43476),a=e.i(71645),o=e.i(49329);function r(e,t,a,o){let r=[],i=t,n=a,l=e()*Math.PI*2;for(let t=0;t<o;t++){l+=(e()-.5)*1.3;let t=26+70*e();i=Math.max(-60,Math.min(1660,i+Math.cos(l)*t*.9)),n=Math.max(-60,Math.min(960,n+Math.sin(l)*t*.9)),r.push([Math.round(i),Math.round(n),Math.round(t),e()])}return r}function i(e,t,a,o,r){let i="";for(let n=t;n<t+o;n+=5+6*e()){let t=a+e()*r*.4,o=a+r*(.5+.5*e()),l=n;for(i+=`M${l.toFixed(1)} ${t.toFixed(1)}`;t<o;)l+=(e()-.5)*9,t+=3+7*e(),i+=`L${l.toFixed(1)} ${t.toFixed(1)}`,.3>e()&&(i+=`l${((e()-.5)*12).toFixed(1)} 0`)}return i}function n(){let e=(0,o.mulberry32)(21),t=[...r(e,1100,120,16),...r(e,700,700,14),...r(e,1450,600,10)].slice(0,40),a=t.filter((e,t)=>t%4==1).flatMap(t=>r(e,t[0],t[1],3)).map(([e,t,a,o])=>[e,t,Math.round(.55*a),o]).slice(0,30),n=Array.from({length:90},()=>({x:Math.round(1600*e()),y:Math.round(900*e()),r:+(1.5+3*e()).toFixed(1)})),l=[i(e,40,380,260,420),i(e,520,40,200,300),i(e,880,460,240,360),i(e,1330,60,220,260)],s=(0,o.mulberry32)(7);return{orange:t,lime:a,specks:n,scribbles:l,orbits:Array.from({length:11},()=>{let e=600+1300*s(),t=-300+700*s(),a=450+1e3*s(),o=[];for(let r=0;o.length<3+Math.floor(7*s())&&r<80;r++){let r=s()*Math.PI*2,i=e+Math.cos(r)*a,n=t+Math.sin(r)*a;i>0&&i<1600&&n>0&&n<900&&o.push({a:r,s:1.5+5.5*s(),faint:.35>s()})}return{cx:e,cy:t,r:a,dots:o,speed:2*Math.PI/(120+200*s())*(.5>s()?-1:1)}})}}let l=`
attribute vec2 aPos;
void main() { gl_Position = vec4(aPos, 0.0, 1.0); }`;e.s(["AboutArt",0,function(){let e=(0,a.useMemo)(n,[]),o=(0,a.useRef)(null),r=(0,a.useRef)(null);return(0,a.useEffect)(()=>{let t=o.current.parentElement,a=o.current,i=r.current,n=i.getContext("2d"),s=a.getContext("webgl",{antialias:!0,premultipliedAlpha:!0}),c=matchMedia("(prefers-reduced-motion: reduce)").matches,v=null,u={};if(s){let t=!!s.getExtension("OES_standard_derivatives"),a=(e,t)=>{let a=s.createShader(e);if(s.shaderSource(a,t),s.compileShader(a),!s.getShaderParameter(a,s.COMPILE_STATUS))throw Error(s.getShaderInfoLog(a)??"shader");return a};try{if(v=s.createProgram(),s.attachShader(v,a(s.VERTEX_SHADER,l)),s.attachShader(v,a(s.FRAGMENT_SHADER,`
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
}`)),s.linkProgram(v),!s.getProgramParameter(v,s.LINK_STATUS))throw Error("link");s.useProgram(v);let o=s.createBuffer();s.bindBuffer(s.ARRAY_BUFFER,o),s.bufferData(s.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,1,1]),s.STATIC_DRAW);let r=s.getAttribLocation(v,"aPos");for(let e of(s.enableVertexAttribArray(r),s.vertexAttribPointer(r,2,s.FLOAT,!1,0,0),["uRes","uTime","uScale","uOffset","uOrange","uLime"]))u[e]=s.getUniformLocation(v,e);let i=(e,t)=>{let a=new Float32Array(4*t);return e.forEach((e,t)=>a.set(e,4*t)),a};s.uniform4fv(u.uOrange,i(e.orange,40)),s.uniform4fv(u.uLime,i(e.lime,30)),s.clearColor(0,0,0,0)}catch(e){console.error(e),v=null}}let f=0,m=0,d=1,h=1,p=0,x=0,g=t=>{s&&v&&(s.uniform1f(u.uTime,t),s.clear(s.COLOR_BUFFER_BIT),s.drawArrays(s.TRIANGLE_STRIP,0,4)),n.setTransform(d*h,0,0,d*h,d*p,d*x),n.clearRect(-p/h,-x/h,f/h,m/h);let a=1/h;for(let o of e.orbits){let e=o.speed*t;for(let t of(n.globalAlpha=.5,n.strokeStyle="#0a0a0a",n.lineWidth=a,n.beginPath(),n.arc(o.cx,o.cy,o.r,0,2*Math.PI),n.stroke(),n.globalAlpha=1,o.dots)){let a=t.a+e;n.fillStyle=t.faint?"#6f7385":"#0a0a0a",n.beginPath(),n.arc(o.cx+Math.cos(a)*o.r,o.cy+Math.sin(a)*o.r,t.s,0,2*Math.PI),n.fill()}}},y=0,w=!1,M=performance.now(),b=e=>{g((e-M)/1e3),y=w?requestAnimationFrame(b):0},S=new ResizeObserver(()=>{for(let e of(f=t.clientWidth,m=t.clientHeight,d=Math.min(devicePixelRatio||1,2),h=Math.max(f/1600,m/900),p=(f-1600*h)/2,x=(m-900*h)/2,[a,i]))e.width=Math.round(f*d),e.height=Math.round(m*d);s&&v&&(s.viewport(0,0,a.width,a.height),s.uniform2f(u.uRes,a.width,a.height),s.uniform1f(u.uScale,h*d),s.uniform2f(u.uOffset,p*d,x*d)),g(c?0:(performance.now()-M)/1e3)});S.observe(t);let T=new IntersectionObserver(([e])=>{w=e.isIntersecting,c?g(0):w&&!y&&(y=requestAnimationFrame(b))});return T.observe(t),()=>{cancelAnimationFrame(y),S.disconnect(),T.disconnect()}},[e]),(0,t.jsxs)("div",{className:"about__art","aria-hidden":!0,children:[(0,t.jsxs)("svg",{className:"about__layer",viewBox:"0 0 1600 900",preserveAspectRatio:"xMidYMid slice",children:[e.specks.map((e,a)=>(0,t.jsx)("circle",{cx:e.x,cy:e.y,r:e.r,className:"speck"},a)),e.scribbles.map((e,a)=>(0,t.jsx)("path",{d:e,className:"scribble"},a))]}),(0,t.jsx)("canvas",{ref:o,className:"about__layer"}),(0,t.jsx)("canvas",{ref:r,className:"about__layer"})]})}],25071)},25848,e=>{"use strict";var t=e.i(43476),a=e.i(71645);e.s(["Halftone",0,function({src:e,color:o,background:r}){let i=(0,a.useRef)(null);return(0,a.useEffect)(()=>{let t=i.current,a=t.parentElement,n=t.getContext("2d"),l=new Image;l.src=e;let s=()=>{let e=a.clientWidth,i=a.clientHeight;if(!e||!i||!l.complete||!l.naturalWidth)return;let s=Math.min(devicePixelRatio||1,2);t.width=Math.round(e*s),t.height=Math.round(i*s),n.setTransform(s,0,0,s,0,0);let c=Math.max(5,Math.round(e/110)),v=Math.ceil(e/c),u=Math.ceil(i/c),f=document.createElement("canvas");f.width=v,f.height=u;let m=f.getContext("2d",{willReadFrequently:!0});m.drawImage(l,0,0,v,u);let d=m.getImageData(0,0,v,u).data;n.fillStyle=r,n.fillRect(0,0,e,i),n.fillStyle=o,n.beginPath();for(let e=0;e<u;e++)for(let t=0;t<v;t++){let a=(e*v+t)*4,o=Math.min(.62,.03+.66*Math.sqrt((.2126*d[a]+.7152*d[a+1]+.0722*d[a+2])/255))*c,r=t*c+c/2,i=e*c+c/2;n.moveTo(r+o,i),n.arc(r,i,o,0,2*Math.PI)}n.fill()};l.onload=s;let c=new ResizeObserver(s);return c.observe(a),()=>c.disconnect()},[e,o,r]),(0,t.jsx)("canvas",{ref:i,className:"halftone","aria-hidden":!0})}])},35532,e=>{"use strict";var t=e.i(43476),a=e.i(71645);let o=`
vec4 permute(vec4 x) { return mod(((x * 34.0) + 1.0) * x, 289.0); }
vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
float snoise(vec3 v) {
  const vec2 C = vec2(1.0 / 6.0, 1.0 / 3.0);
  const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
  vec3 i = floor(v + dot(v, C.yyy));
  vec3 x0 = v - i + dot(i, C.xxx);
  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min(g.xyz, l.zxy);
  vec3 i2 = max(g.xyz, l.zxy);
  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + 2.0 * C.xxx;
  vec3 x3 = x0 - 1.0 + 3.0 * C.xxx;
  i = mod(i, 289.0);
  vec4 p = permute(permute(permute(i.z + vec4(0.0, i1.z, i2.z, 1.0)) + i.y + vec4(0.0, i1.y, i2.y, 1.0)) + i.x + vec4(0.0, i1.x, i2.x, 1.0));
  float n_ = 1.0 / 7.0;
  vec3 ns = n_ * D.wyz - D.xzx;
  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_);
  vec4 x = x_ * ns.x + ns.yyyy;
  vec4 y = y_ * ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);
  vec4 b0 = vec4(x.xy, y.xy);
  vec4 b1 = vec4(x.zw, y.zw);
  vec4 s0 = floor(b0) * 2.0 + 1.0;
  vec4 s1 = floor(b1) * 2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));
  vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
  vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
  vec3 p0 = vec3(a0.xy, h.x);
  vec3 p1 = vec3(a0.zw, h.y);
  vec3 p2 = vec3(a1.xy, h.z);
  vec3 p3 = vec3(a1.zw, h.w);
  vec4 norm = taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
  p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
  vec4 m = max(0.6 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
  m = m * m;
  return 42.0 * dot(m * m, vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3)));
}`,r=`
${o}
uniform float uTime;
uniform vec3 uHover;
uniform float uHoverAmt;
uniform vec3 uRippleDir;
uniform float uRippleT;
vec3 displace(vec3 p) {
  vec3 n = normalize(p);
  float d = snoise(p * 0.8 + vec3(0.0, uTime * 0.2, uTime * 0.15)) * 0.26
          + snoise(p * 1.8 - vec3(uTime * 0.28)) * 0.04;
  d += smoothstep(0.45, 1.0, dot(n, uHover)) * 0.3 * uHoverAmt;
  float ang = acos(clamp(dot(n, uRippleDir), -1.0, 1.0));
  float gap = ang - uRippleT * 2.2;
  d += sin(gap * 14.0) * exp(-gap * gap * 5.0) * exp(-uRippleT * 1.1) * 0.13;
  return p + n * d;
}`,i=`
${r}
attribute float aShell;
uniform float uLength;
uniform vec3 uVel;
uniform vec3 uGravity;
varying vec3 vDir;
varying vec3 vNormalW;
varying vec3 vViewW;
varying float vH;
varying vec3 vColor;
void main() {
  vec3 pBase = position;
  vec3 nBase = normalize(pBase);
  vec3 d0 = displace(pBase);
  vec3 objectNormal = nBase;
  float n1 = snoise(nBase * 0.9 + vec3(uTime * 0.05, 0.0, uTime * 0.04));
  float n2 = snoise(nBase * 1.3 - vec3(0.0, uTime * 0.06, 0.0));
  vec3 c = mix(vec3(1.0, 0.36, 0.62), vec3(0.72, 0.65, 1.0), smoothstep(-0.5, 0.5, n1));
  c = mix(c, vec3(0.89, 0.95, 0.36), smoothstep(0.2, 0.8, n2) * 0.85);
  c = mix(c, vec3(0.12, 0.7, 0.64), smoothstep(0.3, 0.9, -n2) * 0.8);
  vColor = pow(c, vec3(2.2));
  float h = aShell;
  float h2 = h * h;
  vec3 bend = uGravity * 0.6 * h2 - uVel * h2;
  float nearHover = smoothstep(0.35, 1.0, dot(nBase, uHover)) * uHoverAmt;
  bend += (normalize(objectNormal - uHover * 0.9) - objectNormal) * nearHover * 0.7 * h;
  float wind = sin(dot(nBase, vec3(3.1, 2.3, 1.7)) + uTime * 1.3) * 0.6 + sin(dot(nBase, vec3(-1.9, 4.2, 2.6)) - uTime * 0.9) * 0.4;
  bend += cross(objectNormal, vec3(0.0, 1.0, 0.0)) * wind * 0.14 * h2;
  float ripple = exp(-pow(acos(clamp(dot(nBase, uRippleDir), -1.0, 1.0)) - uRippleT * 2.2, 2.0) * 5.0) * exp(-uRippleT * 1.1);
  vec3 pos = d0 + (objectNormal * h * (1.0 + ripple * 0.8) + bend) * uLength;
  vDir = nBase;
  vH = h;
  vec4 wp = modelMatrix * vec4(pos, 1.0);
  vNormalW = normalize(mat3(modelMatrix) * objectNormal);
  vViewW = normalize(cameraPosition - wp.xyz);
  gl_Position = projectionMatrix * viewMatrix * wp;
}`,n=`
uniform float uDensity;
uniform vec3 uLightDir;
varying vec3 vDir;
varying vec3 vNormalW;
varying vec3 vViewW;
varying float vH;
varying vec3 vColor;
float hash3(vec3 p) {
  p = fract(p * 0.3183099 + 0.1);
  p *= 17.0;
  return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
}
void main() {
  vec3 ad = abs(vDir);
  vec2 plane;
  float axis;
  if (ad.x > ad.y && ad.x > ad.z) { plane = vDir.yz; axis = sign(vDir.x); }
  else if (ad.y > ad.z) { plane = vDir.xz; axis = 2.0 + sign(vDir.y); }
  else { plane = vDir.xy; axis = 4.0 + sign(vDir.z); }
  vec2 q = plane * uDensity;
  vec2 cell2 = floor(q);
  vec2 f = fract(q) - 0.5;
  vec3 cell = vec3(cell2, axis);
  float rnd = hash3(cell);
  vec2 jit = vec2(hash3(cell + 1.7), hash3(cell + 3.1)) - 0.5;
  float len = 0.5 + rnd * 0.5;
  float h = vH / len;
  if (vH > 0.001) {
    if (h > 1.0) discard;
    if (length(f - jit * 0.5) > (1.0 - h) * 0.5) discard;
  }
  vec3 c = vColor * (0.85 + rnd * 0.3);
  vec3 N = normalize(vNormalW);
  vec3 V = normalize(vViewW);
  vec3 L = normalize(uLightDir);
  float ao = mix(0.12, 1.0, pow(vH, 0.8));
  float diff = max(dot(N, L), 0.0) * 0.75 + 0.25;
  float rim = pow(1.0 - max(dot(N, V), 0.0), 2.5);
  float th = dot(N, normalize(L + V));
  float spec = pow(sqrt(max(0.0, 1.0 - th * th)), 70.0) * 0.3 * vH;
  vec3 col = c * diff * ao + rim * mix(c, vec3(1.0), 0.45) * 0.8 * vH + spec;
  gl_FragColor = vec4(col, 1.0);
}`,l=`
uniform sampler2D uDye;
uniform float uTime;
uniform vec2 uTexel;
uniform vec2 uSize;
varying vec2 vDyeUv;
float silkH(vec2 q) {
  vec3 c = texture2D(uDye, q).rgb;
  float l = dot(c, vec3(0.3, 0.5, 0.2));
  l = l / (1.0 + l);
  return l * 0.6
       + sin(q.x * 6.0 + uTime * 0.55) * 0.09
       + sin(q.y * 5.0 - uTime * 0.4 + q.x * 2.0) * 0.08;
}`,s=`
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
#endif`,c=`
vec3 dyeC = texture2D(uDye, vDyeUv).rgb;
float dmx = max(dyeC.r, max(dyeC.g, dyeC.b));
dyeC = pow(dyeC * 1.5 / (1.0 + dmx * 0.9), vec3(2.2));
diffuseColor.rgb = vec3(0.01) + dyeC * 0.75;`,v=`
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
}`,u=`
uniform float uTime;
varying float vSeed;
void main() {
  float d = length(gl_PointCoord - 0.5);
  float a = smoothstep(0.5, 0.0, d);
  float tw = 0.45 + 0.55 * sin(uTime * (1.2 + vSeed * 3.0) + vSeed * 60.0);
  vec3 c = mix(vec3(1.0, 0.95, 0.88), vec3(0.75, 0.9, 1.0), step(0.6, vSeed));
  gl_FragColor = vec4(c * a * tw * 0.7, a * tw);
}`,f={uniforms:{tDiffuse:{value:null},uTime:{value:0},uRes:{value:null}},vertexShader:`
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
}`};e.s(["HeroScene",0,function(){let o=(0,a.useRef)(null);return(0,a.useEffect)(()=>{let t=o.current,a=t.parentElement,r=a.querySelector(".hero__name"),m=()=>{},d=!1;return(async()=>{let o,h=await e.A(21442),[{RoomEnvironment:p},{EffectComposer:x},{RenderPass:g},{UnrealBloomPass:y},{ShaderPass:w},{OutputPass:M},{createFluid:b,PALETTE:S}]=await Promise.all([e.A(2460),e.A(53369),e.A(12022),e.A(96706),e.A(12660),e.A(30481),e.A(72312)]),T=r?getComputedStyle(r):null,z=e=>`${T?.fontWeight??400} ${e}px ${T?.fontFamily??"sans-serif"}`;if(await document.fonts.load(z(100),r?.textContent??""),d)return;try{if(!(o=new h.WebGLRenderer({canvas:t,antialias:!1,powerPreference:"high-performance"})).extensions.has("EXT_color_buffer_float"))throw Error("no float targets")}catch(e){console.error(e),a.classList.add("no-webgl");return}o.toneMapping=h.NeutralToneMapping,o.toneMappingExposure=.95,o.outputColorSpace=h.SRGBColorSpace;let R=matchMedia("(prefers-reduced-motion: reduce)").matches,A=a.clientWidth<760,P=b(o),C=new h.Scene,B=new h.PerspectiveCamera(32,1,.1,100);B.position.set(0,0,7);let D=new h.PMREMGenerator(o),j=D.fromScene(new p,.04).texture;C.environment=j;let _={uDye:{value:null},uTime:{value:0},uTexel:{value:P.dyeTexel},uSize:{value:new h.Vector2(1,1)}},H=new h.MeshPhysicalMaterial({roughness:.34,metalness:0,sheen:.6,sheenRoughness:.4,sheenColor:new h.Color(.35,.35,.4),clearcoat:.2,clearcoatRoughness:.3,envMapIntensity:.1});H.onBeforeCompile=e=>{Object.assign(e.uniforms,_),e.vertexShader=e.vertexShader.replace("#include <common>",`#include <common>
${l}`).replace("#include <beginnormal_vertex>",s).replace("#include <begin_vertex>","vec3 transformed = position + vec3(0.0, 0.0, sH);"),e.fragmentShader=e.fragmentShader.replace("#include <common>","#include <common>\nuniform sampler2D uDye;\nvarying vec2 vDyeUv;").replace("#include <map_fragment>",c).replace("#include <emissivemap_fragment>","#include <emissivemap_fragment>\ntotalEmissiveRadiance += dyeC * 0.08;")};let L=new h.Mesh(new h.PlaneGeometry(1,1,A?140:260,A?100:170),H);L.position.z=-4.6,C.add(L);let E=new h.PointLight(0xff4f9a,6,12,1.6),F=new h.PointLight(5235711,5,12,1.6);C.add(E,F);let k=new h.DirectionalLight(0xffffff,.8);k.position.set(3,4,5),C.add(k);let U=document.createElement("canvas"),V=new h.CanvasTexture(U);V.colorSpace=h.SRGBColorSpace,V.anisotropy=4;let I=new h.Mesh(new h.PlaneGeometry(1,1),new h.MeshBasicMaterial({map:V,alphaTest:.5,color:new h.Color(.78,.77,.73)}));I.position.z=-2.2,C.add(I);let N={uTime:{value:0},uHover:{value:new h.Vector3(0,0,1)},uHoverAmt:{value:0},uRippleDir:{value:new h.Vector3(0,0,1)},uRippleT:{value:99}},W=A?18:28,O={...N,uLength:{value:.2},uVel:{value:new h.Vector3},uGravity:{value:new h.Vector3(0,-1,0)},uDensity:{value:A?110:170},uLightDir:{value:new h.Vector3(.5,.8,.6)}},q=new h.IcosahedronGeometry(1,A?18:24);q.setAttribute("aShell",new h.InstancedBufferAttribute(Float32Array.from({length:W},(e,t)=>t/(W-1)),1));let G=new h.InstancedMesh(q,new h.ShaderMaterial({uniforms:O,vertexShader:i,fragmentShader:n}),W);G.frustumCulled=!1;let $=new h.Group;$.add(G),C.add($);let Y=new h.Vector3,K=new h.Vector3,Q=new h.Quaternion,X=A?500:1400,J=new h.BufferGeometry,Z=new Float32Array(3*X),ee=new Float32Array(X),et=new h.Vector3(6,4,3);for(let e=0;e<X;e++)Z[3*e]=(2*Math.random()-1)*7,Z[3*e+1]=(2*Math.random()-1)*5,Z[3*e+2]=-3.8+6.5*Math.random(),ee[e]=Math.random();J.setAttribute("position",new h.BufferAttribute(Z,3)),J.setAttribute("aSeed",new h.BufferAttribute(ee,1));let ea=new h.ShaderMaterial({uniforms:{uTime:{value:0},uPixel:{value:1},uBox:{value:et}},vertexShader:v,fragmentShader:u,transparent:!0,depthWrite:!1,blending:h.AdditiveBlending}),eo=new h.Points(J,ea);eo.frustumCulled=!1,C.add(eo);let er=new x(o);er.addPass(new g(C,B));let ei=new y(new h.Vector2(1,1),.28,.45,.95);er.addPass(ei);let en=new w({...f,uniforms:{...f.uniforms,uRes:{value:new h.Vector2}}});er.addPass(en),er.addPass(new M);let el={W:1,H:1,halfW:1,halfH:1},es=e=>{let t=Math.tan(h.MathUtils.degToRad(B.fov/2))*e;return{h:t,w:t*B.aspect}},ec=[[0,4,5],[1,5],[2,0],[3,5,4]],ev=Math.floor(Math.random()*ec.length),eu=e=>{let t=ec[ev],a=S[t[Math.floor(Math.random()*t.length)]],o=A?.6*e:e;return[a[0]*o,a[1]*o,a[2]*o]},ef=e=>{let t=Math.random()*Math.PI*2;P.splat(.1+.8*Math.random(),.1+.8*Math.random(),Math.cos(t)*e,Math.sin(t)*e,eu(.3))},em=new h.Raycaster,ed=new h.Vector2,eh={has:!1,moved:!1,uv:new h.Vector2,prevUv:new h.Vector2,hasUv:!1},ep={x:0,y:0},ex=new h.Vector3(0,0,1),eg=0,ey=new h.Sphere,ew=new h.Vector3,eM=new h.Vector3,eb=eu(.5),eS=e=>{let t=a.getBoundingClientRect();ed.set((e.clientX-t.left)/t.width*2-1,-(2*((e.clientY-t.top)/t.height))+1),em.setFromCamera(ed,B),eh.has=!0;let o=em.intersectObject(L,!1)[0];o?.uv&&(eh.hasUv&&(eh.prevUv.copy(eh.uv),eh.moved=!0),eh.uv.copy(o.uv),eh.hasUv=!0),ey.set($.position,1.15*$.scale.x),em.ray.intersectSphere(ey,ew)?(ex.copy($.worldToLocal(ew.clone())).normalize(),eg=1):(em.ray.at(6,eM),ex.copy($.worldToLocal(eM)).normalize(),eg=.35)},eT=()=>{eh.has=!1,eh.hasUv=!1,eg=0},ez=e=>{if(!e.target.closest("a")&&(eS(e),N.uRippleDir.value.copy(ex),N.uRippleT.value=0,eh.hasUv))for(let e=0;e<8;e++){let t=e/8*Math.PI*2;P.splat(eh.uv.x,eh.uv.y,2400*Math.cos(t),2400*Math.sin(t),eu(.2),.12)}},eR=new h.Clock,eA=0,eP=0,eC=0,eB=.4,eD=()=>{let e,t=Math.min(eR.getDelta(),1/30),o=eR.elapsedTime;if(eA=Math.min(1,eA+t/2),(eP+=t)>7&&(eP=0,ev=(ev+1)%ec.length),(eC+=t)>.5&&(eC=0,eb=eu(.5)),(eB-=t)<=0&&(ef(1300+1300*Math.random()),eB=(.45+.55*Math.random())*(A?1.8:1)),eh.moved){eh.moved=!1;let e=eh.uv.x-eh.prevUv.x,t=eh.uv.y-eh.prevUv.y;(e||t)&&P.splat(eh.uv.x,eh.uv.y,4200*e,4200*t,eb)}P.step(t),_.uDye.value=P.texture,_.uTime.value=o;let r=a.getBoundingClientRect(),i=Math.min(1,Math.max(0,-r.top/r.height)),n=Math.min(1,2.2*t);ep.x+=((eh.has?ed.x:0)-ep.x)*n,ep.y+=((eh.has?ed.y:0)-ep.y)*n,B.position.set(.45*ep.x,.28*ep.y-1.2*i,7+2.5*i),B.lookAt(0,-(.6*i),0);let l=Math.min(.44*el.halfH,el.halfW*(A?.56:.3))*((e=eA)>=1?1:1-Math.pow(2,-9*e)*Math.cos(e*Math.PI*3.2));$.scale.setScalar(Math.max(.001,l)),$.position.set(A?0:.42*el.halfW,(A?.3*el.halfH:.34*el.halfH)+.09*Math.sin(.55*o)+i*el.halfH*.5,0),$.rotation.set(.06*o+1.6*i,.09*o,0),Q.copy($.quaternion).invert();let s=Y.clone().sub($.position).multiplyScalar(-1/Math.max(t,.001));Y.copy($.position),K.lerp(s.clampLength(0,4),Math.min(1,4*t)),O.uVel.value.copy(K).applyQuaternion(Q).multiplyScalar(.25/Math.max(l,.1)),O.uGravity.value.set(0,-1,0).applyQuaternion(Q),N.uTime.value=o,N.uHover.value.lerp(ex,Math.min(1,6*t)).normalize(),N.uHoverAmt.value+=(eg-N.uHoverAmt.value)*Math.min(1,3*t),N.uRippleT.value+=t,E.position.set(Math.sin(.37*o)*el.halfW*1.2,Math.cos(.29*o)*el.halfH,-2.2),F.position.set(Math.cos(.31*o)*el.halfW*1.2,Math.sin(.43*o)*el.halfH,-2.6),ea.uniforms.uTime.value=o,en.uniforms.uTime.value=o,er.render(t)},ej=0,e_=!1,eH=()=>{eD(),ej=e_?requestAnimationFrame(eH):0},eL=new ResizeObserver(()=>{if((()=>{let e=a.clientWidth,t=a.clientHeight;if(!e||!t)return;el.W=e,el.H=t;let i=Math.min(devicePixelRatio||1,e*t>14e5?1:1.25);o.setPixelRatio(i),o.setSize(e,t,!1),er.setPixelRatio(i),er.setSize(e,t),ei.resolution.set(e/2,t/2),en.uniforms.uRes.value.set(e*i,t*i),ea.uniforms.uPixel.value=i,B.aspect=e/t,B.updateProjectionMatrix();let n=es(7);el.halfW=n.w,el.halfH=n.h;let l=es(11.6);L.scale.set(2*l.w*1.3,2*l.h*1.3,1),_.uSize.value.set(L.scale.x,L.scale.y),et.set(7,1.1*l.h,3),(()=>{if(!r)return;let e=a.getBoundingClientRect(),t=r.getBoundingClientRect(),o=parseFloat(getComputedStyle(r).fontSize),i=r.textContent??"",n=Math.min(devicePixelRatio||1,2),l=U.getContext("2d");l.font=z(o);let s=l.measureText(i),c=.1*o,v=Math.ceil(s.actualBoundingBoxLeft+s.actualBoundingBoxRight+2*c),u=Math.ceil(s.actualBoundingBoxAscent+s.actualBoundingBoxDescent+2*c);U.width=Math.round(v*n),U.height=Math.round(u*n),l.setTransform(n,0,0,n,0,0),l.font=z(o),l.fillStyle="#fff",l.fillText(i,c,c+s.actualBoundingBoxAscent),V.needsUpdate=!0;let f=s.fontBoundingBoxAscent,m=s.fontBoundingBoxDescent,d=t.top-e.top+(t.height-(f+m))/2+f,h=t.left-e.left-c,p=d-s.actualBoundingBoxAscent-c,{w:x,h:g}=es(9.2);I.scale.set(v/el.W*x*2,u/el.H*g*2,1),I.position.set((h+v/2)/el.W*2*x-x,g-(p+u/2)/el.H*2*g,-2.2)})(),P.resize(100*L.scale.x,100*L.scale.y,A?512:1024)&&(()=>{for(let e=0;e<12;e++)ef(1800+1600*Math.random())})()})(),R){eA=1;for(let e=0;e<60;e++)P.step(1/60);eD()}});eL.observe(a);let eE=new IntersectionObserver(([e])=>{e_=e.isIntersecting,R||!e_||ej||(eR.getDelta(),ej=requestAnimationFrame(eH))});eE.observe(a),R||(a.addEventListener("pointermove",eS),a.addEventListener("pointerleave",eT),a.addEventListener("pointerdown",ez)),a.classList.add("scene-ready"),m=()=>{cancelAnimationFrame(ej),eL.disconnect(),eE.disconnect(),a.removeEventListener("pointermove",eS),a.removeEventListener("pointerleave",eT),a.removeEventListener("pointerdown",ez),P.dispose(),er.dispose(),D.dispose(),j.dispose(),V.dispose(),o.dispose()}})(),()=>{d=!0,m()}},[]),(0,t.jsx)("canvas",{ref:o,className:"fluid","aria-hidden":!0})}])},72312,e=>{e.v(t=>Promise.all(["static/chunks/1b6e44xl6s_qz.js","static/chunks/0i-5efvfrwjiv.js"].map(t=>e.l(t))).then(()=>t(71780)))},21442,e=>{e.v(t=>Promise.all(["static/chunks/1ogzic9gn6tkm.js","static/chunks/0i-5efvfrwjiv.js"].map(t=>e.l(t))).then(()=>t(32009)))},2460,e=>{e.v(t=>Promise.all(["static/chunks/0maksf1-88vof.js","static/chunks/0i-5efvfrwjiv.js"].map(t=>e.l(t))).then(()=>t(31935)))},53369,e=>{e.v(t=>Promise.all(["static/chunks/3izd8lf4e-d-m.js","static/chunks/0i-5efvfrwjiv.js"].map(t=>e.l(t))).then(()=>t(25244)))},30481,e=>{e.v(t=>Promise.all(["static/chunks/2bxivwzw5n4j7.js","static/chunks/0i-5efvfrwjiv.js"].map(t=>e.l(t))).then(()=>t(16022)))},12022,e=>{e.v(t=>Promise.all(["static/chunks/368-xp6b6krk_.js","static/chunks/0i-5efvfrwjiv.js"].map(t=>e.l(t))).then(()=>t(27304)))},12660,e=>{e.v(t=>Promise.all(["static/chunks/0q4a4279ojqy2.js","static/chunks/0i-5efvfrwjiv.js"].map(t=>e.l(t))).then(()=>t(8930)))},96706,e=>{e.v(t=>Promise.all(["static/chunks/26a9lrc4bjf4n.js","static/chunks/0i-5efvfrwjiv.js"].map(t=>e.l(t))).then(()=>t(41330)))}]);