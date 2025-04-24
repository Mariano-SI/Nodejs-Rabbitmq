import amqp, { Channel } from 'amqplib';

// Função assíncrona do receptor das mensagens
const receive = async () => {
  
  // Criando conexão com o RabbitMQ e criando um canal de comunicação
  const connection = await amqp.connect('amqp://localhost:5672');
  const channel: Channel = await connection.createChannel();
     
  // Definindo o nome da fila que iremos receber os dados
  var queue = 'hello';
  
  // assertQueue verifica existe. Se a fila ainda não existir, ela será 
  // criada com base nas opções fornecidas. Caso já exista, a função 
  // simplesmente garante que a fila está disponível para o produtor 
  // ou consumidor utilizar.
  await channel.assertQueue(queue, { durable: false });
 
  console.log(` [*] Esperando por mensagens na fila ${queue}. Pressione CTRL+C para sair.`);
  
  // Consumindo as mensagens recebidas e exibindo-as na tela
  channel.consume(queue, (msg) => {
    console.log(` [x] Recebido ${msg?.content.toString()}`);
  }, { noAck: true });
}

receive();