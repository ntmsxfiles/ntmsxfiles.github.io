(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[974],{539:(e,t,o)=>{"use strict";o.d(t,{HeroScene:()=>m});var a=o(5155),n=o(2115);let l=`
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
diffuseColor.rgb = vec3(0.01) + dyeC * 0.05 + dyeLit * 0.2 * dotM;`,s=`
varying vec2 vUv;
void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,c=`
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
}`,u=`
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
}`,d=`
uniform float uTime;
varying float vSeed;
void main() {
  float d = length(gl_PointCoord - 0.5);
  float a = smoothstep(0.5, 0.0, d);
  float tw = 0.45 + 0.55 * sin(uTime * (1.2 + vSeed * 3.0) + vSeed * 60.0);
  vec3 c = mix(vec3(1.0, 0.95, 0.88), vec3(0.75, 0.9, 1.0), step(0.6, vSeed));
  gl_FragColor = vec4(c * a * tw * 0.7, a * tw);
}`,v={uniforms:{tDiffuse:{value:null},uTime:{value:0},uRes:{value:null}},vertexShader:`
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
}`};function m(){let e=(0,n.useRef)(null);return(0,n.useEffect)(()=>{let t=e.current,a=t.parentElement,n=a.querySelector(".hero__name"),m=()=>{},f=!1;return(async()=>{let e,h=await Promise.all([o.e(831),o.e(367)]).then(o.bind(o,9625)),[{RoomEnvironment:p},{EffectComposer:g},{RenderPass:x},{UnrealBloomPass:y},{ShaderPass:w},{OutputPass:M},{createFluid:C,PALETTE:S}]=await Promise.all([Promise.all([o.e(831),o.e(967)]).then(o.bind(o,9348)),Promise.all([o.e(831),o.e(548)]).then(o.bind(o,7167)),Promise.all([o.e(831),o.e(908)]).then(o.bind(o,1908)),Promise.all([o.e(831),o.e(382)]).then(o.bind(o,2001)),Promise.all([o.e(831),o.e(242)]).then(o.bind(o,7861)),Promise.all([o.e(831),o.e(861)]).then(o.bind(o,2861)),Promise.all([o.e(831),o.e(348)]).then(o.bind(o,4348))]),b=n?getComputedStyle(n):null,D=e=>`${b?.fontWeight??400} ${e}px ${b?.fontFamily??"sans-serif"}`;if(await document.fonts.load(D(100),n?.textContent??""),f)return;try{if(!(e=new h.WebGLRenderer({canvas:t,antialias:!1,powerPreference:"high-performance"})).extensions.has("EXT_color_buffer_float")&&!e.extensions.has("EXT_color_buffer_half_float"))throw Error("no float targets")}catch(o){let e=document.createElement("canvas").getContext("webgl2"),t=e?.getExtension("WEBGL_debug_renderer_info");console.warn("[leyn.dev] hero scene fallback:",o,{webgl2:!!e,webgl1:!!document.createElement("canvas").getContext("webgl"),gpu:e&&t?e.getParameter(t.UNMASKED_RENDERER_WEBGL):null,floatTargets:e?!!e.getExtension("EXT_color_buffer_float"):null,halfFloatTargets:e?!!e.getExtension("EXT_color_buffer_half_float"):null}),a.classList.add("no-webgl"),a.dataset.fallback=String(o?.message??o);return}e.toneMapping=h.NeutralToneMapping,e.toneMappingExposure=.95,e.outputColorSpace=h.SRGBColorSpace;let P=matchMedia("(prefers-reduced-motion: reduce)").matches,_=a.clientWidth<760,R=C(e),T=new h.Scene,B=new h.PerspectiveCamera(32,1,.1,100);B.position.set(0,0,7);let E=new h.PMREMGenerator(e),U=E.fromScene(new p,.04).texture;T.environment=U;let L={uDye:{value:null},uTime:{value:0},uTexel:{value:R.dyeTexel},uSize:{value:new h.Vector2(1,1)},uDots:{value:200}},A=new h.MeshPhysicalMaterial({roughness:.34,metalness:0,sheen:.6,sheenRoughness:.4,sheenColor:new h.Color(.12,.11,.12),clearcoat:.08,clearcoatRoughness:.3,envMapIntensity:.03});A.onBeforeCompile=e=>{Object.assign(e.uniforms,L),e.vertexShader=e.vertexShader.replace("#include <common>",`#include <common>
${l}`).replace("#include <beginnormal_vertex>",r).replace("#include <begin_vertex>","vec3 transformed = position + vec3(0.0, 0.0, sH);"),e.fragmentShader=e.fragmentShader.replace("#include <common>","#include <common>\nuniform sampler2D uDye;\nuniform vec2 uSize;\nuniform float uDots;\nvarying vec2 vDyeUv;").replace("#include <map_fragment>",i).replace("#include <emissivemap_fragment>","#include <emissivemap_fragment>\ntotalEmissiveRadiance += dyeC * 0.1 + dyeLit * dotM * 0.95;")};let z=new h.Mesh(new h.PlaneGeometry(1,1,_?140:260,_?100:170),A);z.position.z=-4.6,T.add(z);let k=new h.PointLight(0xff4f9a,6,12,1.6),N=new h.PointLight(5235711,5,12,1.6);T.add(k,N);let H=new h.DirectionalLight(0xffffff,.35);H.position.set(3,4,5),T.add(H);let W=document.createElement("canvas"),F=new h.CanvasTexture(W);F.colorSpace=h.SRGBColorSpace,F.anisotropy=4;let G=new h.Mesh(new h.PlaneGeometry(1,1),new h.ShaderMaterial({uniforms:{uMap:{value:F},uDye:L.uDye,uColor:{value:new h.Color(.82,.72,.62)},uRes:{value:new h.Vector2(1,1)},uCell:{value:7}},vertexShader:s,fragmentShader:c}));G.position.z=-2.2;let j=G.material.uniforms,V=document.createElement("canvas"),q=new h.CanvasTexture(V);q.colorSpace=h.SRGBColorSpace;let O=new h.Mesh(new h.PlaneGeometry(1,1),new h.MeshBasicMaterial({map:q,transparent:!0,opacity:.16,depthWrite:!1,blending:h.AdditiveBlending,color:new h.Color(1,.72,.7)}));O.renderOrder=1,G.renderOrder=2,T.add(O,G);let X=_?500:1400,I=new h.BufferGeometry,$=new Float32Array(3*X),Y=new Float32Array(X),K=new h.Vector3(6,4,3);for(let e=0;e<X;e++)$[3*e]=(2*Math.random()-1)*7,$[3*e+1]=(2*Math.random()-1)*5,$[3*e+2]=-3.8+6.5*Math.random(),Y[e]=Math.random();I.setAttribute("position",new h.BufferAttribute($,3)),I.setAttribute("aSeed",new h.BufferAttribute(Y,1));let J=new h.ShaderMaterial({uniforms:{uTime:{value:0},uPixel:{value:1},uBox:{value:K}},vertexShader:u,fragmentShader:d,transparent:!0,depthWrite:!1,blending:h.AdditiveBlending}),Q=new h.Points(I,J);Q.frustumCulled=!1,T.add(Q);let Z=new g(e);Z.addPass(new x(T,B));let ee=new y(new h.Vector2(1,1),.28,.45,.95);Z.addPass(ee);let et=new w({...v,uniforms:{...v.uniforms,uRes:{value:new h.Vector2}}});Z.addPass(et),Z.addPass(new M);let eo={W:1,H:1,halfW:1,halfH:1},ea=e=>{let t=Math.tan(h.MathUtils.degToRad(B.fov/2))*e;return{h:t,w:t*B.aspect}},en=[[2,6,0],[7,6,0],[2,7,0]],el=Math.floor(Math.random()*en.length),er=e=>{let t=en[el],o=S[t[Math.floor(Math.random()*t.length)]],a=_?.6*e:e;return[o[0]*a,o[1]*a,o[2]*a]},ei=[],es=(e,t)=>{let o=_?.7*t:t;return[e[0]*o,e[1]*o,e[2]*o]},ec=(e,t,o=1,a=0)=>{let n=en[el];ei.push({x:e,y:t,size:.16*o*Math.min(1,.55+.45*(z.scale.x/z.scale.y)),t:-a,dur:1.4+.6*Math.random(),rot:Math.random()*Math.PI*2,petals:5+Math.floor(3*Math.random()),seed:100*Math.random(),color:es(S[n[Math.floor(2*Math.random())]],.7),core:es(S[0],.8)})},eu=[],ed=(e=0)=>{let t=[.5,.5],o=-1;for(let e=0;e<8;e++){let e=[.15+.7*Math.random(),.18+.64*Math.random()],a=eu.length?Math.min(...eu.map(([t,o])=>Math.hypot(t-e[0],o-e[1]))):1;a>o&&(o=a,t=e)}eu.push(t),eu.length>4&&eu.shift(),ec(t[0],t[1],.8+.5*Math.random(),e)},ev=new h.Raycaster,em=new h.Vector2,ef={has:!1,moved:!1,uv:new h.Vector2,prevUv:new h.Vector2,hasUv:!1},eh={x:0,y:0},ep=er(.27),eg={x:NaN,y:NaN},ex=-1e9,ey=e=>{let t=e.clientX===eg.x&&e.clientY===eg.y;eg.x=e.clientX,eg.y=e.clientY;let o=a.getBoundingClientRect();em.set((e.clientX-o.left)/o.width*2-1,-(2*((e.clientY-o.top)/o.height))+1),ev.setFromCamera(em,B),ef.has=!0;let n=ev.intersectObject(z,!1)[0];n?.uv&&(ef.hasUv&&!t&&(ef.prevUv.copy(ef.uv),ef.moved=!0,ex=performance.now()),ef.uv.copy(n.uv),ef.hasUv=!0)},ew=()=>{ef.has=!1,ef.hasUv=!1},eM=e=>{!e.target.closest("a")&&(ey(e),ef.hasUv&&ec(ef.uv.x,ef.uv.y,1.1))},eC=new h.Clock,eS=0,eb=0,eD=3,eP=!1,e_=0,eR=!1,eT=()=>{(()=>{let e=Math.min(eC.getDelta(),1/30),t=eC.elapsedTime;for(let t of((eS+=e)>7&&(eS=0,el=(el+1)%en.length),(eb+=e)>.5&&(eb=0,ep=er(.27)),(eD-=e)<=0&&(ed(),eD=(performance.now()-ex>1500?1+.7*Math.random():2.6+1.4*Math.random())*(_?1.4:1)),ei)){if(t.t+=e,t.t<=0)continue;let o=Math.min(1,t.t/t.dur),a=1-Math.pow(1-o,3);R.flower(t.x,t.y,t.size*(.15+.85*a),{rot:t.rot+.25*a,petals:t.petals,seed:t.seed,color:t.color,core:t.core,push:8*e*(1-o)})}if(ei=ei.filter(e=>e.t<e.dur),ef.moved){ef.moved=!1;let e=ef.uv.x-ef.prevUv.x,t=ef.uv.y-ef.prevUv.y;(e||t)&&R.splat(ef.uv.x,ef.uv.y,2800*e,2800*t,ep,.11)}R.step(e),L.uDye.value=R.texture,L.uTime.value=t;let o=a.getBoundingClientRect(),n=Math.min(1,Math.max(0,-o.top/o.height)),l=Math.min(1,2.2*e),r=ef.has&&!document.documentElement.classList.contains("is-loading");eh.x+=((r?em.x:0)-eh.x)*l,eh.y+=((r?em.y:0)-eh.y)*l;let i=P?0:n;B.position.set(.45*eh.x,.28*eh.y-1.2*i,7+2.5*i),B.lookAt(0,-(.6*i),0),k.position.set(Math.sin(.37*t)*eo.halfW*1.2,Math.cos(.29*t)*eo.halfH,-2.2),N.position.set(Math.cos(.31*t)*eo.halfW*1.2,Math.sin(.43*t)*eo.halfH,-2.6),J.uniforms.uTime.value=t,et.uniforms.uTime.value=t,eP&&document.documentElement.classList.contains("is-loading")||(Z.render(e),eP=!0)})(),e_=eR?requestAnimationFrame(eT):0},eB=new ResizeObserver(()=>{(()=>{let t=a.clientWidth,o=a.clientHeight;if(!t||!o)return;eo.W=t,eo.H=o;let l=Math.min(devicePixelRatio||1,t*o>14e5?1:1.25);e.setPixelRatio(l),e.setSize(t,o,!1),Z.setPixelRatio(l),Z.setSize(t,o),ee.resolution.set(t/2,o/2),et.uniforms.uRes.value.set(t*l,o*l),j.uRes.value.set(t*l,o*l),j.uCell.value=(_?6:7)*l,J.uniforms.uPixel.value=l,B.aspect=t/o,B.updateProjectionMatrix();let r=ea(7);eo.halfW=r.w,eo.halfH=r.h;let i=ea(11.6);z.scale.set(2*i.w*1.3,2*i.h*1.3,1),L.uSize.value.set(z.scale.x,z.scale.y),K.set(7,1.1*i.h,3),L.uDots.value=1.3*t/(_?6:7),(()=>{if(!n)return;let e=a.getBoundingClientRect(),t=n.getBoundingClientRect(),o=parseFloat(getComputedStyle(n).fontSize),l=n.textContent??"",r=Math.min(devicePixelRatio||1,2),i=W.getContext("2d");i.font=D(o),i.letterSpacing=getComputedStyle(n).letterSpacing;let s=i.measureText(l),c=.1*o,u=Math.ceil(s.actualBoundingBoxLeft+s.actualBoundingBoxRight+2*c),d=Math.ceil(s.actualBoundingBoxAscent+s.actualBoundingBoxDescent+2*c);W.width=Math.round(u*r),W.height=Math.round(d*r),i.setTransform(r,0,0,r,0,0),i.font=D(o),i.letterSpacing=getComputedStyle(n).letterSpacing,i.fillStyle="#fff",i.fillText(l,c,c+s.actualBoundingBoxAscent),F.needsUpdate=!0,V.width=W.width,V.height=W.height;let v=V.getContext("2d");v.filter=`blur(${.035*o*r}px)`,v.drawImage(W,0,0),v.drawImage(W,0,0),q.needsUpdate=!0;let m=s.fontBoundingBoxAscent,f=s.fontBoundingBoxDescent,h=t.top-e.top+(t.height-(m+f))/2+m,p=t.left-e.left-c,g=h-s.actualBoundingBoxAscent-c,{w:x,h:y}=ea(9.2);G.scale.set(u/eo.W*x*2,d/eo.H*y*2,1),G.position.set((p+u/2)/eo.W*2*x-x,y-(g+d/2)/eo.H*2*y,-2.2),O.scale.copy(G.scale),O.position.copy(G.position),O.position.z-=.02})(),R.resize(100*z.scale.x,100*z.scale.y,_?512:1024)&&(()=>{ei=[];for(let e=0;e<3;e++)ed(.7*e)})()})()});eB.observe(a);let eE=new IntersectionObserver(([e])=>{(eR=e.isIntersecting)&&!e_&&(eC.getDelta(),e_=requestAnimationFrame(eT))});eE.observe(a),a.addEventListener("pointermove",ey),a.addEventListener("pointerleave",ew),a.addEventListener("pointerdown",eM),a.classList.add("scene-ready"),m=()=>{cancelAnimationFrame(e_),eB.disconnect(),eE.disconnect(),a.removeEventListener("pointermove",ey),a.removeEventListener("pointerleave",ew),a.removeEventListener("pointerdown",eM),R.dispose(),Z.dispose(),E.dispose(),U.dispose(),F.dispose(),q.dispose(),e.dispose()}})(),()=>{f=!0,m()}},[]),(0,a.jsx)("canvas",{ref:e,className:"fluid","aria-hidden":!0})}},4184:(e,t,o)=>{Promise.resolve().then(o.bind(o,539)),Promise.resolve().then(o.bind(o,8167)),Promise.resolve().then(o.t.bind(o,8500,23))},8167:(e,t,o)=>{"use strict";o.d(t,{NavLinks:()=>s});var a=o(5155),n=o(8500),l=o.n(n),r=o(3321);let i=[{href:"/works/",label:"Работы"},{href:"/about/",label:"Обо мне"},{href:"/contact/",label:"Контакты"}];function s(){let e=(0,r.usePathname)();return(0,a.jsx)("nav",{"aria-label":"Разделы",className:"nav__links",children:i.map(t=>{let o;return(0,a.jsx)(l(),{href:t.href,"aria-current":e===(o=t.href)||e===o.slice(0,-1)||"/works/"===o&&e.startsWith("/cases")?"page":void 0,children:t.label},t.href)})})}}},e=>{e.O(0,[756,441,794,358],()=>e(e.s=4184)),_N_E=e.O()}]);