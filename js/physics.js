function shake(amt) { shakeAmt=amt; }

function updateShake() {
  if(shakeAmt>0.5) {
    shakeX=(Math.random()-0.5)*shakeAmt;
    shakeY=(Math.random()-0.5)*shakeAmt;
    shakeAmt*=0.82;
  } else { shakeX=0; shakeY=0; shakeAmt=0; }
}

function handleCollision() {
  if(invincTimer>0 || state!=='playing') return;
  lives--;
  bird.state='sad';
  shake(14);
  spawnParticles(bird.x+bird.w/2, bird.y+bird.h/2, '#ff5252', 18);
  if(lives<=0) {
    gameRunning=false;
    showMenu('💀','FAILED!','"HOW DARES YOU NOT REACHES ZHE END!"',
      `<button onclick="startGame()">RUBY NEVER GIVES UP!</button>`
    );
  } else {
    invincTimer=120;
  }
}

function scrollBg() {
  bgX-=gameSpeed*0.55;
  bgXMid-=gameSpeed*0.3;
  if(bgX<=-1200) bgX=0;
  bgLayer.style.transform=`translateX(${bgX}px)`;
  starCvs.style.transform=`translateX(${bgXMid*0.4}px)`;
}
