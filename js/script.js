

//animação da tela preta de inicio.
let telaPreta = document.querySelector(".tela-preta")

setTimeout(() => {
  telaPreta.style.opacity = "0"
}, 1000);

setTimeout(() => {
  telaPreta.style.display = "none"
}, 2100);

//--------------------------------------------relogio-da-tela-de-bloqueio-------------------------------------------

function relogio(){
    var dt = new Date();
    var semana = dt.getDay();
    var dia = dt.getDate();
    var mes = dt.getMonth();
    var hours = dt.getHours();
    var min = dt.getMinutes();

    let strhora = new String(hours);
    let strmin = new String(min);

    if (strhora.length == 1) hours = "0" + hours;
    if (strmin.length ==1) min = "0" + min;
    
    var meses=new Array("January","February","March","April","May","June","July","August","September","October","November","December");
    var semanas=new Array("Sunday","Monday","Tuesday","Wednesday","Thurday","Friday","Saturday");

    let hoursSUP = document.querySelector('.text-bar');
    let dayweek = document.querySelector('.dias-da-semana');
    let hoursIphone = document.querySelector('.horas');

    var Hous1 = semanas[semana] + "," + " " + dia + " " + meses[mes];
    var Hours2 = hours+":"+min;
    dayweek.innerHTML = Hous1;
    hoursIphone.innerHTML = Hours2;
    hoursSUP.innerHTML = Hours2;
}
setInterval(relogio,1000)


//--------------------------------------------animação-widget-painel-camaera---------------------------------

let initialX = 0;
let initialY = 0;
let currentPosX = 0;
let currentPosY = 0;
let isDraggingAction = false;
let isSwipeVertical = false;
let targetDiv = null;

// Função para iniciar o arraste
function startDragAction(e, div) {
    initialX = e.touches[0].clientX;
    initialY = e.touches[0].clientY;
    isDraggingAction = true;
    isSwipeVertical = false;
    targetDiv = div;
}

// Função para acompanhar o movimento do dedo
function handleDragAction(e) {
    if (!isDraggingAction) return;

    currentPosX = e.touches[0].clientX;
    currentPosY = e.touches[0].clientY;

    let deltaX = currentPosX - initialX;
    let deltaY = currentPosY - initialY;

    // Determinar se o movimento é principalmente vertical ou horizontal
    if (!isSwipeVertical) {
        if (Math.abs(deltaY) > Math.abs(deltaX)) {
            isSwipeVertical = true;
        }
    }

    if (isSwipeVertical) {
        // Movimento vertical - acionar a função correspondente
        console.log("Movimento vertical detectado");

        // Exemplo de função para deslizar para cima
        if (deltaY < -50) {
            console.log("Deslizou para cima");
            // Coloque sua função para deslizar para cima aqui
        }

        // Exemplo de função para deslizar para baixo
        if (deltaY > 50) {
            console.log("Deslizou para baixo");
            // Coloque sua função para deslizar para baixo aqui
        }

    } else {
        // Movimento horizontal - seguir com a lógica de arraste das divs
        if (targetDiv === 'widgets' || targetDiv === 'painel-camera') {
            document.querySelector(`.${targetDiv}`).style.transform = `translateX(${deltaX}px)`;
        } else {
            document.querySelector('.widgets').style.transform = `translateX(${Math.min(deltaX - 100, 0)}px)`;
            document.querySelector('.painel-camera').style.transform = `translateX(${Math.max(deltaX + 100, 0)}px)`;
        }
    }
}

