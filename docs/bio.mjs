console.log('loaded bio.mjs')

export async function loadNavbar() {
  const navbarContainer = document.getElementById('navbar-container');
  try {
    const response = await fetch('navbar.html');
    if (!response.ok)
      throw new Error('Failed to fetch navbar');
    const navbarHTML = await response.text();
    navbarContainer.innerHTML = navbarHTML;

    // Highlight the current page
    const links = navbarContainer.querySelectorAll('.nav-link');
    links.forEach(link => {
      if (link.href === window.location.href) {
        link.classList.add('current_page');
        link.setAttribute('aria-current', 'page');
      }
    });
  } catch (error) {
    console.error('Error loading navbar:', error);
  }
}


