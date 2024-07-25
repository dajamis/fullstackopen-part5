import { useState } from 'react'

const CreateNewBlog = ({ handleCreateNew}) => {
    const [newBlog, setNewBlog] = useState({ title: '', author: '', url: '' })

    const handleSubmit = (event) => {
        event.preventDefault()
        handleCreateNew(newBlog)
        setNewBlog({ title: '', author: '', url: '' })
    }

    return (
        <form onSubmit={handleSubmit} className="formDiv">
        <h2>create new</h2>
        <div>
            title:
            <input
            data-testid='title'
            type="text"
            value={newBlog.title}
            name="title"
            onChange={({ target }) => setNewBlog({ ...newBlog, title: target.value })}
            />
        </div>
        <div>
            author:
            <input
            data-testid='author'
            type="text"
            value={newBlog.author}
            name="author"
            onChange={({ target }) => setNewBlog({ ...newBlog, author: target.value })}
            />
        </div>
        <div>
            url:
            <input
            data-testid='url'
            type="text"
            value={newBlog.url}
            name="url"
            onChange={({ target }) => setNewBlog({ ...newBlog, url: target.value })}
            />
        </div>
        <button type="submit">create</button>
        </form>)
}

export default CreateNewBlog