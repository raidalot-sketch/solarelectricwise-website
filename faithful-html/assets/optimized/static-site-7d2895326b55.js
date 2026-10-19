/* Standalone contact behaviour; original presentation remains in the exported CSS. */
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('form[data-static-contact]').forEach(form => {
    form.querySelectorAll('input:not([type=hidden]), textarea').forEach(field => {
      const update = () => field.closest('.arf_material_theme_container')?.classList.toggle('static-field-filled', Boolean(field.value || document.activeElement === field));
      field.addEventListener('input', update); field.addEventListener('focus', update); field.addEventListener('blur', update); update();
    });
    form.addEventListener('submit', async event => {
      event.preventDefault();
      if (!form.reportValidity()) return;
      const status = form.querySelector('[data-form-status]');
      const button = form.querySelector('button[type=submit]');
      button.disabled = true; status.textContent = 'Sending your message…';
      try {
        const response = await fetch(form.action, {method:'POST',body:new FormData(form),headers:{Accept:'application/json'}});
        const result = await response.json();
        status.textContent = result.message;
        if (response.ok && result.success) form.reset();
      } catch { status.textContent = 'Your message could not be sent. Please contact us by phone or email.'; }
      finally { button.disabled = false; }
    });
  });
});
