window.siteContent = {
  meta: {
    title: "Aivion — AI-системы и автоматизация для бизнеса",
    description: "Проектирование AI-систем, автоматизации и внутренних цифровых контуров для бизнеса."
  },
  navigation: {
    desktop: ["Кейсы", "Услуги", "Обсудить задачу"],
    mobile: ["Кейсы", "Услуги", "Обсудить задачу"],
    menuToggle: "Открыть меню",
    modalClose: "Закрыть"
  },
  opening: {
    eyebrow: "AI-Автоматизация · IT-Разработка",
    titleHtml: "Внедряем <span class=\"title-accent\">ИИ</span> <br> в бизнес",
    lead: "Автоматизируем бизнес-процессы, оптимизируя ФОТ и снижая операционные расходы на 60–70% уже через пару недель",
    actions: ["Получить консультацию", "Посмотреть кейсы"],
  },
  heroPanels: [
    "Раньше под 9/10 задач приходилось нанимать людей",
    "Но рынок поменялся. Теперь их может выполнять ИИ",
    "Делая это быстрее и дешевле"
  ],
  services: {
    eyebrow: "Услуги",
    title: "Что мы делаем",
    cards: [
      {
        title: "AI и автоматизация",
        items: [
          "AI-ассистенты для команд и отделов",
          "автоматизация обработки заявок и документов",
          "разбор диалогов, брифов и входящих обращений",
          "контентные и аналитические AI-сценарии"
        ]
      },
      {
        title: "Системы и интерфейсы",
        items: [
          "сайты и landing pages с сильной подачей",
          "внутренние кабинеты, CRM и панели",
          "Telegram-боты и операционные интеграции",
          "архитектура данных, ролей и сценариев доступа"
        ]
      }
    ]
  },
  process: {
    eyebrow: "КАК МЫ РАБОТАЕМ",
    title: "Процесс внедрения",
    steps: [
      {
        title: "Аудит",
        text: "Погружаемся в процессы, находим точки автоматизации с максимальным RO"
      },
      {
        title: "ТЗ и ROI",
        text: "Пишем детальное описание системы, считаем экономию и срок окупаемости"
      },
      {
        title: "Пилот",
        text: "Собираем визуальный и технический слой, тестируем пользовательский сценарий и доводим запуск до рабочего состояния."
      },
      {
        title: "Разработка",
        text: "Помогаем не просто выпустить решение, а встроить его в реальную повседневную работу команды."
      },
      {
        title: "Поддержка",
        text: "Запускаем, обучаем команду, мониторим метрики и дорабатываем."
      }
    ]
  },
  quote: {
    textHtml: "Хороших людей не становится больше.<br><em>Но то, что они успевают —<br>можно увеличить.</em>",
    action: "Обсудить задачу"
  },
  footer: {
    tagline: "AI-системы, автоматизация и внутренние цифровые контуры — для команд, которые хотят работать умнее.",
    navTitle: "Навигация",
    navLinks: ["Кейсы", "Что делаем", "Написать нам"],
    copy: "© 2025 Aivion. Все права защищены.",
    legal: ["Политика персональных данных", "Согласие на обработку данных"]
  },
  modal: {
    eyebrow: "Запрос",
    title: "Обсудим задачу предметно",
    text: "Опишите задачу коротко и по сути. Мы используем только необходимые данные, чтобы связаться с вами и подготовить следующий шаг.",
    scopeTitle: "Что важно знать",
    scopeItems: [
      "обязательные поля сведены к минимуму",
      "согласие даётся отдельным действием",
      "политика доступна до отправки формы"
    ],
    fields: {
      firstName: "Имя *",
      company: "Компания",
      contact: "Контакт для связи *",
      contactPlaceholder: "Телефон, email или Telegram",
      contactMethod: "Предпочтительный канал",
      roleLegend: "Ваша роль",
      roles: ["Собственник", "Руководитель", "Маркетинг", "Другое"],
      customRole: "Уточните роль",
      details: "Кратко о задаче *",
      detailsPlaceholder: "Например: хотим сократить ручную обработку заявок и выстроить понятный контур работы с лидами"
    },
    contactMethods: ["Telegram", "Телефон", "Email", "WhatsApp"],
    policyHtml: "Я ознакомился(ась) с <a href=\"/privacy\" target=\"_blank\" rel=\"noopener noreferrer\">Политикой обработки персональных данных</a>.",
    consentHtml: "Даю согласие на обработку моих персональных данных в соответствии с <a href=\"/consent\" target=\"_blank\" rel=\"noopener noreferrer\">текстом согласия</a>.",
    legalNote: "Если вы не дадите согласие на обработку данных, мы не сможем обработать заявку.",
    submit: "Отправить запрос",
    messages: {
      required: "Проверьте обязательные поля.",
      submitting: "Отправляем...",
      sendError: "Ошибка отправки.",
      success: "Запрос отправлен. Скоро свяжемся с вами.",
      error: "Не удалось отправить запрос. Попробуйте снова.",
      submit: "Отправить запрос"
    }
  }
};

