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
}`,u=`
precision highp float;
in vec2 vUv, vL, vR, vT, vB;
out vec4 o;
`,l={advection:`${u}
uniform sampler2D uVelocity, uSource;
uniform vec2 texel;
uniform float dt, dissipation;
void main() {
  vec2 coord = vUv - dt * texture(uVelocity, vUv).xy * texel;
  o = vec4(texture(uSource, coord).rgb / (1.0 + dissipation * dt), 1.0);
}`,divergence:`${u}
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
}`,curl:`${u}
uniform sampler2D uVelocity;
void main() {
  float L = texture(uVelocity, vL).y;
  float R = texture(uVelocity, vR).y;
  float T = texture(uVelocity, vT).x;
  float B = texture(uVelocity, vB).x;
  o = vec4(0.5 * (R - L - T + B), 0.0, 0.0, 1.0);
}`,vorticity:`${u}
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
}`,pressure:`${u}
uniform sampler2D uPressure, uDivergence;
void main() {
  float L = texture(uPressure, vL).x;
  float R = texture(uPressure, vR).x;
  float T = texture(uPressure, vT).x;
  float B = texture(uPressure, vB).x;
  float div = texture(uDivergence, vUv).x;
  o = vec4((L + R + B + T - div) * 0.25, 0.0, 0.0, 1.0);
}`,gradient:`${u}
uniform sampler2D uPressure, uVelocity;
void main() {
  float L = texture(uPressure, vL).x;
  float R = texture(uPressure, vR).x;
  float T = texture(uPressure, vT).x;
  float B = texture(uPressure, vB).x;
  vec2 vel = texture(uVelocity, vUv).xy - vec2(R - L, T - B);
  o = vec4(vel, 0.0, 1.0);
}`,clear:`${u}
uniform sampler2D uTexture;
uniform float value;
void main() { o = value * texture(uTexture, vUv); }`,splat:`${u}
uniform sampler2D uTarget;
uniform float aspect, radius;
uniform vec3 color;
uniform vec2 point;
void main() {
  vec2 p = vUv - point;
  p.x *= aspect;
  vec3 s = exp(-dot(p, p) / radius) * color;
  o = vec4(texture(uTarget, vUv).rgb + s, 1.0);
}`};e.s(["PALETTE",0,[[1,.36,.62],[.62,.74,.18],[1,.35,.12],[.12,.7,.64],[.72,.65,1],[.36,.24,.96]],"createFluid",0,function(e){let u=new t.Scene,o=new t.OrthographicCamera(-1,1,1,-1,0,1),i=new t.Mesh(new t.PlaneGeometry(2,2));i.frustumCulled=!1,u.add(i);let a=Object.fromEntries(Object.keys(l).map(e=>[e,new t.RawShaderMaterial({glslVersion:t.GLSL3,vertexShader:r,fragmentShader:l[e],uniforms:{texel:{value:new t.Vector2},uVelocity:{value:null},uSource:{value:null},uCurl:{value:null},uPressure:{value:null},uDivergence:{value:null},uTexture:{value:null},uTarget:{value:null},dt:{value:0},dissipation:{value:0},curl:{value:28},value:{value:.8},aspect:{value:1},radius:{value:.003},color:{value:new t.Vector3},point:{value:new t.Vector2}},depthTest:!1,depthWrite:!1})])),v=(e,r)=>new t.WebGLRenderTarget(e,r,{type:t.HalfFloatType,format:t.RGBAFormat,minFilter:t.LinearFilter,magFilter:t.LinearFilter,wrapS:t.ClampToEdgeWrapping,wrapT:t.ClampToEdgeWrapping,depthBuffer:!1,stencilBuffer:!1}),c=(e,t)=>{let r=v(e,t),u=v(e,t);return{get read(){return r},get write(){return u},swap(){[r,u]=[u,r]}}},s=null,n=null,x=null,d=null,p=null,f=new t.Vector2,m=new t.Vector2,y=1,T="",w=(t,r,l,v)=>{let c=a[t];for(let[e,t]of(c.uniforms.texel.value.copy(l),Object.entries(v)))c.uniforms[e].value=t;i.material=c,e.setRenderTarget(r),e.render(u,o)},g=e=>{let t=Math.round(e*(y<1?1/y:y));return y>=1?[t,e]:[e,t]},V=()=>{for(let e of[s,n,x])e?.read.dispose(),e?.write.dispose();d?.dispose(),p?.dispose()};return{get texture(){return x.read.texture},dyeTexel:m,resize(e,t,r){y=e/t;let[u,l]=g(128),[o,i]=g(r),a=`${u}x${l}:${o}x${i}`;return a!==T&&(V(),T=a,s=c(u,l),n=c(u,l),d=v(u,l),p=v(u,l),x=c(o,i),f.set(1/u,1/l),m.set(1/o,1/i),!0)},splat(e,r,u,l,o,i=.3){let a=i/100*(y>1?y:1);w("splat",s.write,f,{uTarget:s.read.texture,aspect:y,radius:a,point:new t.Vector2(e,r),color:new t.Vector3(u,l,0)}),s.swap(),w("splat",x.write,m,{uTarget:x.read.texture,aspect:y,radius:a,point:new t.Vector2(e,r),color:new t.Vector3(...o)}),x.swap()},step(t){let r=s,u=n;w("curl",p,f,{uVelocity:r.read.texture}),w("vorticity",r.write,f,{uVelocity:r.read.texture,uCurl:p.texture,dt:t}),r.swap(),w("divergence",d,f,{uVelocity:r.read.texture}),w("clear",u.write,f,{uTexture:u.read.texture,value:.8}),u.swap();for(let e=0;e<20;e++)w("pressure",u.write,f,{uPressure:u.read.texture,uDivergence:d.texture}),u.swap();w("gradient",r.write,f,{uPressure:u.read.texture,uVelocity:r.read.texture}),r.swap(),w("advection",r.write,f,{uVelocity:r.read.texture,uSource:r.read.texture,dt:t,dissipation:.35}),r.swap(),w("advection",x.write,f,{uVelocity:r.read.texture,uSource:x.read.texture,dt:t,dissipation:.5}),x.swap(),e.setRenderTarget(null)},dispose(){V(),i.geometry.dispose(),Object.values(a).forEach(e=>e.dispose())}}}])}]);