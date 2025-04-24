# Nodejs + RabbitMq Estudo sobre mensageria

### Execução

Para executar esse projeto utilize os seguintes comandos

1 - `npm install` 

2 - `docker-compose up -d` Para subir o container com rabbitmq

3 - `tsc` para compilar o projeto

4 - Em um terminal `node dist/receive.js` para executar o arquivo do receptor

5 - Em outro terminal `node dist/send.js` ou `node dist/send.js mensagem` para executar o arquivo do receptor


## Acessar o painel de controle do rabbit mq

Para acessar o painel de controle do rabbitmq basta acessar a seguinte url: `http://localhost:8080`. Nesse painel é possivel visualizar diversas informações envolvendo seu servidor rabbitmq, como por exemplo quantidade de mensagens processadas, mensagens aguardando processamento, enviar uma nova mensagem atraves d painel etc.
