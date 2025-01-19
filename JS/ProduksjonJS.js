const bins = document.querySelectorAll('.bin');
const items = document.querySelectorAll('.item');
const message = document.getElementById('message');
let gameOver = false;

items.forEach(item => {
  item.addEventListener('dragstart', dragStart);
});

bins.forEach(bin => {
  bin.addEventListener('dragover', dragOver);
  bin.addEventListener('drop', drop);
});

function dragStart(event) {
  if (gameOver) return;
  event.dataTransfer.setData('text', event.target.dataset.bin);
  event.dataTransfer.setData('id', event.target.id);
}

function dragOver(event) {
  event.preventDefault();
}

function drop(event) {
  if (gameOver) return;

  const itemBin = event.dataTransfer.getData('text');
  const droppedBin = event.target.dataset.bin;

  if (itemBin === droppedBin) {
    const itemId = event.dataTransfer.getData('id');
    const item = document.querySelector(`.item[data-bin="${itemBin}"]`);
    item.remove(); // Fjern elementet fra skjermen
    if (document.querySelectorAll('.item').length === 0) {
      message.textContent = 'Gratulerer! Du vant!';
    }
  } else {
    message.textContent = 'Du tapte! Start på nytt.';
    gameOver = true;
  }
}
