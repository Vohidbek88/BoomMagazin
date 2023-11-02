import { Router } from "express";
import Product from "../modal/Products.js";
import authMiddleware from "../middleware/auth.js";
import userMiddleware from "../middleware/user.js";

const router=Router()

router.get('/',async(req,res)=>{
    const products =await Product.find().lean()
    console.log(products);
    res.render('index',{
        title:'Boom shop || Vohid',
        products:products.reverse(),
        userId:req.userId ? req.userId.toString(): null
    })
})


router.get('/add' ,authMiddleware, (req , res)=>{
   res.render('add',{
    title:"Add product",
    isAdd:true,
    erroraddProducts:req.flash('erroraddProducts')
   })

})

router.get('/products',async(req,res)=>{
    const user=req.userId ? req.userId.toString() :null
    const myProducts=await Product.find({user}).populate('user').lean()
    console.log(myProducts);
    res.render('products',{
        title:'Products',
        isProduct:true,
        myProducts:myProducts
    })
})

router.post('/add-products',userMiddleware,async(req,res)=>{
    const {title,description,image,price}=req.body
    if(!title || !description || !image || !price){
        req.flash('erroraddProducts','All fields required!')
        res.redirect('/add')
        return
    }
    await Product.create({...req.body,user: req.userId})
    res.redirect('/')
})

export default router