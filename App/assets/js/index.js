// const bcrypt = require('bcrypt');
const webhook = 'https://us-east-1.aws.webhooks.mongodb-realm.com/api/client/v2.0/app/ikori-chat-app-sbuho/service/Ikori/incoming_webhook'
const saltRounds = 12;

const hashCode = (str) => {
  let hash = 0, i, chr;
  if (str.length === 0) return hash;
  for (i = 0; i < str.length; i++) {
    chr   = str.charCodeAt(i);
    hash  = ((hash << 5) - hash) + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
};

const loadMessages = () =>{
  const xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function ()  {
    if (this.readyState == 4 && this.status == 200) {
      // document.getElementById("test").innerHTML =
      // this.responseText;
      console.log('response: ', this.response)
      const data = JSON.parse(this.response)
      console.log('data: ', data)
      console.log('type of data: ', typeof data)
      data["messages"].forEach((message,index) => {
        // console.log(typeof index.toString())
        // document.getElementById('message-list'). += `${message['message']} \r\n`
        const newLine = document.createElement('div')
        const att = document.createAttribute("class")
        att.value = 'message'
        newLine.setAttributeNode(att)
        const newText = document.createTextNode(`${message['message']}`)
        // document.getElementById('message-list').append(newLine)
        const list = document.getElementById('message-list')
        list.appendChild(newLine).appendChild(newText)
        // document.createElement('br')
      })
    }
  };
  xhttp.open('GET', `${webhook}/messages`, true);
  xhttp.send();
}
const postMessage = () => {
  const xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {

  }
}

/*

class UI {
  static getMessages() {
    let page = 0
    const url = `${webhook}/messages`
    fetch(url)
      .then((data) => {
        console.log('GET DATA', data);
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

    let hashedPassword;
    bcrypt.hash(password, saltRounds, (err, hash) => {
      // Now we can store the password hash in db.
      hashedPassword = hash
    });
    const url = `${webhook}/messages`;
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
    const url = `${webhook}/messages`;
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
*/
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM is loaded!')
  // const needUpdate = true;
  // get messages
  loadMessages();
  // auto reload
  // setInterval(loadMessages(), 2000);
  // add messages
  // document.getElementById('save').addEventListener('click', (e) => {
  //   e.preventDefault();
  //   const msg = document.querySelector('#desc').value;
  //   const pw = document.querySelector('#pass').value;
  //   // UI.postMessage(msg, pw);
  // });
});
