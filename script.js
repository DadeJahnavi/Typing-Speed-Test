const quotes = [
  "You are not behind. Not broken. Not too late. You are simply growing at your own rhythm, like a flower blooming at its perfect pace. There is no deadline on your healing, no rush to find all the answers. Take your time. You are allowed to unfold slowly.",
  
  "Some days will feel like progress, and some days will feel like standing still — but both are part of the journey. You do not need to be constantly achieving to be worthy of kindness. Even your quietest effort matters. You’re doing better than you realize.",
  
  "Let today be gentle. Let yourself breathe without guilt. Your peace doesn’t have to be earned. It belongs to you simply because you exist. There is nothing weak about needing rest. In fact, choosing rest is often the bravest thing you can do.",
  
  "Even if no one else sees how hard you're trying, your effort still counts. Quiet persistence is powerful. The way you keep showing up — for yourself, for others, for your dreams — even when it’s hard, that is what makes you extraordinary.",
  
  "You don’t have to explain your softness, your sensitivity, or your slowness. They are not flaws to hide, but gifts to honor. You were never meant to be like everyone else. Your presence, exactly as it is, brings something beautiful into this world.",
  
  "Healing doesn’t always look like forward motion. Sometimes it’s about sitting still, letting the storm pass, and choosing not to give up on yourself. You are allowed to rest. You are allowed to begin again. You are allowed to take up space while you heal.",
  
  "There is no gold star for burning out. You do not have to constantly prove your worth through productivity. You were always enough — not because of what you do, but simply because you are here. That’s all it takes to be worthy of care.",
  
  "Your story isn’t over. It’s still unfolding in ways you can’t yet imagine. Even now, in moments of doubt or fatigue, your soul is quietly growing. You are becoming something beautiful — not despite your struggles, but because of how you move through them."
];


const quoteEl = document.getElementById('quote');
const inputEl = document.getElementById('input');
const wpmEl = document.getElementById('wpm');
const accEl = document.getElementById('accuracy');
const charEl = document.getElementById('chars');
const progressEl = document.getElementById('progress');
const toggleEl = document.getElementById('modeToggle');
const resetBtn = document.getElementById('resetBtn');
const changeBtn = document.getElementById('changeBtn');

let quote = '';
let startTime = null;
let interval = null;

function setQuote() {
  quote = quotes[Math.floor(Math.random() * quotes.length)];
  quoteEl.innerText = quote;
}

function startTimer() {
  if (startTime || inputEl.disabled) return;
  startTime = new Date();
  interval = setInterval(updateStats, 100);
}

function updateStats() {
  const typed = inputEl.value;
  let correct = 0;

  for (let i = 0; i < typed.length; i++) {
    if (typed[i] === quote[i]) correct++;
  }

  const accuracy = typed.length === 0 ? 100 : Math.floor((correct / typed.length) * 100);
  const now = new Date();
  const timeElapsed = (now - startTime) / 1000 / 60;
  const words = typed.trim().length === 0 ? 0 : typed.trim().split(/\s+/).length;
  const wpm = timeElapsed > 0 ? Math.round(words / timeElapsed) : 0;

  wpmEl.innerText = wpm;
  accEl.innerText = accuracy + '%';
  charEl.innerText = typed.length;

  inputEl.classList.toggle('error', typed !== quote.substring(0, typed.length));

  const progress = Math.min((typed.length / quote.length) * 100, 100);
  progressEl.style.width = progress + '%';

  // ✅ Auto reset if complete
  if (typed === quote) {
    clearInterval(interval);
    interval = null;
    inputEl.disabled = true;

    setTimeout(() => {
      resetTest(true); // true = change quote
    }, 2000);
  }
}

function resetTest(changeQuote = false) {
  clearInterval(interval);
  interval = null;
  startTime = null;
  inputEl.value = '';
  inputEl.disabled = false;
  wpmEl.innerText = '0';
  accEl.innerText = '100%';
  charEl.innerText = '0';
  progressEl.style.width = '0%';
  inputEl.classList.remove('error');
  if (changeQuote) setQuote(); // only change quote if requested
}

inputEl.addEventListener('input', () => {
  startTimer();
  updateStats();
});

toggleEl.addEventListener('change', () => {
  document.body.classList.toggle('dark');
});

resetBtn.addEventListener('click', () => resetTest(false));
changeBtn.addEventListener('click', () => {
  setQuote();
  resetTest(true);
});

window.onload = () => {
  setQuote();
};
