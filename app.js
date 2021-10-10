const express = require('express')
const mongoose = require('mongoose')
const body_parser = require('body-parser')
const url = 'mongodb://localhost/AlienDBex'

const app = express()

mongoose.connect(url, {useNewUrlParser:true})
const con = mongoose.connection

con.on('open', () => {
    console.log('connected...')
})

app.use(body_parser.json());

app.use(body_parser.urlencoded({ extended: true }));

app.use(express.static(__dirname +'/static/'));

app.use(express.json())

const alienRouter = require('./routes/aliens')
app.use('/',alienRouter)

app.listen(9000, () => {
    console.log('Server started')
})