// Função para finalizar o arraste e aplicar a animação
function endDragAction() {
    if (!isDraggingAction) return;
    isDraggingAction = false;

    let deltaX = currentPosX - initialX;
    let deltaY = currentPosY - initialY;

    if (!isSwipeVertical) {
        if (targetDiv === 'widgets' && deltaX > 50) {
            // Arraste para a direita - mover widgets de volta para fora
            document.querySelector('.widgets').style.transform = 'translateX(-100%)';
        } else if (targetDiv === 'widgets' && deltaX < -50) {
            // Arraste para a esquerda - manter widgets no centro
            document.querySelector('.widgets').style.transform = 'translateX(0)';
        } else if (targetDiv === 'painel-camera' && deltaX < -50) {
            // Arraste para a esquerda - mover painel-camera de volta para fora
            document.querySelector('.painel-camera').style.transform = 'translateX(100%)';
        } else if (targetDiv === 'painel-camera' && deltaX > 50) {
            // Arraste para a direita - manter painel-camera no centro
            document.querySelector('.painel-camera').style.transform = 'translateX(0)';
        } else if (targetDiv === 'conteudo-tela-de-bloqueio') {
            if (deltaX > 50) {
                // Swipe Right - Mover a div da esquerda sobre a central
                document.querySelector('.widgets').style.transform = 'translateX(100%)';
            } else if (deltaX < -50) {
                // Swipe Left - Mover a div da direita sobre a central
                document.querySelector('.painel-camera').style.transform = 'translateX(-100%)';
            } else {
                // Nenhum movimento significativo - resetar as posições
                document.querySelector('.widgets').style.transform = 'translateX(-100%)';
                document.querySelector('.painel-camera').style.transform = 'translateX(100%)';
            }
        }
    }

    targetDiv = null;
}

// Adicionar os event listeners para cada div
document.querySelector('.conteudo-tela-de-bloqueio').addEventListener('touchstart', (e) => startDragAction(e, 'conteudo-tela-de-bloqueio'));
document.querySelector('.widgets').addEventListener('touchstart', (e) => startDragAction(e, 'widgets'));
document.querySelector('.painel-camera').addEventListener('touchstart', (e) => startDragAction(e, 'painel-camera'));

document.addEventListener('touchmove', handleDragAction);
document.addEventListener('touchend', endDragAction);

//--------------------------------------------barra-branca-comando-------------------------------------------
// Seleciona os elementos necessários
const containerConteudo = document.getElementById('conteudo-tela-de-bloqueio');
const barraComando = document.getElementById('container-barra-branca-comando');

let isDragging = false; // Flag para verificar se está arrastando
let StartY = 0; // Posição inicial do clique ou toque
let currentTop = 0; // Posição atual do topo
let containerHeight = containerConteudo.offsetHeight; // Altura do container

// Evento para iniciar o arraste com o mouse
barraComando.addEventListener('mousedown', (event) => {
    isDragging = true;
    StartY = event.clientY;
    event.preventDefault(); // Previne comportamentos padrões
});

// Evento para iniciar o arraste no toque, com passive: false
barraComando.addEventListener('touchstart', (event) => {
    isDragging = true;
    StartY = event.touches[0].clientY;
    event.preventDefault(); // Previne o comportamento padrão de rolagem
}, { passive: false }); // Define passive: false para permitir preventDefault

// Movimentação com o mouse
document.addEventListener('mousemove', (event) => {
    if (isDragging) {
        const deltaY = event.clientY - StartY; // Diferença do movimento
        if (deltaY < 0) { // Somente movimento para cima
            containerConteudo.style.top = `${currentTop + deltaY}px`;
        }
    }
});

// Movimentação com toque, com passive: false
document.addEventListener('touchmove', (event) => {
    if (isDragging) {
        const deltaY = event.touches[0].clientY - StartY; // Diferença do movimento
        if (deltaY < 0) {
            containerConteudo.style.top = `${currentTop + deltaY}px`;
            event.preventDefault(); // Previne o comportamento padrão de rolagem
        }
    }
}, { passive: false }); // Define passive: false para permitir preventDefault

// Função para animar a saída da div suavemente
function continueSlidingUp() {
    const currentPos = parseFloat(containerConteudo.style.top) || 0;
    const targetPos = -containerHeight; // Posição alvo para sair da tela

    if (currentPos > targetPos) {
        // Suavização do movimento
        containerConteudo.style.top = `${currentPos - 10}px`; // Ajusta a velocidade da subida
        requestAnimationFrame(continueSlidingUp);
    } else {
        containerConteudo.style.top = `${targetPos}px`; // Garante que saia completamente
        
        // Lógica para quando a div saiu da tela e a animação terminou
        onSlideComplete();
    }
}

