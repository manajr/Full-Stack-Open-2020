import React from 'react'
import '@testing-library/react'
import { fireEvent, render } from '@testing-library/react'
import Blog from './Blog'

const blog = {
  title: 'Component testing is done with react-testing-library',
  author: 'Jorger Vaquinho',
  url: 'www.sofazendoconta.com.br',
  likes: 3,
  user: { name:'Jorge Vaca' }
}

test('renders content', () => {

  const component = render(
    <Blog blog={blog}/>
  )
  const span = component.container.querySelector('span')

  expect(span).toHaveTextContent(
    'Component testing is done with react-testing-library'
  )

})

test('renders content with like button', () => {

  const mockHandle = jest.fn()

  const component = render(
    <Blog blog={blog} handleAddLike={mockHandle}/>
  )

  const button = component.container.querySelector('.btn')
  fireEvent.click(button)

  const addLikeBtn = component.container.querySelector('.btnBlog__Likes')
  fireEvent.click(addLikeBtn)
  fireEvent.click(addLikeBtn)

  expect(component.container).toHaveTextContent('www.sofazendoconta.com.br')
  expect(component.container).toHaveTextContent(3)
  expect(mockHandle.mock.calls).toHaveLength(2)
})