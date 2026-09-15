const dialog = document.querySelector('#project-dialog');
const dialogTitle = document.querySelector('#dialog-title');
const dialogNumber = document.querySelector('#dialog-number');
const dialogType = document.querySelector('#dialog-type');
const dialogDescription = document.querySelector('#dialog-description');
const dialogData = document.querySelector('#dialog-data');
const dialogLink = document.querySelector('#dialog-link');

const projects = {
  salamanca: {
    number: '01', type: 'Branding · UX/UI', title: 'Somos Salamanca',
    description: 'Rebranding integral para un centro cultural con una identidad que respeta su tradición y abre una puerta a nuevas conversaciones.',
    details: [['Cliente', 'Centro Cultural Salamanca'], ['Año', '2025'], ['Servicios', 'Branding, diseño web y UX/UI']],
    link: 'https://online.fliphtml5.com/visitor/aeyp/#p=1', label: 'Ver brandbook ↗'
  },
  mnba: {
    number: '02', type: 'Señalética · Editorial', title: 'Museo en movimiento',
    description: 'Un lenguaje de señalización que vuelve más intuitivo el encuentro entre las personas, el edificio y las obras.',
    details: [['Cliente', 'Museo Nacional de Bellas Artes'], ['Año', '2025'], ['Servicios', 'Señalética, editorial e identidad']],
    link: 'https://online.fliphtml5.com/visitor/kxxq/#p=1', label: 'Ver señalética ↗'
  }
};

document.querySelectorAll('.open-project').forEach((button) => {
  button.addEventListener('click', () => {
    const project = projects[button.closest('[data-project]').dataset.project];
    dialogNumber.textContent = project.number;
    dialogType.textContent = project.type;
    dialogTitle.textContent = project.title;
    dialogDescription.textContent = project.description;
    dialogData.innerHTML = project.details.map(([label, value]) => `<div><span>${label}</span><strong>${value}</strong></div>`).join('');
    dialogLink.href = project.link;
    dialogLink.textContent = project.label;
    dialog.showModal();
  });
});

document.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', (event) => { if (event.target === dialog) dialog.close(); });

const orb = document.querySelector('.cursor-orb');
window.addEventListener('pointermove', (event) => {
  if (window.matchMedia('(pointer:fine)').matches) orb.style.transform = `translate(${event.clientX}px, ${event.clientY}px)`;
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add('is-visible'));
}, { threshold: 0.16 });
document.querySelectorAll('.project, .about, .contact').forEach((item) => observer.observe(item));
