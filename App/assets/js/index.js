// const bcrypt = require('bcrypt');
const webhook = 'https://us-east-1.aws.webhooks.mongodb-realm.com/api/client/v2.0/app/ikori-chat-app-sbuho/service/Ikori/incoming_webhook'
const saltRounds = 12;
const page = 2;
const secret = 'FreeTier'
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
  /*
  const xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange =  () => {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
      // console.log('response: ', this.response)
      const data = JSON.parse(xhttp.response)['messages'] // parse it into json obj
      // console.log(data)
*/
        const dataMessage = {"messages":[{"_id":"607c6b9bc7a4c7504c0eb4e7","message":"1111111","password":"111","created_at":{"$date":{"$numberLong":"1618766747567"}},"__v":{"$numberInt":"0"},"likes":{"$numberInt":"0"}},{"_id":"607c6bbcc7a4c7504c0eb4e8","message":"12312312","password":"123123","created_at":{"$date":{"$numberLong":"1618766780100"}},"__v":{"$numberInt":"0"},"likes":{"$numberInt":"50"}},{"_id":"607c6c0ef39bda0518473cb2","message":"123123","password":"1312","created_at":{"$date":{"$numberLong":"1618766862433"}},"__v":{"$numberInt":"0"}},{"_id":"607c6c42f39bda0518473cb3","message":"123123123","password":"132123","created_at":{"$date":{"$numberLong":"1618766914006"}},"__v":{"$numberInt":"0"}},{"_id":"607c6c62f39bda0518473cb4","message":"111111","password":"11","created_at":{"$date":{"$numberLong":"1618766946044"}},"__v":{"$numberInt":"0"}},{"_id":"607c6c71f39bda0518473cb5","message":"11","password":"11","created_at":{"$date":{"$numberLong":"1618766961426"}},"__v":{"$numberInt":"0"}},{"_id":"607c6d2ff39bda0518473cb6","message":"11111","password":"1111","created_at":{"$date":{"$numberLong":"1618767151284"}},"__v":{"$numberInt":"0"}},{"_id":"607c6d58e5eec656a443fe61","message":"132123","password":"111","created_at":{"$date":{"$numberLong":"1618767192221"}},"__v":{"$numberInt":"0"}},{"_id":"607c71c0a41f8f28e0010bd8","message":"111","password":"111","created_at":{"$date":{"$numberLong":"1618768320225"}},"__v":{"$numberInt":"0"}},{"_id":"607c71c5a41f8f28e0010bd9","message":"11113123","password":"1111312","created_at":{"$date":{"$numberLong":"1618768325283"}},"__v":{"$numberInt":"0"}},{"_id":"607c71c9a41f8f28e0010bda","message":"1111312313123123","password":"111131213123","created_at":{"$date":{"$numberLong":"1618768329805"}},"__v":{"$numberInt":"0"}},{"_id":"607c72dfa41f8f28e0010bdb","message":"1312","password":"1312","created_at":{"$date":{"$numberLong":"1618768607042"}},"__v":{"$numberInt":"0"}},{"_id":"607c7309a41f8f28e0010bdc","message":"123123","password":"13123","created_at":{"$date":{"$numberLong":"1618768649027"}},"__v":{"$numberInt":"0"}},{"_id":"607c7319a41f8f28e0010bdd","message":"123123","password":"1312","created_at":{"$date":{"$numberLong":"1618768665816"}},"__v":{"$numberInt":"0"}},{"_id":"607c7379d8253d3ee4eb9dfd","message":"13123","password":"132123","created_at":{"$date":{"$numberLong":"1618768761055"}},"__v":{"$numberInt":"0"}},{"_id":"607d8c978c0b3c61c54ab46f","message":"This is a test","password":"check","created_at":{"$date":{"$numberLong":"1618840727648"}},"__v":{"$numberInt":"0"}},{"_id":"607d8cae8c0b3c61c54ab470","message":"this is a test 2","password":"Check","created_at":{"$date":{"$numberLong":"1618840750694"}},"__v":{"$numberInt":"0"}},{"_id":"607e16e480ee3b2c89ecb0f1","message":"testing","password":"testing testing","created_at":{"$date":{"$numberLong":"1618876132765"}},"__v":{"$numberInt":"0"}},{"_id":"6080a53c149b616444c20449","message":"asdf","password":"asdf","created_at":{"$date":{"$numberLong":"1619043644625"}},"__v":{"$numberInt":"0"}},{"_id":"60817c7545aa2d729b41177b","message":"Buddy","password":"Holly","created_at":{"$date":{"$numberLong":"1619098741785"}},"__v":{"$numberInt":"0"}},{"_id":"60b221c82116500e3ae6d50e","message":{"$undefined":true},"password":{"$undefined":true},"created_at":{"$date":{"$numberLong":"1622286792233"}},"like":{"$numberLong":"0"}},{"_id":"60b221e39f0df0ebdb10daee","message":{"$undefined":true},"password":{"$undefined":true},"created_at":{"$date":{"$numberLong":"1622286819299"}},"like":{"$numberLong":"0"}},{"_id":"60b223302fdfff9e00ea0586","message":"world","password":"password","created_at":{"$date":{"$numberLong":"1622287152823"}},"like":{"$numberLong":"0"}},{"_id":"60b228f8e27faedfbb6c0385","message":"using fetch","password":"fetch","created_at":{"$date":{"$numberLong":"1622288632257"}},"like":{"$undefined":true}},{"_id":"60b22a4920f990977d04491f","message":"added","password":"12342","created_at":{"$date":{"$numberLong":"1622288969343"}},"like":{"$undefined":true}},{"_id":"60b22b132116500e3aed4085","message":"hey","password":"1212432","created_at":{"$date":{"$numberLong":"1622289171998"}},"like":{"$undefined":true}}],"total_results":{"$numberLong":"26"}}
        data = dataMessage["messages"]
        for(let index = data.length-1; index >= 0;index --){
          message = data[index]
          // console.log('message from array: ', message)

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
          console.log('likes: ',message['likes'])
          if(message['likes'] && !document.querySelector('i')){
            console.log('conditional statement from likes: ', message['likes'])
            add_like('.message','i',likeCounts)
          }
        }
        /*
    }
  };
  xhttp.open('GET', `${webhook}/messages`, true);
  xhttp.send();
  */
}

