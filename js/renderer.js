function spawnParticles(x, y, col, count=12) {
  for (let i=0;i<count;i++) {
    const angle = Math.random()*Math.PI*2;
    const spd   = 1.5 + Math.random()*4;
    particles.push({
      x, y,
      vx: Math.cos(angle)*spd, vy: Math.sin(angle)*spd - 2,
      life: 1, decay: 0.022 + Math.random()*0.02,
      r: 3 + Math.random()*6,
      col, shape: Math.random()<0.5 ? 'circle' : 'star'
    });
  }
}

function spawnHearts(x,y,count=6) {
  for (let i=0;i<count;i++) {
    particles.push({
      x, y,
      vx: (Math.random()-0.5)*3, vy: -1.5-Math.random()*2,
      life:1, decay:0.015+Math.random()*0.01,
      r:10+Math.random()*8,
      col:'#ec4899', shape:'heart'
    });
  }
}

function updateParticles() {
  for (let i=particles.length-1;i>=0;i--) {
    const p=particles[i];
    p.x+=p.vx; p.y+=p.vy; p.vy+=0.08;
    p.life-=p.decay;
    if(p.life<=0) { particles.splice(i,1); continue; }
    ctx.globalAlpha=p.life;
    ctx.fillStyle=p.col;
    if(p.shape==='circle') {
      ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2); ctx.fill();
    } else if(p.shape==='star') {
      drawStar(ctx,p.x,p.y,4,p.r,p.r*0.4);
    } else if(p.shape==='heart') {
      ctx.font=`${p.r*2}px serif`; ctx.textAlign='center'; ctx.textBaseline='middle';
      ctx.fillText('💙',p.x,p.y);
    }
    ctx.globalAlpha=1;
  }
}

function drawStar(c,cx,cy,spikes,outerR,innerR) {
  let rot=Math.PI/2*3, x=cx, y=cy, step=Math.PI/spikes;
  c.beginPath(); c.moveTo(cx,cy-outerR);
  for(let i=0;i<spikes;i++) {
    x=cx+Math.cos(rot)*outerR; y=cy+Math.sin(rot)*outerR; c.lineTo(x,y); rot+=step;
    x=cx+Math.cos(rot)*innerR; y=cy+Math.sin(rot)*innerR; c.lineTo(x,y); rot+=step;
  }
  c.lineTo(cx,cy-outerR); c.closePath(); c.fill();
}

function drawCastle(x, y) {
  const g=ctx.createLinearGradient(x,y,x,y+420);
  g.addColorStop(0,'#374151'); g.addColorStop(1,'#1f2937');
  ctx.fillStyle=g;
  const battW=50, battH=55, battCount=6;
  for(let i=0;i<battCount;i++) {
    if(i%2===0) { ctx.fillRect(x-15+i*battW, y-battH+8, battW, battH); }
  }
  ctx.fillRect(x-15,y,300+30,420);
  ctx.fillStyle='#4b5563';
  ctx.fillRect(x-50,y-30,60,460); ctx.fillRect(x+260,y-30,60,460);
  ['#4b5563','#374151'].forEach((c,ti)=>{
    const tx=ti===0?x-50:x+260;
    for(let i=0;i<4;i++) { if(i%2===0){ ctx.fillStyle=c; ctx.fillRect(tx+i*16,y-54,14,28); } }
  });
  ctx.fillStyle='rgba(250,200,80,0.9)';
  [[40,100],[200,100],[40,230],[200,230]].forEach(([ox,oy])=>{
    ctx.beginPath(); ctx.arc(x+ox+20,y+oy,16,Math.PI,0,false); ctx.fillRect(x+ox,y+oy,40,35); ctx.fill();
    const wg=ctx.createRadialGradient(x+ox+20,y+oy+10,0,x+ox+20,y+oy+10,40);
    wg.addColorStop(0,'rgba(250,200,80,0.25)'); wg.addColorStop(1,'rgba(250,200,80,0)');
    ctx.fillStyle=wg; ctx.fillRect(x+ox-20,y+oy-20,80,80);
  });
  ctx.fillStyle='#1f2937';
  ctx.beginPath(); ctx.arc(x+130,y+300,35,Math.PI,0,false); ctx.fillRect(x+95,y+300,70,120); ctx.fill();
  ctx.strokeStyle='#6b7280'; ctx.lineWidth=3;
  ctx.beginPath(); ctx.moveTo(x+140,y-60); ctx.lineTo(x+140,y-10); ctx.stroke();
  ctx.fillStyle='#ec4899';
  ctx.beginPath(); ctx.moveTo(x+140,y-60); ctx.lineTo(x+170,y-48); ctx.lineTo(x+140,y-36); ctx.fill();
}

