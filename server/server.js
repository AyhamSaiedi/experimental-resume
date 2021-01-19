const express = require('express');
const bodyParser = require('body-parser');
const path = require('path')
const app = express();
const fs = require('fs')


const direction = "C:/Users/denis/programming/shitMitAyham/"

app.use('/', express.static(`${direction}src`))
app.use(bodyParser.json());

/* app.get('/', (req, res)=>{
    return res.status(200).sendFile(path.join(`${direction}src/index.html`)).sendFile(path.join(`${direction}src/myJs.js`, `${direction}src/index.html`));
}) */

import { getUserList } from '../user'
const userList = getUserList();

let comments = require('./test.json')


app.get('/getUsers', (req, res) => {
    console.log('hihi')
    return res.status(200).send({ comments })
});

app.post('/addComment', (req, res) => {
    console.log("jup")
    if(!req.body.comment){
        console.log('fail')
        return res.status(400).send({
            success: "false",
            message: "comment is required"
        })
    }
    const comment = {
        name: req.body.author || "anonym",
        comment: req.body.comment
    }
    
    let file = comments;
    file.push(comment)
    let json = JSON.stringify(file)
    fs.writeFile('./server/test.json', json, 'utf8', ()=>{});    
    return res.status(201).send({ 
        success: "true",
        message: 'comment added succesfully',
    })
})

app.post('/addUser', (req, res) => {
    console.log(req)
    if(!req.body.name) {
        return res.status(400).send(
            {
                success: "false",
                message: "name is required"
            });
    } else if (!req.body.companies) {
        return res.status(400).send({
            success: "false",
            message: "copanies is required"
        })
    }
    const user = {
        id: userList.length + 1,
        isPublic: req.body.isPublic,
        name: req.body.name,
        companies: req.body.companies,
        books: req.body.books 
    };
    userList.push(user);
    return res.status(201).send({ 
        success: "true",
        message: 'user added successfully',
        user
    })
})

app.listen(8000, () => {
console.log('Example app listening on port 8000!')
});