
// cambiar la pantalla
function showScreen(screenId) {
  document.querySelectorAll('.screen').forEach(screen => {
    screen.classList.remove('active');
  });
  document.getElementById(screenId).classList.add('active');
}


//selección de jugadores
let numPlayers = 0;
let mode = "";

function setPlayers(n) {
    numPlayers = n;
    document.querySelector('.mode-selection').style.display = 'block';
}

//selección de modo del juego (verano)
function selectMode(selectedMode) {
    mode = selectedMode;
    showScreen('board');
}

// drag & drop handlers
let draggedElement = null;

function dragstartHandler(ev) {
    draggedElement = ev.target;
    ev.dataTransfer.setData("text/plain", ev.target.id);
    ev.dataTransfer.dropEffect = "move";
}

function dragoverHandler(ev) {
    ev.preventDefault();
    ev.dataTransfer.dropEffect = "move";
}

function dropHandler(ev) {
    ev.preventDefault();
    
    if (draggedElement) {
        const dropZone = ev.target.closest('[ondrop]');
        if (dropZone && dropZone.id !== 'dinosaurs-panel') {
            
            const isFromPanel = draggedElement.closest('.dinosaurs-panel');
            
            if (isFromPanel) {
                const dinoCopy = draggedElement.cloneNode(true);
                
                dinoCopy.setAttribute('draggable', 'true');
                dinoCopy.setAttribute('ondragstart', 'drag(event)');
                dinoCopy.classList.add('placed-dino');
                
                dropZone.appendChild(dinoCopy);
                
                draggedElement.style.position = '';
                draggedElement.style.left = '';
                draggedElement.style.top = '';
                draggedElement.style.transform = '';
                
            } else {
                dropZone.appendChild(draggedElement);
            }
            
            const placedElement = dropZone.lastElementChild;
            placedElement.style.position = '';
            placedElement.style.left = '';
            placedElement.style.top = '';
            placedElement.style.transform = '';
            placedElement.style.margin = '';
            placedElement.style.width = '';
            placedElement.style.height = '';
            placedElement.style.lineHeight = '';
        }
    }
    
    draggedElement = null;
}

function removeDinoFromField(dino) {
    if (dino.classList.contains('placed-dino')) {
        dino.remove();
    } else {
        const panel = document.querySelector('.dinosaurs-panel');
        panel.appendChild(dino);
        
        dino.style.position = '';
        dino.style.left = '';
        dino.style.top = '';
        dino.style.transform = '';
        dino.style.margin = '';
        dino.style.width = '';
        dino.style.height = '';
        dino.style.lineHeight = '';
    }
}

function allowDrop(ev) {
    return dragoverHandler(ev);
}

function drag(ev) {
    return dragstartHandler(ev);
}

function drop(ev) {
    return dropHandler(ev);
}

document.addEventListener('DOMContentLoaded', () => {
    showScreen('home');
    
    document.addEventListener('dblclick', (ev) => {
        if (ev.target.classList.contains('dino')) {
            const parentZone = ev.target.closest('[ondrop]');
            if (parentZone && parentZone.id !== 'dinosaurs-panel') {
                removeDinoFromField(ev.target);
            }
        }
    });
});

