const particles = [];
let shakeAmt=0, shakeX=0, shakeY=0;

let bird, partner, pipes, items, frame, score, gameRunning;
let gameSpeed, lives, invincTimer, state, bgX, bgXMid, effectTimer, animId;
let comboFlash = 0;
let flashCol = '';

function init() {
  bird = { x:200, y:H/2, w:88, h:88, vel:0, state:'normal', angle:0, wobble:0, trail:[] };
  partner = { x:W+500, y:340, w:92, h:92, isCaged:true };
  pipes = [];
  items = [];
  frame=0; score=0; lives=2; invincTimer=0;
  gameSpeed=4.0; bgX=0; bgXMid=0; effectTimer=0;
  state='playing'; gameRunning=true;
  shakeAmt=0; particles.length=0; comboFlash=0;
  whiteOut.style.opacity='0';
  uiEl.style.display='none';
}
