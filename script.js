document.addEventListener('DOMContentLoaded', () => {
  const PUBLIC_CARD_URL = 'https://clentbusinesscard.netlify.app/';
  const year = document.getElementById('current-year');
  if (year) year.textContent = new Date().getFullYear();

  const saveContact = document.getElementById('save-contact');
  if (saveContact) {
    saveContact.addEventListener('click', event => {
      event.preventDefault();
      const lines = [
        'BEGIN:VCARD',
        'VERSION:3.0',
        'N:Ebanks;Clent;;;',
        'FN:Clent Ebanks',
        'ORG:Profesional independiente',
        'TITLE:Interprete bilingue',
        'TEL;TYPE=CELL,VOICE:+50498520210',
        'EMAIL;TYPE=INTERNET,PREF:clentebanks0@gmail.com',
        `URL:${PUBLIC_CARD_URL}`,
        'X-SOCIALPROFILE;TYPE=linkedin:https://www.linkedin.com/in/clent-ebanks',
        'END:VCARD'
      ];
      const blob = new Blob([lines.join('\r\n') + '\r\n'], {type: 'text/vcard;charset=utf-8'});
      const url = URL.createObjectURL(blob);
      const download = document.createElement('a');
      download.href = url;
      download.download = 'Clent_Ebanks.vcf';
      document.body.appendChild(download);
      download.click();
      download.remove();
      setTimeout(() => URL.revokeObjectURL(url), 1500);
    });
  }

  const copyButton = document.getElementById('copy-card-link');
  const copyLabel = document.getElementById('copy-card-label');
  if (copyButton && copyLabel) {
    copyButton.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(PUBLIC_CARD_URL);
      } catch (_) {
        const input = document.createElement('textarea');
        input.value = PUBLIC_CARD_URL;
        input.style.position = 'fixed';
        input.style.opacity = '0';
        document.body.appendChild(input);
        input.select();
        document.execCommand('copy');
        input.remove();
      }
      copyLabel.textContent = 'Enlace copiado';
      setTimeout(() => { copyLabel.textContent = 'Copiar enlace'; }, 2200);
    });
  }

  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('./service-worker.js').catch(() => {
        // La tarjeta continúa funcionando aunque el navegador no permita PWA.
      });
    });
  }
});
