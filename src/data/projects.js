export const PROJECTS = [
  {
    id: 'tezis',
    num: '01',
    type: 'WEB APP',
    title: 'Tezis',
    description:
      'Веб-сервис для генерации презентаций с помощью AI. Пользователь описывает тему — модель собирает слайды, структуру и визуальный ряд.',
    stack: ['React', 'AI API', 'REST'],
    href: 'https://tezis.176.12.79.36.nip.io/',
    image: '/previews/Presentation_site.png',
    imagePosition: 'center 20%',
  },
  {
    id: '3dprint',
    num: '02',
    type: 'WEB APP',
    title: '3D Print Shop',
    description:
      'Интернет-магазин для студии 3D-печати: каталог моделей, корзина, оформление заказа и приём оплаты.',
    stack: ['React', 'Next.js', 'SQLite'],
    href: 'https://frontend-seven-omega-17.vercel.app/',
    image: '/previews/3d_shop.png',
    imagePosition: 'top',
  },
  {
    id: 'cyberpunk-bar',
    num: '03',
    type: 'LANDING',
    title: 'Neon Bar — Landing',
    description:
      'Одностраничный лендинг для японского бара в cyberpunk-эстетике: неон, глитчи, анимации и вайб ночного Токио.',
    stack: ['HTML', 'CSS', 'JS'],
    href: 'https://suvorovdv.github.io/Landing/',
    video: '/previews/landing_cyberpunk.mp4',
  },
  {
    id: 'ai-bot',
    num: '04',
    type: 'TELEGRAM BOT',
    title: 'AI Presentations Bot',
    description:
      'Telegram-бот для создания презентаций через AI прямо в чате: тема → готовый файл.',
    stack: ['Python', 'aiogram', 'AI API'],
    href: 'https://t.me/ai_presentations_test_bot',
    image: '/previews/ai_bot.svg',
  },
  {
    id: 'ticket-bot',
    num: '05',
    type: 'TELEGRAM BOT',
    title: 'Ticket Seller Bot',
    description:
      'Бот-магазин билетов на мероприятия: выбор события, места, оплата — всё внутри Telegram.',
    stack: ['Python', 'aiogram', 'SQL'],
    href: 'https://t.me/demo_ticket_seller_bot',
    image: '/previews/ticket_bot.svg',
  },
  {
    id: 'marketplace-bot',
    num: '06',
    type: 'TELEGRAM BOT',
    title: 'Marketplace Bot',
    description:
      'Бот-маркетплейс: витрина товаров с категориями, карточка товара, корзина, уведомления продавцу.',
    stack: ['Python', 'aiogram', 'PostgreSQL'],
    href: 'https://t.me/test_marketplace_kwork_bot',
    image: '/previews/marketplace_bot.svg',
  },
]
