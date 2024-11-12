const amqp = require("amqplib");
const dotenv = require("dotenv").config();

let url = process.env.AMQP;

async function receiveMessage() {
  let queue = "hello";

  try {
    const connection = amqp.connect(url);
    const channel = await (await connection).createChannel();
    await channel.assertQueue(queue, { durable: false });

    await channel.consume(
      queue,
      (msg) => {
        console.log(`Mensagem recebida: ${msg.content.toString()}`);
      },
      {
        noAck: true,
      }
    );
  } catch (error) {
    console.log(error);
  }
}

receiveMessage();
