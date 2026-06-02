function updatePowerupTimer() {
  if(effectTimer>0) {
    effectTimer--;
    if(effectTimer<=0){ bird.state='normal'; gameSpeed=Math.max(1.7,gameSpeed); }
  }
}

function updatePowerups() {
  if(frame%200===100) {
    items.push({x:Math.random()*700+250, y:-80, type:Math.random()>0.5?'food':'obstacle', w:68, h:68, wobble:0});
  }
  for(let i=items.length-1;i>=0;i--) {
    const it=items[i];
    it.y+=1.8; it.x-=gameSpeed*0.4;
    if(bird.x<it.x+it.w&&bird.x+bird.w>it.x&&bird.y<it.y+it.h&&bird.y+bird.h>it.y) {
      if(it.type==='food') {
        bird.state='happy'; gameSpeed=Math.max(1.0,gameSpeed-1.0);
        spawnParticles(it.x+it.w/2,it.y+it.h/2,'rgba(74,222,128,0.9)',14);
      } else {
        bird.state='sad'; gameSpeed=Math.min(4.2,gameSpeed+1.5);
        shake(10);
        spawnParticles(it.x+it.w/2,it.y+it.h/2,'rgba(248,113,113,0.9)',14);
      }
      effectTimer=200; items.splice(i,1); continue;
    }
    if(it.y>H+80||it.x<-100) items.splice(i,1);
  }
}
