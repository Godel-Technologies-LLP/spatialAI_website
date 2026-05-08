const TWEAK_DEFAULTS = {
  "dark": false,
  "accent": "#2a6fdb"
};

function TweaksApp() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  React.useEffect(() => {
    document.documentElement.classList.toggle('dark', !!t.dark);
    const icon = document.getElementById('themeIcon');
    if (icon) {
        icon.innerHTML = t.dark
          ? '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/>'
          : '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>';
    }
    try { localStorage.setItem('godel.dark', t.dark ? '1' : '0'); } catch(e){}
    document.documentElement.style.setProperty('--accent', t.accent);
    document.documentElement.style.setProperty('--accent-soft', t.accent + '22');
  }, [t.dark, t.accent]);

  return (
    <TweaksPanel title="Tweaks">
      <TweakSection label="Theme" />
      <TweakToggle label="Dark mode" value={t.dark} onChange={(v) => setTweak('dark', v)} />
      <TweakColor label="Accent" value={t.accent}
        options={['#0c0c0d', '#2a6fdb', '#1a8f4c', '#c2410c', '#7a5af8']}
        onChange={(v) => setTweak('accent', v)} />
    </TweaksPanel>
  );
}

const tweaksRoot = document.createElement('div');
document.body.appendChild(tweaksRoot);
ReactDOM.createRoot(tweaksRoot).render(<TweaksApp />);
