class TypeWriter {
  constructor(txtElement, words, wait = 3000) {
    this.txtElement = txtElement;
    this.words = words;
    this.txt = '';
    this.wordIndex = 0;
    this.wait = parseInt(wait, 10);
    this.type();
    this.isDeleting = false;
  }

  type() {
    const current = this.wordIndex % this.words.length;
    const fullTxt = this.words[current];

    if (this.isDeleting) {
      this.txt = fullTxt.substring(0, this.txt.length - 1)
    }
    else {
      this.txt = fullTxt.substring(0, this.txt.length + 1)
    }

    this.txtElement.innerHTML = `<span class='txt'>${this.txt}</span>`;

    let typeSpeed = 300;

    if (this.isDeleting) {
        typeSpeed /= 2;
    }

    if(!this.isDeleting && this.txt === fullTxt) {
      typeSpeed = this.wait;
      this.isDeleting = true;
    }
    else if (this.isDeleting && this.txt === '') {
      this.isDeleting = false;
      this.wordIndex++;
      typeSpeed = 500;
    }

    setTimeout(() => this.type(), typeSpeed)
  }
}

function typewriterInit() {
  const txtElement = document.querySelector('.txt-type');
  const words = JSON.parse(txtElement.getAttribute('data-words'));
  const wait = txtElement.getAttribute('data-wait');
  new TypeWriter(txtElement, words, wait);
}



function changeContent(page) {

  const divHome = document.getElementById('div-home');
  const divCV = document.getElementById('div-cv');
  const divProjects = document.getElementById('div-projects');
  const divContact = document.getElementById('div-contact');
  const divArray = [divHome, divCV, divProjects, divContact];

  divArray.forEach(element => element.setAttribute("class", "passive"));

  divArray.filter(element => element.id === page)
    .map(element => element.setAttribute("class", "active bg-dark text-light lead"));
}



const animateLogo = {

  logo: undefined,
  filterCount: 6,
  filterMax: 6,
  isClearing: true,

  init() {
    this.logo = document.querySelector('.logo');
    this.renderEffect();
    this.animate()
  },

  animate() {
    if (this.isClearing) {
      if (this.filterCount === 0) {
        setTimeout(() => {
          this.isClearing = false;
          this.renderEffect();
          this.animate();
        }, 3000);
      }
      else {
        setTimeout(() => {
          this.clear();
        }, 100);
      }
    }
    if (!this.isClearing) {
      if (this.filterCount === this.filterMax) {
        setTimeout(() => {
          this.isClearing = true;
          this.renderEffect();
          this.animate();
        }, 3000);
      }
      else {
        setTimeout(() => {
          this.blur();
        }, 100);
      }
    }
  },

  clear() {
    this.filterCount -= 0.5;
    this.renderEffect();
    this.animate();
  },

  blur() {
    this.filterCount += 0.5;
    this.renderEffect();
    this.animate();
  },

  renderEffect() {
    return this.logo.style.filter = 'blur(' + this.filterCount + 'px)';
  }
}



const typewriterEffect = {

  typewriter: undefined,
  isShowing: true,

  init() {
    this.typewriter = document.querySelector('.typewriter-effect');
    this.animate()
  },

  animate() {
    if (this.isShowing) {
      setTimeout(() => {
        this.hide();
      }, 500);
    }
    else {
      setTimeout(() => {
        this.display();
      }, 500);
    }
  },

  display() {
    this.typewriter.style.display = 'inline';
    this.isShowing = true;
    this.animate();
  },

  hide() {
    this.typewriter.style.display = 'none';
    this.isShowing = false;
    this.animate();
  }

}



const canvasMobileAnimation = {

  canvas: document.getElementById('canvas'),
  context: canvas.getContext('2d'),
  radius: 0,
  drawingSpeed: 10,

  
  init() {

    this.canvas.width = 80;
    this.canvas.height = 160;
    this.canvas.className = 'bg-dark';
    this.canvas.style.border = '1px solid #fff'
    this.canvas.style.marginTop = '120px';
    this.canvas.style.borderRadius = '20px';
    this.context.strokeStyle = '#fff';
    this.context.fillStyle = '#fff';

    this.radius = this.canvas.height / 25;

    this.animate();

  },

  animate() {

    setTimeout(() => {
      this.drawTopLine();
    }, 1000);

    setTimeout(() => {
      this.drawBottomLine();
    }, 2500);
    
    setTimeout(() => {
      this.drawButton();
    }, 4000);

    setTimeout(() => {
      this.fillTop();
    }, 5000);

    setTimeout(() => {
      this.fillBottom();
    }, 5500);

    setTimeout(() => {
      this.fillButton();
    }, 6000);

    setTimeout(() => {
      this.reset();
    }, 9000);
    
  },

  drawTopLine() {
    let startX = 0;
    const y = this.canvas.height * 0.1;
    const endX = this.canvas.width;
    setInterval(() => {
      this.context.moveTo(startX, y);
      startX += this.drawingSpeed;
      this.context.lineTo(startX, y)
      this.context.stroke();
      if (startX === endX) return;
    }, 80);
  },

  drawBottomLine() {
    let startX = 0;
    const y = this.canvas.height * 0.9;
    const endX = this.canvas.width;
    setInterval(() => {
      this.context.moveTo(startX, y);
      startX += this.drawingSpeed;
      this.context.lineTo(startX, y)
      this.context.stroke();
      if (startX === endX) return;
    }, 80);
  },

  drawButton(strokeColor = this.context.strokeStyle) {
    this.context.beginPath();
    this.context.arc(this.canvas.width / 2, this.canvas.height - this.radius - (this.canvas.height / 100), this.radius, 0, 2*Math.PI);
    this.context.strokeStyle = strokeColor;
    this.context.stroke();
  },

  fillButton() {
    this.context.beginPath();
    this.context.arc(this.canvas.width / 2, this.canvas.height - this.radius - (this.canvas.height / 100), this.radius, 0, 2*Math.PI);
    this.context.fillStyle = 'rgb(52, 58, 64)';
    this.context.fill();
  },

  fillTop() {
    this.context.beginPath();
    this.context.rect(0, 0, this.canvas.width, this.canvas.height * 0.1);
    this.context.fill();
  },

  fillBottom() {
    this.context.beginPath();
    this.context.rect(0, this.canvas.height * 0.9, this.canvas.width, this.canvas.height * 0.9);
    this.context.fill();
  },

  reset() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.drawButton('rgb(52, 58, 64)');
    return canvasMobileAnimation.init();
  }
  
}


document.addEventListener('DOMContentLoaded', typewriterInit);
document.addEventListener('DOMContentLoaded', typewriterEffect.init())
document.addEventListener('DOMContentLoaded', canvasMobileAnimation.init())
document.addEventListener('load', animateLogo.init());