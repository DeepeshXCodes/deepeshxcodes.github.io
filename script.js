// matrix_animation.js

const canvas = document.getElementById('matrixBg');
const ctx = canvas.getContext('2d');
const dpi = window.devicePixelRatio || 1; 

canvas.width = window.innerWidth * dpi; 
canvas.height = window.innerHeight * dpi; 

ctx.scale(dpi, dpi);

let gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
gradient.addColorStop(0, 'rgba(255, 119, 0, 0.6)');   // Start color with 90% opacity (top left)
gradient.addColorStop(1, 'rgba(0, 255, 165, 0.6)');




class Symbol {
  constructor(x, y, fontSize, canvasHeight) {
    this.characters = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    this.x = x;
    this.y = y;
    this.fontSize = fontSize;
    this.text = '';
    this.canvasHeight = canvasHeight;
  }

  draw(context) {
    this.text = this.characters.charAt(Math.floor(Math.random() * this.characters.length));
    context.fillText(this.text, this.x * this.fontSize, this.y * this.fontSize);
    if (this.y * this.fontSize > this.canvasHeight && Math.random() > 0.98) {
      this.y = 0;
    } else {
      this.y += 1;
    }
  }
}

class Effect {
  constructor(canvasWidth, canvasHeight) {
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.fontSize = 10;
    this.columns = this.canvasWidth / this.fontSize;
    this.symbols = [];
    this.initialize();
  }

  initialize() {
    for (let i = 0; i < this.columns; i++) {
      this.symbols[i] = new Symbol(i, 0, this.fontSize, this.canvasHeight);
    }
  }

  resize(width, height) {
    this.canvasWidth = width;
    this.canvasHeight = height;
    this.columns = this.canvasWidth / this.fontSize;
    this.symbols = [];
    this.initialize();
  }
}

const effect = new Effect(canvas.width, canvas.height);
let lastTime = 0;
const fps = 60;
const nextFrame = 1000 / fps;
let timer = 0;

function animate(timeStamp) {
  const deltaTime = timeStamp - lastTime;
  lastTime = timeStamp;
  if (timer > nextFrame) {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
    ctx.textAlign = 'center';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = gradient;
    ctx.font = effect.fontSize + 'px monospace';
    effect.symbols.forEach(symbol => symbol.draw(ctx));
    timer = 0;
  } else {
    timer += deltaTime;
  }

  requestAnimationFrame(animate);
}

animate(0);

// text entry.js
// Get all elements with the class "talkgpt"
const textElements = document.querySelectorAll(".talkgpt");

// Iterate over each element and apply the animation
textElements.forEach(textElement => {
  const textContent = textElement.innerText;
  textElement.innerText = ""; // Clear the initial text content

  let charIndex = 0;

  function animateText() {
    if (charIndex < textContent.length) {
      textElement.innerText += textContent.charAt(charIndex);
      charIndex++;
      setTimeout(animateText, 10); // Adjust the delay to control the animation speed
    }
  }

  animateText();
});
// Start the animation when the page loads


const typingText = document.querySelector("h4 span");
const words = ["Professional Discord Bot Developer...", "a Skilled JavaScript Coder...", "Developing Unofficial Instagram Bot..."];

let wordI = 0;
let charI = 0;
let isBackspace = false;

const typeEffect = () => {
  
  const currentWord = words[wordI];
  
 const currentChar = currentWord.substring(0, charI);

  typingText.textContent = currentChar;
  typingText.classList.add("stop-blink")

  if(!isBackspace && charI < currentWord.length) {
    charI++;
    setTimeout(typeEffect, 90);
  } else if(isBackspace && charI > 0) {
    charI--
     setTimeout(typeEffect, 45);
  } else {
    isBackspace = !isBackspace;
    typingText.classList.remove("stop-blink")
    wordI = !isBackspace ? (wordI + 1) % words.length : wordI;
    setTimeout(typeEffect, 1000);
  }
  
}

typeEffect();
