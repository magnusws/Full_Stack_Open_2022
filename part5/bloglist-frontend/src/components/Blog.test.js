import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe ('<Blog />', () => {
  let component

  const username = 'test'

  const blog = {
    id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    user: {
      username: 'test',
      name: 'Test Testesen',
      id: '6203b2664af321ba26f54538'
    }
  }

  const updateHandler = jest.fn()
  const removeHandler = jest.fn()

  beforeEach(() => {
    component = render(<Blog
      blog={blog}
      username={username}
      update={updateHandler}
      remove={removeHandler}
    />)
  })

  test('initially renders title and author, but not blog details', () => {
    // expect title and author to be defined
    const title = component.container.querySelector('.blogTitle')
    const author = component.container.querySelector('.blogAuthor')
    expect(title).toBeDefined()
    expect(author).toBeDefined()

    // expect title and author text to be rendered
    const titleText = screen.getByText('React patterns')
    const authorText = screen.getByText('Michael Chan')
    expect(titleText).toBeDefined()
    expect(authorText).toBeDefined()

    // expect url and likes not to be defined
    const blogDetails = component.container.querySelector('.blogDetails')
    expect(blogDetails).toBeFalsy()
  })

  test('url and likes are shown when view button has been clicked', () => {
    // click view button
    const button = screen.getByText('view')
    userEvent.click(button)

    // expect blog details to be defined
    const blogDetails = component.container.querySelector('.blogDetails')
    expect(blogDetails).toBeDefined()

    // expect url and likes to be defined
    const blogUrl = component.container.querySelector('.blogUrl')
    const blogLikes = component.container.querySelector('.blogLikes')
    expect(blogUrl).toBeDefined()
    expect(blogLikes).toBeDefined()
  })

  test('when like is clicked twice, event handler is called twice', () => {
    // click view button
    const viewButton = screen.getByText('view')
    userEvent.click(viewButton)

    // click like button two times
    const likeButton = screen.getByText('like')
    userEvent.click(likeButton)
    userEvent.click(likeButton)

    // expect mock update func to have been called twice
    expect(updateHandler.mock.calls).toHaveLength(2)
  })
})