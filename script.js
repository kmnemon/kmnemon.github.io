(() => {
  const root = document.documentElement;
  const toggle = document.querySelector('.theme-toggle');
  const media = window.matchMedia('(prefers-color-scheme: dark)');
  const savedTheme = localStorage.getItem('theme');

  if (savedTheme === 'light' || savedTheme === 'dark') {
    root.dataset.theme = savedTheme;
  }

  const currentTheme = () => root.dataset.theme || (media.matches ? 'dark' : 'light');

  const updateToggle = () => {
    const dark = currentTheme() === 'dark';
    toggle.setAttribute('aria-pressed', String(dark));
    toggle.setAttribute('aria-label', `Use ${dark ? 'light' : 'dark'} theme`);
  };

  toggle.addEventListener('click', () => {
    const nextTheme = currentTheme() === 'dark' ? 'light' : 'dark';
    root.dataset.theme = nextTheme;
    localStorage.setItem('theme', nextTheme);
    updateToggle();
  });

  media.addEventListener('change', () => {
    if (!root.dataset.theme) updateToggle();
  });

  updateToggle();
})();
