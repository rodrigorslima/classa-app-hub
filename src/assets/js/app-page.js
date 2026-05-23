// ClassA Apps - Script do Cliente Premium
document.addEventListener('DOMContentLoaded', () => {
  console.log('ClassA Engine: Iniciada.');

  // 1. Efeito Spotlight de Luz nos Cards (Vercel Style)
  const spotlightCards = document.querySelectorAll('.spotlight-card, .feature-item, .portal-app-item');
  spotlightCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });

  // 2. Efeito Tilt 3D no Mockup do Celular (Hero)
  const phone = document.querySelector('.phone-mockup');
  if (phone) {
    const wrapper = phone.closest('.hero-mockup-wrapper');
    if (wrapper) {
      wrapper.addEventListener('mousemove', (e) => {
        const rect = phone.getBoundingClientRect();
        // Centro do celular
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        // Distância do mouse para o centro do celular
        const mouseX = e.clientX - centerX;
        const mouseY = e.clientY - centerY;
        
        // Rotação máxima de 10 graus
        const rotateX = (-mouseY / (rect.height / 2)) * 10;
        const rotateY = (mouseX / (rect.width / 2)) * 10;
        
        phone.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
      });
      
      wrapper.addEventListener('mouseleave', () => {
        phone.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)';
      });
    }
  }

  // 3. Controles do Carrossel de Capturas de Tela
  const carousel = document.querySelector('.screenshots-container');
  const prevBtn = document.querySelector('.carousel-control.prev');
  const nextBtn = document.querySelector('.carousel-control.next');
  
  if (carousel && prevBtn && nextBtn) {
    // Rolar a largura de uma captura + gap
    const scrollAmount = 240; 
    
    prevBtn.addEventListener('click', () => {
      carousel.scrollBy({
        left: -scrollAmount,
        behavior: 'smooth'
      });
    });
    
    nextBtn.addEventListener('click', () => {
      carousel.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
      });
    });
    
    // Ocultar botões nas extremidades
    const updateButtons = () => {
      const scrollLeft = carousel.scrollLeft;
      const maxScroll = carousel.scrollWidth - carousel.clientWidth;
      
      if (scrollLeft <= 5) {
        prevBtn.style.opacity = '0';
        prevBtn.style.pointerEvents = 'none';
      } else {
        prevBtn.style.opacity = '';
        prevBtn.style.pointerEvents = '';
      }
      
      if (scrollLeft >= maxScroll - 5) {
        nextBtn.style.opacity = '0';
        nextBtn.style.pointerEvents = 'none';
      } else {
        nextBtn.style.opacity = '';
        nextBtn.style.pointerEvents = '';
      }
    };
    
    carousel.addEventListener('scroll', updateButtons);
    window.addEventListener('resize', updateButtons);
    
    // Pequeno delay para renderização inicial e posicionamento
    setTimeout(updateButtons, 200);
  }
});
