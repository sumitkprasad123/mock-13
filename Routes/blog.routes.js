const express = require("express")
const blogRouter = express.Router()
const {BlogModel} = require("../model/blog.model")
var jwt = require('jsonwebtoken');

// getting all blog
blogRouter.get("/blogs",async(req,res) => {
    try{
       const blog = await BlogModel.find()
       res.status(200).send(blog)
    }catch(err){
        res.status(400).send({"msg":err.message})
    }
})

// getting blog with pagination
blogRouter.get("/blogs",async(req,res) => {
    const {page} = req.query
    try{
       const blog = await BlogModel.find().skip({page}).limit(5)
       res.status(200).send(blog)
    }catch(err){
        res.status(400).send({"msg":err.message})
    }
})

// getting blog with search wuth title
blogRouter.get("/blogs",async(req,res) => {
    const {title} = req.query
    try{
       const blog = await BlogModel.find({title}).skip(0).limit(5)
       res.status(200).send(blog)
    }catch(err){
        res.status(400).send({"msg":err.message})
    }
})

// getting blog with category
blogRouter.get("/blogs",async(req,res) => {
    const {category} = req.query
    try{
       const blog = await BlogModel.find({category}).skip(0).limit(5)
       res.status(200).send(blog)
    }catch(err){
        res.status(400).send({"msg":err.message})
    }
})

// getting blog with category
blogRouter.get("/blogs",async(req,res) => {
    const {sort ,order} = req.query
    try{
       const blog = await BlogModel.find({sort}).sort(order).skip(0).limit(5)
       res.status(200).send(blog)
    }catch(err){
        res.status(400).send({"msg":err.message})
    }
})


//posting blog
blogRouter.post("/blogs",async(req,res) => {

    try{
        const blog = new BlogModel(req.body)
        await blog.save()
        res.status(200).send({"msg":"blog added Successfully"})
    }catch(err){
        res.status(400).send({"msg":err.message})
    }
})

// deleting the blog
blogRouter.delete("/blogs/:id",async(req,res) => {
    const {id}= req.params
    console.log(id)
    try{
        const blog =await BlogModel.findByIdAndDelete(id)
        res.status(200).send({"msg":"blog deleted Successfully"})
    }catch(err){
        res.status(400).send({"msg":err.message})
    }
})

// update the blog
blogRouter.patch("/blogs/:id",async(req,res) => {
    const {id}= req.params
    console.log(id)
    try{
        const blog = await BlogModel.findByIdAndUpdate(id,req.body)
        res.status(200).send({"msg":"blog updated  Successfully"})
    }catch(err){
        res.status(400).send({"msg":err.message})
    }
})

// update the blog with like
blogRouter.patch("/blogs/:id/like",async(req,res) => {
    const {id}= req.params
    console.log(id)
    try{
        const blog = await BlogModel.findByIdAndUpdate(id,req.body)
        res.status(200).send({"msg":"likes in blog has updated  Successfully"})
    }catch(err){
        res.status(400).send({"msg":err.message})
    }
})

// update the blog with like
blogRouter.patch("/blogs/:id/comment",async(req,res) => {
    const {id}= req.params
    console.log(id)
    try{
        const blog = await BlogModel.findByIdAndUpdate(id,req.body)
        res.status(200).send({"msg":"comment in blog has updated  Successfully"})
    }catch(err){
        res.status(400).send({"msg":err.message})
    }
})

module.exports = {
    blogRouter
}