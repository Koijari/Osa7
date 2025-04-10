
const totalLikes = (blogs) => {
  //console.log(blogs)
  
  if (!Array.isArray(blogs)) {
    return 0
  }
  
  return blogs.reduce((sum, blog) => sum + Number(blog.likes || 0), 0)
}

module.exports = { totalLikes }
