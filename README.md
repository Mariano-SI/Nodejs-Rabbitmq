# Nodejs + RabbitMq Estudo sobre mensageria

### Execução

Para executar esse projeto utilize os seguintes comandos

1 - `npm install`
2 - `docker-compose up -d` Para subir o container com rabbitmq
3 - `tsc` para compilar o projeto
4 - Em um terminal `node dist/receive.js` para executar o arquivo do receptor
5 - Em outro terminal `node dist/send.js` ou `node dist/send.js mensagem` para executar o arquivo do receptor