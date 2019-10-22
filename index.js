const express = require("express");
const bodyParser = require("body-parser");
const nodeMailer = require("nodemailer");
const exphbars = require('express-handlebars');
const path = require('path');
const app = express();

app.engine('handlebars', exphbars({
    extname: "handlebars",
    defaultLayout: "",
    layoutsDir: "",
}));

app.set('view engine', 'handlebars');

app.use('/public', express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.render('contact');
});



const config = {
    host: 'smtp.alterdata.com.br',
    port: 587,
    secure: false,
    auth: {
        user: 'matheus.franca@alterdata.com.br',
        pass: 'Matheus#eu2'
    }
};

app.post('/send', (req, res) => {
    let transporter = nodeMailer.createTransport(config);

    transporter.sendMail({
        from: `Matheus Ferreira <matheus.franca@alterdata.com.br>`, // sender address
        to: `${req.body.email}`, // list of receivers
        subject: 'Hello ✔', // Subject line
        text: `Segue uma cópia do seu feedback: ${req.body.mensagem}. 
        A RM² Agradeçe seu contato!` // Plain text body
    }, (error, info) => {
        if (error) {
            return console.log(error)
        } else {
            return console.log(info)
        }
    });

    console.log(req.body.anexo)
    transporter.sendMail({
        from: `Matheus Ferreira <matheus.franca@alterdata.com.br>`, // sender address
        to: `matheusfernandofreire@hotmail.com`, // list of receivers
        subject: 'Hello ?', // Subject line
        text: `Olá, o que tenho a dizer é: ${req.body.mensagem}! 
    Meu E-mail é ${req.body.email} e meu nome é ${req.body.name} e estou a disposição para mais informações.
        Obrigado!` // Plain text body
    }, (error, info) => {
        if (error) {
            return console.log(error)
        } else {
            return console.log(info)
        }
    });
});

app.listen(3000, () => console.log('Server started...'));
