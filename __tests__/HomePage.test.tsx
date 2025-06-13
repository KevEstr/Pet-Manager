import { render, screen, fireEvent } from '@testing-library/react'
import Home from '@/app/page'
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

describe('Home Component', () => {
  const pushMock = jest.fn()
  
  beforeEach(() => {
    jest.clearAllMocks()
    // Setup router mock
    ;(useRouter as jest.Mock).mockReturnValue({
      push: pushMock,
    })
  })

  it('renders the login page correctly', () => {
    render(<Home />)
    
    // Verificar que los elementos principales están presentes
    expect(screen.getByAltText('Pet Manager Logo')).toBeInTheDocument()
    expect(screen.getByText('PET MANAGER')).toBeInTheDocument()
    expect(screen.getByText('LOG IN TO YOUR ACCOUNT')).toBeInTheDocument()
    expect(screen.getByLabelText('Username')).toBeInTheDocument()
    expect(screen.getByLabelText('Password')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Log in' })).toBeInTheDocument()
    expect(screen.getByText('Forgot the password?')).toBeInTheDocument()
    expect(screen.getByText('Create new account')).toBeInTheDocument()
  })

  it('updates form data when inputs change', () => {
    render(<Home />)
    
    const usernameInput = screen.getByLabelText('Username')
    const passwordInput = screen.getByLabelText('Password')
    
    fireEvent.change(usernameInput, { target: { value: 'testuser' } })
    fireEvent.change(passwordInput, { target: { value: 'password123' } })
    
    expect(usernameInput).toHaveValue('testuser')
    expect(passwordInput).toHaveValue('password123')
  })

  it('submits the form and redirects to dashboard', () => {
    // Spy on console.log
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation()
    
    render(<Home />)
    
    const usernameInput = screen.getByLabelText('Username')
    const passwordInput = screen.getByLabelText('Password')
    const loginButton = screen.getByRole('button', { name: 'Log in' })
    
    fireEvent.change(usernameInput, { target: { value: 'testuser' } })
    fireEvent.change(passwordInput, { target: { value: 'password123' } })
    fireEvent.click(loginButton)
    
    // Verificar que console.log fue llamado con los datos correctos
    expect(consoleSpy).toHaveBeenCalledWith('Login attempt:', {
      username: 'testuser',
      password: 'password123',
    })
    
    // Verificar que se redirige al dashboard
    expect(pushMock).toHaveBeenCalledWith('/dashboard')
    
    consoleSpy.mockRestore()
  })
})
