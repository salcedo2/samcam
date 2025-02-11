const backgrounds = [
    'images/F3.jpg',
    'images/F6.jpg',
    'images/F2.jpg',
    // Puedes agregar más imágenes si lo deseas
  ];
  
  const effects = [
    'fade',
    'slide-left',
    'slide-right',
    'zoom',
    'rotate'
  ];
  
  let currentIndex = 0;
  const slideDuration = 5000; // Duración de cada imagen (5 segundos)
  const transitionDuration = 1000; // Duración de la transición (1 segundo)
  
  // Referencias a los divs del slider
  const bg1 = document.getElementById('bg1');
  const bg2 = document.getElementById('bg2');
  
  function setInitialBackground() {
    bg1.style.backgroundImage = `url('${backgrounds[currentIndex]}')`;
  }
  
  function changeBackground() {
    const nextIndex = (currentIndex + 1) % backgrounds.length;
    const effect = effects[Math.floor(Math.random() * effects.length)];
    
    // Establece la siguiente imagen en bg2
    bg2.style.backgroundImage = `url('${backgrounds[nextIndex]}')`;
    
    // Resetea estilos
    bg2.style.transition = 'none';
    bg2.style.opacity = 0;
    bg2.style.transform = '';
    
    // Aplica el estado inicial según el efecto seleccionado
    switch(effect) {
      case 'fade':
        bg2.style.opacity = 0;
        break;
      case 'slide-left':
        bg2.style.transform = 'translateX(-100%)';
        break;
      case 'slide-right':
        bg2.style.transform = 'translateX(100%)';
        break;
      case 'zoom':
        bg2.style.transform = 'scale(1.2)';
        break;
      case 'rotate':
        bg2.style.transform = 'rotate(20deg)';
        break;
      default:
        break;
    }
    
    // Forzar reflow para que se apliquen los estilos iniciales
    void bg2.offsetWidth;
    
    // Establece las propiedades de transición
    bg2.style.transition = `all ${transitionDuration}ms ease`;
    
    // Anima a la imagen hasta el estado final
    bg2.style.opacity = 1;
    bg2.style.transform = 'none';
    
    // Después de la transición, actualiza bg1 y el índice actual
    setTimeout(() => {
      bg1.style.backgroundImage = bg2.style.backgroundImage;
      bg2.style.transition = 'none';
      bg2.style.opacity = 0;
      bg2.style.transform = '';
      currentIndex = nextIndex;
    }, transitionDuration);
  }
  
  setInitialBackground();
  setInterval(changeBackground, slideDuration);
  