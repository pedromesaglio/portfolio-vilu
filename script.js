// Cursor personalizado
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');

let mouseX = 0;
let mouseY = 0;
let cursorX = 0;
let cursorY = 0;
let followerX = 0;
let followerY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    cursor.style.opacity = '1';
    cursorFollower.style.opacity = '1';
});

function animateCursor() {
    // Cursor principal - movimiento rápido
    cursorX += (mouseX - cursorX) * 0.3;
    cursorY += (mouseY - cursorY) * 0.3;

    // Cursor follower - movimiento más lento
    followerX += (mouseX - followerX) * 0.15;
    followerY += (mouseY - followerY) * 0.15;

    cursor.style.transform = `translate(${cursorX}px, ${cursorY}px)`;
    cursorFollower.style.transform = `translate(${followerX}px, ${followerY}px)`;

    requestAnimationFrame(animateCursor);
}

animateCursor();

// Expandir cursor en hover de elementos interactivos
const interactiveElements = document.querySelectorAll('a, button, .portfolio-item');
interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.style.transform += ' scale(1.5)';
        cursorFollower.style.transform += ' scale(1.5)';
    });

    el.addEventListener('mouseleave', () => {
        cursor.style.transform = cursor.style.transform.replace(' scale(1.5)', '');
        cursorFollower.style.transform = cursorFollower.style.transform.replace(' scale(1.5)', '');
    });
});

// Navegación móvil
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');

    // Animación del hamburger
    const spans = hamburger.querySelectorAll('span');
    if (navMenu.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// Cerrar menú al hacer click en un link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const spans = hamburger.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    });
});

// Smooth scroll para enlaces
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Filtro del portfolio
const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remover clase active de todos los botones
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Agregar clase active al botón clickeado
        button.classList.add('active');

        const filterValue = button.getAttribute('data-filter');

        portfolioItems.forEach((item, index) => {
            if (filterValue === 'all') {
                item.classList.remove('hidden');
                setTimeout(() => {
                    item.style.animation = 'fadeInUp 0.6s ease forwards';
                }, index * 100);
            } else {
                if (item.getAttribute('data-category') === filterValue) {
                    item.classList.remove('hidden');
                    setTimeout(() => {
                        item.style.animation = 'fadeInUp 0.6s ease forwards';
                    }, index * 100);
                } else {
                    item.classList.add('hidden');
                }
            }
        });
    });
});

// Modal de proyectos
const modal = document.getElementById('project-modal');
const modalClose = document.querySelector('.modal-close');

portfolioItems.forEach(item => {
    item.addEventListener('click', () => {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';

        // Aquí puedes personalizar el contenido del modal según el proyecto
        const title = item.querySelector('h3').textContent;
        const category = item.querySelector('.portfolio-category').textContent;

        modal.querySelector('.modal-title').textContent = title;
        modal.querySelector('.modal-category').textContent = category;
    });
});

modalClose.addEventListener('click', () => {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
});

// Cerrar modal al hacer click fuera del contenido
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// Cerrar modal con ESC
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// Animación de elementos al hacer scroll con Intersection Observer
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -100px 0px'
};

const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.8s ease forwards';
            entry.target.style.opacity = '1';
        }
    });
}, observerOptions);

// Observar elementos que deben animarse
const animatedElements = document.querySelectorAll('.service-card, .testimonial-card, .about-content, .section-header');
animatedElements.forEach(el => {
    el.style.opacity = '0';
    fadeInObserver.observe(el);
});

// Animación escalonada para portfolio items
const portfolioObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const items = entry.target.querySelectorAll('.portfolio-item');
            items.forEach((item, index) => {
                setTimeout(() => {
                    item.style.animation = 'fadeInUp 0.6s ease forwards';
                    item.style.opacity = '1';
                }, index * 100);
            });
            portfolioObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

const portfolioGrid = document.querySelector('.portfolio-grid');
if (portfolioGrid) {
    portfolioGrid.querySelectorAll('.portfolio-item').forEach(item => {
        item.style.opacity = '0';
    });
    portfolioObserver.observe(portfolioGrid);
}

