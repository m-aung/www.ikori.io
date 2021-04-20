class UI {
  static getMessages() {
    console.log('in getMessages');
    fetch('/')
      .then((data) => {
        console.log('GET DATA', data.rows);
        if (data.rows) {
          data.rows.forEach((message) => UI.displayMessages(message.message));
        }
      })
      .catch((err) => console.log('get message: ', err));
  }

  static displayMessages(message, id = Math.floor(Math.random() * 1000)) {
    console.log('in addMessages');
    const list = document.querySelector('#message-list');

    const msg = document.createElement('li');

    msg.innerHTML = `${message}<button class="del" id=${id} onclick="${this.deleteMessage(
      message
    )}">Delete</button>`;

    list.appendChild(msg);
    const messageField = document.querySelector('#desc');
    const passwordField = document.querySelector('#pass');
    console.log('before:', messageField, passwordField);
    messageField.value = '';
    passwordField.value = '';
    console.log('after:', messageField, passwordField);
  }

  static postMessage(message, password) {
    if (!message || !password) {
      return;
    }
    this.displayMessages(message);
    fetch('/', {
      method: 'POST',
      body: JSON.stringify({ message: message, password: password }),
      headers: { 'Content-Type': 'application/json' },
    })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => console.log('Post Message: ', err));
  }

  static deleteMessage(message) {
    fetch(`/:${message}`, {
      method: 'DELETE',
      body: JSON.stringify({ message: message }),
      headers: { 'Content-Type': 'application/json' },
    })
      .then((data) => {
        console.log('data: ', data);
      })
      .catch((err) => console.log('delete Message: ', err));
  }
}

document.addEventListener('DOMContentLoaded', () => {
  // get messages
  UI.getMessages();
  // auto reload
  setInterval(UI.getMessages(), 2000);
  // add messages
  document.getElementById('save').addEventListener('click', (e) => {
    e.preventDefault();
    const msg = document.querySelector('#desc').value;
    const pw = document.querySelector('#pass').value;
    UI.postMessage(msg, pw);
  });
});
