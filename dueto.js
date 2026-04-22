(function() {
  fetch('https://term.ooo/2/multi.811eb29.js').then(r=>r.text()).then(t=>{
    const matches = t.match(/"[a-záéíóúâêîôûãõàèìòùç]{4,6}"(?:,"[a-záéíóúâêîôûãõàèìòùç]{4,6}")*/gi);
    const grandes = matches.filter(m => (m.match(/,/g)||[]).length > 50);
    const dict = grandes[3].match(/"([a-záéíóúâêîôûãõàèìòùç]{4,6})"/gi).map(w=>w.replace(/"/g,''));

    const mb = t.match(/atob\("([^"]{100,})"\)/g);
    const bin = atob(mb[0].match(/atob\("([^"]+)"\)/)[1]);
    const blob1 = [];
    for(let i=0;i<bin.length-1;i+=2)
      blob1.push(bin.charCodeAt(i)|(bin.charCodeAt(i+1)<<8));

    const epoch = new Date(2026,1,4);
    const today = new Date(); today.setHours(0,0,0,0);
    const idx = Math.floor((today-epoch)/864e5);

    const w1 = dict[blob1[idx*2]];
    const w2 = dict[blob1[idx*2+1]];

    console.log('Palavras de hoje:', w1.toUpperCase(), '+', w2.toUpperCase());

    function type(word, cb) {
      word.normalize("NFD").replace(/[\u0300-\u036f]/g,"").split('').forEach(l =>
        window.dispatchEvent(new KeyboardEvent('keydown', {key:l, bubbles:true}))
      );
      setTimeout(() => {
        window.dispatchEvent(new KeyboardEvent('keydown', {key:'Enter', bubbles:true}));
        if(cb) setTimeout(cb, 300);
      }, 100);
    }

    type(w1, () => type(w2));
  });
})();
