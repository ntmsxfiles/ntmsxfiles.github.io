(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,35532,e=>{"use strict";var t=e.i(43476),o=e.i(71645);let a=`
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
}`,n=`
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
#endif`,l=`
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
diffuseColor.rgb = vec3(0.01) + dyeC * 0.05 + dyeLit * 0.2 * dotM;`,i=`
varying vec2 vUv;
void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,r=`
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
}`};e.s(["HeroScene",0,function(){let d=(0,o.useRef)(null);return(0,o.useEffect)(()=>{let t=d.current,o=t.parentElement,v=o.querySelector(".hero__name"),f=()=>{},m=!1;return(async()=>{let d,h=await e.A(21442),[{RoomEnvironment:p},{EffectComposer:g},{RenderPass:x},{UnrealBloomPass:y},{ShaderPass:w},{OutputPass:M},{createFluid:C,PALETTE:S}]=await Promise.all([e.A(2460),e.A(53369),e.A(12022),e.A(96706),e.A(12660),e.A(30481),e.A(72312)]),D=v?getComputedStyle(v):null,b=e=>`${D?.fontWeight??400} ${e}px ${D?.fontFamily??"sans-serif"}`;if(await document.fonts.load(b(100),v?.textContent??""),m)return;try{if(!(d=new h.WebGLRenderer({canvas:t,antialias:!1,powerPreference:"high-performance"})).extensions.has("EXT_color_buffer_float")&&!d.extensions.has("EXT_color_buffer_half_float"))throw Error("no float targets")}catch(a){let e=document.createElement("canvas").getContext("webgl2"),t=e?.getExtension("WEBGL_debug_renderer_info");console.warn("[leyn.dev] hero scene fallback:",a,{webgl2:!!e,webgl1:!!document.createElement("canvas").getContext("webgl"),gpu:e&&t?e.getParameter(t.UNMASKED_RENDERER_WEBGL):null,floatTargets:e?!!e.getExtension("EXT_color_buffer_float"):null,halfFloatTargets:e?!!e.getExtension("EXT_color_buffer_half_float"):null}),o.classList.add("no-webgl"),o.dataset.fallback=String(a?.message??a);return}d.toneMapping=h.NeutralToneMapping,d.toneMappingExposure=.95,d.outputColorSpace=h.SRGBColorSpace;let P=matchMedia("(prefers-reduced-motion: reduce)").matches,T=o.clientWidth<760,R=C(d),B=new h.Scene,_=new h.PerspectiveCamera(32,1,.1,100);_.position.set(0,0,7);let j=new h.PMREMGenerator(d),A=j.fromScene(new p,.04).texture;B.environment=A;let U={uDye:{value:null},uTime:{value:0},uTexel:{value:R.dyeTexel},uSize:{value:new h.Vector2(1,1)},uDots:{value:200}},k=new h.MeshPhysicalMaterial({roughness:.34,metalness:0,sheen:.6,sheenRoughness:.4,sheenColor:new h.Color(.12,.11,.12),clearcoat:.08,clearcoatRoughness:.3,envMapIntensity:.03});k.onBeforeCompile=e=>{Object.assign(e.uniforms,U),e.vertexShader=e.vertexShader.replace("#include <common>",`#include <common>
${a}`).replace("#include <beginnormal_vertex>",n).replace("#include <begin_vertex>","vec3 transformed = position + vec3(0.0, 0.0, sH);"),e.fragmentShader=e.fragmentShader.replace("#include <common>","#include <common>\nuniform sampler2D uDye;\nuniform vec2 uSize;\nuniform float uDots;\nvarying vec2 vDyeUv;").replace("#include <map_fragment>",l).replace("#include <emissivemap_fragment>","#include <emissivemap_fragment>\ntotalEmissiveRadiance += dyeC * 0.1 + dyeLit * dotM * 0.95;")};let E=new h.Mesh(new h.PlaneGeometry(1,1,T?140:260,T?100:170),k);E.position.z=-4.6,B.add(E);let z=new h.PointLight(0xff4f9a,6,12,1.6),L=new h.PointLight(5235711,5,12,1.6);B.add(z,L);let H=new h.DirectionalLight(0xffffff,.35);H.position.set(3,4,5),B.add(H);let W=document.createElement("canvas"),F=new h.CanvasTexture(W);F.colorSpace=h.SRGBColorSpace,F.anisotropy=4;let N=new h.Mesh(new h.PlaneGeometry(1,1),new h.ShaderMaterial({uniforms:{uMap:{value:F},uDye:U.uDye,uColor:{value:new h.Color(.82,.72,.62)},uRes:{value:new h.Vector2(1,1)},uCell:{value:7}},vertexShader:i,fragmentShader:r}));N.position.z=-2.2;let q=N.material.uniforms,G=document.createElement("canvas"),V=new h.CanvasTexture(G);V.colorSpace=h.SRGBColorSpace;let O=new h.Mesh(new h.PlaneGeometry(1,1),new h.MeshBasicMaterial({map:V,transparent:!0,opacity:.16,depthWrite:!1,blending:h.AdditiveBlending,color:new h.Color(1,.72,.7)}));O.renderOrder=1,N.renderOrder=2,B.add(O,N);let X=T?500:1400,I=new h.BufferGeometry,$=new Float32Array(3*X),K=new Float32Array(X),Y=new h.Vector3(6,4,3);for(let e=0;e<X;e++)$[3*e]=(2*Math.random()-1)*7,$[3*e+1]=(2*Math.random()-1)*5,$[3*e+2]=-3.8+6.5*Math.random(),K[e]=Math.random();I.setAttribute("position",new h.BufferAttribute($,3)),I.setAttribute("aSeed",new h.BufferAttribute(K,1));let J=new h.ShaderMaterial({uniforms:{uTime:{value:0},uPixel:{value:1},uBox:{value:Y}},vertexShader:s,fragmentShader:c,transparent:!0,depthWrite:!1,blending:h.AdditiveBlending}),Q=new h.Points(I,J);Q.frustumCulled=!1,B.add(Q);let Z=new g(d);Z.addPass(new x(B,_));let ee=new y(new h.Vector2(1,1),.28,.45,.95);Z.addPass(ee);let et=new w({...u,uniforms:{...u.uniforms,uRes:{value:new h.Vector2}}});Z.addPass(et),Z.addPass(new M);let eo={W:1,H:1,halfW:1,halfH:1},ea=e=>{let t=Math.tan(h.MathUtils.degToRad(_.fov/2))*e;return{h:t,w:t*_.aspect}},en=[[2,6,0],[7,6,0],[2,7,0]],el=Math.floor(Math.random()*en.length),ei=e=>{let t=en[el],o=S[t[Math.floor(Math.random()*t.length)]],a=T?.6*e:e;return[o[0]*a,o[1]*a,o[2]*a]},er=[],es=(e,t)=>{let o=T?.7*t:t;return[e[0]*o,e[1]*o,e[2]*o]},ec=(e,t,o=1,a=0)=>{let n=en[el];er.push({x:e,y:t,size:.16*o*Math.min(1,.55+.45*(E.scale.x/E.scale.y)),t:-a,dur:1.4+.6*Math.random(),rot:Math.random()*Math.PI*2,petals:5+Math.floor(3*Math.random()),seed:100*Math.random(),color:es(S[n[Math.floor(2*Math.random())]],.7),core:es(S[0],.8)})},eu=[],ed=(e=0)=>{let t=[.5,.5],o=-1;for(let e=0;e<8;e++){let e=[.15+.7*Math.random(),.18+.64*Math.random()],a=eu.length?Math.min(...eu.map(([t,o])=>Math.hypot(t-e[0],o-e[1]))):1;a>o&&(o=a,t=e)}eu.push(t),eu.length>4&&eu.shift(),ec(t[0],t[1],.8+.5*Math.random(),e)},ev=new h.Raycaster,ef=new h.Vector2,em={has:!1,moved:!1,uv:new h.Vector2,prevUv:new h.Vector2,hasUv:!1},eh={x:0,y:0},ep=ei(.27),eg={x:NaN,y:NaN},ex=-1e9,ey=e=>{let t=e.clientX===eg.x&&e.clientY===eg.y;eg.x=e.clientX,eg.y=e.clientY;let a=o.getBoundingClientRect();ef.set((e.clientX-a.left)/a.width*2-1,-(2*((e.clientY-a.top)/a.height))+1),ev.setFromCamera(ef,_),em.has=!0;let n=ev.intersectObject(E,!1)[0];n?.uv&&(em.hasUv&&!t&&(em.prevUv.copy(em.uv),em.moved=!0,ex=performance.now()),em.uv.copy(n.uv),em.hasUv=!0)},ew=()=>{em.has=!1,em.hasUv=!1},eM=e=>{!e.target.closest("a")&&(ey(e),em.hasUv&&ec(em.uv.x,em.uv.y,1.1))},eC=new h.Clock,eS=0,eD=0,eb=3,eP=!1,eT=0,eR=!1,eB=()=>{(()=>{let e=Math.min(eC.getDelta(),1/30),t=eC.elapsedTime;for(let t of((eS+=e)>7&&(eS=0,el=(el+1)%en.length),(eD+=e)>.5&&(eD=0,ep=ei(.27)),(eb-=e)<=0&&(ed(),eb=(performance.now()-ex>1500?1+.7*Math.random():2.6+1.4*Math.random())*(T?1.4:1)),er)){if(t.t+=e,t.t<=0)continue;let o=Math.min(1,t.t/t.dur),a=1-Math.pow(1-o,3);R.flower(t.x,t.y,t.size*(.15+.85*a),{rot:t.rot+.25*a,petals:t.petals,seed:t.seed,color:t.color,core:t.core,push:8*e*(1-o)})}if(er=er.filter(e=>e.t<e.dur),em.moved){em.moved=!1;let e=em.uv.x-em.prevUv.x,t=em.uv.y-em.prevUv.y;(e||t)&&R.splat(em.uv.x,em.uv.y,2800*e,2800*t,ep,.11)}R.step(e),U.uDye.value=R.texture,U.uTime.value=t;let a=o.getBoundingClientRect(),n=Math.min(1,Math.max(0,-a.top/a.height)),l=Math.min(1,2.2*e),i=em.has&&!document.documentElement.classList.contains("is-loading");eh.x+=((i?ef.x:0)-eh.x)*l,eh.y+=((i?ef.y:0)-eh.y)*l;let r=P?0:n;_.position.set(.45*eh.x,.28*eh.y-1.2*r,7+2.5*r),_.lookAt(0,-(.6*r),0),z.position.set(Math.sin(.37*t)*eo.halfW*1.2,Math.cos(.29*t)*eo.halfH,-2.2),L.position.set(Math.cos(.31*t)*eo.halfW*1.2,Math.sin(.43*t)*eo.halfH,-2.6),J.uniforms.uTime.value=t,et.uniforms.uTime.value=t,eP&&document.documentElement.classList.contains("is-loading")||(Z.render(e),eP=!0)})(),eT=eR?requestAnimationFrame(eB):0},e_=new ResizeObserver(()=>{(()=>{let e=o.clientWidth,t=o.clientHeight;if(!e||!t)return;eo.W=e,eo.H=t;let a=Math.min(devicePixelRatio||1,e*t>14e5?1:1.25);d.setPixelRatio(a),d.setSize(e,t,!1),Z.setPixelRatio(a),Z.setSize(e,t),ee.resolution.set(e/2,t/2),et.uniforms.uRes.value.set(e*a,t*a),q.uRes.value.set(e*a,t*a),q.uCell.value=(T?6:7)*a,J.uniforms.uPixel.value=a,_.aspect=e/t,_.updateProjectionMatrix();let n=ea(7);eo.halfW=n.w,eo.halfH=n.h;let l=ea(11.6);E.scale.set(2*l.w*1.3,2*l.h*1.3,1),U.uSize.value.set(E.scale.x,E.scale.y),Y.set(7,1.1*l.h,3),U.uDots.value=1.3*e/(T?6:7),(()=>{if(!v)return;let e=o.getBoundingClientRect(),t=v.getBoundingClientRect(),a=parseFloat(getComputedStyle(v).fontSize),n=v.textContent??"",l=Math.min(devicePixelRatio||1,2),i=W.getContext("2d");i.font=b(a),i.letterSpacing=getComputedStyle(v).letterSpacing;let r=i.measureText(n),s=.1*a,c=Math.ceil(r.actualBoundingBoxLeft+r.actualBoundingBoxRight+2*s),u=Math.ceil(r.actualBoundingBoxAscent+r.actualBoundingBoxDescent+2*s);W.width=Math.round(c*l),W.height=Math.round(u*l),i.setTransform(l,0,0,l,0,0),i.font=b(a),i.letterSpacing=getComputedStyle(v).letterSpacing,i.fillStyle="#fff",i.fillText(n,s,s+r.actualBoundingBoxAscent),F.needsUpdate=!0,G.width=W.width,G.height=W.height;let d=G.getContext("2d");d.filter=`blur(${.035*a*l}px)`,d.drawImage(W,0,0),d.drawImage(W,0,0),V.needsUpdate=!0;let f=r.fontBoundingBoxAscent,m=r.fontBoundingBoxDescent,h=t.top-e.top+(t.height-(f+m))/2+f,p=t.left-e.left-s,g=h-r.actualBoundingBoxAscent-s,{w:x,h:y}=ea(9.2);N.scale.set(c/eo.W*x*2,u/eo.H*y*2,1),N.position.set((p+c/2)/eo.W*2*x-x,y-(g+u/2)/eo.H*2*y,-2.2),O.scale.copy(N.scale),O.position.copy(N.position),O.position.z-=.02})(),R.resize(100*E.scale.x,100*E.scale.y,T?512:1024)&&(()=>{er=[];for(let e=0;e<3;e++)ed(.7*e)})()})()});e_.observe(o);let ej=new IntersectionObserver(([e])=>{(eR=e.isIntersecting)&&!eT&&(eC.getDelta(),eT=requestAnimationFrame(eB))});ej.observe(o),o.addEventListener("pointermove",ey),o.addEventListener("pointerleave",ew),o.addEventListener("pointerdown",eM),o.classList.add("scene-ready"),f=()=>{cancelAnimationFrame(eT),e_.disconnect(),ej.disconnect(),o.removeEventListener("pointermove",ey),o.removeEventListener("pointerleave",ew),o.removeEventListener("pointerdown",eM),R.dispose(),Z.dispose(),j.dispose(),A.dispose(),F.dispose(),V.dispose(),d.dispose()}})(),()=>{m=!0,f()}},[]),(0,t.jsx)("canvas",{ref:d,className:"fluid","aria-hidden":!0})}])},72312,e=>{e.v(t=>Promise.all(["static/chunks/3qxv1af0k0w8v.js","static/chunks/0i-5efvfrwjiv.js"].map(t=>e.l(t))).then(()=>t(71780)))},21442,e=>{e.v(t=>Promise.all(["static/chunks/1ogzic9gn6tkm.js","static/chunks/0i-5efvfrwjiv.js"].map(t=>e.l(t))).then(()=>t(32009)))},2460,e=>{e.v(t=>Promise.all(["static/chunks/0maksf1-88vof.js","static/chunks/0i-5efvfrwjiv.js"].map(t=>e.l(t))).then(()=>t(31935)))},53369,e=>{e.v(t=>Promise.all(["static/chunks/3izd8lf4e-d-m.js","static/chunks/0i-5efvfrwjiv.js"].map(t=>e.l(t))).then(()=>t(25244)))},30481,e=>{e.v(t=>Promise.all(["static/chunks/2bxivwzw5n4j7.js","static/chunks/0i-5efvfrwjiv.js"].map(t=>e.l(t))).then(()=>t(16022)))},12022,e=>{e.v(t=>Promise.all(["static/chunks/368-xp6b6krk_.js","static/chunks/0i-5efvfrwjiv.js"].map(t=>e.l(t))).then(()=>t(27304)))},12660,e=>{e.v(t=>Promise.all(["static/chunks/0q4a4279ojqy2.js","static/chunks/0i-5efvfrwjiv.js"].map(t=>e.l(t))).then(()=>t(8930)))},96706,e=>{e.v(t=>Promise.all(["static/chunks/26a9lrc4bjf4n.js","static/chunks/0i-5efvfrwjiv.js"].map(t=>e.l(t))).then(()=>t(41330)))}]);