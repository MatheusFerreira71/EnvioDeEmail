function enviarEmail() {
    const app = require("express")();

    const nome = document.getElementById('inputNome').value;
    const email = document.getElementById('inputEmail').value;
    const mensagem = document.getElementById('FeedBackMessage').value;
    const bodyParser = require("body-parser");

    const nodeMailer = require("nodemailer");

    const config = {
        host: 'smtp.mailtrap.io',
        port: 25,
        auth: {
            user: '308cc2cf95a562',
            pass: '4874696cdb437f'
        }
    };

    const transporter = nodeMailer.createTransport(config);


    app.use(bodyParser.json());

    app.post("/send-email", (req, res) => {
        const message = {
            from: email,
            to: "matheusfernandofreire@hotmail.com",
            subject: "Mensagem de feedback",
            text: `Olá, meu nome é ${nome} e esse é meu feedback: ${mensagem}`
        }

        transporter.sendMail(message, (error, info) => {
            if(error){
                return res.status(400).send('falhou.');
            }else{
                return res.status(200).send('enviou');
            }
        });
        return res.status(200).end();
    });

    app.listen(3000);
}

