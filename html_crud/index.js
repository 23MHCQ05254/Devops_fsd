const express=require('express')
const fs=require("fs")//file system
const path= require("path")
const app=express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(express.static(path.join(__dirname,'public')));// static files that are need to be send are put into public

app.get('/form',(req,res)=>{
    res.sendFile(__dirname +'/public/form.html' )
})

app.post('/formPost',(req,res)=>{
    let data=JSON.parse(fs.readFileSync(__dirname + '/cse.json'))
    data.push(req.body);
    fs.writeFile(__dirname + '/cse.json', JSON.stringify(data),(err)=>{
        res.send("success");
    })
})


app.listen(3000,()=>{
    console.log("server runnning on port 3000 ");
})

