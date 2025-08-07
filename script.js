document.addEventListener('DOMContentLoaded', () => {
  // 🌙 DARK MODE TOGGLE
  const toggleBtn = document.getElementById('darkModeToggle');
  const savedTheme = localStorage.getItem('theme');

  if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
    if (toggleBtn) toggleBtn.textContent = '☀️';
  } else {
    if (toggleBtn) toggleBtn.textContent = '🌙';
  }

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      document.body.classList.toggle('dark-mode');
      const isDark = document.body.classList.contains('dark-mode');
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
      toggleBtn.textContent = isDark ? '☀️' : '🌙';
    });
  }

  // 🟢 NAVBAR ACTIVE LINK HIGHLIGHT
  const currentPage = window.location.pathname.split('/').pop();
  document.querySelectorAll('.nav-links a').forEach(link => {
    if (link.getAttribute('href') === currentPage) {
      link.classList.add('active');
    }
  });

  // ⬆️ SCROLL TO TOP BUTTON
  const scrollBtn = document.querySelector('.scroll-to-top');
  if (scrollBtn) {
    const toggleScrollBtn = () => {
      scrollBtn.classList.toggle('show', window.scrollY > 300);
    };

    toggleScrollBtn(); // initial check
    window.addEventListener('scroll', toggleScrollBtn);

    scrollBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // 📄 RESUME DOWNLOAD BUTTON
  const downloadBtn = document.querySelector('.download-btn');
  if (downloadBtn) {
    downloadBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const resumeLink = document.createElement('a');
      resumeLink.href = 'assets/Muhammad-Bilal-Zafar-Resume.pdf';
      resumeLink.download = 'Muhammad-Bilal-Zafar-Resume.pdf';
      resumeLink.style.display = 'none';
      document.body.appendChild(resumeLink);
      resumeLink.click();
      document.body.removeChild(resumeLink);
    });
  }

  // 📧 CONTACT FORM VALIDATION
  const contactForm = document.getElementById('contactForm');
  const formMessage = document.getElementById('formMessage');

  if (contactForm && formMessage) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const name = contactForm.name.value.trim();
      const email = contactForm.email.value.trim();
      const message = contactForm.message.value.trim();

      if (!name || !email || !message) {
        showMessage('Please fill in all required fields.', 'error');
        return;
      }

      if (!validateEmail(email)) {
        showMessage('Please enter a valid email address.', 'error');
        return;
      }

      showMessage('Message sent successfully!', 'success');
      contactForm.reset();
    });

    function validateEmail(email) {
      return /^\S+@\S+\.\S+$/.test(email);
    }

    function showMessage(msg, type) {
      formMessage.textContent = msg;
      formMessage.style.color = type === 'error' ? 'red' : 'green';
      formMessage.style.fontWeight = '500';
      formMessage.style.marginTop = '1rem';

      setTimeout(() => {
        formMessage.textContent = '';
      }, 5000);
    }
  }
});
