// Enhanced Space Invaders with 100 Levels, Purchasable Upgrades, per-level HP for invaders,
// and per-level points-per-kill that increase by 5 each level.
// Controls: Left/Right or A/D, Space to shoot, 1 = Shield, 2 = Slow, R to restart

(() => {
  const canvas = document.getElementById('game');
  const ctx = canvas.getContext('2d');
  const scoreEl = document.getElementById('score');
  const livesEl = document.getElementById('lives');
  const stateEl = document.getElementById('state');
  const levelEl = document.getElementById('level');
  const upgradesEl = document.getElementById('upgrades');

  const W = canvas.width;
  const H = canvas.height;

  let keys = {};
  addEventListener('keydown', e => {
    keys[e.code] = true;
    if (e.code === 'Space') e.preventDefault();
  });
  addEventListener('keyup', e => { keys[e.code] = false; });

  // Game state
  let game = null;

  function resetGame() {
    game = {
      score: 0,
      lives: 3,
      state: 'playing', // 'playing' | 'won' | 'over'
      player: new Player(W / 2, H - 60),
      bullets: [],
      invaderBullets: [],
      invaders: [],
      invaderDirection: 1,

      // Leveling
      level: 1,
      maxLevel: 100,

      // Base parameters (used to compute per-level speeds)
      baseInvaderStepInterval: 600, // ms baseline
      invaderStepInterval: 600,
      baseInvaderBulletSpeed: 180,
      invaderBulletSpeed: 180,
      invaderMoveStep: 18, // pixels per step baseline
      invaderShootProbabilityBase: 0.35,
      invaderShootProbability: 0.35,

      // HP per invader (computed in applyLevelScaling)
      hpPerInv
