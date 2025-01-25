console.log('loaded bio.mjs')

document.addEventListener('DOMContentLoaded', async () => {
  await loadNavbar();
  loadFooter();
  themeListener();
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

function themeListener() {
  const radioThemes = document.querySelectorAll('input[name="theme"]')

  // Add event listener to each radio button
  radioThemes.forEach(radio => {
    radio.addEventListener('change', () => {
      if (radio.checked) {
        console.log(`Theme changed to: ${radio.id}`);
        // Perform your logic here, e.g., change the theme
        if (radio.id === 'light-mode') {
          document.body.style.backgroundColor = 'white';
          document.body.style.color = 'black';
        } else if (radio.id === 'dark-mode') {
          document.body.style.backgroundColor = 'black';
          document.body.style.color = 'white';
        }
      }
    });
  });
}
