
const mostLikes = (blogs) => {
    if (!Array.isArray(blogs) || blogs.length === 0) {
      return null
    }
  
    const likesByAuthor = blogs.reduce((acc, blog) => {
      const author = blog.author
      const likes = Number(blog.likes)
  
      acc[author] = (acc[author] || 0) + likes
      return acc
    }, {})
  
    const topAuthor = Object.keys(likesByAuthor).reduce((a, b) =>
      likesByAuthor[a] > likesByAuthor[b] ? a : b
    )
  
    return {
      author: topAuthor,
      likes: likesByAuthor[topAuthor]
    }
  }
  
  module.exports = { mostLikes }
  