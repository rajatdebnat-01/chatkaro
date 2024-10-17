const socket = io('http://localhost:8000/');

const form = document.getElementById('send-container');
const messageInput = document.querySelector(".message-input");
const messageContainer = document.querySelector(".chat-body");
var audio = new Audio('receive.mp3');
var secAduio = new Audio('sending.mp3');

const username = prompt("Enter your name to join")
socket.emit('new-user-joined', username);

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = messageInput.value;
    append(message, 'message-sent');
    socket.emit('send', message);
    messageInput.value = '';
})
const append = (message, position) => {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add("message");
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if (position === 'message-received') {
        audio.play();
    } 
    if(position === 'message-sent') {
        secAduio.play();
    }
}



socket.on('user-joined', username => {
    append(`${username} join the chat`, 'message-sent')
})
socket.on('receive', data => {
    append(`${data.name} : ${data.message}`, 'message-received')
})
socket.on('user-left', username => {
    append(`${username} left the chat`, 'message-received')
})

