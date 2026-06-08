# Predix

### Global Solution 2026.1 — Cross-Platform Application Development | FIAP

<p align="center">
  <img src="./assets/logoPredix.png" alt="Predix Logo" width="250"/>
</p>

---

# a) Descrição do Projeto

O **Predix** é uma plataforma inteligente de monitoramento espacial desenvolvida para centralizar informações críticas de uma missão em um único ambiente. A solução reúne indicadores relacionados ao combustível da nave, sensores operacionais e estabilidade orbital, permitindo que dados importantes sejam visualizados de forma rápida e organizada. Dentro do contexto de **Space Predictive Analytics**, o aplicativo auxilia na identificação de situações críticas por meio de dashboards analíticos e alertas automáticos, apoiando a tomada de decisão em ambientes de alta complexidade. Como diferencial, o Predix combina monitoramento em tempo real com interpretação inteligente por Inteligência Artificial dos dados da missão, proporcionando uma visão mais completa e estratégica das operações espaciais.

---

# b) Integrantes

| Nome | RM |
|--------|--------|
| Isabelle Dias Belini | RM 566464 |
| Júlia Souza Marques | RM 565010 |
| Manoella dos Santos Ginez | RM 564469 |

---

# c) Telas do Aplicativo

## Login

![Login](.\assets\login.jpeg)

Tela responsável pela autenticação dos usuários antes do acesso à missão.

---

## Cadastro de Usuário

![Cadastro](.\assets\cadastro.jpeg)

Permite o cadastro de novos usuários na plataforma.

---
## Entrar em uma Missão

![Missão](.\assets\entrarMissao.jpeg)

Tela utilizada para acessar os dashboards de uma missão espacial.

---
## Cadastro de Missão

![Missão (01)](.\assets\cadastroMissao.jpeg)
![Missão (02)](.\assets\cadastroMissao2.jpeg)

Tela utilizada para criação e configuração inicial da missão espacial.

---

## Dashboard Principal

![Dashboard](.\assets\inicioDashboard.jpeg)

Visão geral dos principais indicadores da missão, incluindo combustível, sensores, dados orbitais e previsão inteligente.

---

## Dashboard de Combustível

![Combustível](.\assets\combustivelDashboard.jpeg)

Monitoramento do nível de combustível e autonomia estimada da missão.

---

## Dashboard de Sensores

![Sensores](.\assets\sensoresDashboard.jpeg)

Acompanhamento dos sensores críticos da nave e dos sistemas monitorados.

---

## Dashboard de Órbita

![Órbita](.\assets\orbitaDashboard.jpeg)

Visualização da estabilidade orbital e parâmetros relacionados à trajetória da missão.

---

# d) Funcionalidades

- [x] Sistema de autenticação
- [x] Cadastro de usuários
- [x] Cadastro de missão espacial
- [x] Dashboard principal
- [x] Dashboard de combustível
- [x] Dashboard de sensores
- [x] Dashboard de órbita
- [x] Sistema de alertas automáticos
- [x] Persistência de dados com AsyncStorage
- [x] Context API para gerenciamento global
- [x] Navegação com Expo Router
- [x] Interface temática espacial
- [x] Animações utilizando Animated API
- [x] Previsão inteligente dos dados da missão

---

# e) Tecnologias Utilizadas

- React Native
- Expo
- Expo Router
- JavaScript
- Context API
- AsyncStorage
- React Native Animated API
- Expo Linear Gradient
- React Native SVG
- React Native Chart Kit
- Groq API (Llama 3.1)

---

# f) Como Rodar o Projeto

Siga as instruções abaixo para configurar o ambiente e executar o projeto em sua máquina.

## Pré-requisitos

Antes de começar, certifique-se de possuir instalado:

- Node.js (versão 18 ou superior)
- npm
- Git
- Expo Go (Android ou iOS)

## Clonar o Repositório

```bash
git clone https://github.com/jumarques03/fiap-cpad-gs-predix.git
```

## Acessar a Pasta do Projeto

```bash
cd fiap-cpad-gs-predix
```

## Instalar Dependências

```bash
npm install
```

## Executar o Projeto

```bash
npx expo start
```

## Abrir o Aplicativo

- Escaneie o QR Code utilizando o Expo Go no celular.
- Ou execute em um emulador Android/iOS.

---

# g) Decisões Técnicas

## Estrutura do Projeto

O aplicativo foi desenvolvido utilizando o Expo Router, permitindo uma organização modular das rotas e uma separação clara entre autenticação, configuração da missão e dashboards da aplicação.

### Estrutura principal

```text
app/
├── (auth)
├── (mission)
├── (tabs)
├── dashboards
├── alerts

context/
components/
assets/
services/
```

## Contexts Utilizados

### AuthContext

Responsável por:

- Cadastro de usuários
- Login
- Logout
- Persistência de sessão

### MissionContext

Responsável por:

- Cadastro das missões
- Dados gerais da missão
- Combustível
- Energia
- Sensores
- Informações orbitais

## Persistência com AsyncStorage

O AsyncStorage foi utilizado para armazenar:

- Usuários cadastrados
- Sessão ativa
- Dados da missão
- Histórico de alertas
- Configurações do sistema

# h) Vídeo de Demonstração

[Clique aqui para assistir à demonstração](LINK_DO_VIDEO)

---

# i) Licença

Este projeto foi desenvolvido para fins acadêmicos como parte da disciplina **Cross-Platform Application Development** da FIAP — Global Solution 2026.1.