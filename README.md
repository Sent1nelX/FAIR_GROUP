# FAIR GROUP — сайт оптового магазина женской одежды

Небольшой статический сайт-витрина с разделами: Главная, О нас, Каталог, Этапы работы, Контакты.

### Стек
- HTML5, CSS3 (+ Pico.css CDN), JS (vanilla)
- Шрифты: Google Fonts (`Inter`)

### Структура проекта
```
about.html       — страница О нас
catalog.html     — каталог товаров с фильтрами (клиентская логика в catalog.js)
contact.html     — контакты и форма обратной связи (логика в contact.js)
index.html       — главная страница
process.html     — этапы работы (анимации в process.js)
styles.css       — общие стили и адаптив
script.js        — базовые эффекты, меню, анимации, UX-utilities
logo.svg/png     — логотипы
server_test.html — вспомогательная страница для проверки стенда
README.md        — текущий файл
```

### Запуск локально
1. Откройте `index.html` в браузере (двойной клик) или поднимите легкий сервер:
   - Node: `npx serve .` или `npx http-server .`
   - Python: `python -m http.server 8080`
2. Убедитесь, что все страницы доступны по относительным ссылкам.

### Сборка/деплой
Проект статический — деплой на любой статический хостинг (GitHub Pages, Vercel, Netlify, Nginx/Apache). Достаточно разместить файлы из корня.

### Разработка
- Скрипты подключены с `defer` (рекомендуется оставить для скорости рендера).
- Изображения используют `loading="lazy"` и фиксированные размеры для стабильного лейаута.
- Контакты в футере кликабельны (`tel:`, `mailto:`). Соцсети открываются в новой вкладке.
- Стили адаптированы под мобильные устройства (медиа-запросы в `styles.css`).

### Доступность и производительность
- Семантические заголовки (по одному `h1` на страницу, логичная иерархия).
- Фокус-стили для интерактивных элементов.
- Плавная прокрутка и компенсация высоты фиксированной шапки в JS.

---

### License / Лицензия

Sent1nelX Proprietary / Closed Demo License

Copyright (c) 2025 Sent1nelX

This software and its accompanying materials (the "Software") are proprietary and provided solely for DEMONSTRATION and EVALUATION purposes by the copyright holder.

You are granted a limited, non-exclusive, non-transferable right to view, test, and evaluate the Software in its current form for demonstration purposes only. Any other use — including but not limited to copying, modifying, distributing, sublicensing, commercial exploitation, reverse engineering, embedding into other software, or public deployment — is strictly prohibited without explicit written permission from the copyright holder.

The Software is provided "AS IS", without any warranties or guarantees of any kind, whether express or implied, including but not limited to the implied warranties of merchantability, fitness for a particular purpose, and non-infringement. The copyright holder shall not be liable for any damages arising from the use of or inability to use this Software.

For licensing inquiries or permissions, please contact:
Telegram: https://t.me/Suli0905

---

РУССКАЯ ВЕРСИЯ (для удобства, юридически эквивалентна английской)

Лицензия на демонстрационное использование (Sent1nelX Proprietary / Closed Demo License)

Copyright (c) 2025 Sent1nelX

Данное программное обеспечение и сопутствующие материалы (далее — «Программное обеспечение») являются собственностью правообладателя и предоставляются исключительно для целей ДЕМОНСТРАЦИИ и ОЦЕНКИ.

Вам предоставляется ограниченное, неисключительное и непередаваемое право на просмотр, тестирование и ознакомление с Программным обеспечением в текущем виде исключительно в демонстрационных целях. Любое иное использование — включая, но не ограничиваясь, копирование, изменение, распространение, сублицензирование, коммерческое использование, декомпиляцию, интеграцию в иные продукты или публичное размещение — строго запрещено без предварительного письменного разрешения правообладателя.

Программное обеспечение предоставляется «КАК ЕСТЬ» без каких-либо гарантий, явных или подразумеваемых, включая, но не ограничиваясь, гарантии пригодности для конкретных целей или ненарушения прав третьих лиц. Правообладатель не несёт ответственности за какие-либо убытки, возникшие в результате использования или невозможности использования данного Программного обеспечения.

Для получения разрешения или заключения лицензионного соглашения свяжитесь:
Telegram: https://t.me/Suli0905
