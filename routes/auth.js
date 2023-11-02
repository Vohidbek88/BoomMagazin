import { Router } from "express";
import User from "../modal/User.js";
import bcrypt from 'bcrypt'
import { geneRateToken } from "../services/token.js";

const router=Router()


router.get('/login',(req,res)=>{
    if(req.cookies.token){
        res.redirect('/')
        return
    }
    res.render('login',{
        title:'Login',
        isLogin:true,
        loginErrors: req.flash('loginError')
    })
})
 
router.get('/register',(req,res)=>{
    if(req.cookies.token){
        res.redirect('/')
        return
    }
    res.render('register',{
        title:'Register',
        isRegister:true,
        registerError:req.flash('registerError')
    })
})

router.get('/logout',(req,res)=>{
    res.clearCookie('token')
    res.redirect('/')
})

router.post('/login',async(req,res)=>{
    const {email,password}=req.body


    if(!email || !password){
        req.flash('loginError','All fields shoult be')
        res.redirect('/login')
        return
    }

    const exitUser=await User.findOne({email})
    if(!exitUser){
        req.flash('loginError','User not found')
        res.redirect('/login')
        return 
    }

    const isPassword=await bcrypt.compare(password,exitUser.password)
    if(!isPassword){
        req.flash('loginError','Password wrong!')
        res.redirect('/login')
        return 
    }

    const token=geneRateToken(exitUser.id)
    res.cookie('token',token,{httpOnly:true,secure:true})

    console.log(exitUser);
    res.redirect('/')
})

router.post('/register',async (req,res)=>{
    const {email,firstname,lastname,password}=req.body
    if(!email || !lastname || !firstname || !password){
        req.flash('registerError','All fields required!')
        res.redirect('/register')
        return
    }

    const candidate=await User.findOne({email})
    if(candidate){
        req.flash('registerError','User already exists!')
        res.redirect('/register')
        return
    }
    const hashPassword=await bcrypt.hash(password,10)
    const userData={
      firstName:firstname,
      lastName:lastname,
      email:email,
      password:hashPassword
    }
   const user=await User.create(userData)
   const token=geneRateToken(user.id)
   res.cookie('token',token,{httpOnly:true,secure:true})
   console.log(token);
    res.redirect('/')
})



export default router