import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

test('<BlogForm /> updates parent states and calls onSubmit', () => {
  const createBlog = jest.fn()

  // render form
  const component = render(<BlogForm createBlog={createBlog} />)

  // select form fields by id and button by text
  const inputTitle = component.container.querySelector('#blog-title-input')
  const inputAuthor = component.container.querySelector('#blog-author-input')
  const inputUrl = component.container.querySelector('#blog-url-input')
  const submitButton = screen.getByText('create')

  // input text in form fields and submit form
  userEvent.type(inputTitle, 'testing a form')
  userEvent.type(inputAuthor, 'Test A. Form')
  userEvent.type(inputUrl, 'www.test.com')
  userEvent.click(submitButton)

  // expect form to call the event handler it received as props once..
  expect(createBlog.mock.calls).toHaveLength(1)

  // ..with the right details when a new blog is created
  expect(createBlog.mock.calls[0][0].title).toBe('testing a form')
  expect(createBlog.mock.calls[0][0].author).toBe('Test A. Form')
  expect(createBlog.mock.calls[0][0].url).toBe('www.test.com')
})