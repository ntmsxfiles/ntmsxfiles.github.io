(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,25071,e=>{"use strict";var t=e.i(43476),a=e.i(71645),r=e.i(49329);function o(e,t,a,r){let o=[],i=t,n=a,l=e()*Math.PI*2;for(let t=0;t<r;t++){l+=(e()-.5)*1.3;let t=26+70*e();i=Math.max(-60,Math.min(1660,i+Math.cos(l)*t*.9)),n=Math.max(-60,Math.min(960,n+Math.sin(l)*t*.9)),o.push([Math.round(i),Math.round(n),Math.round(t),e()])}return o}function i(e,t,a,r,o){let i="";for(let n=t;n<t+r;n+=5+6*e()){let t=a+e()*o*.4,r=a+o*(.5+.5*e()),l=n;for(i+=`M${l.toFixed(1)} ${t.toFixed(1)}`;t<r;)l+=(e()-.5)*9,t+=3+7*e(),i+=`L${l.toFixed(1)} ${t.toFixed(1)}`,.3>e()&&(i+=`l${((e()-.5)*12).toFixed(1)} 0`)}return i}function n(){let e=(0,r.mulberry32)(21),t=[...o(e,1100,120,16),...o(e,700,700,14),...o(e,1450,600,10)].slice(0,40),a=t.filter((e,t)=>t%4==1).flatMap(t=>o(e,t[0],t[1],3)).map(([e,t,a,r])=>[e,t,Math.round(.55*a),r]).slice(0,30),n=Array.from({length:90},()=>({x:Math.round(1600*e()),y:Math.round(900*e()),r:+(1.5+3*e()).toFixed(1)})),l=[i(e,40,380,260,420),i(e,520,40,200,300),i(e,880,460,240,360),i(e,1330,60,220,260)],s=(0,r.mulberry32)(7);return{orange:t,lime:a,specks:n,scribbles:l,orbits:Array.from({length:11},()=>{let e=600+1300*s(),t=-300+700*s(),a=450+1e3*s(),r=[];for(let o=0;r.length<3+Math.floor(7*s())&&o<80;o++){let o=s()*Math.PI*2,i=e+Math.cos(o)*a,n=t+Math.sin(o)*a;i>0&&i<1600&&n>0&&n<900&&r.push({a:o,s:1.5+5.5*s(),faint:.35>s()})}return{cx:e,cy:t,r:a,dots:r,speed:2*Math.PI/(120+200*s())*(.5>s()?-1:1)}})}}let l=`
attribute vec2 aPos;
void main() { gl_Position = vec4(aPos, 0.0, 1.0); }`;e.s(["AboutArt",0,function(){let e=(0,a.useMemo)(n,[]),r=(0,a.useRef)(null),o=(0,a.useRef)(null);return(0,a.useEffect)(()=>{let t=r.current.parentElement,a=r.current,i=o.current,n=i.getContext("2d"),s=a.getContext("webgl",{antialias:!0,premultipliedAlpha:!0}),c=matchMedia("(prefers-reduced-motion: reduce)").matches,u=null,f={};if(s){let t=!!s.getExtension("OES_standard_derivatives"),a=(e,t)=>{let a=s.createShader(e);if(s.shaderSource(a,t),s.compileShader(a),!s.getShaderParameter(a,s.COMPILE_STATUS))throw Error(s.getShaderInfoLog(a)??"shader");return a};try{if(u=s.createProgram(),s.attachShader(u,a(s.VERTEX_SHADER,l)),s.attachShader(u,a(s.FRAGMENT_SHADER,`
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
}`)),s.linkProgram(u),!s.getProgramParameter(u,s.LINK_STATUS))throw Error("link");s.useProgram(u);let r=s.createBuffer();s.bindBuffer(s.ARRAY_BUFFER,r),s.bufferData(s.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,1,1]),s.STATIC_DRAW);let o=s.getAttribLocation(u,"aPos");for(let e of(s.enableVertexAttribArray(o),s.vertexAttribPointer(o,2,s.FLOAT,!1,0,0),["uRes","uTime","uScale","uOffset","uOrange","uLime"]))f[e]=s.getUniformLocation(u,e);let i=(e,t)=>{let a=new Float32Array(4*t);return e.forEach((e,t)=>a.set(e,4*t)),a};s.uniform4fv(f.uOrange,i(e.orange,40)),s.uniform4fv(f.uLime,i(e.lime,30)),s.clearColor(0,0,0,0)}catch(e){console.error(e),u=null}}let d=0,v=0,m=1,h=1,p=0,g=0,x=t=>{s&&u&&(s.uniform1f(f.uTime,t),s.clear(s.COLOR_BUFFER_BIT),s.drawArrays(s.TRIANGLE_STRIP,0,4)),n.setTransform(m*h,0,0,m*h,m*p,m*g),n.clearRect(-p/h,-g/h,d/h,v/h);let a=1/h;for(let r of e.orbits){let e=r.speed*t;for(let t of(n.globalAlpha=.5,n.strokeStyle="#0a0a0a",n.lineWidth=a,n.beginPath(),n.arc(r.cx,r.cy,r.r,0,2*Math.PI),n.stroke(),n.globalAlpha=1,r.dots)){let a=t.a+e;n.fillStyle=t.faint?"#6f7385":"#0a0a0a",n.beginPath(),n.arc(r.cx+Math.cos(a)*r.r,r.cy+Math.sin(a)*r.r,t.s,0,2*Math.PI),n.fill()}}},M=0,w=!1,y=performance.now(),b=e=>{x((e-y)/1e3),M=w?requestAnimationFrame(b):0},S=new ResizeObserver(()=>{for(let e of(d=t.clientWidth,v=t.clientHeight,m=Math.min(devicePixelRatio||1,2),h=Math.max(d/1600,v/900),p=(d-1600*h)/2,g=(v-900*h)/2,[a,i]))e.width=Math.round(d*m),e.height=Math.round(v*m);s&&u&&(s.viewport(0,0,a.width,a.height),s.uniform2f(f.uRes,a.width,a.height),s.uniform1f(f.uScale,h*m),s.uniform2f(f.uOffset,p*m,g*m)),x(c?0:(performance.now()-y)/1e3)});S.observe(t);let P=new IntersectionObserver(([e])=>{w=e.isIntersecting,c?x(0):w&&!M&&(M=requestAnimationFrame(b))});return P.observe(t),()=>{cancelAnimationFrame(M),S.disconnect(),P.disconnect()}},[e]),(0,t.jsxs)("div",{className:"about__art","aria-hidden":!0,children:[(0,t.jsxs)("svg",{className:"about__layer",viewBox:"0 0 1600 900",preserveAspectRatio:"xMidYMid slice",children:[e.specks.map((e,a)=>(0,t.jsx)("circle",{cx:e.x,cy:e.y,r:e.r,className:"speck"},a)),e.scribbles.map((e,a)=>(0,t.jsx)("path",{d:e,className:"scribble"},a))]}),(0,t.jsx)("canvas",{ref:r,className:"about__layer"}),(0,t.jsx)("canvas",{ref:o,className:"about__layer"})]})}],25071)},25848,e=>{"use strict";var t=e.i(43476),a=e.i(71645);e.s(["Halftone",0,function({src:e,color:r,background:o}){let i=(0,a.useRef)(null);return(0,a.useEffect)(()=>{let t=i.current,a=t.parentElement,n=t.getContext("2d"),l=new Image;l.src=e;let s=()=>{let e=a.clientWidth,i=a.clientHeight;if(!e||!i||!l.complete||!l.naturalWidth)return;let s=Math.min(devicePixelRatio||1,2);t.width=Math.round(e*s),t.height=Math.round(i*s),n.setTransform(s,0,0,s,0,0);let c=Math.max(5,Math.round(e/110)),u=Math.ceil(e/c),f=Math.ceil(i/c),d=document.createElement("canvas");d.width=u,d.height=f;let v=d.getContext("2d",{willReadFrequently:!0});v.drawImage(l,0,0,u,f);let m=v.getImageData(0,0,u,f).data;n.fillStyle=o,n.fillRect(0,0,e,i),n.fillStyle=r,n.beginPath();for(let e=0;e<f;e++)for(let t=0;t<u;t++){let a=(e*u+t)*4,r=Math.min(.62,.03+.66*Math.sqrt((.2126*m[a]+.7152*m[a+1]+.0722*m[a+2])/255))*c,o=t*c+c/2,i=e*c+c/2;n.moveTo(o+r,i),n.arc(o,i,r,0,2*Math.PI)}n.fill()};l.onload=s;let c=new ResizeObserver(s);return c.observe(a),()=>c.disconnect()},[e,r,o]),(0,t.jsx)("canvas",{ref:i,className:"halftone","aria-hidden":!0})}])},35532,e=>{"use strict";var t=e.i(43476),a=e.i(71645);let r=`
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
#endif`,i=`
vec3 dyeC = texture2D(uDye, vDyeUv).rgb;
float dmx = max(dyeC.r, max(dyeC.g, dyeC.b));
dyeC = pow(dyeC * 1.5 / (1.0 + dmx * 0.9), vec3(2.2));
diffuseColor.rgb = vec3(0.01) + dyeC * 0.75;`,n=`
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
}`};e.s(["HeroScene",0,function(){let c=(0,a.useRef)(null);return(0,a.useEffect)(()=>{let t=c.current,a=t.parentElement,u=a.querySelector(".hero__name"),f=()=>{},d=!1;return(async()=>{let c,v=await e.A(21442),[{RoomEnvironment:m},{EffectComposer:h},{RenderPass:p},{UnrealBloomPass:g},{ShaderPass:x},{OutputPass:M},{createFluid:w,PALETTE:y}]=await Promise.all([e.A(2460),e.A(53369),e.A(12022),e.A(96706),e.A(12660),e.A(30481),e.A(72312)]),b=u?getComputedStyle(u):null,S=e=>`${b?.fontWeight??400} ${e}px ${b?.fontFamily??"sans-serif"}`;if(await document.fonts.load(S(100),u?.textContent??""),d)return;try{if(!(c=new v.WebGLRenderer({canvas:t,antialias:!1,powerPreference:"high-performance"})).extensions.has("EXT_color_buffer_float"))throw Error("no float targets")}catch(e){console.error(e),a.classList.add("no-webgl");return}c.toneMapping=v.NeutralToneMapping,c.toneMappingExposure=.95,c.outputColorSpace=v.SRGBColorSpace;let P=matchMedia("(prefers-reduced-motion: reduce)").matches,T=a.clientWidth<760,R=w(c),A=new v.Scene,C=new v.PerspectiveCamera(32,1,.1,100);C.position.set(0,0,7);let _=new v.PMREMGenerator(c),B=_.fromScene(new m,.04).texture;A.environment=B;let j={uDye:{value:null},uTime:{value:0},uTexel:{value:R.dyeTexel},uSize:{value:new v.Vector2(1,1)}},E=new v.MeshPhysicalMaterial({roughness:.34,metalness:0,sheen:.6,sheenRoughness:.4,sheenColor:new v.Color(.35,.35,.4),clearcoat:.2,clearcoatRoughness:.3,envMapIntensity:.1});E.onBeforeCompile=e=>{Object.assign(e.uniforms,j),e.vertexShader=e.vertexShader.replace("#include <common>",`#include <common>
${r}`).replace("#include <beginnormal_vertex>",o).replace("#include <begin_vertex>","vec3 transformed = position + vec3(0.0, 0.0, sH);"),e.fragmentShader=e.fragmentShader.replace("#include <common>","#include <common>\nuniform sampler2D uDye;\nvarying vec2 vDyeUv;").replace("#include <map_fragment>",i).replace("#include <emissivemap_fragment>","#include <emissivemap_fragment>\ntotalEmissiveRadiance += dyeC * 0.08;")};let k=new v.Mesh(new v.PlaneGeometry(1,1,T?140:260,T?100:170),E);k.position.z=-4.6,A.add(k);let D=new v.PointLight(0xff4f9a,6,12,1.6),F=new v.PointLight(5235711,5,12,1.6);A.add(D,F);let U=new v.DirectionalLight(0xffffff,.8);U.position.set(3,4,5),A.add(U);let L=document.createElement("canvas"),z=new v.CanvasTexture(L);z.colorSpace=v.SRGBColorSpace,z.anisotropy=4;let H=new v.Mesh(new v.PlaneGeometry(1,1),new v.MeshBasicMaterial({map:z,alphaTest:.5,color:new v.Color(.78,.77,.73)}));H.position.z=-2.2,A.add(H);let I=T?500:1400,O=new v.BufferGeometry,W=new Float32Array(3*I),q=new Float32Array(I),N=new v.Vector3(6,4,3);for(let e=0;e<I;e++)W[3*e]=(2*Math.random()-1)*7,W[3*e+1]=(2*Math.random()-1)*5,W[3*e+2]=-3.8+6.5*Math.random(),q[e]=Math.random();O.setAttribute("position",new v.BufferAttribute(W,3)),O.setAttribute("aSeed",new v.BufferAttribute(q,1));let G=new v.ShaderMaterial({uniforms:{uTime:{value:0},uPixel:{value:1},uBox:{value:N}},vertexShader:n,fragmentShader:l,transparent:!0,depthWrite:!1,blending:v.AdditiveBlending}),V=new v.Points(O,G);V.frustumCulled=!1,A.add(V);let $=new h(c);$.addPass(new p(A,C));let Y=new g(new v.Vector2(1,1),.28,.45,.95);$.addPass(Y);let K=new x({...s,uniforms:{...s.uniforms,uRes:{value:new v.Vector2}}});$.addPass(K),$.addPass(new M);let X={W:1,H:1,halfW:1,halfH:1},J=e=>{let t=Math.tan(v.MathUtils.degToRad(C.fov/2))*e;return{h:t,w:t*C.aspect}},Q=[[0,4,5],[1,5],[2,0],[3,5,4]],Z=Math.floor(Math.random()*Q.length),ee=e=>{let t=Q[Z],a=y[t[Math.floor(Math.random()*t.length)]],r=T?.6*e:e;return[a[0]*r,a[1]*r,a[2]*r]},et=e=>{let t=Math.random()*Math.PI*2;R.splat(.1+.8*Math.random(),.1+.8*Math.random(),Math.cos(t)*e,Math.sin(t)*e,ee(.3))},ea=new v.Raycaster,er=new v.Vector2,eo={has:!1,moved:!1,uv:new v.Vector2,prevUv:new v.Vector2,hasUv:!1},ei={x:0,y:0},en=ee(.5),el=e=>{let t=a.getBoundingClientRect();er.set((e.clientX-t.left)/t.width*2-1,-(2*((e.clientY-t.top)/t.height))+1),ea.setFromCamera(er,C),eo.has=!0;let r=ea.intersectObject(k,!1)[0];r?.uv&&(eo.hasUv&&(eo.prevUv.copy(eo.uv),eo.moved=!0),eo.uv.copy(r.uv),eo.hasUv=!0)},es=()=>{eo.has=!1,eo.hasUv=!1},ec=e=>{if(!e.target.closest("a")&&(el(e),eo.hasUv))for(let e=0;e<8;e++){let t=e/8*Math.PI*2;R.splat(eo.uv.x,eo.uv.y,2400*Math.cos(t),2400*Math.sin(t),ee(.2),.12)}},eu=new v.Clock,ef=0,ed=0,ev=.4,em=()=>{let e=Math.min(eu.getDelta(),1/30),t=eu.elapsedTime;if((ef+=e)>7&&(ef=0,Z=(Z+1)%Q.length),(ed+=e)>.5&&(ed=0,en=ee(.5)),(ev-=e)<=0&&(et(1300+1300*Math.random()),ev=(.45+.55*Math.random())*(T?1.8:1)),eo.moved){eo.moved=!1;let e=eo.uv.x-eo.prevUv.x,t=eo.uv.y-eo.prevUv.y;(e||t)&&R.splat(eo.uv.x,eo.uv.y,4200*e,4200*t,en)}R.step(e),j.uDye.value=R.texture,j.uTime.value=t;let r=a.getBoundingClientRect(),o=Math.min(1,Math.max(0,-r.top/r.height)),i=Math.min(1,2.2*e);ei.x+=((eo.has?er.x:0)-ei.x)*i,ei.y+=((eo.has?er.y:0)-ei.y)*i,C.position.set(.45*ei.x,.28*ei.y-1.2*o,7+2.5*o),C.lookAt(0,-(.6*o),0),D.position.set(Math.sin(.37*t)*X.halfW*1.2,Math.cos(.29*t)*X.halfH,-2.2),F.position.set(Math.cos(.31*t)*X.halfW*1.2,Math.sin(.43*t)*X.halfH,-2.6),G.uniforms.uTime.value=t,K.uniforms.uTime.value=t,$.render(e)},eh=0,ep=!1,eg=()=>{em(),eh=ep?requestAnimationFrame(eg):0},ex=new ResizeObserver(()=>{if((()=>{let e=a.clientWidth,t=a.clientHeight;if(!e||!t)return;X.W=e,X.H=t;let r=Math.min(devicePixelRatio||1,e*t>14e5?1:1.25);c.setPixelRatio(r),c.setSize(e,t,!1),$.setPixelRatio(r),$.setSize(e,t),Y.resolution.set(e/2,t/2),K.uniforms.uRes.value.set(e*r,t*r),G.uniforms.uPixel.value=r,C.aspect=e/t,C.updateProjectionMatrix();let o=J(7);X.halfW=o.w,X.halfH=o.h;let i=J(11.6);k.scale.set(2*i.w*1.3,2*i.h*1.3,1),j.uSize.value.set(k.scale.x,k.scale.y),N.set(7,1.1*i.h,3),(()=>{if(!u)return;let e=a.getBoundingClientRect(),t=u.getBoundingClientRect(),r=parseFloat(getComputedStyle(u).fontSize),o=u.textContent??"",i=Math.min(devicePixelRatio||1,2),n=L.getContext("2d");n.font=S(r);let l=n.measureText(o),s=.1*r,c=Math.ceil(l.actualBoundingBoxLeft+l.actualBoundingBoxRight+2*s),f=Math.ceil(l.actualBoundingBoxAscent+l.actualBoundingBoxDescent+2*s);L.width=Math.round(c*i),L.height=Math.round(f*i),n.setTransform(i,0,0,i,0,0),n.font=S(r),n.fillStyle="#fff",n.fillText(o,s,s+l.actualBoundingBoxAscent),z.needsUpdate=!0;let d=l.fontBoundingBoxAscent,v=l.fontBoundingBoxDescent,m=t.top-e.top+(t.height-(d+v))/2+d,h=t.left-e.left-s,p=m-l.actualBoundingBoxAscent-s,{w:g,h:x}=J(9.2);H.scale.set(c/X.W*g*2,f/X.H*x*2,1),H.position.set((h+c/2)/X.W*2*g-g,x-(p+f/2)/X.H*2*x,-2.2)})(),R.resize(100*k.scale.x,100*k.scale.y,T?512:1024)&&(()=>{for(let e=0;e<12;e++)et(1800+1600*Math.random())})()})(),P){for(let e=0;e<60;e++)R.step(1/60);em()}});ex.observe(a);let eM=new IntersectionObserver(([e])=>{ep=e.isIntersecting,P||!ep||eh||(eu.getDelta(),eh=requestAnimationFrame(eg))});eM.observe(a),P||(a.addEventListener("pointermove",el),a.addEventListener("pointerleave",es),a.addEventListener("pointerdown",ec)),a.classList.add("scene-ready"),f=()=>{cancelAnimationFrame(eh),ex.disconnect(),eM.disconnect(),a.removeEventListener("pointermove",el),a.removeEventListener("pointerleave",es),a.removeEventListener("pointerdown",ec),R.dispose(),$.dispose(),_.dispose(),B.dispose(),z.dispose(),c.dispose()}})(),()=>{d=!0,f()}},[]),(0,t.jsx)("canvas",{ref:c,className:"fluid","aria-hidden":!0})}])},72312,e=>{e.v(t=>Promise.all(["static/chunks/1b6e44xl6s_qz.js","static/chunks/0i-5efvfrwjiv.js"].map(t=>e.l(t))).then(()=>t(71780)))},21442,e=>{e.v(t=>Promise.all(["static/chunks/1ogzic9gn6tkm.js","static/chunks/0i-5efvfrwjiv.js"].map(t=>e.l(t))).then(()=>t(32009)))},2460,e=>{e.v(t=>Promise.all(["static/chunks/0maksf1-88vof.js","static/chunks/0i-5efvfrwjiv.js"].map(t=>e.l(t))).then(()=>t(31935)))},53369,e=>{e.v(t=>Promise.all(["static/chunks/3izd8lf4e-d-m.js","static/chunks/0i-5efvfrwjiv.js"].map(t=>e.l(t))).then(()=>t(25244)))},30481,e=>{e.v(t=>Promise.all(["static/chunks/2bxivwzw5n4j7.js","static/chunks/0i-5efvfrwjiv.js"].map(t=>e.l(t))).then(()=>t(16022)))},12022,e=>{e.v(t=>Promise.all(["static/chunks/368-xp6b6krk_.js","static/chunks/0i-5efvfrwjiv.js"].map(t=>e.l(t))).then(()=>t(27304)))},12660,e=>{e.v(t=>Promise.all(["static/chunks/0q4a4279ojqy2.js","static/chunks/0i-5efvfrwjiv.js"].map(t=>e.l(t))).then(()=>t(8930)))},96706,e=>{e.v(t=>Promise.all(["static/chunks/26a9lrc4bjf4n.js","static/chunks/0i-5efvfrwjiv.js"].map(t=>e.l(t))).then(()=>t(41330)))}]);