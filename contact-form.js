(function () {
  if (document.getElementById('contactModal')) return;

  const style = document.createElement('style');
  style.textContent = `
    .contact-modal{position:fixed;inset:0;z-index:300;opacity:0;pointer-events:none;transition:opacity .35s ease}
    .contact-modal.is-open{opacity:1;pointer-events:all}
    .contact-modal__backdrop{position:absolute;inset:0;background:rgba(0,0,0,0.82);backdrop-filter:blur(12px)}
    .contact-modal__dialog{position:absolute;inset:0;overflow-y:auto;display:flex;align-items:flex-start;justify-content:center;padding:clamp(20px,5vw,60px) clamp(16px,4vw,40px)}
    .contact-modal__content{position:relative;z-index:1;width:min(100%,720px);background:rgba(10,5,0,0.95);border:1px solid rgba(255,255,255,0.14);border-radius:18px;overflow:hidden}
    .contact-modal__close{position:absolute;top:20px;right:20px;z-index:10;width:36px;height:36px;border-radius:50%;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.18);color:rgba(107,114,128,1);font-size:20px;line-height:1;display:grid;place-items:center;cursor:pointer;transform:rotate(45deg);transition:background .2s,color .2s}
    .contact-modal__close:hover{background:rgba(255,255,255,0.12);color:#fff}
    .cf-main{padding:44px 36px}
    .cf-form{display:flex;flex-direction:column;gap:18px}
    .cf-grid{display:grid;grid-template-columns:1fr 1fr;gap:14px}
    .cf-label{display:flex;flex-direction:column;gap:7px}
    .cf-label-text{font-family:"Montserrat",sans-serif;font-size:11px;font-weight:600;letter-spacing:0.10em;text-transform:uppercase;color:rgba(107,114,128,1)}
    .cf-input{background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.18);border-radius:12px;padding:12px 16px;color:#fff;font-family:"Montserrat",sans-serif;font-size:14px;transition:border-color .2s;outline:none;width:100%}
    .cf-input:focus{border-color:rgba(232,146,10,0.45)}
    .cf-input[type=textarea],.cf-textarea{min-height:100px;resize:vertical}
    .cf-input option{background:#0a0500;color:#fff}
    .cf-consents{display:flex;flex-direction:column;gap:10px}
    .cf-consent{display:flex;gap:10px;align-items:flex-start;cursor:pointer}
    .cf-consent input{margin-top:3px;accent-color:#E8920A;flex-shrink:0}
    .cf-consent span{font-size:13px;color:rgba(107,114,128,1);line-height:1.55}
    .cf-consent a{color:#E8920A;text-decoration:none}
    .cf-legal{font-size:12px;color:rgba(107,114,128,1);opacity:0.7;line-height:1.5}
    .cf-footer{display:flex;align-items:center;gap:16px;flex-wrap:wrap}
    .cf-status{font-size:13px;font-family:"Montserrat",sans-serif}
    .cf-status.is-success{color:#34d399}
    .cf-status.is-error{color:#f87171}
    .cf-trap{display:none !important}
    .cf-submit{display:inline-flex;align-items:center;justify-content:center;padding:13px 26px;border-radius:999px;border:none;background:#E8920A;color:#1a0800;font-weight:700;font-family:"Montserrat",sans-serif;font-size:14px;cursor:pointer;transition:background .2s,transform .2s}
    .cf-submit:hover{background:#F5A822;transform:translateY(-1px)}
    .cf-submit:disabled{opacity:0.6;cursor:not-allowed;transform:none}
    @media(max-width:620px){.cf-grid{grid-template-columns:1fr}}
  `;
  document.head.appendChild(style);

  document.body.insertAdjacentHTML('beforeend', `
  <div class="contact-modal" id="contactModal" aria-hidden="true">
    <div class="contact-modal__backdrop" data-close-form></div>
    <div class="contact-modal__dialog">
      <div class="contact-modal__content">
        <button class="contact-modal__close" type="button" aria-label="Закрыть" data-close-form>+</button>
        <div class="cf-main">
          <form class="cf-form" id="cfForm">
            <div class="cf-grid">
              <label class="cf-label">
                <span class="cf-label-text">Ваше имя</span>
                <input class="cf-input" type="text" name="firstName" autocomplete="given-name" required/>
              </label>
              <label class="cf-label">
                <span class="cf-label-text">С чем связана задача?</span>
                <select class="cf-input" name="topic" required>
                  <option value="" selected disabled>Выберите вариант</option>
                  <option>Клиенты и коммуникация</option>
                  <option>Документы и отчёты</option>
                  <option>Сбор и обработка данных</option>
                  <option>Автоматизация рутинных задач</option>
                  <option>AI-инструмент или сервис</option>
                  <option>Другое</option>
                </select>
              </label>
            </div>
            <label class="cf-label">
              <span class="cf-label-text">Кратко опишите задачу</span>
              <textarea class="cf-input cf-textarea" name="details" required placeholder="Например: ERP-система с AI-поиском и аналитикой"></textarea>
            </label>
            <label class="cf-label">
              <span class="cf-label-text">Telegram / Телефон</span>
              <input class="cf-input" type="text" name="contact" required placeholder="@username или +7 XXX-XXX-XX-XX"/>
            </label>
            <label class="cf-label cf-trap" aria-hidden="true">
              <span class="cf-label-text">Website</span>
              <input class="cf-input" type="text" name="website" tabindex="-1" autocomplete="off"/>
            </label>
            <div class="cf-consents">
              <label class="cf-consent">
                <input type="checkbox" name="policyAccepted" value="yes" required/>
                <span>Я ознакомился(ась) с <a href="/privacy" target="_blank" rel="noopener noreferrer">Политикой обработки персональных данных</a>.</span>
              </label>
              <label class="cf-consent">
                <input type="checkbox" name="consentAccepted" value="yes" required/>
                <span>Даю согласие на обработку моих персональных данных в соответствии с <a href="/consent" target="_blank" rel="noopener noreferrer">текстом согласия</a>.</span>
              </label>
            </div>
            <p class="cf-legal">Если вы не дадите согласие на обработку данных, мы не сможем обработать заявку.</p>
            <div class="cf-footer">
              <button class="cf-submit" type="submit" id="cfSubmitBtn">Отправить запрос</button>
              <p class="cf-status" id="cfStatus" aria-live="polite"></p>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>`);

  const modal = document.getElementById('contactModal');
  const form = document.getElementById('cfForm');
  const status = document.getElementById('cfStatus');
  const submitBtn = document.getElementById('cfSubmitBtn');

  function openModal() {
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    const first = modal.querySelector('input,textarea');
    if (first) setTimeout(() => first.focus(), 40);
  }

  function closeModal() {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  document.addEventListener('click', function (e) {
    if (e.target.closest('[data-open-form], [data-open-brief]') ||
        e.target.id === 'openBriefBtn') {
      e.preventDefault();
      openModal();
      return;
    }
    if (e.target.closest('[data-close-form]')) closeModal();
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && modal.classList.contains('is-open')) closeModal();
  });

  if (form) {
    form.addEventListener('submit', async function (e) {
      e.preventDefault();
      if (!form.reportValidity()) {
        status.textContent = 'Проверьте обязательные поля.';
        status.className = 'cf-status is-error';
        return;
      }
      submitBtn.disabled = true;
      submitBtn.textContent = 'Отправляем...';
      status.textContent = '';
      status.className = 'cf-status';
      try {
        const data = new FormData(form);
        const payload = {
          firstName: String(data.get('firstName') || '').trim(),
          topic: String(data.get('topic') || '').trim(),
          contact: String(data.get('contact') || '').trim(),
          details: String(data.get('details') || '').trim(),
          policyAccepted: data.get('policyAccepted') === 'yes',
          consentAccepted: data.get('consentAccepted') === 'yes',
          website: String(data.get('website') || '').trim()
        };
        const res = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        const result = await res.json();
        if (!res.ok || !result.ok) throw new Error(result.message || 'Ошибка отправки.');
        form.reset();
        status.textContent = 'Запрос отправлен. Скоро свяжемся с вами.';
        status.className = 'cf-status is-success';
        setTimeout(() => closeModal(), 900);
      } catch (err) {
        status.textContent = err.message || 'Не удалось отправить запрос. Попробуйте снова.';
        status.className = 'cf-status is-error';
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Отправить запрос';
      }
    });
  }
})();
