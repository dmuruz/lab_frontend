var id = 0
var resultMap = {};
function processString() {
  var inputString = document.getElementById('inputString').value;
  var wordsAndNumbers = inputString.split('-');
  var words = wordsAndNumbers.filter(item => isNaN(item));
  var numbers = wordsAndNumbers.filter(item => !isNaN(item));
  words.sort();
  numbers.sort(function(a, b) {
    return a - b;
  });

  
  words.forEach(function(word, index) {
    resultMap['a' + (index + 1)] = word;
  });
  numbers.forEach(function(number, index) {
    resultMap['n' + (index + 1)] = number;
  });

  var draggableContainer = document.getElementById('draggable-container');
  draggableContainer.innerHTML = '';
  Object.keys(resultMap).forEach(function(key) {
    var draggableBlock = createDraggableBlock(key + " " + resultMap[key]);
    draggableContainer.appendChild(draggableBlock);
  });
}

function createDraggableBlock(text) {
  var draggableBlock = document.createElement('div');
  draggableBlock.className = 'draggable';
  draggableBlock.draggable = true;
  draggableBlock.textContent = text;
  draggableBlock.setAttribute('id', "item" + id);
  id+=1;
  draggableBlock.addEventListener('dragstart', function(event) {
    event.dataTransfer.setData("text", draggableBlock.id);
  });
  return draggableBlock;
}


function allowDrop(event) {
  event.preventDefault();
}

function drag(event) {
  event.dataTransfer.setData("text", event.target.id);
}

function drop(event) {
  event.preventDefault();
  var data = event.dataTransfer.getData("text");
  var draggedElement = document.getElementById(data);
  var dropZone = event.target;

  if (dropZone.classList.contains("block")) {
    dropZone.appendChild(draggedElement);
    
    if (draggedElement.classList.contains("draggable")) {
      dropZone.insertBefore(draggedElement, dropZone.firstChild);
    }
    var topText = document.getElementById('top-text');
    topText.innerText = '';
    var children = dropZone.children;
    for(var i = 0; i < children.length; i++){
      topText.innerText += '\u00a0';
      topText.innerText += resultMap[children[i].innerText.split(' ')[0]];
    }
  }
}