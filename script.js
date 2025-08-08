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

// 🔼 Scroll-to-Top Button
const scrollBtn = document.getElementById("scrollTopBtn");

window.addEventListener("scroll", () => {
  scrollBtn.style.display = window.scrollY > 300 ? "block" : "none";
});

scrollBtn?.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});



// 📄 RESUME DOWNLOAD BUTTON
const downloadBtn = document.querySelector('.download-btn');

if (downloadBtn) {
  downloadBtn.addEventListener('click', (e) => {
    e.preventDefault();

    // ✅ Correct path (case-sensitive on GitHub Pages)
    const filePath = 'assets/Muhammad-Bilal-Zafar-Resume.pdf';

    // Check if file exists (optional but safer)
    fetch(filePath)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`File not found: ${filePath}`);
        }

        // Create hidden link for download
        const resumeLink = document.createElement('a');
        resumeLink.href = filePath;
        resumeLink.download = 'Muhammad-Bilal-Zafar-Resume.pdf';
        document.body.appendChild(resumeLink);
        resumeLink.click();
        document.body.removeChild(resumeLink);
      })
      .catch((err) => {
        alert("Resume file not found or path is incorrect!");
        console.error(err);
      });
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

