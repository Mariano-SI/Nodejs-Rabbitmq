## Conceito de Mensageria

Mensageria é um modelo de comunicação entre sistemas distribuídos baseado em troca de mensagens, também chamadas de **eventos**. Essas mensagens são gerenciadas por um **Message Broker**, um servidor ou módulo especializado no roteamento e entrega de mensagens.

### Explicando de forma simples

Mensageria é uma maneira de fazer sistemas se comunicarem de forma **assíncrona**. Ou seja, diferente de uma chamada HTTP, onde um sistema espera a resposta do outro, na mensageria o sistema A envia uma mensagem para o B e **segue sua execução**, sem precisar aguardar a resposta.
É extremamente útil em casos onde sistemas devem se comunicar pois ações precisam ser realizadas mas que não é necessário que ela aconteça imediatamente e um sistema aguarde pelo outro, apenas é necessária uma garantia que ela vai acontecer.

#### Exemplo prático:

Imagine que o sistema A precisa solicitar o envio de um e-mail ao sistema B. Ao invés de esperar o B enviar o e-mail e confirmar que foi enviado, o sistema A apenas **publica um evento** e continua seu trabalho. Isso aumenta a eficiência do sistema. O message broker vai garantir que o evento aconteça ou nos informar caso não seja possível mas isso não vai mais impedir o fluxo de A

---
## Formas de Comunicação entre Sistemas

Além da mensageria, sistemas podem se comunicar de diversas formas:
- **Chamadas remotas** (REST, gRPC, SOAP etc.)
- **Banco de dados compartilhado**
- **Troca de arquivos** (em servidores, buckets S3, etc.)

Esses métodos têm limitações, como:

- Problemas de rede, energia, formatação
- Sobrecarga ou indisponibilidade do banco compartilhado
- Baixa escalabilidade

A mensageria surge como solução para tornar essa comunicação mais robusta, escalável e desacoplada.

![[Pasted image 20250423201454.png]]

---

## Arquitetura PUB/SUB

Na arquitetura **Publish/Subscribe (Pub/Sub)** temos dois papéis principais:
- **Publisher**: quem publica um evento/mensagem
- **Subscriber**: quem consome/escuta a mensagem

![[Pasted image 20250423195607.png]]
### Analogia com os Correios

Imagine duas pessoas. A primeira (Publisher) precisa entregar um pacote para a segunda (Subscriber). Se ela tentar entregar diretamente, pode enfrentar vários problemas: a outra pessoa não estar em casa, tempo perdido, etc. Uma solução é usar os Correios (Message Broker). Assim, a entrega é feita de forma assíncrona: a primeira pessoa segue sua rotina normalmente e a empresa de entrega se responsabiliza por garantir que a mensagem chegue ao destino.

---

## Exemplos de Message Brokers

- **Amazon SQS** (AWS)
- **Google Pub/Sub** (GCP)
- **Apache Kafka**
- **RabbitMQ**
- **BullMQ** (Node.js)
- **Azure Service Bus**

---

## Casos de Uso Comuns

- Envio de e-mails
- Registro de logs
- Processamento de imagens ou vídeos
- Integração com sistemas externos, como por exemplo, sistemas de pagamentos
- Geração de relatórios

Essas tarefas normalmente são **pesadas** e não precisam bloquear a resposta ao usuário. A mensageria permite tratá-las de forma assíncrona.

---

## Exemplo Prático: Sistema de Séries

Imagine um sistema de cadastro de séries:

1. O usuário cadastra uma nova série.
2. O sistema:
    - Salva no banco
    - Registra um log
    - Busca todos os usuários
    - Envia e-mails para todos eles

Esse fluxo é **lento** e prejudica a experiência do usuário.
![[Pasted image 20250423202739.png]]

### Solução com Mensageria

1. O sistema salva a nova série no banco
2. Publica um evento chamado `SeriesWasCreated` no Message Broker
3. Um ou mais consumidores:
    - Registram o log
    - Enviam os e-mails

Dessa forma, o endpoint responde rapidamente ao usuário e o trabalho pesado é feito em segundo plano.
![[Pasted image 20250423202958.png]]


---

## Dead Letter Queue (DLQ)

Uma **Dead Letter Queue** é uma fila usada para armazenar mensagens que **não puderam ser processadas** corretamente após várias tentativas. Isso permite:

- Garantir que a mensagem não será perdida
- Possibilitar auditoria e debugging
- Tomada de ação manual ou reprocessamento posterior


---

## Tecnologias e Implementações

- **RabbitMQ**: Simples de configurar, bastante utilizado 
- **Kafka**: Alta performance e tolerância a falhas, ideal para grandes volumes
- **BullMQ**: Biblioteca para filas em Node.js baseada no Redis
- **SQS (AWS)** ,**Pub/Sub (GCP)** e **Azure Service Bus**: Serviços gerenciados ideais para aplicações em nuvem

---
## Quando Considerar Mensageria

Você deve considerar o uso de mensageria nos seguintes cenários:

- Quando há necessidade de **desacoplar** partes do sistema
- Para tratar **tarefas demoradas ou pesadas** sem impactar a resposta ao usuário
- Quando múltiplos sistemas ou serviços precisam reagir a um mesmo evento
- Para **escalabilidade horizontal**, utilizando múltiplos consumidores para processar mensagens
- Em cenários onde é importante **garantir resiliência e tolerância a falhas**, com mecanismos de retry e DLQ
- Para garantir que tarefas críticas sejam executadas mesmo em caso de falhas transitórias (ex: envio de nota fiscal)
Mensageria **não é a solução ideal para todos os casos**, especialmente quando o retorno imediato da operação é necessário. Avalie sempre o custo de complexidade vs. os benefícios do modelo assíncrono.

---

## OBS: Comunicação entre Microsserviços não é Dependente de Mensageria

Embora mensageria seja uma abordagem muito comum e eficaz em arquiteturas de microsserviços, **nem toda comunicação entre microsserviços precisa ou deve ser feita via mensageria**.

Em muitos casos, os microsserviços se comunicam por meio de chamadas HTTP (REST) ou gRPC quando:

- A resposta da operação precisa ser imediata para o cliente
- Existe uma forte relação entre os serviços (ex: autenticação e autorização)
- A complexidade da mensageria não se justifica para a operação

### Quando preferir chamadas diretas:

- Operações de leitura com baixa latência
- Integrações simples entre poucos serviços
- Requisições síncronas onde o consumidor depende da resposta

### Quando preferir mensageria:

- Processos assíncronos e desacoplados
- Vários consumidores para o mesmo evento
- Alta tolerância a falhas e necessidade de retry

Portanto, o ideal é **combinar abordagens**, avaliando os requisitos de cada interação. A mensageria é poderosa, mas não substitui completamente a comunicação síncrona.

---
## Considerações Finais

O uso de mensageria traz diversos benefícios para a escalabilidade e manutenção de sistemas modernos:

- **Desacoplamento** entre produtores e consumidores de eventos
- **Escalabilidade horizontal** com múltiplos workers
- **Robustez** com mecanismos de retry e DLQs
- **Alta disponibilidade** e resiliência

Mensageria é uma **peça chave** na arquitetura de microsserviços e sistemas distribuídos modernos. Sua correta aplicação pode ser a diferença entre um sistema escalável e um gargalo de performance.


