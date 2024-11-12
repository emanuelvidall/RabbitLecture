const amqp = require("amqplib");
const dotenv = require("dotenv").config();

async function sendMessage() {
  let queue = "hello";
  let message = "Hello World";
  let url = process.env.AMQP;

  try {
    const connection = await amqp.connect(url);
    const channel = connection.createChannel();
    (await channel).assertQueue(queue, { durable: false });
    (await channel).sendToQueue(queue, Buffer.from(message));

    console.log(`Mensagem enviada: ${message}`);

    setTimeout(() => {
      connection.close();
      process.exit();
    }, 500);

    console.log("Aplicação encerrada");
  } catch (error) {
    console.error(error);
  }
}

sendMessage();
