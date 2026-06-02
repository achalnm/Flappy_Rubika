function startGame() {
  if(animId) cancelAnimationFrame(animId);
  init(); animate();
}

function closeGame() {
  uiEmoji.textContent='📞';
  uiTitle.innerText='Call Ruby!';
  uiDesc.innerHTML='(If you dont have her number, then... then idk, thanks for  playing ig)';
  uiBtns.innerHTML='';
  uiHints.innerHTML='';
}

function showMenu(emoji,title,desc,btns,hints='') {
  uiEmoji.textContent=emoji;
  uiTitle.innerText=title;
  uiDesc.innerHTML=desc;
  uiBtns.innerHTML=btns;
  uiHints.innerHTML=hints;
  uiEl.style.display='flex';
}

function update() {
  if(!gameRunning) return;
  scrollBg();
  updateShake();

  if(state==='playing') {
    bird.vel+=0.17;
    bird.y+=bird.vel;
    if(invincTimer>0) invincTimer--;
    updatePowerupTimer();

    if(bird.y+bird.h>H || bird.y<0) handleCollision();

    const totalPipesEver = pipes.length + score;
    if(totalPipesEver < 15 && frame % 260 === 90) {
      const top = Math.random() * 400 + 70;
      pipes.push({
        x: W + 10,
        top: top,
        gap: 230,
        passed: false
      });
    }

    updatePowerups();

    for(let i=pipes.length-1;i>=0;i--) {
      pipes[i].x-=gameSpeed;
      const p=pipes[i], bx2=bird.x, by2=bird.y, bw=bird.w, bh=bird.h;
      const s=10;
      const botY=p.top+p.gap;
      if(bx2+s<p.x+100&&bx2+bw-s>p.x&&by2+s<p.top) handleCollision();
      if(bx2+s<p.x+100&&bx2+bw-s>p.x&&by2+bh-s>botY) handleCollision();

      if(p.x+100<bird.x&&!p.passed) {
        p.passed=true;
        awardScore(p.x);
      }
      if(p.x<-120) pipes.splice(i,1);
    }

    if(score>=15 && pipes.length===0) {
      state='whiteout'; items=[];
      whiteOut.style.opacity='1';
      setTimeout(()=>{ state='ending'; whiteOut.style.opacity='0'; },1000);
    }

  } else if(state==='ending') {
    if(partner.x>760) partner.x-=2.5;
    bird.x+=(520-bird.x)*0.04;
    bird.y+=(320-bird.y)*0.04;
    bird.state='happy'; bird.vel=0;

    if(partner.x<=765) {
      partner.isCaged=false;
      const ft=Math.sin(frame*0.06)*18;
      bird.y=320+ft;
      partner.y=bird.y;
      partner.x=bird.x+110;

      if(frame%30===0) spawnHearts(bird.x+bird.w/2+55, bird.y-10, 3);

      if(frame%900===0 && gameRunning) {
        gameRunning=false;
        showMenu(
          '💙','HEHE!',
          '"RUBY ISSA HAPPY💙"',
          `<button onclick="startGame()">Rescue Pujesh Again </button>
           <button class="alt" onclick="closeGame()">Stop playing and give Ruby more treats</button>`,
          ''
        );
      }
    }
  }
  frame++;
}

function animate() {
  update();
  draw();
  animId=requestAnimationFrame(animate);
}
