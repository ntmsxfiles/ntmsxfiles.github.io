(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,25071,e=>{"use strict";var t=e.i(43476),a=e.i(71645),o=e.i(49329);function r(e,t,a,o){let r=[],i=t,n=a,l=e()*Math.PI*2;for(let t=0;t<o;t++){l+=(e()-.5)*1.3;let t=26+70*e();i=Math.max(-60,Math.min(1660,i+Math.cos(l)*t*.9)),n=Math.max(-60,Math.min(960,n+Math.sin(l)*t*.9)),r.push([Math.round(i),Math.round(n),Math.round(t),e()])}return r}function i(e,t,a,o,r){let i="";for(let n=t;n<t+o;n+=5+6*e()){let t=a+e()*r*.4,o=a+r*(.5+.5*e()),l=n;for(i+=`M${l.toFixed(1)} ${t.toFixed(1)}`;t<o;)l+=(e()-.5)*9,t+=3+7*e(),i+=`L${l.toFixed(1)} ${t.toFixed(1)}`,.3>e()&&(i+=`l${((e()-.5)*12).toFixed(1)} 0`)}return i}function n(){let e=(0,o.mulberry32)(21),t=[...r(e,1100,120,16),...r(e,700,700,14),...r(e,1450,600,10)].slice(0,40),a=t.filter((e,t)=>t%4==1).flatMap(t=>r(e,t[0],t[1],3)).map(([e,t,a,o])=>[e,t,Math.round(.55*a),o]).slice(0,30),n=Array.from({length:90},()=>({x:Math.round(1600*e()),y:Math.round(900*e()),r:+(1.5+3*e()).toFixed(1)})),l=[i(e,40,380,260,420),i(e,520,40,200,300),i(e,880,460,240,360),i(e,1330,60,220,260)],s=(0,o.mulberry32)(7);return{orange:t,lime:a,specks:n,scribbles:l,orbits:Array.from({length:11},()=>{let e=600+1300*s(),t=-300+700*s(),a=450+1e3*s(),o=[];for(let r=0;o.length<3+Math.floor(7*s())&&r<80;r++){let r=s()*Math.PI*2,i=e+Math.cos(r)*a,n=t+Math.sin(r)*a;i>0&&i<1600&&n>0&&n<900&&o.push({a:r,s:1.5+5.5*s(),faint:.35>s()})}return{cx:e,cy:t,r:a,dots:o,speed:2*Math.PI/(120+200*s())*(.5>s()?-1:1)}})}}let l=`
attribute vec2 aPos;
void main() { gl_Position = vec4(aPos, 0.0, 1.0); }`;e.s(["AboutArt",0,function(){let e=(0,a.useMemo)(n,[]),o=(0,a.useRef)(null),r=(0,a.useRef)(null);return(0,a.useEffect)(()=>{let t=o.current.parentElement,a=o.current,i=r.current,n=i.getContext("2d"),s=a.getContext("webgl",{antialias:!0,premultipliedAlpha:!0}),c=matchMedia("(prefers-reduced-motion: reduce)").matches,u=null,d={};if(s){let t=!!s.getExtension("OES_standard_derivatives"),a=(e,t)=>{let a=s.createShader(e);if(s.shaderSource(a,t),s.compileShader(a),!s.getShaderParameter(a,s.COMPILE_STATUS))throw Error(s.getShaderInfoLog(a)??"shader");return a};try{if(u=s.createProgram(),s.attachShader(u,a(s.VERTEX_SHADER,l)),s.attachShader(u,a(s.FRAGMENT_SHADER,`
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
}`)),s.linkProgram(u),!s.getProgramParameter(u,s.LINK_STATUS))throw Error("link");s.useProgram(u);let o=s.createBuffer();s.bindBuffer(s.ARRAY_BUFFER,o),s.bufferData(s.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,1,1]),s.STATIC_DRAW);let r=s.getAttribLocation(u,"aPos");for(let e of(s.enableVertexAttribArray(r),s.vertexAttribPointer(r,2,s.FLOAT,!1,0,0),["uRes","uTime","uScale","uOffset","uOrange","uLime"]))d[e]=s.getUniformLocation(u,e);let i=(e,t)=>{let a=new Float32Array(4*t);return e.forEach((e,t)=>a.set(e,4*t)),a};s.uniform4fv(d.uOrange,i(e.orange,40)),s.uniform4fv(d.uLime,i(e.lime,30)),s.clearColor(0,0,0,0)}catch(e){console.error(e),u=null}}let f=0,m=0,v=1,h=1,p=0,g=0,x=t=>{s&&u&&(s.uniform1f(d.uTime,t),s.clear(s.COLOR_BUFFER_BIT),s.drawArrays(s.TRIANGLE_STRIP,0,4)),n.setTransform(v*h,0,0,v*h,v*p,v*g),n.clearRect(-p/h,-g/h,f/h,m/h);let a=1/h;for(let o of e.orbits){let e=o.speed*t;for(let t of(n.globalAlpha=.5,n.strokeStyle="#0a0a0a",n.lineWidth=a,n.beginPath(),n.arc(o.cx,o.cy,o.r,0,2*Math.PI),n.stroke(),n.globalAlpha=1,o.dots)){let a=t.a+e;n.fillStyle=t.faint?"#6f7385":"#0a0a0a",n.beginPath(),n.arc(o.cx+Math.cos(a)*o.r,o.cy+Math.sin(a)*o.r,t.s,0,2*Math.PI),n.fill()}}},y=0,w=!1,M=performance.now(),b=e=>{x((e-M)/1e3),y=w?requestAnimationFrame(b):0},S=new ResizeObserver(()=>{for(let e of(f=t.clientWidth,m=t.clientHeight,v=Math.min(devicePixelRatio||1,2),h=Math.max(f/1600,m/900),p=(f-1600*h)/2,g=(m-900*h)/2,[a,i]))e.width=Math.round(f*v),e.height=Math.round(m*v);s&&u&&(s.viewport(0,0,a.width,a.height),s.uniform2f(d.uRes,a.width,a.height),s.uniform1f(d.uScale,h*v),s.uniform2f(d.uOffset,p*v,g*v)),x(c?0:(performance.now()-M)/1e3)});S.observe(t);let P=new IntersectionObserver(([e])=>{w=e.isIntersecting,c?x(0):w&&!y&&(y=requestAnimationFrame(b))});return P.observe(t),()=>{cancelAnimationFrame(y),S.disconnect(),P.disconnect()}},[e]),(0,t.jsxs)("div",{className:"about__art","aria-hidden":!0,children:[(0,t.jsxs)("svg",{className:"about__layer",viewBox:"0 0 1600 900",preserveAspectRatio:"xMidYMid slice",children:[e.specks.map((e,a)=>(0,t.jsx)("circle",{cx:e.x,cy:e.y,r:e.r,className:"speck"},a)),e.scribbles.map((e,a)=>(0,t.jsx)("path",{d:e,className:"scribble"},a))]}),(0,t.jsx)("canvas",{ref:o,className:"about__layer"}),(0,t.jsx)("canvas",{ref:r,className:"about__layer"})]})}],25071)},25848,e=>{"use strict";var t=e.i(43476),a=e.i(71645);e.s(["Halftone",0,function({src:e,color:o,background:r}){let i=(0,a.useRef)(null);return(0,a.useEffect)(()=>{let t=i.current,a=t.parentElement,n=t.getContext("2d"),l=new Image;l.src=e;let s=()=>{let e=a.clientWidth,i=a.clientHeight;if(!e||!i||!l.complete||!l.naturalWidth)return;let s=Math.min(devicePixelRatio||1,2);t.width=Math.round(e*s),t.height=Math.round(i*s),n.setTransform(s,0,0,s,0,0);let c=Math.max(5,Math.round(e/110)),u=Math.ceil(e/c),d=Math.ceil(i/c),f=document.createElement("canvas");f.width=u,f.height=d;let m=f.getContext("2d",{willReadFrequently:!0});m.drawImage(l,0,0,u,d);let v=m.getImageData(0,0,u,d).data;n.fillStyle=r,n.fillRect(0,0,e,i),n.fillStyle=o,n.beginPath();for(let e=0;e<d;e++)for(let t=0;t<u;t++){let a=(e*u+t)*4,o=Math.min(.62,.03+.66*Math.sqrt((.2126*v[a]+.7152*v[a+1]+.0722*v[a+2])/255))*c,r=t*c+c/2,i=e*c+c/2;n.moveTo(r+o,i),n.arc(r,i,o,0,2*Math.PI)}n.fill()};l.onload=s;let c=new ResizeObserver(s);return c.observe(a),()=>c.disconnect()},[e,o,r]),(0,t.jsx)("canvas",{ref:i,className:"halftone","aria-hidden":!0})}])},35532,e=>{"use strict";var t=e.i(43476),a=e.i(71645);let o=`
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
}`,r=`
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
#endif`,i=`
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
diffuseColor.rgb = vec3(0.01) + dyeC * 0.05 + dyeLit * 0.2 * dotM;`,n=`
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
}`,l=`
uniform float uTime;
varying float vSeed;
void main() {
  float d = length(gl_PointCoord - 0.5);
  float a = smoothstep(0.5, 0.0, d);
  float tw = 0.45 + 0.55 * sin(uTime * (1.2 + vSeed * 3.0) + vSeed * 60.0);
  vec3 c = mix(vec3(1.0, 0.95, 0.88), vec3(0.75, 0.9, 1.0), step(0.6, vSeed));
  gl_FragColor = vec4(c * a * tw * 0.7, a * tw);
}`,s={uniforms:{tDiffuse:{value:null},uTime:{value:0},uRes:{value:null}},vertexShader:`
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
}`};e.s(["HeroScene",0,function(){let c=(0,a.useRef)(null);return(0,a.useEffect)(()=>{let t=c.current,a=t.parentElement,u=a.querySelector(".hero__name"),d=()=>{},f=!1;return(async()=>{let c,m=await e.A(21442),[{RoomEnvironment:v},{EffectComposer:h},{RenderPass:p},{UnrealBloomPass:g},{ShaderPass:x},{OutputPass:y},{createFluid:w,PALETTE:M}]=await Promise.all([e.A(2460),e.A(53369),e.A(12022),e.A(96706),e.A(12660),e.A(30481),e.A(72312)]),b=u?getComputedStyle(u):null,S=e=>`${b?.fontWeight??400} ${e}px ${b?.fontFamily??"sans-serif"}`;if(await document.fonts.load(S(100),u?.textContent??""),f)return;try{if(!(c=new m.WebGLRenderer({canvas:t,antialias:!1,powerPreference:"high-performance"})).extensions.has("EXT_color_buffer_float")&&!c.extensions.has("EXT_color_buffer_half_float"))throw Error("no float targets")}catch(e){console.error(e),a.classList.add("no-webgl");return}c.toneMapping=m.NeutralToneMapping,c.toneMappingExposure=.95,c.outputColorSpace=m.SRGBColorSpace;let P=matchMedia("(prefers-reduced-motion: reduce)").matches,R=a.clientWidth<760,A=w(c),T=new m.Scene,C=new m.PerspectiveCamera(32,1,.1,100);C.position.set(0,0,7);let _=new m.PMREMGenerator(c),B=_.fromScene(new v,.04).texture;T.environment=B;let j={uDye:{value:null},uTime:{value:0},uTexel:{value:A.dyeTexel},uSize:{value:new m.Vector2(1,1)},uDots:{value:200}},D=new m.MeshPhysicalMaterial({roughness:.34,metalness:0,sheen:.6,sheenRoughness:.4,sheenColor:new m.Color(.12,.11,.12),clearcoat:.08,clearcoatRoughness:.3,envMapIntensity:.03});D.onBeforeCompile=e=>{Object.assign(e.uniforms,j),e.vertexShader=e.vertexShader.replace("#include <common>",`#include <common>
${o}`).replace("#include <beginnormal_vertex>",r).replace("#include <begin_vertex>","vec3 transformed = position + vec3(0.0, 0.0, sH);"),e.fragmentShader=e.fragmentShader.replace("#include <common>","#include <common>\nuniform sampler2D uDye;\nuniform vec2 uSize;\nuniform float uDots;\nvarying vec2 vDyeUv;").replace("#include <map_fragment>",i).replace("#include <emissivemap_fragment>","#include <emissivemap_fragment>\ntotalEmissiveRadiance += dyeC * 0.1 + dyeLit * dotM * 0.95;")};let E=new m.Mesh(new m.PlaneGeometry(1,1,R?140:260,R?100:170),D);E.position.z=-4.6,T.add(E);let k=new m.PointLight(0xff4f9a,6,12,1.6),U=new m.PointLight(5235711,5,12,1.6);T.add(k,U);let F=new m.DirectionalLight(0xffffff,.35);F.position.set(3,4,5),T.add(F);let L=document.createElement("canvas"),z=new m.CanvasTexture(L);z.colorSpace=m.SRGBColorSpace,z.anisotropy=4;let O=new m.Mesh(new m.PlaneGeometry(1,1),new m.MeshBasicMaterial({map:z,alphaTest:.5,color:new m.Color(.78,.77,.73)}));O.position.z=-2.2;let I=document.createElement("canvas"),H=new m.CanvasTexture(I);H.colorSpace=m.SRGBColorSpace;let N=new m.Mesh(new m.PlaneGeometry(1,1),new m.MeshBasicMaterial({map:H,transparent:!0,opacity:.12,depthWrite:!1,blending:m.AdditiveBlending,color:new m.Color(1,.9,.82)}));N.renderOrder=1,O.renderOrder=2,T.add(N,O);let W=R?500:1400,q=new m.BufferGeometry,G=new Float32Array(3*W),$=new Float32Array(W),V=new m.Vector3(6,4,3);for(let e=0;e<W;e++)G[3*e]=(2*Math.random()-1)*7,G[3*e+1]=(2*Math.random()-1)*5,G[3*e+2]=-3.8+6.5*Math.random(),$[e]=Math.random();q.setAttribute("position",new m.BufferAttribute(G,3)),q.setAttribute("aSeed",new m.BufferAttribute($,1));let X=new m.ShaderMaterial({uniforms:{uTime:{value:0},uPixel:{value:1},uBox:{value:V}},vertexShader:n,fragmentShader:l,transparent:!0,depthWrite:!1,blending:m.AdditiveBlending}),Y=new m.Points(q,X);Y.frustumCulled=!1,T.add(Y);let K=new h(c);K.addPass(new p(T,C));let J=new g(new m.Vector2(1,1),.28,.45,.95);K.addPass(J);let Q=new x({...s,uniforms:{...s.uniforms,uRes:{value:new m.Vector2}}});K.addPass(Q),K.addPass(new y);let Z={W:1,H:1,halfW:1,halfH:1},ee=e=>{let t=Math.tan(m.MathUtils.degToRad(C.fov/2))*e;return{h:t,w:t*C.aspect}},et=[[2,6,0],[7,6,0],[2,7,0]],ea=Math.floor(Math.random()*et.length),eo=e=>{let t=et[ea],a=M[t[Math.floor(Math.random()*t.length)]],o=R?.6*e:e;return[a[0]*o,a[1]*o,a[2]*o]},er=[],ei=(e,t)=>{let a=R?.7*t:t;return[e[0]*a,e[1]*a,e[2]*a]},en=(e,t,a=1,o=0)=>{let r=et[ea];er.push({x:e,y:t,size:.16*a*Math.min(1,.55+.45*(E.scale.x/E.scale.y)),t:-o,dur:1.4+.6*Math.random(),rot:Math.random()*Math.PI*2,petals:5+Math.floor(3*Math.random()),seed:100*Math.random(),color:ei(M[r[Math.floor(2*Math.random())]],.7),core:ei(M[0],.8)})},el=(e=0)=>en(.15+.7*Math.random(),.18+.64*Math.random(),.8+.5*Math.random(),e),es=new m.Raycaster,ec=new m.Vector2,eu={has:!1,moved:!1,uv:new m.Vector2,prevUv:new m.Vector2,hasUv:!1},ed={x:0,y:0},ef=eo(.22),em={x:NaN,y:NaN},ev=e=>{let t=e.clientX===em.x&&e.clientY===em.y;em.x=e.clientX,em.y=e.clientY;let o=a.getBoundingClientRect();ec.set((e.clientX-o.left)/o.width*2-1,-(2*((e.clientY-o.top)/o.height))+1),es.setFromCamera(ec,C),eu.has=!0;let r=es.intersectObject(E,!1)[0];r?.uv&&(eu.hasUv&&!t&&(eu.prevUv.copy(eu.uv),eu.moved=!0),eu.uv.copy(r.uv),eu.hasUv=!0)},eh=()=>{eu.has=!1,eu.hasUv=!1},ep=e=>{!e.target.closest("a")&&(ev(e),eu.hasUv&&en(eu.uv.x,eu.uv.y,1.1))},eg=new m.Clock,ex=0,ey=0,ew=3,eM=0,eb=!1,eS=()=>{(()=>{let e=Math.min(eg.getDelta(),1/30),t=eg.elapsedTime;for(let t of((ex+=e)>7&&(ex=0,ea=(ea+1)%et.length),(ey+=e)>.5&&(ey=0,ef=eo(.22)),(ew-=e)<=0&&(el(),ew=(3.2+1.8*Math.random())*(R?1.4:1)*(P?1.8:1)),er)){if(t.t+=e,t.t<=0)continue;let a=Math.min(1,t.t/t.dur),o=1-Math.pow(1-a,3);A.flower(t.x,t.y,t.size*(.15+.85*o),{rot:t.rot+.25*o,petals:t.petals,seed:t.seed,color:t.color,core:t.core,push:8*e*(1-a)})}if(er=er.filter(e=>e.t<e.dur),eu.moved){eu.moved=!1;let e=eu.uv.x-eu.prevUv.x,t=eu.uv.y-eu.prevUv.y;(e||t)&&A.splat(eu.uv.x,eu.uv.y,2600*e,2600*t,ef,.08)}A.step(e),j.uDye.value=A.texture,j.uTime.value=t;let o=a.getBoundingClientRect(),r=Math.min(1,Math.max(0,-o.top/o.height)),i=Math.min(1,2.2*e),n=eu.has&&!P;ed.x+=((n?ec.x:0)-ed.x)*i,ed.y+=((n?ec.y:0)-ed.y)*i;let l=P?0:r;C.position.set(.45*ed.x,.28*ed.y-1.2*l,7+2.5*l),C.lookAt(0,-(.6*l),0),k.position.set(Math.sin(.37*t)*Z.halfW*1.2,Math.cos(.29*t)*Z.halfH,-2.2),U.position.set(Math.cos(.31*t)*Z.halfW*1.2,Math.sin(.43*t)*Z.halfH,-2.6),X.uniforms.uTime.value=t,Q.uniforms.uTime.value=t,K.render(e)})(),eM=eb?requestAnimationFrame(eS):0},eP=new ResizeObserver(()=>{(()=>{let e=a.clientWidth,t=a.clientHeight;if(!e||!t)return;Z.W=e,Z.H=t;let o=Math.min(devicePixelRatio||1,e*t>14e5?1:1.25);c.setPixelRatio(o),c.setSize(e,t,!1),K.setPixelRatio(o),K.setSize(e,t),J.resolution.set(e/2,t/2),Q.uniforms.uRes.value.set(e*o,t*o),X.uniforms.uPixel.value=o,C.aspect=e/t,C.updateProjectionMatrix();let r=ee(7);Z.halfW=r.w,Z.halfH=r.h;let i=ee(11.6);E.scale.set(2*i.w*1.3,2*i.h*1.3,1),j.uSize.value.set(E.scale.x,E.scale.y),V.set(7,1.1*i.h,3),j.uDots.value=1.3*e/(R?6:7),(()=>{if(!u)return;let e=a.getBoundingClientRect(),t=u.getBoundingClientRect(),o=parseFloat(getComputedStyle(u).fontSize),r=u.textContent??"",i=Math.min(devicePixelRatio||1,2),n=L.getContext("2d");n.font=S(o);let l=n.measureText(r),s=.1*o,c=Math.ceil(l.actualBoundingBoxLeft+l.actualBoundingBoxRight+2*s),d=Math.ceil(l.actualBoundingBoxAscent+l.actualBoundingBoxDescent+2*s);L.width=Math.round(c*i),L.height=Math.round(d*i),n.setTransform(i,0,0,i,0,0),n.font=S(o),n.fillStyle="#fff",n.fillText(r,s,s+l.actualBoundingBoxAscent),z.needsUpdate=!0,I.width=L.width,I.height=L.height;let f=I.getContext("2d");f.filter=`blur(${.035*o*i}px)`,f.drawImage(L,0,0),f.drawImage(L,0,0),H.needsUpdate=!0;let m=l.fontBoundingBoxAscent,v=l.fontBoundingBoxDescent,h=t.top-e.top+(t.height-(m+v))/2+m,p=t.left-e.left-s,g=h-l.actualBoundingBoxAscent-s,{w:x,h:y}=ee(9.2);O.scale.set(c/Z.W*x*2,d/Z.H*y*2,1),O.position.set((p+c/2)/Z.W*2*x-x,y-(g+d/2)/Z.H*2*y,-2.2),N.scale.copy(O.scale),N.position.copy(O.position),N.position.z-=.02})(),A.resize(100*E.scale.x,100*E.scale.y,R?512:1024)&&(()=>{er=[];for(let e=0;e<3;e++)el(.7*e)})()})()});eP.observe(a);let eR=new IntersectionObserver(([e])=>{(eb=e.isIntersecting)&&!eM&&(eg.getDelta(),eM=requestAnimationFrame(eS))});eR.observe(a),a.addEventListener("pointermove",ev),a.addEventListener("pointerleave",eh),a.addEventListener("pointerdown",ep),a.classList.add("scene-ready"),d=()=>{cancelAnimationFrame(eM),eP.disconnect(),eR.disconnect(),a.removeEventListener("pointermove",ev),a.removeEventListener("pointerleave",eh),a.removeEventListener("pointerdown",ep),A.dispose(),K.dispose(),_.dispose(),B.dispose(),z.dispose(),H.dispose(),c.dispose()}})(),()=>{f=!0,d()}},[]),(0,t.jsx)("canvas",{ref:c,className:"fluid","aria-hidden":!0})}])},72312,e=>{e.v(t=>Promise.all(["static/chunks/3qxv1af0k0w8v.js","static/chunks/0i-5efvfrwjiv.js"].map(t=>e.l(t))).then(()=>t(71780)))},21442,e=>{e.v(t=>Promise.all(["static/chunks/1ogzic9gn6tkm.js","static/chunks/0i-5efvfrwjiv.js"].map(t=>e.l(t))).then(()=>t(32009)))},2460,e=>{e.v(t=>Promise.all(["static/chunks/0maksf1-88vof.js","static/chunks/0i-5efvfrwjiv.js"].map(t=>e.l(t))).then(()=>t(31935)))},53369,e=>{e.v(t=>Promise.all(["static/chunks/3izd8lf4e-d-m.js","static/chunks/0i-5efvfrwjiv.js"].map(t=>e.l(t))).then(()=>t(25244)))},30481,e=>{e.v(t=>Promise.all(["static/chunks/2bxivwzw5n4j7.js","static/chunks/0i-5efvfrwjiv.js"].map(t=>e.l(t))).then(()=>t(16022)))},12022,e=>{e.v(t=>Promise.all(["static/chunks/368-xp6b6krk_.js","static/chunks/0i-5efvfrwjiv.js"].map(t=>e.l(t))).then(()=>t(27304)))},12660,e=>{e.v(t=>Promise.all(["static/chunks/0q4a4279ojqy2.js","static/chunks/0i-5efvfrwjiv.js"].map(t=>e.l(t))).then(()=>t(8930)))},96706,e=>{e.v(t=>Promise.all(["static/chunks/26a9lrc4bjf4n.js","static/chunks/0i-5efvfrwjiv.js"].map(t=>e.l(t))).then(()=>t(41330)))}]);