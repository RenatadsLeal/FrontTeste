import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import UserProvider from '../contexts/UserContext';
import Login from '.././pages/Login';

test('login with correct info', async () => {

  const handleSubmit = jest.fn()

  render(<BrowserRouter><UserProvider><Login onSubmit={handleSubmit} /></UserProvider></BrowserRouter>)

  userEvent.type(screen.getByLabelText(/email/i), 'ca_haka@gmail.com')
  userEvent.type(screen.getByLabelText(/senha/i), 'cahakas')

  userEvent.click(screen.getByRole('button', { name: /entrar/i })) 

  await waitFor(() =>
    expect(handleSubmit).toHaveBeenCalledWith({
      email: 'ca_haka@gmail.com',
      password: 'cahakas',
    }),
  )
})

test('login with incorrect info', async () => {

  const handleSubmit = jest.fn()

  render(<BrowserRouter><UserProvider><Login onSubmit={handleSubmit} /></UserProvider></BrowserRouter>)

  userEvent.type(screen.getByLabelText(/email/i), 'ca_haka@gmail.co')
  userEvent.type(screen.getByLabelText(/senha/i), 'cahakas')

  userEvent.click(screen.getByRole('button', { name: /entrar/i }))

  await waitFor(() => {
    expect(screen.getByText('Por favor, tente novamente, suas credenciais são inválidas')).toBeInTheDocument()
  })
})