// Função chamada quando a animação termina e a div sai da tela
function onSlideComplete() {
    // Exemplo de alteração de z-index em outra div
    const carrosselDeDivs = document.querySelector('.carrossel-de-divs');
    if (carrosselDeDivs) {
        carrosselDeDivs.style.zIndex = 5; // Defina o z-index desejado
    }
}

// Função para retornar a div ao ponto inicial suavemente
function resetPosition() {
    containerConteudo.style.transition = 'top 0.3s ease'; // Suaviza o retorno ao ponto inicial
    containerConteudo.style.top = '0'; // Volta ao ponto inicial

    setTimeout(() => {
        containerConteudo.style.transition = ''; // Remove a transição para futuros movimentos
    }, 500); // Espera o tempo da transição para remover
}

// Finaliza o arraste com o mouse
document.addEventListener('mouseup', () => {
    isDragging = false;
    currentTop = parseInt(containerConteudo.style.top) || 0; // Atualiza a posição atual

    // Verifica se passou de 50% da altura para decidir o que fazer
    if (Math.abs(currentTop) > containerHeight / 2) {
        continueSlidingUp(); // Continua subindo até sair
    } else {
        resetPosition(); // Retorna ao ponto inicial
    }
});

// Finaliza o arraste com o toque
document.addEventListener('touchend', () => {
    isDragging = false;
    currentTop = parseInt(containerConteudo.style.top) || 0; // Atualiza a posição atual

    // Verifica se passou de 50% da altura para decidir o que fazer
    if (Math.abs(currentTop) > containerHeight / 2) {
        continueSlidingUp(); // Continua subindo até sair
    } else {
        resetPosition(); // Retorna ao ponto inicial
    }
});

//--------------------------------------------animação-notificações-------------------------------------------
let botaoNotificacao = document.querySelector(".notificacao")
let textoNotificacao = document.querySelector(".texto-central-notificacao")
const centralNotificacoes = document.getElementById('central-notificacoes');
const containerNotificacao = document.getElementById('notificacao-01');
let startY = 0;
let currentY = 0;
let dragging = false;

centralNotificacoes.addEventListener('mousedown', startDrag);
centralNotificacoes.addEventListener('touchstart', startDrag);

centralNotificacoes.addEventListener('mousemove', onDrag);
centralNotificacoes.addEventListener('touchmove', onDrag);

centralNotificacoes.addEventListener('mouseup', endDrag);
centralNotificacoes.addEventListener('touchend', endDrag);

function startDrag(e) {
    dragging = true;
    startY = e.type === 'touchstart' ? e.touches[0].clientY : e.clientY;
    currentY = startY;
}

function onDrag(e) {
    if (!dragging) return;

    const clientY = e.type === 'touchmove' ? e.touches[0].clientY : e.clientY;
    const deltaY = clientY - startY;

    if (deltaY < 0) {
        centralNotificacoes.style.bottom = `${-deltaY}px`;  // Sobe o painel
    } else if (deltaY > 0 && containerNotificacao.style.display === 'flex') {
        centralNotificacoes.style.bottom = `${-deltaY}px`;  // Desce o painel
    }
}

function endDrag(e) {
  dragging = false;

  const bottomPosition = parseInt(centralNotificacoes.style.bottom || '0');

  if (bottomPosition > 50) {  // Se arrastado mais de 50px para cima
      centralNotificacoes.style.bottom = '100%';  // Sobe todo o painel
      containerNotificacao.style.display = 'flex';  // Revela as notificações
      requestAnimationFrame(() => {
          botaoNotificacao.classList.remove('hide');
          botaoNotificacao.classList.add('show');  // Aplica a classe para subir o conteúdo
          textoNotificacao.classList.remove('hide');
          textoNotificacao.classList.add('show');  // Aplica a classe para subir o conteúdo
      });
  } else if (bottomPosition < -50 && containerNotificacao.style.display === 'flex') {  // Se arrastado para baixo
      botaoNotificacao.classList.remove('show');
      botaoNotificacao.classList.add('hide');  // Aplica a classe para descer o conteúdo
      textoNotificacao.classList.remove('show');
      textoNotificacao.classList.add('hide');  // Aplica a classe para subir o conteúdo
      centralNotificacoes.style.bottom = '0';  // Desce o painel
  } else {
      centralNotificacoes.style.bottom = containerNotificacao.style.display === 'flex' ? '100%' : '0';  // Volta à posição original
  }
}

