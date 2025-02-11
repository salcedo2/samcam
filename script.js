document.addEventListener('DOMContentLoaded', function() {
    // Determinar si el usuario es el propietario según localStorage
    let isOwner = (localStorage.getItem('isOwner') === 'true');
  
    // Función para actualizar el botón de Login/Logout en el navbar
    function updateOwnerUI() {
      const loginItem = document.getElementById('owner-login-item');
      if (isOwner) {
        loginItem.innerHTML = `<a class="nav-link" href="#" id="logoutButton">Logout</a>`;
        document.getElementById('logoutButton').addEventListener('click', function(e) {
          e.preventDefault();
          localStorage.removeItem('isOwner');
          isOwner = false;
          updateOwnerUI();
          location.reload();
        });
      } else {
        loginItem.innerHTML = `<a class="nav-link" href="#" data-bs-toggle="modal" data-bs-target="#loginModal">Login</a>`;
      }
    }
    updateOwnerUI();
  
    // Inicialización del carrusel de la galería
    var swiper = new Swiper(".mySwiper", {
      effect: "coverflow",
      grabCursor: true,
      centeredSlides: true,
      slidesPerView: "auto",
      coverflowEffect: {
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true,
      },
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    });
  // Inicialización del slider para eventos (vertical, efecto creative)
var eventsSwiper = new Swiper(".eventsSwiper", {
    direction: 'vertical',
    effect: 'creative',
    creativeEffect: {
      // Para el slide anterior: se traslada hacia arriba, con algo de opacidad para efecto de superposición
      prev: {
        translate: [0, -50, -100],
        opacity: 0.5,
      },
      // Para el siguiente slide: aparece desplazado hacia abajo y se desvanece
      next: {
        translate: [0, 50, 0],
        opacity: 0,
      },
    },
    slidesPerView: 1,
    centeredSlides: true,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".eventsSwiper .swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".eventsSwiper .swiper-button-next",
      prevEl: ".eventsSwiper .swiper-button-prev",
    },
  });
  
  
  
    // Funciones para manejar la persistencia de testimonios en localStorage
    function getTestimonialsFromStorage() {
      const testimonials = localStorage.getItem('testimonials');
      return testimonials ? JSON.parse(testimonials) : [];
    }
    
    function saveTestimonialsToStorage(testimonials) {
      localStorage.setItem('testimonials', JSON.stringify(testimonials));
    }
    
    // Función para agregar un testimonio al DOM
    function addTestimonialToDOM(testimonial) {
      const testimonialCard = document.createElement('div');
      testimonialCard.className = 'testimonial-card d-flex flex-wrap align-items-center mb-4 p-3 bg-white rounded shadow-sm';
      testimonialCard.setAttribute('data-id', testimonial.id);
    
      const img = document.createElement('img');
      img.src = testimonial.image;
      img.alt = 'Testimonio de ' + testimonial.name;
      img.className = 'testimonial-img me-3';
    
      const contentDiv = document.createElement('div');
      contentDiv.className = 'testimonial-content';
    
      const h5 = document.createElement('h5');
      h5.className = 'testimonial-name';
      h5.textContent = testimonial.name;
    
      const ratingDiv = document.createElement('div');
      ratingDiv.className = 'testimonial-rating';
      const ratingValue = parseInt(testimonial.rating);
      for (let i = 1; i <= 5; i++) {
        const star = document.createElement('i');
        star.className = i <= ratingValue ? 'fas fa-star' : 'far fa-star';
        ratingDiv.appendChild(star);
      }
    
      const p = document.createElement('p');
      p.className = 'testimonial-text';
      p.textContent = testimonial.text;
    
      contentDiv.appendChild(h5);
      contentDiv.appendChild(ratingDiv);
      contentDiv.appendChild(p);
    
      if (isOwner) {
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Borrar';
        deleteButton.className = 'btn btn-danger btn-sm ms-3';
        deleteButton.addEventListener('click', function() {
          testimonialCard.remove();
          let testimonials = getTestimonialsFromStorage();
          testimonials = testimonials.filter(t => t.id !== testimonial.id);
          saveTestimonialsToStorage(testimonials);
        });
        contentDiv.appendChild(deleteButton);
      }
    
      testimonialCard.appendChild(img);
      testimonialCard.appendChild(contentDiv);
      document.querySelector('#testimonios .container').appendChild(testimonialCard);
    }
    
    // Cargar testimonios guardados
    function loadTestimonials() {
      const testimonials = getTestimonialsFromStorage();
      testimonials.forEach(testimonial => {
        addTestimonialToDOM(testimonial);
      });
    }
    loadTestimonials();
    
    // Manejo del formulario para añadir testimonio
    const testimonialForm = document.getElementById('testimonialForm');
    
    testimonialForm.addEventListener('submit', function(e) {
      e.preventDefault();
    
      const name = document.getElementById('testimonialName').value;
      const rating = document.querySelector('input[name="rating"]:checked').value;
      const text = document.getElementById('testimonialText').value;
    
      const urlInput = document.getElementById('testimonialPhoto');
      const fileInput = document.getElementById('testimonialFile');
    
      const testimonialId = Date.now();
    
      function processTestimonial(imageSrc) {
        const testimonial = {
          id: testimonialId,
          image: imageSrc,
          name: name,
          rating: rating,
          text: text
        };
    
        const testimonials = getTestimonialsFromStorage();
        testimonials.push(testimonial);
        saveTestimonialsToStorage(testimonials);
    
        addTestimonialToDOM(testimonial);
        testimonialForm.reset();
        const testimonialModalEl = document.getElementById('testimonialModal');
        const modal = bootstrap.Modal.getOrCreateInstance(testimonialModalEl);
        modal.hide();
      }
    
      if (fileInput.files && fileInput.files.length > 0) {
        const file = fileInput.files[0];
        const reader = new FileReader();
        reader.onload = function(e) {
          processTestimonial(e.target.result);
        };
        reader.readAsDataURL(file);
      } else {
        const photo = urlInput.value;
        if (!photo) {
          alert("Por favor, proporciona una imagen mediante URL o subiendo un archivo.");
          return;
        }
        processTestimonial(photo);
      }
    });
    
    // Manejo del formulario de login
    const loginForm = document.getElementById('loginForm');
    loginForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const username = document.getElementById('loginUsername').value;
      const password = document.getElementById('loginPassword').value;
      // Credenciales de ejemplo: usuario "owner" y contraseña "12345"
      if(username === 'owner' && password === '12345'){
        localStorage.setItem('isOwner', 'true');
        isOwner = true;
        updateOwnerUI();
        const loginModalEl = document.getElementById('loginModal');
        const loginModal = bootstrap.Modal.getOrCreateInstance(loginModalEl);
        loginModal.hide();
        location.reload();
      } else {
        alert("Credenciales incorrectas");
      }
    });
    
    // --- Funcionalidad para FAQ ---
    // Al hacer clic en un botón del accordion, se guarda la pregunta en localStorage y se muestra en el contenedor #faq-selected
    document.querySelectorAll('#faqAccordion .accordion-button').forEach(function(button) {
      button.addEventListener('click', function() {
        const questionText = this.textContent.trim();
        document.getElementById('faq-selected').textContent = questionText;
        localStorage.setItem('selectedFaq', questionText);
      });
    });
    // Al cargar la página, si hay una pregunta guardada, se muestra
    const savedFaq = localStorage.getItem('selectedFaq');
    if (savedFaq) {
      document.getElementById('faq-selected').textContent = savedFaq;
    }
  });
  