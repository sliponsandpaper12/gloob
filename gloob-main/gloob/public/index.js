import express from "express";
import imgur from "imgur";
import fileUpload from "express-fileupload";

const app = experss();
app.use(fileUpload());

app.set('view engine','ejs');
app.set('views','views')

app.use(express.urlencoded({extended: false}))
app.use(express.json())

app.get('/',(req,res)=>{
    res.send('Hi')
})

app.listen(8080,()=>{
    console.log('Server started on port 8080')
})