//--------------------------------------------animação-biblioteca-de-aplicativos-------------------------------------------

document.addEventListener('DOMContentLoaded', () => {
    let isAnimating = false; // Flag para controlar o estado da animação
    
    // Mapa de descrições personalizadas no JS
    const descricoesPersonalizadas = {
      referencia: 'Referencias',
      configuracoes: 'Configurações',
      financas: 'finanças',
      midia: 'Mideas Sociais'
      // Adicione mais descrições conforme necessário
    };
    
    document.querySelectorAll('.icone-aplicativo').forEach((item) => {
      item.addEventListener('click', function (event) {
        if (isAnimating) return; // Impede múltiplas animações simultâneas
        isAnimating = true;
  
        // Remover a classe de zoom de todos os ícones e restaurar placeholders
        document.querySelectorAll('.icone-aplicativo').forEach((i) => i.classList.remove('zoom'));
        document.querySelectorAll('.sega').forEach((sega) => sega.remove());
  
        // Criar um placeholder (.sega) para substituir o ícone original
        const sega = document.createElement('div');
        sega.className = 'sega';
        item.parentNode.insertBefore(sega, item); // Insere o sega no lugar do ícone
  
        // Adicionar a classe de zoom ao ícone clicado
        this.classList.add('zoom');
  
        // Criar o overlay e adicionar à .tela-central-dos-aplicativos
        const overlay = document.createElement('div');
        overlay.className = 'overlay';
  
        const container = document.querySelector('.tela-central-dos-apps');
        if (container) {
          container.appendChild(overlay); // Adiciona o overlay dentro do contêiner correto
          console.log('Overlay adicionado à .tela-central-dos-aplicativos'); // Debugging
        } else {
          console.error('.tela-central-dos-aplicativos não encontrada'); // Debugging
        }
  
        // Capturar o id do ícone clicado
        const idIcone = item.id;
  
        // Determinar a descrição com base no id e no mapa de descrições personalizadas
        const descricaoTexto = descricoesPersonalizadas[idIcone] || 'Descrição padrão para este aplicativo'; // Usar descrição padrão se o id não estiver no mapa
  
        // Criar e adicionar a tag <p> para a descrição
        const descricao = document.createElement('p');
        descricao.className = 'descricao-aplicativo';
        descricao.textContent = descricaoTexto; // Texto baseado no mapa de descrições personalizadas
        item.parentNode.appendChild(descricao); // Adiciona a descrição acima do ícone ampliado
  
        // Evitar que o clique propague para o documento e desfaça o zoom imediatamente
        event.stopPropagation();
  
        // Adicionar o evento de clique no overlay para desfazer o zoom e remover o overlay
        overlay.addEventListener('click', () => {
          removeZoomAndReturn(); // Chama a função para desfazer o zoom e remover o overlay
          console.log('Overlay clicado e removido'); // Debugging
        });
  
        // Quando a transição de zoom termina, permitir novas animações
        this.addEventListener(
          'transitionend',
          () => {
            isAnimating = false;
          },
          { once: true }
        );
      });
    });
  
    // Função para remover o zoom, o overlay, a descrição, e retornar à posição original
    function removeZoomAndReturn() {
      document.querySelectorAll('.sega').forEach((sega) => sega.remove()); // Remove placeholder .sega
      document.querySelectorAll('.icone-aplicativo.zoom').forEach((i) => {
        i.classList.remove('zoom'); // Remove a classe zoom para retornar à posição original
        i.addEventListener(
          'transitionend',
          () => {
            isAnimating = false;
          },
          { once: true }
        );
      });
  
      // Remove o overlay
      const overlay = document.querySelector('.overlay');
      if (overlay) {
        overlay.remove();
        console.log('Overlay removido'); // Debugging
      } else {
        console.error('Overlay não encontrado para remover'); // Debugging
      }
  
      // Remove a descrição
      const descricao = document.querySelector('.descricao-aplicativo');
      if (descricao) {
        descricao.remove();
      }
    }
  });

  //--------------------------------------------barra-branca-comando-------------------------------------------
