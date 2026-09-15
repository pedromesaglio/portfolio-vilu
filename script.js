// Navegación móvil
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Cerrar menú al hacer click en un link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Smooth scroll para enlaces
document.querySelectorAll('a[href^="#"]:not(.modal-link-btn)').forEach(anchor => {
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

// Modal de proyectos
const modal = document.getElementById('project-modal');
const modalClose = document.querySelector('.modal-close');
const openProjectButtons = document.querySelectorAll('.open-project');

openProjectButtons.forEach(button => {
    button.addEventListener('click', () => {
        const panel = button.closest('.project-panel');
        if (!panel) return;

        modal.classList.add('active');
        document.body.style.overflow = 'hidden';

        const title = panel.dataset.title;
        const categoryLabel = panel.dataset.categoryLabel;
        const description = panel.dataset.description;
        const client = panel.dataset.client || '-';
        const year = panel.dataset.year || '2025';
        const services = panel.dataset.services || '-';

        modal.querySelector('.modal-title').textContent = title;
        modal.querySelector('.modal-category').textContent = categoryLabel;
        modal.querySelector('.modal-description').textContent = description;

        const modalClient = document.getElementById('modal-client');
        const modalYear = document.getElementById('modal-year');
        const modalServices = document.getElementById('modal-services');
        if (modalClient) modalClient.textContent = client;
        if (modalYear) modalYear.textContent = year;
        if (modalServices) modalServices.textContent = services;

        const imgEl = panel.querySelector('.panel-image img');
        const modalImageContainer = modal.querySelector('.modal-image');
        if (imgEl) {
            modalImageContainer.innerHTML = `<img src="${imgEl.src}" alt="${title}">`;
        } else {
            modalImageContainer.innerHTML = '<div class="image-placeholder">Imagen del proyecto</div>';
        }

        const links = [
            { id: 'modal-link-app', url: panel.dataset.linkApp, label: panel.dataset.linkAppLabel },
            { id: 'modal-link-web', url: panel.dataset.linkWeb, label: panel.dataset.linkWebLabel },
            { id: 'modal-link-book', url: panel.dataset.linkBook, label: panel.dataset.linkBookLabel }
        ];

        links.forEach(({ id, url, label }) => {
            const btn = document.getElementById(id);
            if (!btn) return;
            btn.href = url || '#';
            btn.style.display = url ? 'flex' : 'none';
            if (url && label) btn.querySelector('span').textContent = label;
        });
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
const animatedElements = document.querySelectorAll('.section-header');
animatedElements.forEach(el => {
    el.style.opacity = '0';
    fadeInObserver.observe(el);
});

// Navbar: sombra sutil al scrollear (sin cambios de color)
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.pageYOffset > 8);
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

// Prevenir comportamientos por defecto en ciertos elementos (excluye botones del modal)
document.querySelectorAll('a[href="#"]:not(.modal-link-btn)').forEach(link => {
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

// Smooth scroll mejorado
document.querySelectorAll('a[href^="#"]:not(.modal-link-btn)').forEach(anchor => {
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

// Manejo de errores global
window.addEventListener('error', (e) => {
    console.error('Error en el portfolio:', e.error);
});
