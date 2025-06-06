const express = require('express');
const nodemailer = require('nodemailer');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('.'));

app.post('/register', async (req, res) => {
    const {
        last_name,
        first_name,
        phone,
        email,
        is_military,
        position,
        about,
    } = req.body;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'andrii.burdak@nure.ua',
            pass: 'olmp hitu xudw hpeu ',
        },
    });
    const message = `
    Дякую за заповнення заявки на нашому сайті, 
    Ваша заявки наразі знаходиться в обробці, 
    в найближчому часі з Вами зв'яжеться наш рекрутер

    Ось дані з Вашої заявки:
    Прізвище: ${last_name}
    Ім'я: ${first_name}
    Телефон: ${phone}
    Email: ${email || 'Не вказано'}
    Військовий статус: ${is_military === 'yes' ? 'Військовий' : 'Цивільний'}
    Бажана посада: ${position}
    Додатково: ${about || 'Немає'}
  `;

    try {
        await transporter.sendMail({
            from: 'alexderipasko0@gmail.com',
            to: email,
            subject: 'Заявка на вступ до 7го армійського корпусу',
            text: message,
        });

        res.send('Заявку відправлено! Очікуйте відповідь.');
    } catch (err) {
        res.status(500).send('Помилка при відправці: ' + err.message);
    }
});

app.listen(3000, () => {
    console.log('Сервер працює: http://localhost:3000');
});
