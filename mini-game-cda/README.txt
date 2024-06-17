### Documentação do Projeto: Mini Jogo de Sequência de Letras

#### Visão Geral

Este documento descreve um mini jogo desenvolvido em React que desafia os jogadores a seguir uma sequência de letras aleatórias. O jogo inclui um timer, feedback instantâneo sobre acertos e erros, controle de tentativas e pontuações altas salvas localmente.

#### Funcionalidades Principais

1. **Geração de Sequência Aleatória:**
   - Ao iniciar o jogo, uma sequência de 10 letras aleatórias é gerada. As letras são escolhidas aleatoriamente do alfabeto (A-Z).

2. **Timer de Jogo:**
   - O jogo possui um timer de 30 segundos. Os jogadores devem completar a sequência antes que o tempo acabe. Se o tempo se esgotar, o jogo é encerrado automaticamente.

3. **Feedback de Acertos e Erros:**
   - Quando o jogador pressiona a tecla correta da sequência, um feedback de "Você acertou!" é exibido.
   - Se o jogador pressionar a tecla errada, um feedback de "Chave errada!" é exibido imediatamente.

4. **Controle de Tentativas:**
   - Os jogadores têm um máximo de 3 tentativas para completar a sequência corretamente. Se excederem esse número de tentativas, o jogo é encerrado.

5. **Pontuações Altas:**
   - As pontuações mais altas são salvas localmente usando o armazenamento do navegador. Após cada jogo, a pontuação é calculada com base na quantidade de letras corretamente sequenciadas menos o número de tentativas erradas. As cinco pontuações mais altas são exibidas ao final do jogo.

6. **Reinício do Jogo:**
   - Os jogadores têm a opção de reiniciar o jogo a qualquer momento, pressionando o botão "Reiniciar".

#### Componentes

O projeto é estruturado em diversos componentes React para melhor organização e reutilização de código:

- **Game:** Componente principal que gerencia o estado do jogo, contém a lógica principal e rendereiza os componentes filhos.
  
- **Sequence:** Componente que renderiza a sequência de letras na tela, indicando qual letra o jogador deve pressionar em seguida.
  
- **Timer:** Componente responsável por exibir e atualizar o timer do jogo.

- **Feedback:** Componente para exibir mensagens de feedback ao jogador, como "Você acertou!" ou "Chave errada!".

#### Uso

Para utilizar este projeto, siga as etapas abaixo:

1. **Instalação das Dependências:**
   - Certifique-se de ter o Node.js instalado no seu sistema.
   - Clone o repositório do projeto e navegue até o diretório raiz.
   - Execute `npm install` para instalar todas as dependências necessárias.

2. **Execução do Jogo:**
   - Após a instalação das dependências, execute `npm start`.
   - O jogo será carregado em seu navegador padrão. Certifique-se de permitir a execução de scripts se solicitado.

3. **Interagindo com o Jogo:**
   - Pressione qualquer tecla para iniciar o jogo.
   - Siga a sequência de letras exibidas na tela, pressionando cada letra na ordem correta.
   - Receba feedback imediato sobre seus acertos e erros.
   - Ao completar a sequência corretamente ou exceder o número máximo de tentativas, o jogo será encerrado.
   - Visualize suas pontuações mais altas após o término do jogo e tenha a opção de reiniciar.

#### Tecnologias Utilizadas

- **React:** Biblioteca JavaScript para construção de interfaces de usuário.
  
- **JavaScript (ES6+):** Uso de sintaxe moderna para desenvolvimento de funcionalidades.

- **HTML e CSS:** Estruturação e estilização básica da aplicação.

- **LocalStorage:** Armazenamento local no navegador para salvar as pontuações mais altas.

#### Conclusão

Este mini jogo oferece uma experiência divertida e desafiadora para os jogadores, incentivando-os a melhorar suas habilidades de memória e velocidade de reação. A estrutura modular e a lógica de programação utilizadas permitem uma fácil expansão e personalização do jogo, conforme necessário.
