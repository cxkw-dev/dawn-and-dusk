// Runs before first paint; CSS supplies the system preference when no explicit choice is stored.
export const themeScript = "try{var t=localStorage.getItem('dd-theme');if(t==='dawn'||t==='dusk')document.documentElement.dataset.theme=t}catch(e){}";