function drawPipe(p, idx) {
  const th   = PIPE_THEMES[idx % PIPE_THEMES.length];
  const botY = p.top + p.gap;
  const botH = H - botY;
  const pw   = 100, capW=120, capH=24, capOff=10;

  ctx.shadowColor=th.glow; ctx.shadowBlur=20;

  function pillar(x,y,w,h) {
    if(h<=0){ctx.shadowBlur=0;return;}
    const g=ctx.createLinearGradient(x,0,x+w,0);
    g.addColorStop(0,th.shadow); g.addColorStop(0.3,th.body);
    g.addColorStop(0.65,'rgba(255,255,255,0.12)'); g.addColorStop(1,th.shadow);
    ctx.fillStyle=g; ctx.fillRect(x,y,w,h);
    ctx.fillStyle='rgba(255,255,255,0.08)'; ctx.fillRect(x+8,y,10,h);
    ctx.fillStyle='rgba(0,0,0,0.25)'; ctx.fillRect(x+w-10,y,10,h);
  }
  function cap(x,y,w,h,radii) {
    const g=ctx.createLinearGradient(x,0,x+w,0);
    g.addColorStop(0,th.shadow); g.addColorStop(0.4,th.cap);
    g.addColorStop(1,th.shadow);
    ctx.fillStyle=g;
    ctx.beginPath(); ctx.roundRect(x,y,w,h,radii); ctx.fill();
  }

  const px = p.x;
  pillar(px,0,pw, p.top-capH);
  cap(px-capOff, p.top-capH, capW, capH, [0,0,8,8]);
  cap(px-capOff, botY, capW, capH, [8,8,0,0]);
  pillar(px, botY+capH, pw, botH-capH);

  ctx.shadowBlur=0;

  if(!p.passed) {
    ctx.fillStyle='rgba(0,0,0,0.55)';
    ctx.beginPath(); ctx.roundRect(px+pw/2-18, p.top+p.gap/2-14, 36,28,8); ctx.fill();
    ctx.fillStyle='#fff'; ctx.font='bold 16px Quicksand'; ctx.textAlign='center';
    ctx.fillText(idx+1, px+pw/2, p.top+p.gap/2+6);
  }
}

function drawHUD() {
  ctx.fillStyle='rgba(0,0,0,0.55)';
  ctx.beginPath(); ctx.roundRect(W/2-80,18,160,54,30); ctx.fill();
  ctx.fillStyle='#fff'; ctx.font='bold 30px "Baloo 2"'; ctx.textAlign='center';
  ctx.fillText(`${score} / 15`, W/2, 56);

  ctx.fillStyle='rgba(0,0,0,0.5)';
  ctx.beginPath(); ctx.roundRect(24,18,lives===2?110:70,50,25); ctx.fill();
  ctx.font='28px serif'; ctx.textAlign='left';
  let hx=36;
  for(let i=0;i<lives;i++){ctx.fillText('💙',hx,56); hx+=40;}

  const spPct = Math.min(1,(gameSpeed-2.5)/(3.5-2.5));
  ctx.fillStyle='rgba(0,0,0,0.5)';
  ctx.beginPath(); ctx.roundRect(W-180,18,156,50,25); ctx.fill();
  ctx.font='14px Quicksand'; ctx.fillStyle='rgba(255,255,255,0.6)'; ctx.textAlign='left';
  ctx.fillText('SPEED',W-168,39);
  ctx.fillStyle='rgba(255,255,255,0.15)';
  ctx.fillRect(W-168,44,130,8);
  const speedCol=spPct<0.4?'#4ade80':spPct<0.7?'#facc15':'#f87171';
  ctx.fillStyle=speedCol; ctx.fillRect(W-168,44,130*spPct,8);

  if(effectTimer>0) {
    const alpha=Math.min(1,effectTimer/30);
    ctx.globalAlpha=alpha;
    const isFood=bird.state==='happy';
    ctx.fillStyle=isFood?'rgba(22,101,52,0.8)':'rgba(127,29,29,0.8)';
    ctx.beginPath(); ctx.roundRect(W/2-140,82,280,42,22); ctx.fill();
    ctx.fillStyle='#fff'; ctx.font='bold 19px Quicksand'; ctx.textAlign='center';
    ctx.fillText(isFood?'FOOOD! Game EZZZ':'EWWW BATH! RUNNN', W/2, 110);
    ctx.globalAlpha=1;
  }

  if(comboFlash>0) {
    ctx.globalAlpha=comboFlash/20;
    ctx.fillStyle=flashCol;
    ctx.fillRect(0,0,W,H);
    ctx.globalAlpha=1;
    comboFlash--;
  }
}

