"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[828],{2828:(e,t,r)=>{r.r(t),r.d(t,{PALETTE:()=>i,createFluid:()=>v});var u=r(4332);let o=`
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
}`,l=`
precision highp float;
in vec2 vUv, vL, vR, vT, vB;
out vec4 o;
`,a={advection:`${l}
uniform sampler2D uVelocity, uSource;
uniform vec2 texel;
uniform float dt, dissipation;
void main() {
  vec2 coord = vUv - dt * texture(uVelocity, vUv).xy * texel;
  o = vec4(texture(uSource, coord).rgb / (1.0 + dissipation * dt), 1.0);
}`,divergence:`${l}
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
}`,curl:`${l}
uniform sampler2D uVelocity;
void main() {
  float L = texture(uVelocity, vL).y;
  float R = texture(uVelocity, vR).y;
  float T = texture(uVelocity, vT).x;
  float B = texture(uVelocity, vB).x;
  o = vec4(0.5 * (R - L - T + B), 0.0, 0.0, 1.0);
}`,vorticity:`${l}
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
}`,pressure:`${l}
uniform sampler2D uPressure, uDivergence;
void main() {
  float L = texture(uPressure, vL).x;
  float R = texture(uPressure, vR).x;
  float T = texture(uPressure, vT).x;
  float B = texture(uPressure, vB).x;
  float div = texture(uDivergence, vUv).x;
  o = vec4((L + R + B + T - div) * 0.25, 0.0, 0.0, 1.0);
}`,gradient:`${l}
uniform sampler2D uPressure, uVelocity;
void main() {
  float L = texture(uPressure, vL).x;
  float R = texture(uPressure, vR).x;
  float T = texture(uPressure, vT).x;
  float B = texture(uPressure, vB).x;
  vec2 vel = texture(uVelocity, vUv).xy - vec2(R - L, T - B);
  o = vec4(vel, 0.0, 1.0);
}`,clear:`${l}
uniform sampler2D uTexture;
uniform float value;
void main() { o = value * texture(uTexture, vUv); }`,splat:`${l}
uniform sampler2D uTarget;
uniform float aspect, radius;
uniform vec3 color;
uniform vec2 point;
void main() {
  vec2 p = vUv - point;
  p.x *= aspect;
  vec3 s = exp(-dot(p, p) / radius) * color;
  o = vec4(texture(uTarget, vUv).rgb + s, 1.0);
}`,flower:`${l}
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
}`},i=[[1,.36,.62],[.62,.74,.18],[1,.35,.12],[.12,.7,.64],[.72,.65,1],[.36,.24,.96],[1,.72,.45],[1,.55,.08]];function v(e){let t=new u.Z58,r=new u.qUd(-1,1,1,-1,0,1),l=new u.eaF(new u.bdM(2,2));l.frustumCulled=!1,t.add(l);let i=Object.fromEntries(Object.keys(a).map(e=>[e,new u.D$Q({glslVersion:u.Wdf,vertexShader:o,fragmentShader:a[e],uniforms:{texel:{value:new u.I9Y},uVelocity:{value:null},uSource:{value:null},uCurl:{value:null},uPressure:{value:null},uDivergence:{value:null},uTexture:{value:null},uTarget:{value:null},dt:{value:0},dissipation:{value:0},curl:{value:6},value:{value:.8},aspect:{value:1},radius:{value:.003},color:{value:new u.Pq0},color2:{value:new u.Pq0},rot:{value:0},petals:{value:6},seed:{value:0},mode:{value:0},strength:{value:1},point:{value:new u.I9Y}},depthTest:!1,depthWrite:!1})])),v=(e,t)=>new u.nWS(e,t,{type:u.ix0,format:u.GWd,minFilter:u.k6q,magFilter:u.k6q,wrapS:u.ghU,wrapT:u.ghU,depthBuffer:!1,stencilBuffer:!1}),s=(e,t)=>{let r=v(e,t),u=v(e,t);return{get read(){return r},get write(){return u},swap(){[r,u]=[u,r]}}},c=null,n=null,f=null,d=null,x=null,p=new u.I9Y,m=new u.I9Y,w=1,y="",g=(u,o,a,v)=>{let s=i[u];for(let[e,t]of(s.uniforms.texel.value.copy(a),Object.entries(v)))s.uniforms[e].value=t;l.material=s,e.setRenderTarget(o),e.render(t,r)},T=e=>{let t=Math.round(e*(w<1?1/w:w));return w>=1?[t,e]:[e,t]},h=()=>{for(let e of[c,n,f])e?.read.dispose(),e?.write.dispose();d?.dispose(),x?.dispose()};return{get texture(){return f.read.texture},dyeTexel:m,resize(e,t,r){w=e/t;let[u,o]=T(128),[l,a]=T(r),i=`${u}x${o}:${l}x${a}`;return i!==y&&(h(),y=i,c=s(u,o),n=s(u,o),d=v(u,o),x=v(u,o),f=s(l,a),p.set(1/u,1/o),m.set(1/l,1/a),!0)},splat(e,t,r,o,l,a=.3){let i=a/100*(w>1?w:1);g("splat",c.write,p,{uTarget:c.read.texture,aspect:w,radius:i,point:new u.I9Y(e,t),color:new u.Pq0(r,o,0)}),c.swap(),g("splat",f.write,m,{uTarget:f.read.texture,aspect:w,radius:i,point:new u.I9Y(e,t),color:new u.Pq0(...l)}),f.swap()},flower(e,t,r,o){let l={uTarget:null,aspect:w,radius:r,point:new u.I9Y(e,t),rot:o.rot,petals:o.petals,seed:o.seed};g("flower",c.write,p,{...l,uTarget:c.read.texture,mode:1,strength:o.push}),c.swap(),g("flower",f.write,m,{...l,uTarget:f.read.texture,mode:0,strength:1,color:new u.Pq0(...o.color),color2:new u.Pq0(...o.core)}),f.swap()},step(t){let r=c,u=n;g("curl",x,p,{uVelocity:r.read.texture}),g("vorticity",r.write,p,{uVelocity:r.read.texture,uCurl:x.texture,dt:t}),r.swap(),g("divergence",d,p,{uVelocity:r.read.texture}),g("clear",u.write,p,{uTexture:u.read.texture,value:.8}),u.swap();for(let e=0;e<20;e++)g("pressure",u.write,p,{uPressure:u.read.texture,uDivergence:d.texture}),u.swap();g("gradient",r.write,p,{uPressure:u.read.texture,uVelocity:r.read.texture}),r.swap(),g("advection",r.write,p,{uVelocity:r.read.texture,uSource:r.read.texture,dt:t,dissipation:.9}),r.swap(),g("advection",f.write,p,{uVelocity:r.read.texture,uSource:f.read.texture,dt:t,dissipation:.16}),f.swap(),e.setRenderTarget(null)},dispose(){h(),l.geometry.dispose(),Object.values(i).forEach(e=>e.dispose())}}}}}]);