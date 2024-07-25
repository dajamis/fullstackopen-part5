import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'


const blog = {
    title: 'Title for component testing',
    author: 'Tester 123',
    likes: 1,
    url:'www.testing.com',
    user: {
        name: 'User who created the blog'
      }
}

test('renders content', () => {

  render(<Blog blog={blog} />)

  const element = screen.getByText('Title for component testing Tester 123')
  expect(element).toBeDefined()

  const urlElement = screen.queryByText('www.testing.com')
  expect(urlElement).toBeNull()

  const likesElement = screen.queryByText('1 likes')
  expect(likesElement).toBeNull()
})

test('clicking the view button shows blog details', async () => {
    
    const mockHandler = vi.fn()
  
    render(<Blog blog={blog}/>)
  
    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    const urlElement = screen.queryByText('www.testing.com')
    expect(urlElement).toBeDefined()
  
    const likesElement = screen.queryByText('1 likes')
    expect(likesElement).toBeDefined()
})

test('clicking the like button twice calls event handler twice', async () => {
    
    const mockHandler = vi.fn()
  
    render(<Blog blog={blog} handleLike={mockHandler} />)
  
    const user = userEvent.setup()
    const viewButton = screen.getByText('view')
    await user.click(viewButton)

    const likeButton = screen.getByText('like')
    await user.click(likeButton)
    await user.click(likeButton)
  
    console.log(blog.likes)

    expect(mockHandler.mock.calls).toHaveLength(2)
  })