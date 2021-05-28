// const bcrypt = require('bcrypt');
const webhook = 'https://us-east-1.aws.webhooks.mongodb-realm.com/api/client/v2.0/app/ikori-chat-app-sbuho/service/Ikori/incoming_webhook'
const saltRounds = 12;
const page = 0;
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

// helper function for creating new element
const createNewElement = (arg) => {
  // standard obj = {element:val1, attribute:val2, parentById:val3, parentByClass:val4, attritube_value:val5 , text:val6}
  
  const newLine = document.createElement(arg.element) // create a new element
  newLine.setAttribute(arg.attribute, arg.attritube_value) // set attritube to div node
  const newText = document.createTextNode(arg.text) // add text to the current node
  const list = arg.parentById ? document.getElementById(arg.parentById) : document.getElementByClass(arg.parentByClass) // get message div from Dom
  list.appendChild(newLine).appendChild(newText) // append the new message to message div as a child
}
//helper funciton for like/ unlike elements
const add_like = (...arg) => { 
  // arguments order -> parent queryselector type, selector value, likeCounts, 
  const [selector,value,counter] = arg;
  let count = counter
  const curElement = document.querySelector(selector); // parent element
  const likeElement = document.createElement(value) // value
  likeElement.setAttribute('class', 'like fa fa-thumbs-up')
  const likeNumber = document.createElement('div')
  likeNumber.setAttribute('class','like_count')
  likeNumber.innerHTML = `\t ${count}`
  likeElement.addEventListener('click', (e)=>{
    e.preventDefault()
    count++
    likeNumber.innerHTML = `\t ${count}`
  })
  curElement.appendChild(likeElement).appendChild(likeNumber)
}
const loadMessages = () =>{
  const xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange =  () => {
    if (xhhtp.readyState == 4 && xhttp.status == 200) {
      // console.log('response: ', this.response)
      const data = JSON.parse(xhttp.response) // parse it into json obj
      // console.log(data['message'])
      data["messages"].forEach((message, index) => {
        const newElement = {
          element:'div',
          attribute:'class',
          parentById:'message-list',
          attritube_value:'message',
          text:`${message['message']}`
        }
        createNewElement(newElement); // create new element
        let likeCounts = 0
        // add unlike button and like button in a function

        if(message['likes'] && !document.querySelector('i')){
          add_like('.message','i',likeCounts)
        }
      })
    }
  };
  xhttp.open('GET', `${webhook}/messages?${page}`, true);
  xhttp.send();
}
const postMessage = (text,secret) => {
  const body = {
    message:text,
    password:secret
  }
  const xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange =  () => {
    if(xhttp.readyState === 4){
      window.alert('message is posted!')
      console.log('Request body: ', body)
    }
  }
  xhttp.open('POST', `${webhook}/new-message`,true)
  // xhttp.setRequestHeader("Accept", "application/json");
  xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhttp.send(`${body}`)
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
  setInterval(loadMessages(), 2000);
  // add messages
  document.getElementById('save').addEventListener('click', (e) => {
    e.preventDefault();
    const msg = document.querySelector('#desc').value;
    const pw = document.querySelector('#pass').value;
    postMessage(msg,pw)
    // UI.postMessage(msg, pw);
  });
});
