const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')
const PORT = 5000

app.use(cookieParser())

app.use(express.json())
app.use(express.urlencoded({extended: false}))

const sayas = [
    {
        name : 'herdiyana',
        age : 20
    },
    {
        name : 'bobi',
        age : 20
    },
]

const posts = [
    {title : 'pulau'},
    {title : 'danau'}
]

app.get('/', (req, res)=>{
    res.send({
        data: 'success'
    })
})

app.get('/saya/:name', (req, res)=>{
    const {name} = req.params
    const user = sayas.find((user)=> user.name === name)
    if(user){
        res.status(200).send({
            name,
            status: 'success'
        })
    }else{
        res.status(404).send({
            status: 'not found'
        })
    }
})

const validateAuthToken = (req, res, next) => {
    console.log('inside validate Auth Token')
    const { authorization } = req.headers;
    if(authorization && authorization === '123'){
        next()
    }else{
        res.status(403).send({
            msg: 'Forbidden. Incorrect Credentials'
        })
    }
}

app.post('/posts', validateAuthToken, (req, res)=>{
    const post = req.body
    posts.push(post)
    res.status(200).send(post)
})

app.get('/posts/', (req, res)=>{
    const {title} = req.query
    if(title){
        const post = posts.find((post)=>post.title === title)
        if(post){
            res.status(200).send({
                post,
                status: 'success'
            })
        }else{
            res.status(400).send({
                status: 'not found'
            })
        }}
})

const validateCookies = (req, res, next) => {
    const { cookies } = req;
    if('session_id' in cookies){
        console.log('Session ID Exist');
        if(cookies.session_id === '12345'){
            next()
        }else{
            res.status(403).send({
                msg : 'Not Authentication'
            })
        }
    }else{
        res.status(403).send({
            msg : 'Not Authentication'
        })
    }
}

app.get('/signin', validateCookies, (req, res)=>{
    req.cookies('session_id', '12345')
    res.send(200).json({
        msg : 'Logged in'
    })
})

app.get('/protected', validateCookies, (req, res)=>{
    res.status(200).send({
        msg: 'You are authorized'
    })
})

app.listen(PORT, ()=>{
    console.log(`server is running${PORT}`)
})