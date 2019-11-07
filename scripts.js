const ENTER_KEYCODE = 13;

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.form');
  const items = document.querySelector('.items');
  text.init(form, items);
});

const text = (() => {
  let items;
  function init(_form, _items) {
    items = _items;
    _form.addEventListener('submit', formHandler);

    for (let item of items.querySelectorAll('.item')) {
      const checkbox = item.querySelector('.item__checkbox');
      checkbox.addEventListener('click', finish);

      const text = item.querySelector('.item__text');
      text.addEventListener('click', edit);

      const button = item.querySelector('.item__button');
      button.addEventListener('click', deleteItem);
    }
  }

  function formHandler(e) {
    e.preventDefault();
    const input = e.target.querySelector('.form__input');
    var inputtext = input.value.trim();
    if(inputtext.length > 0)
      add(inputtext);
    input.value = '';
  }

  // event handler fyrir það að klára færslu
  function finish(e) {
    e.target.parentNode.classList.toggle('item--done');
  }

  // event handler fyrir það að breyta færslu
  function edit(e) {
    const target = e.target;
    const textContent = target.textContent;
    const parentNode = target.parentNode;

    parentNode.removeChild(target);

    const input = el('input', 'item__edit');
    input.type = 'text';
    input.value = textContent;
    input.addEventListener('keyup', commit);

    const button = parentNode.querySelector('.item__button');

    parentNode.insertBefore(input, button);
    input.focus();
  }

  // event handler fyrir það að klára að breyta færslu
  function commit(e) {
    console.log(e.target.value);
    if(e.keyCode === ENTER_KEYCODE)
    {
      const target = e.target;
      const textContent = target.value;
      const parentNode = target.parentNode;

      target.removeEventListener('keyup', commit);
      parentNode.removeChild(target);

      const newSpan = el('span', 'item__text', edit);
      var textToAdd = document.createTextNode(textContent);
      newSpan.appendChild(textToAdd);
  
      const newDelete = parentNode.querySelector('.item__button');
  
      parentNode.insertBefore(newSpan, newDelete);
    }
  }

  // fall sem sér um að bæta við nýju item
  function add(value) {
    const newItem = el('li', 'item');

    const newCbox = el('input', 'item__checkbox', finish);
    newCbox.type = "checkbox";

    const newSpan = el('span', 'item__text', edit);
    var textNote = document.createTextNode(value);
    newSpan.appendChild(textNote);

    const newDelete = el('button', 'item__button', deleteItem);
    var deleteNote = document.createTextNode("Eyða");  
    newDelete.appendChild(deleteNote);

    newItem.appendChild(newCbox);
    newItem.appendChild(newSpan);
    newItem.appendChild(newDelete);
    items.appendChild(newItem);
  }

  // event handler til að eyða færslu
  function deleteItem(e) {
    e.target.parentElement.remove();
  }

  // hjálparfall til að útbúa element
  function el(type, className, clickHandler) {
    const element = document.createElement(type);
    if(className)
      element.classList.add(className);
      
    if(clickHandler)
      element.addEventListener('click', clickHandler)
    return element;
  }

  return {
    init: init
  }
})();
