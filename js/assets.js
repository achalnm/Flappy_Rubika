const canvas   = document.getElementById('gameCanvas');
const ctx      = canvas.getContext('2d');
const starCvs  = document.getElementById('starCanvas');
const starCtx  = starCvs.getContext('2d');

const whiteOut  = document.getElementById('white-out');
const bgLayer   = document.getElementById('bg-layer');
const bgFar     = document.getElementById('bg-far');
const uiEl      = document.getElementById('ui');
const uiTitle   = document.getElementById('ui-title');
const uiDesc    = document.getElementById('ui-desc');
const uiBtns    = document.getElementById('ui-btns');
const uiEmoji   = document.getElementById('ui-emoji');
const uiHints   = document.getElementById('ui-hints');

const Img = {};
['normal','happy','sad','food','obstacle','partner'].forEach(k => {
  Img[k] = new Image();
  if (k === 'partner') {
    Img[k].src = 'Pics/ach.png';
  } else if (k === 'food') {
    Img[k].src = 'Pics/food1.png';
  } else if (k === 'obstacle') {
    Img[k].src = 'Pics/obstacle.png';
  } else {
    Img[k].src = `Pics/puj${k}.png`;
  }
});

(function drawStars() {
  starCtx.clearRect(0,0,2400,600);
  for (let i=0;i<320;i++) {
    const x=Math.random()*2400, y=Math.random()*580;
    const r=Math.random()*1.6+0.3;
    const a=Math.random()*0.7+0.2;
    starCtx.fillStyle=`rgba(255,255,255,${a})`;
    starCtx.beginPath(); starCtx.arc(x,y,r,0,Math.PI*2); starCtx.fill();
  }
  for (let i=0;i<5;i++) {
    const gx=Math.random()*2400, gy=Math.random()*400;
    const g=starCtx.createRadialGradient(gx,gy,0,gx,gy,180);
    const cols=['rgba(147,51,234,','rgba(236,72,153,','rgba(99,102,241,','rgba(16,185,129,','rgba(59,130,246,'];
    const col=cols[i%cols.length];
    g.addColorStop(0,col+'0.07)'); g.addColorStop(1,col+'0)');
    starCtx.fillStyle=g;
    starCtx.fillRect(gx-180,gy-180,360,360);
  }
})();

window.Assets = Img;