// Navbar con efecto al scroll
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll <= 0) {
        navbar.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.08)';
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
    } else {
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.12)';
        navbar.style.background = 'rgba(255, 255, 255, 1)';
    }

    // Ocultar navbar al hacer scroll hacia abajo (opcional)
    // if (currentScroll > lastScroll && currentScroll > 500) {
    //     navbar.style.transform = 'translateY(-100%)';
    // } else {
    //     navbar.style.transform = 'translateY(0)';
    // }

    lastScroll = currentScroll;
});

// Formulario de contacto
const contactForm = document.querySelector('.contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Obtener los valores del formulario
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        // Validación básica
        if (!name || !email || !message) {
            alert('Por favor completa todos los campos');
            return;
        }

        const submitButton = contactForm.querySelector('.submit-button');
        const originalText = submitButton.textContent;

        try {
            // Mostrar estado de carga
            submitButton.textContent = 'Enviando...';
            submitButton.disabled = true;

            // Enviar al backend
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name,
                    email,
                    message
                })
            });

            const data = await response.json();

            if (data.success) {
                // Mensaje de éxito
                submitButton.textContent = '¡Enviado!';
                submitButton.style.background = '#4caf50';

                setTimeout(() => {
                    alert(`¡Gracias ${name}! Tu mensaje ha sido enviado exitosamente. Te contactaremos pronto a ${email}`);
                    contactForm.reset();
                    submitButton.textContent = originalText;
                    submitButton.style.background = '';
                    submitButton.disabled = false;
                }, 1000);
            } else {
                throw new Error(data.error || 'Error al enviar mensaje');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Hubo un error al enviar tu mensaje. Por favor intenta de nuevo.');
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }
    });

    // Efecto en los inputs del formulario
    const formInputs = contactForm.querySelectorAll('input, textarea');
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.style.transform = 'translateY(-2px)';
        });

        input.addEventListener('blur', function() {
            this.parentElement.style.transform = 'translateY(0)';
        });
    });
}

// Efecto parallax sutil en el hero
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero-content');
    const heroShapes = document.querySelectorAll('.hero-shape');

    if (hero && scrolled < window.innerHeight) {
        hero.style.transform = `translateY(${scrolled * 0.4}px)`;
        hero.style.opacity = 1 - (scrolled / 800);
    }

    // Parallax para las formas del hero
    heroShapes.forEach((shape, index) => {
        const speed = 0.2 + (index * 0.1);
        shape.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Agregar clase a los items del portfolio al hacer hover
portfolioItems.forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-12px) scale(1.02)';
    });

    item.addEventListener('mouseleave', function() {
        this.style.transform = '';
    });
});

// Contador para animación de números (si quieres agregar estadísticas)
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);

    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start);
        }
    }, 16);
}

// Detección de dispositivo móvil para deshabilitar algunas animaciones
const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

if (isMobile) {
    // Deshabilitar cursor personalizado en móviles
    cursor.style.display = 'none';
    cursorFollower.style.display = 'none';
}

// Prevenir comportamientos por defecto en ciertos elementos
document.querySelectorAll('a[href="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
    });
});

// Lazy loading para imágenes (cuando agregues imágenes reales)
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Añadir clase 'scrolled' a elementos cuando están visibles
const revealElements = document.querySelectorAll('.service-card, .portfolio-item, .testimonial-card');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
        }
    });
}, { threshold: 0.1 });

revealElements.forEach(el => {
    revealObserver.observe(el);
});

