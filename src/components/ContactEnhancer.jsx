'use client';

import { useEffect } from 'react';

export default function ContactEnhancer() {
  useEffect(() => {
    const root = document.querySelector('[data-upload]')?.closest('.contact');
    if (!root) return;

    const upload = root.querySelector('[data-upload]');
    const input = root.querySelector('.upload__input');
    const hint = root.querySelector('[data-upload-hint]');
    const fileEl = root.querySelector('[data-upload-file]');

    function setFile(f) {
      if (!fileEl || !hint) return;
      if (f) {
        fileEl.hidden = false;
        fileEl.textContent = f.name;
        hint.textContent = 'Файл прикреплён';
      } else {
        fileEl.hidden = true;
        fileEl.textContent = '';
        hint.textContent = 'Перетащите файл сюда или нажмите';
      }
    }

    input?.addEventListener('change', (e) => setFile(e.target.files?.[0]));
    if (upload) {
      upload.addEventListener('dragover', (e) => {
        e.preventDefault();
        upload.classList.add('is-drag');
      });
      upload.addEventListener('dragleave', () => upload.classList.remove('is-drag'));
      upload.addEventListener('drop', (e) => {
        e.preventDefault();
        upload.classList.remove('is-drag');
        const f = e.dataTransfer?.files?.[0];
        if (input && f) {
          input.files = e.dataTransfer.files;
          setFile(f);
        }
      });
    }
  }, []);
  return null;
}
