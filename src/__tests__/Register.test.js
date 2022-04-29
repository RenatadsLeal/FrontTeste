import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Register from '../pages/Register';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

test('Register with correct info', async () => {

    const handleSubmit = jest.fn()
    render(

        <BrowserRouter>
            <HelmetProvider>
                <Register onSubmit={handleSubmit} />
            </HelmetProvider>
        </BrowserRouter>
    )

    userEvent.type(screen.getByLabelText(/Nome/), 'User')
    userEvent.type(screen.getByLabelText(/Sobrenome/), 'Last Name')
    userEvent.type(screen.getByLabelText(/Email/), 'user@email.com')
    userEvent.type(screen.getByLabelText(/Confirmar email/), 'user@email.com')
    userEvent.type(screen.getByLabelText(/Senha/), '12345679')

    userEvent.click(screen.getByRole('button', { name: /Registrar/ }))

    await waitFor(() =>
        expect(handleSubmit).toHaveBeenCalledWith({
            name: 'User',
            surname: 'Last Name',
            email: 'user@email.com',
            emailConfirmation: 'user@email.com',
            password: '12345679'
        }),
    )
})

test('Register with incorrect email', async () => {

    const handleSubmit = jest.fn()
    render(
        <BrowserRouter>
            <HelmetProvider>
                <Register onSubmit={handleSubmit} />
            </HelmetProvider>
        </BrowserRouter>
    )

    userEvent.type(screen.getByLabelText(/Nome/), 'User')
    userEvent.type(screen.getByLabelText(/Sobrenome/), 'Last Name')
    userEvent.type(screen.getByLabelText(/Email/), 'useremail.com')
    userEvent.type(screen.getByLabelText(/Confirmar email/), 'useremail.com')
    
    userEvent.type(screen.getByLabelText(/Senha/), '12345679')

    userEvent.click(screen.getByRole('button', { name: /Registrar/ }))

    await waitFor(() => {
        expect(screen.getByText('Email inválido')).toBeInTheDocument()
    })
})

test('Register with email does not match', async () => {

    const handleSubmit = jest.fn()
    render(
        <BrowserRouter>
            <HelmetProvider>
                <Register onSubmit={handleSubmit} />
            </HelmetProvider>
        </BrowserRouter>
    )

    userEvent.type(screen.getByLabelText(/Nome/), 'User')
    userEvent.type(screen.getByLabelText(/Sobrenome/), 'Last Name')
    userEvent.type(screen.getByLabelText(/Email/), 'usere@mail.com')
    userEvent.type(screen.getByLabelText(/Confirmar email/), 'user@mail.com')
    userEvent.type(screen.getByLabelText(/Senha/), '123456679')

    userEvent.click(screen.getByRole('button', { name: /Registrar/ }))

    await waitFor(() => {
        expect(screen.getByText('Email não coincide')).toBeInTheDocument()
    })
})

test('Register with invalid name', async () => {

    const handleSubmit = jest.fn()
    render(
        <BrowserRouter>
            <HelmetProvider>
                <Register onSubmit={handleSubmit} />
            </HelmetProvider>
        </BrowserRouter>
    )

    userEvent.type(screen.getByLabelText(/Nome/), '')
    userEvent.type(screen.getByLabelText(/Sobrenome/), 'Last Name')
    userEvent.type(screen.getByLabelText(/Email/), 'usere@mail.com')
    userEvent.type(screen.getByLabelText(/Confirmar email/), 'user@email.com')
    userEvent.type(screen.getByLabelText(/Senha/), '12345679')

    userEvent.click(screen.getByRole('button', { name: /Registrar/ }))

    await waitFor(() => {
        expect(screen.getByText('Obrigatório')).toBeInTheDocument()
    })
}) 

test('Register with min password length', async () => {

    const handleSubmit = jest.fn()
    render(
        <BrowserRouter>
            <HelmetProvider>
                <Register onSubmit={handleSubmit} />
            </HelmetProvider>
        </BrowserRouter>
    )

    userEvent.type(screen.getByLabelText(/Nome/), 'User')
    userEvent.type(screen.getByLabelText(/Sobrenome/), 'last name')
    userEvent.type(screen.getByLabelText(/Email/), 'usere@mail.com')
    userEvent.type(screen.getByLabelText(/Confirmar email/), 'user@email.com')
    userEvent.type(screen.getByLabelText(/Senha/), '123456')

    userEvent.click(screen.getByRole('button', { name: /Registrar/ }))

    await waitFor(() => {
        expect(screen.getByText('A senha deve ter no mínimo 7 caracteres')).toBeInTheDocument()
    })
})

test('Register with name above character limit', async () => {

    const handleSubmit = jest.fn()
    render(
        <BrowserRouter>
            <HelmetProvider>
                <Register onSubmit={handleSubmit} />
            </HelmetProvider>
        </BrowserRouter>
    )

    userEvent.type(screen.getByLabelText(/Nome/), 'CarolinaHakamada')
    userEvent.type(screen.getByLabelText(/Sobrenome/), 'Last Name')
    userEvent.type(screen.getByLabelText(/Email/), 'usere@mail.com')
    userEvent.type(screen.getByLabelText(/Confirmar email/), 'user@email.com')
    userEvent.type(screen.getByLabelText(/Senha/), '12345679')

    userEvent.click(screen.getByRole('button', { name: /Registrar/ }))

    await waitFor(() => {
        expect(screen.getByText('Deve conter no máximo 15 letras')).toBeInTheDocument()
    })
}) 

test('Register with surname above character limit', async () => {

    const handleSubmit = jest.fn()
    render(
        <BrowserRouter>
            <HelmetProvider>
                <Register onSubmit={handleSubmit} />
            </HelmetProvider>
        </BrowserRouter>
    )

    userEvent.type(screen.getByLabelText(/Nome/), 'Carolina')
    userEvent.type(screen.getByLabelText(/Sobrenome/), 'CarolinaMontesinosHakamada')
    userEvent.type(screen.getByLabelText(/Email/), 'usere@mail.com')
    userEvent.type(screen.getByLabelText(/Confirmar email/), 'user@email.com')
    userEvent.type(screen.getByLabelText(/Senha/), '12345679')

    userEvent.click(screen.getByRole('button', { name: /Registrar/ }))

    await waitFor(() => {
        expect(screen.getByText('Deve conter no máximo 20 letras')).toBeInTheDocument()
    })
})

test('Register valid inputs', async () => {

    const handleSubmit = jest.fn()
    render(
        <BrowserRouter>
            <HelmetProvider>
                <Register onSubmit={handleSubmit} />
            </HelmetProvider>
        </BrowserRouter>
    )

    userEvent.type(screen.getByLabelText(/Nome/), 'Carolina')
    userEvent.type(screen.getByLabelText(/Sobrenome/), 'Hakamada')
    userEvent.type(screen.getByLabelText(/Email/), 'usere@mail.com')
    userEvent.type(screen.getByLabelText(/Confirmar email/), 'user@email.com')
    userEvent.type(screen.getByLabelText(/Senha/), '12345679')

    userEvent.click(screen.getByRole('button', { name: /Registrar/ }))

    await waitFor(() => {
        expect(screen.queryByText('Obrigatório')).not.toBeInTheDocument()
    }) 
})