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

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.render('contact');
});

app.post('/send', (req, res) =>{
    console.log(req.body)
});

const config = {
    host: 'smtp.mailtrap.io',
    port: 25,
    auth: {
        user: '308cc2cf95a562',
        pass: '4874696cdb437f'
    }
};
let transporter = nodeMailer.createTransport(config);
app.listen(3000, () => console.log('Server started...'));
