const request = new XMLHttpRequest();
const post = new XMLHttpRequest();
request.open('GET', 'http://localhost:8000/getUsers');
request.send();
let comments;


request.onload = function(e){
    comments = JSON.parse(e.target.response).comments
    comments.forEach(comment=>{
        createComment(comment.name, comment.comment)
    })
    console.log(JSON.parse(e.target.response).comments);
}

const commentBox = document.querySelector('#comments');

let button = document.querySelector('#submit');
let thisComment = document.querySelector('#comment')
let thisAuthor = document.querySelector('#author')
button.addEventListener('click', ()=>{
    console.log(thisComment.value)
    createComment(thisAuthor.value || 'anonym', thisComment.value)
    post.open('POST', 'http://localhost:8000/addComment', true);
    post.setRequestHeader("Content-type", "application/json");
    post.send(JSON.stringify({comment: thisComment.value, author: thisAuthor.value}));
    post.onload = e =>{
        console.log(e.target.response)
    }
})




const createComment = (author, comment)=>{
    let box = document.createElement('div');

    let newComment = document.createElement('div');
    newComment.innerHTML= comment;
    newComment.classList.add('comments');

    let newAuthor = document.createElement('div');
    newAuthor.innerHTML = author;
    newAuthor.classList.add('author');

    
    commentBox.appendChild(box)
    box.appendChild(newComment)
    box.appendChild(newAuthor)
}