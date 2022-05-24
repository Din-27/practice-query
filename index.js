const express = require('express')
const app = express()
const PORT = 5000

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

app.get('/post/', (req, res)=>{
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

app.listen(PORT, ()=>{
    console.log(`server is running${PORT}`)
})