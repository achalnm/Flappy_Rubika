window.addEventListener('keydown', e => {
  if(e.code==='Space') {
    e.preventDefault();
    if(gameRunning && state==='playing') {
      bird.vel=-5.2;
      bird.wobble=18;
      spawnParticles(bird.x+10, bird.y+bird.h/2, 'rgba(255,255,255,0.5)', 4);
    }
  }
});
document.getElementById('gameCanvas').addEventListener('mousedown', () => {
  if(gameRunning && state==='playing') {
    bird.vel=-5.2; bird.wobble=18;
    spawnParticles(bird.x+10, bird.y+bird.h/2, 'rgba(255,255,255,0.5)', 4);
  }
});
