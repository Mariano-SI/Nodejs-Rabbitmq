import amqp, { Connection, Channel } from 'amqplib';

// Função assíncrona do emissor das mensagens
const send = async () => {

  // Criando conexão com o RabbitMQ e criando um canal de comunicação
  const connection = await amqp.connect('amqp://localhost:5672');
  const channel: Channel = await connection.createChannel();

  // Definindo o nome da fila que iremos enviar os dados
  var queue = 'hello';

  // Recebendo mensagens através de parâmetros ou um 'Hello World' 
  // caso não existam
  var msg = process.argv[2] ?? 'Hello World';

  // assertQueue verifica existe. Se a fila ainda não existir, ela será 
  // criada com base nas opções fornecidas. Caso já exista, a função 
  // simplesmente garante que a fila está disponível para o produtor 
  // ou consumidor utilizar.
  await channel.assertQueue(queue, { durable: false });
  
  // sendToQueue simplesmente envia os dados para a fila definida.
  // A mensagem que está sendo enviada deve ser convertida em um 
  // buffer, pois o RabbitMQ trata as mensagens como binários.
  channel.sendToQueue(queue, Buffer.from(msg));

  console.log(` [x] Enviado: ${msg}`);

  // Fecha a conexão e encerra o script.
  setTimeout(() => {
    connection.close();
    process.exit(0);
  }, 500);
}
send();