const express = require('express')
const mongoose = require('mongoose')

const app= express()
const cors= require('cors')
app.use(express.json())
app.use(cors())
const port=3040


app.get('/', (req, res)=>{
    res.send('welcome to the website')
}) 

//establish connection to database
mongoose.connect("mongodb://127.0.0.1:27017/expense-tracker")
.then(()=>{
    console.log('connected to db')
    })
    .catch((err)=>{
    console.log('error connecting to db')
    })

//create category schema
const Schema = mongoose.Schema
const categorySchema = new Schema({
    name:{ 
        type: String,
        required: true
        }
    },{timestamps:true})

//create Category model
const Category =mongoose.model('Category', categorySchema)

// create expense Schema
const expenseSchema = new Schema({
     title :{
        type: String,
        required: true,
        maxlength: 128
     },
     amount :{
        type: Number,
        required: true,
        min: 1
     },
     expenseDate:{
        type: Date,
        required: true,
        default: new Date()
     },
     categoryId :{
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true
     },
     notes: {
        type: String
     }
}, {timestamps: true})

// create Expense Model
const Expense = mongoose.model('Expense', expenseSchema)

// api to get all categories
app.get('/api/categories', (req , res)=>{
    Category.find()
        .then((categories)=>{
            res.json(categories)
        })
        .catch((err)=>{
            res.json(err)
        })
})

// api to post new categories to database
app.post('/api/categories', (req,res)=>{
    const body = req.body
   // console.log(body)
    const category = new Category(body) 
    console.log(category)
    category.save()
    .then((category)=>{
        res.json(category)
    })
    .catch((category)=>{
        res.json(category)
    })
    
})

// api to get all expenses
app.get('/api/expenses', (req,res)=>{
    Expense.find()
    .then((expenses)=>{
        res.json(expenses)
    })
    .catch((err)=>{
        res.json(err)
    })
})

// api to post an expense
app.post('/api/expenses', (req, res)=>{
    const body = req.body
    Expense.create(body)
    .then((expense)=>{
        res.json(expense)
    })
    .catch((err)=>{
        res.json(err)
    })
})

app.listen(port, ()=>{
    console.log('server running on port', port)
})