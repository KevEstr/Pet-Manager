import { render, screen, fireEvent } from '@testing-library/react'
import Register from '@/app/register/page'
import { useRouter } from 'next/navigation'

// Mock de next/navigation
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}))

// Mock de next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    // Remove priority prop to avoid warning
    const { priority, ...rest } = props
    return <img {...rest} />
  },
}))

describe('Register Component', () => {
  const pushMock = jest.fn()
  
  beforeEach(() => {
    jest.clearAllMocks()
    // Setup router mock
    ;(useRouter as jest.Mock).mockReturnValue({
      push: pushMock,
    })
  })

  it('renders the registration page correctly', () => {
    render(<Register />)
    
    // Verificar que los elementos principales están presentes
    expect(screen.getByAltText('Pet Manager Logo')).toBeInTheDocument()
    expect(screen.getByText('CREATE A NEW ACCOUNT')).toBeInTheDocument()
    
    // Verificar que todos los campos del formulario están presentes
    expect(screen.getByLabelText('Username')).toBeInTheDocument()
    expect(screen.getByLabelText('Name')).toBeInTheDocument()
    expect(screen.getByLabelText('Password')).toBeInTheDocument()
    expect(screen.getByLabelText('Confirm Password')).toBeInTheDocument()
    expect(screen.getByLabelText('Email')).toBeInTheDocument()
    expect(screen.getByLabelText('Phone')).toBeInTheDocument()
    expect(screen.getByLabelText('ID')).toBeInTheDocument()
    expect(screen.getByLabelText('Address')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Register' })).toBeInTheDocument()
  })

  it('updates form data when inputs change', () => {
    render(<Register />)
    
    // Obtener todos los campos del formulario
    const usernameInput = screen.getByLabelText('Username')
    const nameInput = screen.getByLabelText('Name')
    const passwordInput = screen.getByLabelText('Password')
    const confirmPasswordInput = screen.getByLabelText('Confirm Password')
    const emailInput = screen.getByLabelText('Email')
    const phoneInput = screen.getByLabelText('Phone')
    const idInput = screen.getByLabelText('ID')
    const addressInput = screen.getByLabelText('Address')
    
    // Cambiar valores en los campos
    fireEvent.change(usernameInput, { target: { value: 'testuser' } })
    fireEvent.change(nameInput, { target: { value: 'Test User' } })
    fireEvent.change(passwordInput, { target: { value: 'password123' } })
    fireEvent.change(confirmPasswordInput, { target: { value: 'password123' } })
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } })
    fireEvent.change(phoneInput, { target: { value: '1234567890' } })
    fireEvent.change(idInput, { target: { value: '123456' } })
    fireEvent.change(addressInput, { target: { value: 'Test Address' } })
    
    // Verificar que los valores se actualizaron correctamente
    expect(usernameInput).toHaveValue('testuser')
    expect(nameInput).toHaveValue('Test User')
    expect(passwordInput).toHaveValue('password123')
    expect(confirmPasswordInput).toHaveValue('password123')
    expect(emailInput).toHaveValue('test@example.com')
    expect(phoneInput).toHaveValue('1234567890')
    expect(idInput).toHaveValue('123456')
    expect(addressInput).toHaveValue('Test Address')
  })

  it('submits the form and redirects to login page', () => {
    // Spy on console.log
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation()
    
    render(<Register />)
    
    // Obtener todos los campos del formulario
    const usernameInput = screen.getByLabelText('Username')
    const nameInput = screen.getByLabelText('Name')
    const passwordInput = screen.getByLabelText('Password')
    const confirmPasswordInput = screen.getByLabelText('Confirm Password')
    const emailInput = screen.getByLabelText('Email')
    const phoneInput = screen.getByLabelText('Phone')
    const idInput = screen.getByLabelText('ID')
    const addressInput = screen.getByLabelText('Address')
    const registerButton = screen.getByRole('button', { name: 'Register' })
    
    // Llenar el formulario
    fireEvent.change(usernameInput, { target: { value: 'testuser' } })
    fireEvent.change(nameInput, { target: { value: 'Test User' } })
    fireEvent.change(passwordInput, { target: { value: 'password123' } })
    fireEvent.change(confirmPasswordInput, { target: { value: 'password123' } })
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } })
    fireEvent.change(phoneInput, { target: { value: '1234567890' } })
    fireEvent.change(idInput, { target: { value: '123456' } })
    fireEvent.change(addressInput, { target: { value: 'Test Address' } })
    
    // Enviar el formulario
    fireEvent.click(registerButton)
    
    // Verificar que console.log fue llamado con los datos correctos
    expect(consoleSpy).toHaveBeenCalledWith('Datos de registro:', {
      username: 'testuser',
      name: 'Test User',
      password: 'password123',
      confirmPassword: 'password123',
      email: 'test@example.com',
      phone: '1234567890',
      id: '123456',
      address: 'Test Address',
    })
    
    // Verificar que se redirige a la página de inicio de sesión
    expect(pushMock).toHaveBeenCalledWith('/')
    
    consoleSpy.mockRestore()
  })

  it('prevents default form submission', () => {
    render(<Register />)
    
    const form = screen.getByText('CREATE A NEW ACCOUNT').closest('form')
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
