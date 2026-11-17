const toggle = document.querySelector('.menu-toggle');
const links = document.querySelector('.nav-links');

toggle.addEventListener('click', () => {
  const isOpen = links.classList.toggle('open');
  toggle.setAttribute('aria-expanded', String(isOpen));
  toggle.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
  toggle.textContent = isOpen ? '×' : '☰';
});

links.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    links.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Open navigation');
    toggle.textContent = '☰';
  });
});

const sections = document.querySelectorAll('main section[id]');
const sectionLinks = links.querySelectorAll('a[href^="#"]');

const updateActiveLink = () => {
  const visibleSections = [...sections]
    .map(section => ({ section, distance: Math.abs(section.getBoundingClientRect().top - window.innerHeight * 0.35) }))
    .filter(({ section }) => section.getBoundingClientRect().bottom > 90)
    .sort((a, b) => a.distance - b.distance);
  const activeSection = visibleSections.length ? visibleSections[0].section : null;

  sectionLinks.forEach(link => {
    link.classList.toggle('active', activeSection && link.getAttribute('href') === `#${activeSection.id}`);
  });
};

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(updateActiveLink, { threshold: [0, 0.5, 1] });
  sections.forEach(section => observer.observe(section));
  updateActiveLink();
}

document.getElementById('year').textContent = new Date().getFullYear();
