(function () {
  if (document.getElementById('contactModal')) return;

  const style = document.createElement('style');
  style.textContent = `
    .contact-modal{position:fixed;inset:0;z-index:300;opacity:0;pointer-events:none;transition:opacity .35s ease}
    .contact-modal.is-open{opacity:1;pointer-events:all}
    .contact-modal__backdrop{position:absolute;inset:0;background:rgba(0,0,0,0.82);backdrop-filter:blur(12px)}
    .contact-modal__dialog{position:absolute;inset:0;overflow-y:auto;display:flex;align-items:flex-start;justify-content:center;padding:clamp(20px,5vw,60px) clamp(16px,4vw,40px)}
    .contact-modal__content{position:relative;z-index:1;width:min(100%,700px);background:rgba(10,5,0,0.96);border:1px solid rgba(255,255,255,0.12);border-radius:20px;overflow:hidden}
    .contact-modal__close{position:absolute;top:20px;right:20px;z-index:10;width:36px;height:36px;border-radius:50%;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.18);color:rgba(107,114,128,1);font-size:20px;line-height:1;display:grid;place-items:center;cursor:pointer;transform:rotate(45deg);transition:background .2s,color .2s}
    .contact-modal__close:hover{background:rgba(255,255,255,0.12);color:#fff}

    .cf-main{padding:clamp(32px,5vw,52px) clamp(24px,4vw,44px)}
    .cf-title{font-family:"Space Grotesk","Montserrat",sans-serif;font-size:clamp(22px,3vw,30px);font-weight:800;letter-spacing:-0.03em;color:#fff;margin-bottom:6px;line-height:1.15;padding-right:44px}
    .cf-sub{font-family:"Montserrat",sans-serif;font-size:14px;color:rgba(255,255,255,0.52);line-height:1.65;margin-bottom:28px}

    .cf-form{display:flex;flex-direction:column;gap:16px}
    .cf-field{display:flex;flex-direction:column;gap:7px}
    .cf-label-text{font-family:"Montserrat",sans-serif;font-size:11px;font-weight:600;letter-spacing:0.10em;text-transform:uppercase;color:rgba(235,235,235,0.48)}
    .cf-input{background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.14);border-radius:12px;padding:13px 16px;color:#fff;font-family:"Montserrat",sans-serif;font-size:14px;transition:border-color .2s;outline:none;width:100%}
    .cf-input::placeholder{color:rgba(255,255,255,0.26)}
    .cf-input:focus{border-color:rgba(232,146,10,0.5);background:rgba(232,146,10,0.025)}
    textarea.cf-input{min-height:108px;resize:vertical}

    .cf-chips{display:flex;flex-wrap:wrap;gap:7px}
    .cf-chip{display:flex;align-items:center;cursor:pointer}
    .cf-chip input{display:none}
    .cf-chip span{font-family:"Montserrat",sans-serif;font-size:12px;font-weight:600;letter-spacing:0.05em;padding:8px 14px;border-radius:999px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.12);color:rgba(235,235,235,0.5);transition:all .2s;user-select:none}
    .cf-chip input:checked + span{background:rgba(232,146,10,0.12);border-color:rgba(232,146,10,0.45);color:#E8920A}
    .cf-chip:hover span{border-color:rgba(255,255,255,0.24);color:rgba(235,235,235,0.8)}

    .cf-consents{display:flex;flex-direction:column;gap:9px}
    .cf-consent{display:flex;gap:10px;align-items:flex-start;cursor:pointer}
    .cf-consent input{margin-top:2px;accent-color:#E8920A;flex-shrink:0}
    .cf-consent span{font-size:13px;color:rgba(107,114,128,1);line-height:1.55}
    .cf-consent a{color:#E8920A;text-decoration:none}

    .cf-trap{display:none !important}
    .cf-footer{display:flex;align-items:center;gap:14px;flex-wrap:wrap;padding-top:4px}
    .cf-status{font-size:13px;font-family:"Montserrat",sans-serif}
    .cf-status.is-success{color:#34d399}
    .cf-status.is-error{color:#f87171}
    .cf-submit{display:inline-flex;align-items:center;justify-content:center;padding:13px 26px;border-radius:999px;border:none;background:#E8920A;color:#1a0800;font-weight:700;font-family:"Montserrat",sans-serif;font-size:14px;cursor:pointer;transition:background .2s,transform .2s,box-shadow .2s;box-shadow:0 8px 24px rgba(232,146,10,0.22)}
    .cf-submit:hover{background:#F5A822;transform:translateY(-1px);box-shadow:0 12px 32px rgba(232,146,10,0.30)}
    .cf-submit:disabled{opacity:0.6;cursor:not-allowed;transform:none}

    @media(max-width:600px){
      .cf-main{padding:28px 20px 32px}
      .cf-input{font-size:16px !important}
      .cf-footer{flex-direction:column;align-items:stretch}
      .cf-submit{width:100%}
      .cf-chips{gap:6px}
      .cf-chip span{font-size:11px;padding:8px 12px}
    }
  `;
  document.head.appendChild(style);

  document.body.insertAdjacentHTML('beforeend', `
  <div class="contact-modal" id="contactModal" aria-hidden="true">
    <div class="contact-modal__backdrop" data-close-form></div>
    <div class="contact-modal__dialog">
      <div class="contact-modal__content">
        <button class="contact-modal__close" type="button" aria-label="Закрыть" data-close-form>+</button>

        <div class="cf-main">
          <h2 class="cf-title">Обсудим вашу задачу</h2>
          <p class="cf-sub">Изучим текущие процессы и предложим варианты автоматизации и внедрения AI под вашу задачу.</p>

          <form class="cf-form" id="cfForm">

            <div class="cf-field">
              <span class="cf-label-text">Ваше имя *</span>
              <input class="cf-input" type="text" name="name" autocomplete="given-name" placeholder="Введите ваше имя" required/>
            </div>

            <div class="cf-field">
              <span class="cf-label-text">Что хотите улучшить?</span>
              <div class="cf-chips">
                <label class="cf-chip"><input type="checkbox" name="improve" value="Коммуникацию с клиентами"/><span>Коммуникацию с клиентами</span></label>
                <label class="cf-chip"><input type="checkbox" name="improve" value="Скорость внутренних процессов"/><span>Скорость внутренних процессов</span></label>
                <label class="cf-chip"><input type="checkbox" name="improve" value="Работу с документами"/><span>Работу с документами</span></label>
                <label class="cf-chip"><input type="checkbox" name="improve" value="Обработку и использование данных"/><span>Обработку и использование данных</span></label>
                <label class="cf-chip"><input type="checkbox" name="improve" value="Аналитику и прогнозирование"/><span>Аналитику и прогнозирование</span></label>
                <label class="cf-chip"><input type="checkbox" name="improve" value="Другое"/><span>Другое</span></label>
              </div>
            </div>

            <div class="cf-field">
              <span class="cf-label-text">Кратко опишите задачу *</span>
              <textarea class="cf-input" name="brief" required minlength="10" placeholder="Например: AI-ассистент для подготовки КП, парсинг конкурентов, генерация писем клиентам, обработка заявок или др."></textarea>
            </div>

            <div class="cf-field">
              <span class="cf-label-text">Telegram / телефон *</span>
              <input class="cf-input" type="text" name="contact" required autocomplete="tel" placeholder="@username или +7..."/>
            </div>

            <label class="cf-trap" aria-hidden="true">
              <span class="cf-label-text">Website</span>
              <input class="cf-input" type="text" name="website" tabindex="-1" autocomplete="off"/>
            </label>

            <div class="cf-consents">
              <label class="cf-consent">
                <input type="checkbox" name="policyAccepted" value="yes" required/>
                <span>Я ознакомился(ась) с <a href="/privacy.html" target="_blank" rel="noopener noreferrer">Политикой обработки персональных данных</a>.</span>
              </label>
              <label class="cf-consent">
                <input type="checkbox" name="consentAccepted" value="yes" required/>
                <span>Даю согласие на обработку моих персональных данных в соответствии с <a href="/consent.html" target="_blank" rel="noopener noreferrer">текстом согласия</a>.</span>
              </label>
            </div>

            <div class="cf-footer">
              <button class="cf-submit" type="submit" id="cfSubmitBtn">Получить консультацию</button>
              <p class="cf-status" id="cfStatus" aria-live="polite"></p>
            </div>

          </form>
        </div>
      </div>
    </div>
  </div>`);

  const modal     = document.getElementById('contactModal');
  const form      = document.getElementById('cfForm');
  const status    = document.getElementById('cfStatus');
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
        const data    = new FormData(form);
        const botTrap = String(data.get('website') || '').trim();

        if (botTrap !== '') {
          status.textContent = 'Запрос отправлен. Скоро свяжемся с вами.';
          status.className = 'cf-status is-success';
          form.reset();
          setTimeout(() => closeModal(), 900);
          return;
        }

        const payload = {
          name:            String(data.get('name') || '').trim(),
          improve:         data.getAll('improve'),
          brief:           String(data.get('brief') || '').trim(),
          contact:         String(data.get('contact') || '').trim(),
          policyAccepted:  data.get('policyAccepted') === 'yes',
          consentAccepted: data.get('consentAccepted') === 'yes',
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
        submitBtn.textContent = 'Получить консультацию';
      }
    });
  }
})();
