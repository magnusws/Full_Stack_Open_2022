const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {

  const result = listHelper.dummy(emptyList)
  expect(result).toBe(1)
})

// TOTAL LIKES
describe('total likes', () => {

  // Test: that func returns zero when list is empty
  test('of empty list is zero', () => {
    const result = listHelper.totalLikes(emptyList)
    expect(result).toBe(0)
  })

  // Test: when only one blog it returns the value of that
  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(5)
  })

  // Test: that bigger list is calculated correctly
  test('of a bigger list is calculated correctly', () => {
    const result = listHelper.totalLikes(listWithSixBlogs)
    expect(result).toBe(36)
  })
})

// MOST LIKES
describe('most likes', () => {

  // Test: that func returns null when list is empty
  test('of empty list is null', () => {
    const result = listHelper.favoriteBlog(emptyList)
    expect(result).toBe(null)
  })

  // Test: when only one blog it returns its data
  test('when list has only one blog, it returns its data', () => {
    const result = listHelper.favoriteBlog(listWithOneBlog)
    expect(result).toEqual({
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      likes: 5,
    })
  })
  
  // Test: that in a bigger list it returns data for the blog with most likes
  test('in a bigger list is found and data for that blog is returned', () => {
    const result = listHelper.favoriteBlog(listWithSixBlogs)
    expect(result).toEqual({
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      likes: 12,
    })
  })
})

// AUTHOR WITH MOST BLOGS
describe('author with most blogs', () => {

  // Test: that func returns null when list is empty
  test('of empty list is null', () => {
    const result = listHelper.mostBlogs(emptyList)
    expect(result).toBe(null)
  })

  // Test: when only one blog it returns its author and count equals one
  test('in a list with one is returned and count equals one', () => {
    const result = listHelper.mostBlogs(listWithOneBlog)
    expect(result).toEqual({
      author: 'Edsger W. Dijkstra',
      blogs: 1,
    })
  })

  // Test: that in a bigger list it returns the correct author and count
  test('in a bigger list is found and returned in the correct format', () => {
    const result = listHelper.mostBlogs(listWithSixBlogs)
    expect(result).toEqual({
      author: 'Robert C. Martin',
      blogs: 3,
    })
  })
})

// AUTHOR WITH MOST LIKES
describe('author with most likes', () => {

  // Test: that func returns null when list is empty
  test('of empty list is null', () => {
    const result = listHelper.mostLikes(emptyList)
    expect(result).toBe(null)
  })

  // Test: when only one blog it returns its author and like count
  test('in a list with one is returned and sum equals num of likes', () => {
    const result = listHelper.mostLikes(listWithOneBlog)
    expect(result).toEqual({
      author: 'Edsger W. Dijkstra',
      likes: 5,
    })
  })

  // Test: that in a bigger list it returns the author with most likes in total
  test('in a bigger list is found and returned with correct num of likes', () => {
    const result = listHelper.mostLikes(listWithSixBlogs)
    expect(result).toEqual({
      author: "Edsger W. Dijkstra",
      likes: 17,
    })
  })
})

// Test input: empty list
const emptyList = []

// Test input: list with data for one blog
const listWithOneBlog = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  }
]

// Test input: list with data for six blogs
const listWithSixBlogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0
  }
]