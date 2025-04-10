
const favoriteBlog = (blogs) => {
    if (!Array.isArray(blogs) || blogs.length === 0) {
      return null;
    }
  
    return blogs.reduce((max, blog) => (Number(blog.likes) > Number(max.likes) ? blog : max), blogs[0]);
  };
  
  module.exports = { favoriteBlog };
  