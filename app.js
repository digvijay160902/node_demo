const express = require('express');
const app = express();
const session = require('express-session');
const passport = require('passport')
const localstrategy = require('passport-local').Strategy;

app.use(express.urlencoded({extended:false}))
app.use(session({
    secret:"secret",
    resave:false,
    saveUninitialized:true
}))

app.use(passport.initialize());
app.use(passport.session());

authUser = (user,password,done)=>{


    let authenticated_user = {id:123,name:"Kyle"}
    return done(null,authenticated_user)
}

passport.use(new localstrategy(authUser))

passport.serializeUser((user,done)=>{
    console.log("serialize user")
    console.log(user);
    done(null,user.id)
})

passport.deserializeUser((user,done)=>{
    console.log("deserialize user");
    console.log(user);
    done(null,{name:"kyle",id:123});
})

let count=1,
printData=(req,res,next)=>{
   
    next();
}

app.use(printData);
app.listen(3001,()=>{
    
})

app.get("/login",(req,res)=>{
    res.render("login.ejs")
})

app.post("/login",passport.authenticate('local',{
    successRedirect:"/dashbord",
    failureRedirect:"/login"
}))

app.get("/dashbord",(req,res)=>{
    res.render("dashbord.ejs",{name:req.user.name})
})
