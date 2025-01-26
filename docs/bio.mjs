console.log('loaded bio.mjs')
theme = sessionStorage.getItem('theme');
console.log('The sessionStorage theme is:', theme);

document.addEventListener('DOMContentLoaded', async () => {
  await loadNavbar();
  loadFooter();
  loadTheme();
});


async function loadNavbar() {
  const navbarContainer = document.querySelector('nav');
  if (navbarContainer == null)
    throw new Error('Navbar container not found');

  // Get Navbar HTML
  try {
    const response = await fetch('navbar.html');
    if (!response.ok)
      throw new Error('Failed to fetch navbar');
    const navbarHTML = await response.text();
    navbarContainer.innerHTML = navbarHTML;
  } catch (error) {
    console.error('Error loading navbar:', error);
    return;
  }

  // Highlight Current Page
  let currentPage = window.location.pathname.split('/').pop();
  if (currentPage === '') {
    currentPage = 'index.html';
  }
  const navLinks = navbarContainer.querySelectorAll('a');
  navLinks.forEach(link => {
    const linkPage = link.getAttribute('href');
    if (linkPage === currentPage) {
      link.classList.add('current_page');
    }
  });

}

async function loadFooter() {
  try {
    const footerContainer = document.querySelector('footer');
    if (footerContainer == null)
      throw new Error('Footer container not found');
    const response = await fetch('footer.html');
    if (!response.ok)
      throw new Error('Failed to fetch footer');
    const footerHTML = await response.text();
    footerContainer.innerHTML = footerHTML;
  } catch (error) {
    console.error('Error loading footer:', error);
    return;
  }
}


function setDarkTheme() {
  sessionStorage.setItem('theme', 'dark-mode');
  document.body.classList.remove('light-mode');
  document.body.classList.add('dark-mode');
}

function setLightTheme() {
  sessionStorage.setItem('theme', 'light-mode');
  document.body.classList.remove('dark-mode');
  document.body.classList.add('light-mode');
}

function loadTheme() {
  // Initialize Theme
  const currentTheme = sessionStorage.getItem('theme');
  if (currentTheme == null | currentTheme === '') {
    setLightTheme()
  } else if (currentTheme === 'light-mode') {
    setLightTheme();
  } else if (currentTheme === 'dark-mode') {
    setDarkTheme();
  } else {
    console.log('typeof theme:', typeof currentTheme);
    console.log('theme length:', currentTheme.length);
    console.log('theme:', currentTheme);
    setLightTheme();
    throw new Error('Unknown theme:', currentTheme);
  }

  const radioButtons = document.querySelectorAll('input[name="theme"]')
  radioButtons.forEach(radio => {
    radio.addEventListener('change', () => {
      if (!radio.checked) {
        return;
      }
      const theme = radio.id;
      console.log(`Theme changed to: ${radio.id}`);
      if (radio.id === 'light-mode') {
        setLightTheme();
      } else if (radio.id === 'dark-mode') {
        setDarkTheme();
      } else {
        console.error('Unknown theme:', radio.id);
      }
    });
  });
}
