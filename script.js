const quotes = [
  "You are not behind. Not broken. Not too late. Just unfolding, in your own quiet timing. 💖",
  "Take a breath. You're doing better than you think.",
  "Healing isn’t linear. Be gentle with yourself.",
  "Your story is still unfolding in beautiful ways.",
  "You’ve survived 100% of your worst days. That’s strength."
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
