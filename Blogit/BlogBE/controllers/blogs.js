
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const getTokenFrom = request => {
    const authorization = request.get('authorization')
    if (authorization && authorization.startsWith('Bearer ')) {
      return authorization.replace('Bearer ', '')
    }
    return null
}

blogsRouter.post('/', async (request, response) => {
  const body = request.body
  const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'väärä token' })
  }
  const user = await User.findById(decodedToken.id)
  const blog = new Blog({
    title : body.title, 
    author : body.author, 
    url : body.url, 
    likes : body.likes || 0,
    user : user._id
  })
  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  response.status(201).json(savedBlog)
})

blogsRouter.get('/', async (request, response) => {
  const blog = await Blog.find(request.params.id)
    .find({}).populate('user', { username: 1, name: 1 })
  if (blog) {
    response.json(blog)
  } else {
    response.status(404).end()
  }
})

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const { title, author, url, likes } = request.body;

  const paivitettyBlogi = await Blog.findByIdAndUpdate(
    request.params.id,
    { title, author, url, likes },
    { new: true, runValidators: true } // validaattori      
  ).populate('user', { username: 1, name: 1 })

  if (paivitettyBlogi) {
    response.json(paivitettyBlogi);
  } else {
    response.status(404).json({ error: 'Blogia ei löydy' })
  }
})

blogsRouter.post('/:id/comments', async (req, res) => {
  const blog = await Blog.findById(req.params.id)
  blog.comments = blog.comments.concat(req.body.comment)
  const saved = await blog.save()
  res.json(saved)
})

module.exports = blogsRouter