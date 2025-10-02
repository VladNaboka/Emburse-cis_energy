document.addEventListener('DOMContentLoaded', () => {
  const upload = document.querySelector('[data-upload]');
  if (!upload) return;

  const box = upload.querySelector('.upload__box');
  const input = upload.querySelector('.upload__input');
  const hint = upload.querySelector('[data-upload-hint]');
  const fileP = upload.querySelector('[data-upload-file]');

  function showFile(file) {
    if (!file) return;
    fileP.hidden = false;
    fileP.textContent = file.name;
    hint.hidden = true;
  }

  box.addEventListener('dragover', (e) => {
    e.preventDefault();
    box.classList.add('is-dragover');
  });
  box.addEventListener('dragleave', () => {
    box.classList.remove('is-dragover');
  });
  box.addEventListener('drop', (e) => {
    e.preventDefault();
    box.classList.remove('is-dragover');
    const f = e.dataTransfer.files && e.dataTransfer.files[0];
    if (f) {
      input.files = e.dataTransfer.files; // присвоим файлы инпуту
      showFile(f);
    }
  });
  input.addEventListener('change', () => {
    const f = input.files && input.files[0];
    showFile(f);
  });
});
