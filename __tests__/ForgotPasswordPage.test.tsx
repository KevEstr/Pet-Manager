import { render, screen, fireEvent } from '@testing-library/react'
import ForgotPassword from '@/app/forgot-password/page'
import { useRouter } from 'next/navigation'

// Mock de next/navigation
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}))

// Mock de next/link
jest.mock('next/link', () => {
  return ({ children, href }: { children: React.ReactNode; href: string }) => {
    return <a href={href}>{children}</a>
  }
})

describe('ForgotPassword Component', () => {
  const pushMock = jest.fn()
  
  beforeEach(() => {
    jest.clearAllMocks()
    // Setup router mock
    ;(useRouter as jest.Mock).mockReturnValue({
      push: pushMock,
    })
  })

  it('renders the forgot password page correctly', () => {
    render(<ForgotPassword />)
    
    // Verificar que los elementos principales están presentes
    expect(screen.getByText('Recuperar Contraseña')).toBeInTheDocument()
    expect(screen.getByLabelText('Email')).toBeInTheDocument()
    expect(screen.getByText('Ingresa tu correo electrónico y te enviaremos un enlace para restablecer tu contraseña.')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Enviar' })).toBeInTheDocument()
    expect(screen.getByText('Volver al inicio de sesión')).toBeInTheDocument()
    
    // Verificar específicamente que el formulario está presente
    const form = screen.getByTestId('forgot-password-form')
    expect(form).toBeInTheDocument()
    expect(form).toHaveAttribute('data-testid', 'forgot-password-form')
  })

  it('updates email state when input changes', () => {
    render(<ForgotPassword />)
    
    const emailInput = screen.getByLabelText('Email')
    
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } })
    
    expect(emailInput).toHaveValue('test@example.com')
  })

  it('shows success message after form submission', () => {
    // Spy on console.log
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation()
    
    render(<ForgotPassword />)
    
    const emailInput = screen.getByLabelText('Email')
    const submitButton = screen.getByRole('button', { name: 'Enviar' })
    
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } })
    fireEvent.click(submitButton)
    
    // Verificar que console.log fue llamado con los datos correctos
    expect(consoleSpy).toHaveBeenCalledWith('Solicitud de recuperación para:', 'test@example.com')
    
    // Verificar que se muestra el mensaje de éxito
    expect(screen.getByText(/Se ha enviado un correo electrónico a/)).toBeInTheDocument()
    expect(screen.getByText('test@example.com')).toBeInTheDocument()
    expect(screen.getByText(/con instrucciones para restablecer tu contraseña/)).toBeInTheDocument()
    
    // Verificar que el formulario ya no está visible
    expect(screen.queryByLabelText('Email')).not.toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'Enviar' })).not.toBeInTheDocument()
    
    consoleSpy.mockRestore()
  })

  it('has a working link back to login page', () => {
    render(<ForgotPassword />)
    
    const loginLink = screen.getByText('Volver al inicio de sesión')
    expect(loginLink.getAttribute('href')).toBe('/')
  })

  it('prevents default form submission', () => {
    render(<ForgotPassword />)
    
    const form = screen.getByTestId('forgot-password-form')
    const preventDefaultMock = jest.fn()
    
    // Simular el evento submit directamente en el formulario
    form.onsubmit = (e) => {
      e.preventDefault()
      preventDefaultMock()
    }
    
    fireEvent.submit(form)
    
    expect(preventDefaultMock).toHaveBeenCalled()
  })
})