function drawItem(it) {
  it.wobble=(it.wobble||0)+0.08;
  const yo=Math.sin(it.wobble)*5;
  const col=it.type==='food'?'rgba(74,222,128,0.5)':'rgba(248,113,113,0.5)';
  ctx.shadowColor=col; ctx.shadowBlur=22;
  const img=it.type==='food'?Img.food:Img.obstacle;
  if(img.complete&&img.naturalWidth>0) ctx.drawImage(img,it.x,it.y+yo,it.w,it.h);
  else {
    ctx.fillStyle=it.type==='food'?'#4ade80':'#f87171';
    ctx.beginPath(); ctx.arc(it.x+it.w/2,it.y+yo+it.h/2,it.w/2,0,Math.PI*2); ctx.fill();
  }
  ctx.shadowBlur=0;
}

function updateTrail() {
  bird.trail.push({x: bird.x + bird.w/2, y: bird.y + bird.h/2});
  if(bird.trail.length > 12) bird.trail.shift();
  bird.trail.forEach((pt, i) => {
    const a = (i / bird.trail.length) * 0.35;
    let rgb = '147, 197, 253';
    if (bird.state === 'happy') rgb = '74, 222, 128';
    if (bird.state === 'sad')   rgb = '248, 113, 113';
    ctx.fillStyle = `rgba(${rgb}, ${a})`;
    const r = 8 * (i / bird.trail.length);
    ctx.beginPath();
    ctx.arc(pt.x, pt.y, r, 0, Math.PI * 2);
    ctx.fill();
  });
}

function drawBird() {
  const targetAngle=Math.max(-0.45,Math.min(1.2,bird.vel*0.06));
  bird.angle+=(targetAngle-bird.angle)*0.2;
  if(bird.wobble>0){bird.angle+=Math.sin(frame*0.6)*(bird.wobble*0.04); bird.wobble*=0.88;}

  const blink = invincTimer>0 && Math.floor(frame/5)%2===0;
  if(blink) return;

  ctx.save();
  ctx.translate(bird.x+bird.w/2, bird.y+bird.h/2);
  ctx.rotate(bird.angle);

  const glowCol=bird.state==='happy'?'rgba(74,222,128,0.6)':bird.state==='sad'?'rgba(248,113,113,0.6)':'rgba(147,197,253,0.5)';
  ctx.shadowColor=glowCol; ctx.shadowBlur=28;

  const img=Img[bird.state]||Img.normal;
  if(img.complete&&img.naturalWidth>0) ctx.drawImage(img,-bird.w/2,-bird.h/2,bird.w,bird.h);
  else {
    ctx.fillStyle='#facc15'; ctx.beginPath(); ctx.arc(0,0,bird.w/2,0,Math.PI*2); ctx.fill();
  }
  ctx.shadowBlur=0;
  ctx.restore();
}

function draw() {
  ctx.save();
  ctx.translate(shakeX, shakeY);
  ctx.clearRect(-10,-10,W+20,H+20);

  const gg=ctx.createLinearGradient(0,H-40,0,H);
  gg.addColorStop(0,'#1a3a1a'); gg.addColorStop(1,'#0a1a0a');
  ctx.fillStyle=gg; ctx.fillRect(0,H-40,W,40);
  ctx.fillStyle='rgba(74,222,128,0.2)'; ctx.fillRect(0,H-42,W,3);

  if(state==='ending') drawCastle(partner.x-90, 350);

  pipes.forEach((p,i)=>drawPipe(p,i+score));

  items.forEach(drawItem);

  updateTrail();

  if(state==='ending') {
    if(partner.isCaged) {
      ctx.strokeStyle='#94a3b8'; ctx.lineWidth=3;
      ctx.strokeRect(partner.x-4, partner.y-4, partner.w+8, partner.h+8);
      for(let i=0;i<=partner.w;i+=18) {
        ctx.beginPath(); ctx.moveTo(partner.x+i,partner.y-4);
        ctx.lineTo(partner.x+i,partner.y+partner.h+4); ctx.stroke();
      }
    }
    const pImg=Img.partner;
    if(pImg.complete&&pImg.naturalWidth>0) ctx.drawImage(pImg,partner.x,partner.y,partner.w,partner.h);
    else {
      ctx.fillStyle='#f9ca24'; ctx.beginPath(); ctx.arc(partner.x+partner.w/2,partner.y+partner.h/2,partner.w/2,0,Math.PI*2); ctx.fill();
    }
    if(!partner.isCaged) {
      ctx.font='48px serif'; ctx.textAlign='center';
      ctx.fillText('❤️',(bird.x+partner.x+partner.w)/2+10, bird.y-24);
    }
  }

  updateParticles();

  drawBird();

  if(state==='playing') drawHUD();

  if(state==='ending' && !gameRunning) {
    ctx.fillStyle='rgba(0,0,0,0.4)';
    ctx.fillRect(0,0,W,H);
  }

  ctx.restore();
}
