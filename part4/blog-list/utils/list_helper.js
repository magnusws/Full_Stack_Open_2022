

// Just a dummy func to check that Jest is set up correctly
const dummy = (blogs) => {
  return 1
}

// Func returns the sum of all likes for a list with blog posts
const totalLikes = (blogs) => {
  return blogs.reduce((previousValue, currentValue) => {
    return previousValue + currentValue.likes
  }, 0)
}

// Func returns title, author, and num of likes for the most liked blog
const favoriteBlog = (blogs) => {
  if(blogs.length !== 0) {

    const mostLiked = blogs.reduce((prevBlog, currentBlog) => {
      return (prevBlog.likes > currentBlog.likes) ? prevBlog : currentBlog
    })

    return {
      title: mostLiked.title,
      author: mostLiked.author,
      likes: mostLiked.likes
    }
  }
  return null
}

// Func returns name and blog count for author with the most blogs
const mostBlogs = (blogs) => {
  if(blogs.length !== 0) {

    // Creates array with author obj: no duplicates: name and count
    const authors = [... new Set(blogs.map(blog => blog.author))]
      .map(author => ({
        author: author,
        blogs: 0,
      }))

    // count the number of blogs for each author
    authors.map(a => {
      a.blogs = blogs.filter(b => b.author === a.author).length
    })

    // return the author with highest blog count
    return authors.reduce((prev, current) => {
      return (prev.blogs > current.blogs) ? prev : current
    })
  }
  return null
}

// Func returns name and sum of likes for author with the most likes
const mostLikes = (blogs) => {
  if(blogs.length !== 0) {

    // Creates array with author obj: no duplicates: name and likes
    const authors = [... new Set(blogs.map(blog => blog.author))]
      .map(author => ({
        author: author,
        likes: 0,
      }))

    // sum the number of likes for each author
    authors.map(a => {
      a.likes = blogs
        .filter(b => b.author === a.author)
        .map(b => b.likes)
        .reduce((prev, current) => {
          return prev + current
        }, 0)
    })

    // return the author with the most likes
    return authors.reduce((prev, current) => {
      return (prev.likes > current.likes) ? prev : current
    })
  }
  return null
}



module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}