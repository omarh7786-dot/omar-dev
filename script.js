// 1. شريط تقدم التصفح وزر الصعود
const progressBar = document.getElementById('progressBar');
const scrollTopBtn = document.getElementById('scrollTopBtn');

window.addEventListener('scroll', () => {
  const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = (window.scrollY / totalHeight) * 100;
  progressBar.style.width = progress + '%';

  if (window.scrollY > 300) {
    scrollTopBtn.classList.add('show');
  } else {
    scrollTopBtn.classList.remove('show');
  }
});

scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// 2. Micro-interaction: تأثير الـ 3D Tilt على كروت المشاريع
const cards = document.querySelectorAll('.project-card');

cards.forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
  });
});
// برمجة زر تبديل الوضع (Dark / Light Mode)
const themeToggleBtn = document.getElementById('themeToggle');

// فحص الخيار المخزن سابقاً لدى المستخدم
const currentTheme = localStorage.getItem('theme');
if (currentTheme === 'light') {
  document.body.classList.add('light-theme');
}

themeToggleBtn.addEventListener('click', () => {
  document.body.classList.toggle('light-theme');
  
  let theme = 'dark';
  if (document.body.classList.contains('light-theme')) {
    theme = 'light';
  }
  
  // حفظ خيار المستخدم في ذاكرة المتصفح
  localStorage.setItem('theme', theme);
});