(function applySiteContent() {
  const content = window.siteContent;
  if (!content) return;

  const setText = (node, value) => {
    if (node && typeof value === "string") node.textContent = value;
  };

  const setHtml = (node, value) => {
    if (node && typeof value === "string") node.innerHTML = value;
  };

  const setTextList = (nodes, values) => {
    nodes.forEach((node, index) => setText(node, values[index]));
  };

  document.title = content.meta.title;
  const description = document.querySelector('meta[name="description"]');
  if (description) description.setAttribute("content", content.meta.description);

  const desktopNav = Array.from(document.querySelectorAll("header nav a"));
  const mobileNav = Array.from(document.querySelectorAll(".mobile-nav a"));
  setTextList(desktopNav, content.navigation.desktop);
  setTextList(mobileNav, content.navigation.mobile);
  document.getElementById("menuToggle")?.setAttribute("aria-label", content.navigation.menuToggle);
  document.querySelector(".contact-modal__close")?.setAttribute("aria-label", content.navigation.modalClose);

  setText(document.querySelector(".opening-inner .eyebrow"), content.opening.eyebrow);
  setHtml(document.querySelector(".opening-title"), content.opening.titleHtml);
  setText(document.querySelector(".opening-lead"), content.opening.lead);
  setTextList(Array.from(document.querySelectorAll(".opening-actions a")), content.opening.actions);
//  Array.from(document.querySelectorAll(".hero-stats .hero-stat")).forEach((card, index) => {
//    const item = content.opening.stats[index];
//    if (!item) return;
//    setText(card.querySelector(".stat-label"), item.label);
//    setText(card.querySelector(".stat-value"), item.value);
//  });
//
//  setTextList(Array.from(document.querySelectorAll(".hero-panel .hero-copy")), content.heroPanels);
//
//  setText(document.querySelector(".intro-text h2"), content.intro.title);
//  setText(document.querySelector(".intro-text p"), content.intro.text);
//  Array.from(document.querySelectorAll(".promise-card")).forEach((card, index) => {
//    const item = content.intro.cards[index];
//    if (!item) return;
//    setText(card.querySelector("h3"), item.title);
//    setText(card.querySelector("p"), item.text);
//  });
//  setText(document.querySelector(".shared-wrap .section-action .btn"), content.intro.action);

  setText(document.querySelector("#services .section-heading .eyebrow"), content.services.eyebrow);
  setText(document.querySelector("#services .section-heading h2"), content.services.title);
  setText(document.querySelector("#services .section-heading .section-text"), content.services.text);
  Array.from(document.querySelectorAll("#services .service-card")).forEach((card, index) => {
    const item = content.services.cards[index];
    if (!item) return;
    setText(card.querySelector("h3"), item.title);
    setTextList(Array.from(card.querySelectorAll("li")), item.items);
  });

  setText(document.querySelector("#process .section-heading .eyebrow"), content.process.eyebrow);
  setText(document.querySelector("#process .section-heading h2"), content.process.title);
  Array.from(document.querySelectorAll(".process-step")).forEach((step, index) => {
    const item = content.process.steps[index];
    if (!item) return;
    setText(step.querySelector("h3"), item.title);
    setText(step.querySelector("p"), item.text);
  });

  setHtml(document.querySelector(".quote-break__text"), content.quote.textHtml);
  setText(document.querySelector(".quote-break .btn"), content.quote.action);

  setText(document.querySelector(".footer-tagline"), content.footer.tagline);
  const footerNavColumn = document.querySelector(".footer-nav-group .footer-col");
  if (footerNavColumn) {
    setText(footerNavColumn.querySelector(".footer-col-title"), content.footer.navTitle);
    setTextList(Array.from(footerNavColumn.querySelectorAll(".footer-links a")), content.footer.navLinks);
  }
  setText(document.querySelector(".footer-copy"), content.footer.copy);
  setTextList(Array.from(document.querySelectorAll(".footer-legal a")), content.footer.legal);

  setText(document.querySelector(".contact-side .eyebrow"), content.modal.eyebrow);
  setText(document.querySelector(".contact-side h2"), content.modal.title);
  setText(document.querySelector(".contact-side .section-text"), content.modal.text);
  setText(document.querySelector(".contact-scope h3"), content.modal.scopeTitle);
  setTextList(Array.from(document.querySelectorAll(".contact-scope li")), content.modal.scopeItems);

  const form = document.getElementById("contactForm");
  if (form) {
    const firstNameField = form.querySelector('input[name="firstName"]')?.closest(".field");
    const companyField = form.querySelector('input[name="company"]')?.closest(".field");
    const contactField = form.querySelector('input[name="contact"]')?.closest(".field");
    const methodField = form.querySelector('select[name="contactMethod"]')?.closest(".field");
    const customRoleField = document.getElementById("customRoleField");
    const detailsField = form.querySelector('textarea[name="details"]')?.closest(".field");

    setText(firstNameField?.querySelector("span"), content.modal.fields.firstName);
    setText(companyField?.querySelector("span"), content.modal.fields.company);
    setText(contactField?.querySelector("span"), content.modal.fields.contact);
    form.querySelector('input[name="contact"]')?.setAttribute("placeholder", content.modal.fields.contactPlaceholder);
    setText(methodField?.querySelector("span"), content.modal.fields.contactMethod);
    setText(form.querySelector(".choice-group legend"), content.modal.fields.roleLegend);
    Array.from(form.querySelectorAll('.choice-chip span')).forEach((node, index) => {
      setText(node, content.modal.fields.roles[index]);
    });
    setText(customRoleField?.querySelector("span"), content.modal.fields.customRole);
    setText(detailsField?.querySelector("span"), content.modal.fields.details);
    form.querySelector('textarea[name="details"]')?.setAttribute("placeholder", content.modal.fields.detailsPlaceholder);

    Array.from(form.querySelectorAll('select[name="contactMethod"] option')).forEach((node, index) => {
      setText(node, content.modal.contactMethods[index]);
    });

    const consentText = form.querySelectorAll(".consent-check span");
    setHtml(consentText[0], content.modal.policyHtml);
    setHtml(consentText[1], content.modal.consentHtml);
    setText(form.querySelector(".form-legal-note"), content.modal.legalNote);
    setText(document.getElementById("submitButton"), content.modal.submit);
  }

  window.formMessages = content.modal.messages;
})();