// const loadMessages = () =>{
//   console.log(webhook+'/messages')
//   fetch(webhook+'/messages')
//   .then(data => {
//     console.log('data is fetched')
//     console.log('data:', data)
//     for(let index = data.length; index >= 0;index --){
//               message = data[index]
    
//               const newElement = {
//                 element:'div',
//                 attribute:'class',
//                 parentById:'message-list',
//                 attritube_value:'message',
//                 text:`${message['message']}`
//               }
//               createNewElement(newElement); // create new element
//               let likeCounts = 0
//               // add unlike button and like button in a function
      
//               if(message['likes'] && !document.querySelector('i')){
//                 add_like('.message','i',likeCounts)
//               }
//             }
//   })
//   .catch(err => {
//     console.log('Error: ',error)
//   })
// }
const postMessage = (text,secret) => {
  const body = {
    message:text,
    password:secret,
    like: 0,
    created_at: new Date()
  }
  // let hashedPassword = password //hashCode(password+secret)

  fetch(webhook+'/new-message', {
    method: 'POST',
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json' },
  })
    .then((data) => {
      console.log(data);
    })
    .catch((err) => console.log('Post Message: ', err));

  // const xhttp = new XMLHttpRequest();
  // xhttp.onreadystatechange =  () => {
  //   if(xhttp.readyState === 4){
  //     // window.alert('message is posted!')
  //     console.log('Request body: ', body)
  //   }
  // }
  // xhttp.open('POST', `${webhook}/new-message`,true)
  // // xhttp.setRequestHeader("Accept", "application/json");
  // xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  // xhttp.send(`${body}`)
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
  document.getElementById('save').addEventListener('click', (e) => {
    e.preventDefault();
    const msg = document.querySelector('#desc').value;
    const pw = document.querySelector('#pass').value;
    postMessage(msg,pw)
    loadMessages() 
    // UI.postMessage(msg, pw);
  });
});
