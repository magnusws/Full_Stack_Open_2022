const listHelper = require('../utils/list_helper')
const testHelper = require('./test_helper')

test('dummy returns one', () => {

  const result = listHelper.dummy(testHelper.emptyList)
  expect(result).toBe(1)
})

// TOTAL LIKES
describe('total likes', () => {

  // Test: that func returns zero when list is empty
  test('of empty list is zero', () => {
    const result = listHelper.totalLikes(testHelper.emptyList)
    expect(result).toBe(0)
  })

  // Test: when only one blog it returns the value of that
  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(testHelper.listWithOneBlog)
    expect(result).toBe(5)
  })

  // Test: that bigger list is calculated correctly
  test('of a bigger list is calculated correctly', () => {
    const result = listHelper.totalLikes(testHelper.initialBlogs)
    expect(result).toBe(36)
  })
})

// MOST LIKES
describe('most likes', () => {

  // Test: that func returns null when list is empty
  test('of empty list is null', () => {
    const result = listHelper.favoriteBlog(testHelper.emptyList)
    expect(result).toBe(null)
  })

  // Test: when only one blog it returns its data
  test('when list has only one blog, it returns its data', () => {
    const result = listHelper.favoriteBlog(testHelper.listWithOneBlog)
    expect(result).toEqual({
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      likes: 5,
    })
  })
  
  // Test: that in a bigger list it returns data for the blog with most likes
  test('in a bigger list is found and data for that blog is returned', () => {
    const result = listHelper.favoriteBlog(testHelper.initialBlogs)
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
    const result = listHelper.mostBlogs(testHelper.emptyList)
    expect(result).toBe(null)
  })

  // Test: when only one blog it returns its author and count equals one
  test('in a list with one is returned and count equals one', () => {
    const result = listHelper.mostBlogs(testHelper.listWithOneBlog)
    expect(result).toEqual({
      author: 'Edsger W. Dijkstra',
      blogs: 1,
    })
  })

  // Test: that in a bigger list it returns the correct author and count
  test('in a bigger list is found and returned in the correct format', () => {
    const result = listHelper.mostBlogs(testHelper.initialBlogs)
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
    const result = listHelper.mostLikes(testHelper.emptyList)
    expect(result).toBe(null)
  })

  // Test: when only one blog it returns its author and like count
  test('in a list with one is returned and sum equals num of likes', () => {
    const result = listHelper.mostLikes(testHelper.listWithOneBlog)
    expect(result).toEqual({
      author: 'Edsger W. Dijkstra',
      likes: 5,
    })
  })

  // Test: that in a bigger list it returns the author with most likes in total
  test('in a bigger list is found and returned with correct num of likes', () => {
    const result = listHelper.mostLikes(testHelper.initialBlogs)
    expect(result).toEqual({
      author: "Edsger W. Dijkstra",
      likes: 17,
    })
  })
})