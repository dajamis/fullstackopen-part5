import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CreateNewBlog from './CreateNewBlog'
import { useState } from 'react'

test('when new blog is created, form calls the event handler with the right details', async () => {
    const handleCreateNew = vi.fn()
    const user = userEvent.setup()
  
    render(<CreateNewBlog handleCreateNew={handleCreateNew} />)
  
    const inputs = screen.getAllByRole('textbox')
    const createNewButton = screen.getByText('create new')

    await user.click(createNewButton)
  
    await user.type(inputs[0], 'Title for testing')
    await user.type(inputs[1], 'Test Author')
    await user.type(inputs[2], 'www.testing.com')

    const submitButton = screen.getByText('create')

    await user.click(submitButton)
  
    expect(handleCreateNew.mock.calls).toHaveLength(1)
    expect(handleCreateNew.mock.calls[0][0]).toEqual({
        title: 'Title for testing',
        author: 'Test Author',
        url: 'www.testing.com'
      })

  })