// Smooth scroll mejorado
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');

        if (href !== '#' && href !== '') {
            e.preventDefault();
            const target = document.querySelector(href);

            if (target) {
                const navHeight = navbar.offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// Inicialización cuando el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', () => {
    console.log('Portfolio cargado correctamente');

    // Añadir animación de entrada inicial
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// Sistema de calificación con estrellas para testimonios
const stars = document.querySelectorAll('.star-rating .star');
const ratingValue = document.getElementById('rating-value');

stars.forEach(star => {
    star.addEventListener('click', () => {
        const rating = star.getAttribute('data-rating');
        ratingValue.value = rating;

        // Actualizar visualización de estrellas
        stars.forEach(s => {
            if (s.getAttribute('data-rating') <= rating) {
                s.classList.add('active');
            } else {
                s.classList.remove('active');
            }
        });
    });

    star.addEventListener('mouseenter', () => {
        const rating = star.getAttribute('data-rating');
        stars.forEach(s => {
            if (s.getAttribute('data-rating') <= rating) {
                s.style.color = 'var(--accent-color)';
            } else {
                s.style.color = '#ddd';
            }
        });
    });
});

document.querySelector('.star-rating').addEventListener('mouseleave', () => {
    const currentRating = ratingValue.value;
    stars.forEach(s => {
        if (s.getAttribute('data-rating') <= currentRating) {
            s.style.color = 'var(--accent-color)';
        } else {
            s.style.color = '#ddd';
        }
    });
});

// Inicializar todas las estrellas como activas (5 estrellas)
stars.forEach(s => s.classList.add('active'));

// Cargar testimonios desde el backend al iniciar
async function loadTestimonials() {
    try {
        const response = await fetch('/api/testimonials');
        const data = await response.json();

        if (data.success && data.data.length > 0) {
            // Limpiar grid (dejar solo los testimonios de ejemplo si existen)
            testimonialsGrid.innerHTML = '';

            // Agregar testimonios desde la base de datos
            data.data.forEach(testimonial => {
                addTestimonialToDOM(testimonial);
            });
        }
    } catch (error) {
        console.error('Error al cargar testimonios:', error);
    }
}

// Función para agregar testimonio al DOM
function addTestimonialToDOM(testimonial) {
    const starsHTML = '★'.repeat(testimonial.rating);
    const initials = testimonial.name.split(' ').map(word => word[0]).join('').toUpperCase().substring(0, 2);

    const testimonialCard = document.createElement('div');
    testimonialCard.className = 'testimonial-card';
    testimonialCard.style.animation = 'fadeInUp 0.6s ease';
    testimonialCard.innerHTML = `
        <div class="testimonial-stars">${starsHTML}</div>
        <p class="testimonial-text">"${testimonial.message}"</p>
        <div class="testimonial-author">
            <div class="author-avatar">${initials}</div>
            <div class="author-info">
                <h4>${testimonial.name}</h4>
                <p>${testimonial.position}</p>
            </div>
        </div>
    `;

    testimonialsGrid.insertBefore(testimonialCard, testimonialsGrid.firstChild);
}

// Formulario de testimonios
const testimonialForm = document.getElementById('testimonial-form');
const testimonialsGrid = document.getElementById('testimonials-grid');

if (testimonialForm) {
    testimonialForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Obtener valores del formulario
        const name = document.getElementById('testimonial-name').value;
        const position = document.getElementById('testimonial-position').value;
        const message = document.getElementById('testimonial-message').value;
        const rating = ratingValue.value;

        // Validación
        if (!name || !position || !message) {
            alert('Por favor completa todos los campos');
            return;
        }

        const submitBtn = testimonialForm.querySelector('.submit-testimonial-btn');
        const originalText = submitBtn.textContent;

        try {
            // Mostrar estado de carga
            submitBtn.textContent = 'Enviando...';
            submitBtn.disabled = true;

            // Enviar al backend
            const response = await fetch('/api/testimonials', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name,
                    position,
                    message,
                    rating: parseInt(rating)
                })
            });

            const data = await response.json();

            if (data.success) {
                // Agregar testimonio al DOM
                addTestimonialToDOM(data.data);

                // Limpiar formulario
                testimonialForm.reset();

                // Resetear estrellas a 5
                ratingValue.value = 5;
                stars.forEach(s => s.classList.add('active'));

                // Mensaje de éxito
                submitBtn.textContent = '¡Testimonio publicado!';
                submitBtn.style.background = '#4caf50';

                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.style.background = '';
                    submitBtn.disabled = false;
                }, 2000);

                // Scroll al nuevo testimonio
                setTimeout(() => {
                    testimonialsGrid.firstChild.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }, 300);
            } else {
                throw new Error(data.error || 'Error al enviar testimonio');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Hubo un error al enviar tu testimonio. Por favor intenta de nuevo.');
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    });
}

// Cargar testimonios al iniciar
if (testimonialsGrid) {
    loadTestimonials();
}

// Manejo de errores global
window.addEventListener('error', (e) => {
    console.error('Error en el portfolio:', e.error);
});
