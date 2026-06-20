(function() {
  fetch('https://term.ooo/multi.811eb29.js')
    .then(r => r.text())
    .then(t => {
      const matches = t.match(/"[a-záéíóúâêîôûãõàèìòùç]{4,6}"(?:,"[a-záéíóúâêîôûãõàèìòùç]{4,6}")*/gi);
      const grandes = matches.filter(m => (m.match(/,/g) || []).length > 50);
      const Pf = grandes[3].match(/"([a-záéíóúâêîôûãõàèìòùç]{4,6})"/gi).map(w => w.replace(/"/g, ''));

      const epoch = new Date(2022, 0, 2, 0, 0, 0, 0);
      const brtOffset = new Date().getTimezoneOffset() + 180; 
      const now = new Date(Date.now() - brtOffset * 60000);
      const day = Math.floor((now - epoch) / 864e5);

      const word = Pf[day % Pf.length];

      console.log('%c Palavra de hoje:', 'color:#3AA394;font-weight:bold;font-size:14px');
      console.log('%c' + word.toUpperCase(), 'color:#3AA394;font-size:26px;font-weight:bold');
      console.log('Dia #' + day, '| índice:', day % Pf.length);

      if (confirm('Palavra: ' + word.toUpperCase() + '\n\nDigitar automaticamente?')) {
        const letters = word.normalize("NFD").replace(/[\u0300-\u036f]/g, "").split('');
        let i = 0;
        function next() {
          if (i >= letters.length) {
            setTimeout(() => {
              window.dispatchEvent(new KeyboardEvent('keyup', { key: 'Enter', bubbles: true }));
              console.log(' Digitado!');
            }, 100);
            return;
          }
          window.dispatchEvent(new KeyboardEvent('keyup', { key: letters[i], bubbles: true }));
          i++;
          setTimeout(next, 80);
        }
        next();
      }
    });
})();
