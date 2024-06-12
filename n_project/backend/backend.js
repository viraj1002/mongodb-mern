require('./db/connection')

const ModelConst = require('./schema/schema')


const E = require('express')
const app = E();
const bp = require('body-parser')
app.use(bp.urlencoded({ extended: true }));
app.use(bp.json())
// const bc=require("bcrypt")
const ejs = require('ejs')            //Template Engine



//Template Engine
const path = require('path')
// console.log("Hi this is a Path:"+__dirname);
// const exactPath=path.join(__dirname,"views")
// console.log("Hi this is a ExactPath:"+exactPath);

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, "views"))


// const {name,email,job,password,cpassword}=req.body


app.get('/home', (req, res) => {
    // res.send("Hi! Welcome to the Home page.");
    res.render('home')
})
app.get('/signup', (req, res) => {
    // res.send("Hi! Welcome to the Home page.");
    res.render('signup')
})
app.get('/signin', (req, res) => {
    // res.send("Hi! Welcome to the Home page.");
    res.render('signin')
})

app.get('/forgot',(req,res)=>{
    res.render('forgot')
})




//Register
app.post('/reg', async (req, res) => {
    console.log(req.body);

    const emailExist = await ModelConst.findOne({ email: req.body.email })
    // console.log(emailExist);
    if (emailExist) {
        return res.send("Email is exist.")
    }
    else if (req.body.password != req.body.cpassword) {
        return res.send("Password is not matched.")
    }
    else if (!req.body.name || !req.body.email || !req.body.job || !req.body.password || !req.body.cpassword) {
        res.send("Please fill all fields.")
    }

    else {
        console.log("Password Matched!");
        const name = req.body.name;
        const email = req.body.email;
        const job = req.body.job;
        const password = req.body.password;
        const cpassword = req.body.cpassword;

        // const hashpassword= await bc.hash(password,10);

        const template = ModelConst({
            name,
            email,
            job,
            // password:hashpassword,
            password,
            // cpassword:hashpassword,
            cpassword
        })
        template.save()

        return res.send("registration successful");

    }
})



//Login
app.post('/login', async (req, res) => {
    const emailExist = await ModelConst.findOne({ email: req.body.email });
    // const password_match=bp.comapre(req.body.password,emailExist.password);
    console.log(emailExist);

    if ( !req.body.email || !req.body.password) {
        res.send("Please fill all fields.")
    }
    else if (req.body.password != emailExist.password) {
        return res.send("Password is incorrect.")
    }
    else if (!emailExist) {
        return res.send("User not exist, kindly register first.")
    }
    else {
        return res.send("Sign-in Successfully.")
    }
})


//Reset Password
app.post('/reset',async(req,res)=>{
    const emailExist= await ModelConst.findOne({email:req.body.email})

    if(!emailExist){
        return res.send("User not exist.")
    }
    else if(req.body.newpassword !=req.body.cnewpassword){
        return res.send("Password is not matched!!!")
    }
    else{
        console.log(emailExist);
        emailExist.password=req.body.newpassword;
        emailExist.cpassword=req.body.cnewpassword;
        emailExist.save();
        return res.send("Password is reset successfully.")
    }
})



app.get('*',(req,res)=>{
    res.send("Sorry this page is not exist.")
})

app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
})