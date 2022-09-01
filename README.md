# apiNews
Разработка бэкенда для проекта (news)

# description
Api для авторизации и работы с новостными карточками (добавлением, просмотром, удалением).

Домены проекта: 
* https://apinews.ra404.ru Sorry, these links are no longer available
* https://www.apinews.ra404.ru Sorry, these links are no longer available
* http://apinews.ra404.ru Sorry, these links are no longer available
* http://www.apinews.ra404.ru Sorry, these links are no longer available

# API 
* запрос GET /users/me возвращает залогиненного пользователя
* запрос POST /signup создаёт пользователя
* запрос POST /signin осуществляет авторизацию пользователя
* запрос GET /articles возвращает все карточки всех пользователей
* запрос POST /articles создаёт карточку
* запрос DELETE /articles/:Id удаляет карточку

## How to install
1. Склонировать проект
* git clone git@github.com:RA404/apiNews.git
2. Установите зависимости
* npm install
3. Установить mongodb
4. Установить mongoose для взаимодействия с mongodb
* npm i mongoose
5. Запустить mongo
* Зайти в папку bin mongodb
* В терминале запустить команду $ mongod --dbpath <путь к базе данных>
* В новом окне терминала запустить команду mongo
6. Запустить сервер в среде для разработки
* Из папки с проектом запустить команду npm run dev
7. Запустить продакшн версию
* Из папки с проектом запустить команду npm run start

# Project link 
[https://github.com/RA404/apiNews](https://github.com/RA404/apiNews) Sorry, these links are no longer available

## Version v0.0.1
v0.0.1 - первая версия проекта
