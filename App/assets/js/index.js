import URL from '../../server/services/http.js'
import bcrypt from 'bcrypt'

const saltRounds = 12;
class UI {
  static getMessages() {
    const url = `${URL}/messages?page=${page}`
    fetch(url)
      .then((data) => {
        console.log('GET DATA', data.rows);
        if (data.rows) {
          data.rows.forEach((list) => UI.displayMessages(list.messages));
        }
      })
      .catch((err) => console.log('get message: ', err));
  }
  // {
  //   messages: messageList,
  //   page: page.toString(),
  //   entries_per_page: messagesPerPage.toString(),
  //   total_results: messageList.length.toString(),
  // };
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

    const hashedPassword;
    bcrypt.hash(password, saltRounds, (err, hash) => {
      // Now we can store the password hash in db.
      hashedPassword = hash
    });
    const url = `${URL}/messages`;
    fetch(url, {
      method: 'POST',
      body: JSON.stringify({ message: message, password: hashedPassword }),
      headers: { 'Content-Type': 'application/json' },
    })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => console.log('Post Message: ', err));
  }

  static deleteMessage(message) {
    const url = `${URL}/messages`;
    fetch(url, {
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
  console.log('DOM is loaded!')
  // const needUpdate = true;
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
