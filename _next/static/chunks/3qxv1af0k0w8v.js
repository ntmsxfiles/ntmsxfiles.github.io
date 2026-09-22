(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,71780,e=>{"use strict";var t=e.i(90072);let r=`
precision highp float;
in vec3 position;
in vec2 uv;
uniform vec2 texel;
out vec2 vUv, vL, vR, vT, vB;
void main() {
  vUv = uv;
  vL = vUv - vec2(texel.x, 0.0);
  vR = vUv + vec2(texel.x, 0.0);
  vT = vUv + vec2(0.0, texel.y);
  vB = vUv - vec2(0.0, texel.y);
  gl_Position = vec4(position.xy, 0.0, 1.0);
}`,o=`
precision highp float;
in vec2 vUv, vL, vR, vT, vB;
out vec4 o;
`,u={advection:`${o}
uniform sampler2D uVelocity, uSource;
uniform vec2 texel;
uniform float dt, dissipation;
void main() {
  vec2 coord = vUv - dt * texture(uVelocity, vUv).xy * texel;
  o = vec4(texture(uSource, coord).rgb / (1.0 + dissipation * dt), 1.0);
}`,divergence:`${o}
uniform sampler2D uVelocity;
void main() {
  float L = texture(uVelocity, vL).x;
  float R = texture(uVelocity, vR).x;
  float T = texture(uVelocity, vT).y;
  float B = texture(uVelocity, vB).y;
  vec2 C = texture(uVelocity, vUv).xy;
  if (vL.x < 0.0) L = -C.x;
  if (vR.x > 1.0) R = -C.x;
  if (vT.y > 1.0) T = -C.y;
  if (vB.y < 0.0) B = -C.y;
  o = vec4(0.5 * (R - L + T - B), 0.0, 0.0, 1.0);
}`,curl:`${o}
uniform sampler2D uVelocity;
void main() {
  float L = texture(uVelocity, vL).y;
  float R = texture(uVelocity, vR).y;
  float T = texture(uVelocity, vT).x;
  float B = texture(uVelocity, vB).x;
  o = vec4(0.5 * (R - L - T + B), 0.0, 0.0, 1.0);
}`,vorticity:`${o}
uniform sampler2D uVelocity, uCurl;
uniform float curl, dt;
void main() {
  float L = texture(uCurl, vL).x;
  float R = texture(uCurl, vR).x;
  float T = texture(uCurl, vT).x;
  float B = texture(uCurl, vB).x;
  float C = texture(uCurl, vUv).x;
  vec2 force = 0.5 * vec2(abs(T) - abs(B), abs(R) - abs(L));
  force /= length(force) + 0.0001;
  force *= curl * C;
  force.y *= -1.0;
  vec2 vel = texture(uVelocity, vUv).xy + force * dt;
  o = vec4(clamp(vel, -1000.0, 1000.0), 0.0, 1.0);
}`,pressure:`${o}
uniform sampler2D uPressure, uDivergence;
void main() {
  float L = texture(uPressure, vL).x;
  float R = texture(uPressure, vR).x;
  float T = texture(uPressure, vT).x;
  float B = texture(uPressure, vB).x;
  float div = texture(uDivergence, vUv).x;
  o = vec4((L + R + B + T - div) * 0.25, 0.0, 0.0, 1.0);
}`,gradient:`${o}
uniform sampler2D uPressure, uVelocity;
void main() {
  float L = texture(uPressure, vL).x;
  float R = texture(uPressure, vR).x;
  float T = texture(uPressure, vT).x;
  float B = texture(uPressure, vB).x;
  vec2 vel = texture(uVelocity, vUv).xy - vec2(R - L, T - B);
  o = vec4(vel, 0.0, 1.0);
}`,clear:`${o}
uniform sampler2D uTexture;
uniform float value;
void main() { o = value * texture(uTexture, vUv); }`,splat:`${o}
uniform sampler2D uTarget;
uniform float aspect, radius;
uniform vec3 color;
uniform vec2 point;
void main() {
  vec2 p = vUv - point;
  p.x *= aspect;
  vec3 s = exp(-dot(p, p) / radius) * color;
  o = vec4(texture(uTarget, vUv).rgb + s, 1.0);
}`,flower:`${o}
uniform sampler2D uTarget;
uniform float aspect, radius, rot, petals, seed, mode, strength;
uniform vec3 color, color2;
uniform vec2 point;
float h1(float n) { return fract(sin(n * 91.345 + seed * 17.13) * 43758.5453); }
float vnoise(vec2 q) {
  vec2 i = floor(q), f = fract(q);
  f = f * f * (3.0 - 2.0 * f);
  float a = fract(sin(dot(i, vec2(127.1, 311.7)) + seed) * 43758.5);
  float b = fract(sin(dot(i + vec2(1, 0), vec2(127.1, 311.7)) + seed) * 43758.5);
  float c = fract(sin(dot(i + vec2(0, 1), vec2(127.1, 311.7)) + seed) * 43758.5);
  float d = fract(sin(dot(i + vec2(1, 1), vec2(127.1, 311.7)) + seed) * 43758.5);
  return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}
void main() {
  vec2 p = vUv - point;
  p.x *= aspect;
  p += (vec2(vnoise(p * 34.0), vnoise(p * 34.0 + 7.3)) - 0.5) * radius * 0.14;
  float r = length(p);
  float a = atan(p.y, p.x) - rot;
  float sector = 6.2831853 / petals;
  float idx = floor((a + sector * 0.5) / sector);
  float th = a - idx * sector;
  float pid = mod(idx, petals);
  float len = radius * (0.6 + 0.6 * h1(pid));
  th -= sin(r / len * 3.14159) * 0.22 * (h1(pid + 11.0) - 0.5);
  float f = clamp(r / len, 0.0, 1.0);
  float w = pow(sin(pow(f, 0.7) * 3.14159), 1.3) * (0.045 + 0.05 * h1(pid + 5.0)) * len + (1.0 - f) * radius * 0.03;
  float edge = radius * 0.035;
  float m = (1.0 - smoothstep(w - edge, w + edge, abs(th) * r)) * step(r, len);
  float core = 1.0 - smoothstep(radius * 0.03, radius * 0.11, r);
  m = max(m, core);
  vec4 prev = texture(uTarget, vUv);
  if (mode < 0.5) {
    vec3 c = mix(color, color2, core) * m * strength;
    o = vec4(max(prev.rgb, c), 1.0);
  } else {
    vec2 dir = r > 0.0 ? p / r : vec2(0.0);
    dir.x /= aspect;
    o = vec4(prev.xy + dir * m * strength * (1.0 - core), 0.0, 1.0);
  }
}`};e.s(["PALETTE",0,[[1,.36,.62],[.62,.74,.18],[1,.35,.12],[.12,.7,.64],[.72,.65,1],[.36,.24,.96],[1,.72,.45],[1,.55,.08]],"createFluid",0,function(e){let o=new t.Scene,l=new t.OrthographicCamera(-1,1,1,-1,0,1),a=new t.Mesh(new t.PlaneGeometry(2,2));a.frustumCulled=!1,o.add(a);let i=Object.fromEntries(Object.keys(u).map(e=>[e,new t.RawShaderMaterial({glslVersion:t.GLSL3,vertexShader:r,fragmentShader:u[e],uniforms:{texel:{value:new t.Vector2},uVelocity:{value:null},uSource:{value:null},uCurl:{value:null},uPressure:{value:null},uDivergence:{value:null},uTexture:{value:null},uTarget:{value:null},dt:{value:0},dissipation:{value:0},curl:{value:6},value:{value:.8},aspect:{value:1},radius:{value:.003},color:{value:new t.Vector3},color2:{value:new t.Vector3},rot:{value:0},petals:{value:6},seed:{value:0},mode:{value:0},strength:{value:1},point:{value:new t.Vector2}},depthTest:!1,depthWrite:!1})])),v=(e,r)=>new t.WebGLRenderTarget(e,r,{type:t.HalfFloatType,format:t.RGBAFormat,minFilter:t.LinearFilter,magFilter:t.LinearFilter,wrapS:t.ClampToEdgeWrapping,wrapT:t.ClampToEdgeWrapping,depthBuffer:!1,stencilBuffer:!1}),c=(e,t)=>{let r=v(e,t),o=v(e,t);return{get read(){return r},get write(){return o},swap(){[r,o]=[o,r]}}},s=null,n=null,d=null,f=null,p=null,x=new t.Vector2,m=new t.Vector2,w=1,g="",y=(t,r,u,v)=>{let c=i[t];for(let[e,t]of(c.uniforms.texel.value.copy(u),Object.entries(v)))c.uniforms[e].value=t;a.material=c,e.setRenderTarget(r),e.render(o,l)},T=e=>{let t=Math.round(e*(w<1?1/w:w));return w>=1?[t,e]:[e,t]},V=()=>{for(let e of[s,n,d])e?.read.dispose(),e?.write.dispose();f?.dispose(),p?.dispose()};return{get texture(){return d.read.texture},dyeTexel:m,resize(e,t,r){w=e/t;let[o,u]=T(128),[l,a]=T(r),i=`${o}x${u}:${l}x${a}`;return i!==g&&(V(),g=i,s=c(o,u),n=c(o,u),f=v(o,u),p=v(o,u),d=c(l,a),x.set(1/o,1/u),m.set(1/l,1/a),!0)},splat(e,r,o,u,l,a=.3){let i=a/100*(w>1?w:1);y("splat",s.write,x,{uTarget:s.read.texture,aspect:w,radius:i,point:new t.Vector2(e,r),color:new t.Vector3(o,u,0)}),s.swap(),y("splat",d.write,m,{uTarget:d.read.texture,aspect:w,radius:i,point:new t.Vector2(e,r),color:new t.Vector3(...l)}),d.swap()},flower(e,r,o,u){let l={uTarget:null,aspect:w,radius:o,point:new t.Vector2(e,r),rot:u.rot,petals:u.petals,seed:u.seed};y("flower",s.write,x,{...l,uTarget:s.read.texture,mode:1,strength:u.push}),s.swap(),y("flower",d.write,m,{...l,uTarget:d.read.texture,mode:0,strength:1,color:new t.Vector3(...u.color),color2:new t.Vector3(...u.core)}),d.swap()},step(t){let r=s,o=n;y("curl",p,x,{uVelocity:r.read.texture}),y("vorticity",r.write,x,{uVelocity:r.read.texture,uCurl:p.texture,dt:t}),r.swap(),y("divergence",f,x,{uVelocity:r.read.texture}),y("clear",o.write,x,{uTexture:o.read.texture,value:.8}),o.swap();for(let e=0;e<20;e++)y("pressure",o.write,x,{uPressure:o.read.texture,uDivergence:f.texture}),o.swap();y("gradient",r.write,x,{uPressure:o.read.texture,uVelocity:r.read.texture}),r.swap(),y("advection",r.write,x,{uVelocity:r.read.texture,uSource:r.read.texture,dt:t,dissipation:.9}),r.swap(),y("advection",d.write,x,{uVelocity:r.read.texture,uSource:d.read.texture,dt:t,dissipation:.16}),d.swap(),e.setRenderTarget(null)},dispose(){V(),a.geometry.dispose(),Object.values(i).forEach(e=>e.dispose())}}}])}]);