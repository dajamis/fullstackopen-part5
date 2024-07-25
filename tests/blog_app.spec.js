const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('Blog app', () => {
    beforeEach(async ({ page, request }) => {
        await request.post('http:localhost:3003/api/testing/reset')
        await request.post('http://localhost:3003/api/users', {
          data: {
            name: 'Matti Luukkainen',
            username: 'mluukkai',
            password: 'salainen'
          }
        })
    
        await page.goto('http://localhost:5173')
    })

    test('Login form is shown', async ({ page }) => {
        const locator = await page.getByText('log in to application')
        await expect(locator).toBeVisible()

        await expect(page.getByTestId('username')).toBeVisible()
        await expect(page.getByTestId('password')).toBeVisible()

        await expect(page.getByRole('button', { name: 'login' })).toBeVisible()
    })
    describe('Login', () => {
        test('succeeds with right credentials', async ({ page }) => {

            await page.getByTestId('username').fill('mluukkai')
            await page.getByTestId('password').fill('salainen')
            
            await page.getByRole('button', { name: 'login' }).click()
            
            await expect(page.getByText('Login successful')).toBeVisible()
        })

        test('fails with wrong credentials', async ({ page }) => {

          await page.getByTestId('username').fill('mluukkai')
          await page.getByTestId('password').fill('wrong')
          
          await page.getByRole('button', { name: 'login' }).click()
          
          await expect(page.getByText('wrong user name or password')).toBeVisible()
      })
    })

    describe('When logged in', () => {
      beforeEach(async ({ page }) => {
          await page.getByTestId('username').fill('mluukkai')
          await page.getByTestId('password').fill('salainen')
          
          await page.getByRole('button', { name: 'login' }).click()
          // await page.waitForSelector('.success-notification', { state: 'hidden' })
          // await page.waitForTimeout(5000)
      })
    
      test('create a new blog succeeds', async ({ page }) => {
        await page.getByRole('button', { name: 'create' }).click()

        await page.getByTestId('title').fill('End to end testing')
        await page.getByTestId('author').fill('Test author')
        await page.getByTestId('url').fill('www.testing.com')
        
        await page.getByRole('button', { name: 'create' }).click()

        await expect(page.getByText('End to end testing Test author')).toBeVisible()
      })

      test('like a blog succeeds', async ({ page }) => {
        //create new blog
        await page.getByRole('button', { name: 'create' }).click()
        await page.getByTestId('title').fill('End to end testing')
        await page.getByTestId('author').fill('Test author')
        await page.getByTestId('url').fill('www.testing.com')
        await page.getByRole('button', { name: 'create' }).click()
        
        //like a blog
        await page.getByRole('button', { name: 'view' }).click()
        await page.getByRole('button', { name: 'like' }).click()

        await expect(page.getByText('Liked "End to end testing"')).toBeVisible()
      })

      test('delete blog succeeds by the user who created it', async ({ page }) => {
        //create new blog
        await page.getByRole('button', { name: 'create new' }).click()
        await page.getByTestId('title').fill('End to end testing')
        await page.getByTestId('author').fill('Test author')
        await page.getByTestId('url').fill('www.testing.com')
        await page.getByRole('button', { name: 'create' }).click()
  
        // delete blog
        await page.getByRole('button', { name: 'view' }).click()
        await page.getByRole('button', { name: 'remove' }).click()
        page.on('dialog', dialog => dialog.accept())
        await expect(page.getByText('Deleted "End to end testing"')).toBeVisible
      })
  
      test('delete not available for other users than creator', async ({ page, request }) => {
        //create new blog
        await page.getByRole('button', { name: 'create new' }).click()
        await page.getByTestId('title').fill('End to end testing')
        await page.getByTestId('author').fill('Test author')
        await page.getByTestId('url').fill('www.testing.com')
        await page.getByRole('button', { name: 'create' }).click()
  
        // delete available for creator
        await page.getByRole('button', { name: 'view' }).click()
        await expect(page.getByRole('button', { name: 'remove' })).toBeVisible()
  
        // delete unavailable for another user
        await page.getByRole('button', { name: 'logout' }).click()
  
        const newUser = {
          username: 'anotheruser',
          name: 'Another User',
          password: 'password',
        }
  
        await request.post('http://localhost:3003/api/users', {
          data: newUser
        })
  
        await page.getByTestId('username').fill('anotheruser')
        await page.getByTestId('password').fill('password')
        await page.getByRole('button', { name: 'login' }).click()
  
        await page.getByRole('button', { name: 'view' }).click()
        await expect(page.getByRole('button', { name: 'remove' })).not.toBeVisible()
      })
    })
})