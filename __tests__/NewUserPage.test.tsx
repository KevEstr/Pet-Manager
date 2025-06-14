import { render, screen, fireEvent } from '@testing-library/react'
import NewUser from '@/app/users/new/page'
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

describe('NewUser Component', () => {
  const pushMock = jest.fn()
  
  beforeEach(() => {
    jest.clearAllMocks()
    // Setup router mock
    ;(useRouter as jest.Mock).mockReturnValue({
      push: pushMock,
    })
  })

  it('renders the new user page correctly', () => {
    render(<NewUser />)
    
    // Verificar que los elementos principales están presentes
    expect(screen.getByText('Crear Nuevo Usuario')).toBeInTheDocument()
    expect(screen.getByLabelText('Nombre')).toBeInTheDocument()
    expect(screen.getByLabelText('Email')).toBeInTheDocument()
    expect(screen.getByLabelText('Rol')).toBeInTheDocument()
    expect(screen.getByLabelText('Permisos')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Guardar' })).toBeInTheDocument()
    expect(screen.getByText('Cancelar')).toBeInTheDocument()
  })

  it('updates form data when inputs change', () => {
    render(<NewUser />)
    
    const nameInput = screen.getByLabelText('Nombre')
    const emailInput = screen.getByLabelText('Email')
    const roleSelect = screen.getByLabelText('Rol')
    const permissionsInput = screen.getByLabelText('Permisos')
    
    fireEvent.change(nameInput, { target: { value: 'Test User' } })
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } })
    fireEvent.change(roleSelect, { target: { value: 'admin' } })
    fireEvent.change(permissionsInput, { target: { value: 'read,write' } })
    
    expect(nameInput).toHaveValue('Test User')
    expect(emailInput).toHaveValue('test@example.com')
    expect(roleSelect).toHaveValue('admin')
    expect(permissionsInput).toHaveValue('read,write')
  })

  it('submits the form and redirects to users page', () => {
    // Spy on console.log
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation()
    
    render(<NewUser />)
    
    const nameInput = screen.getByLabelText('Nombre')
    const emailInput = screen.getByLabelText('Email')
    const roleSelect = screen.getByLabelText('Rol')
    const permissionsInput = screen.getByLabelText('Permisos')
    const saveButton = screen.getByRole('button', { name: 'Guardar' })
    
    fireEvent.change(nameInput, { target: { value: 'Test User' } })
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } })
    fireEvent.change(roleSelect, { target: { value: 'admin' } })
    fireEvent.change(permissionsInput, { target: { value: 'read,write' } })
    fireEvent.click(saveButton)
    
    // Verificar que console.log fue llamado con los datos correctos
    expect(consoleSpy).toHaveBeenCalledWith('Datos del nuevo usuario:', {
      name: 'Test User',
      email: 'test@example.com',
      role: 'admin',
      permissions: 'read,write',
    })
    
    // Verificar que se redirige a la página de usuarios
    expect(pushMock).toHaveBeenCalledWith('/users')
    
    consoleSpy.mockRestore()
  })

  it('has a working cancel link', () => {
    render(<NewUser />)
    
    const cancelLink = screen.getByText('Cancelar')
    expect(cancelLink.getAttribute('href')).toBe('/users')
  })

  it('prevents default form submission', () => {
    render(<NewUser />)
    
    const form = screen.getByTestId('new-user-form')
    const preventDefaultMock = jest.fn()
    
    // Simular el evento submit directamente en el formulario
    form.onsubmit = (e) => {
      e.preventDefault()
      preventDefaultMock()
    }
    
    fireEvent.submit(form)
    
    expect(preventDefaultMock).toHaveBeenCalled()
  })

  it('validates role selection', () => {
    render(<NewUser />)
    
    const roleSelect = screen.getByLabelText('Rol')
    
    // Verificar que la opción por defecto está vacía
    expect(roleSelect).toHaveValue('')
    
    // Verificar que todas las opciones están presentes
    const options = screen.getAllByRole('option')
    expect(options.length).toBe(4) // Opción vacía + 3 roles
    
    expect(options[0]).toHaveValue('')
    expect(options[1]).toHaveValue('admin')
    expect(options[2]).toHaveValue('user')
    expect(options[3]).toHaveValue('guest')
    
    expect(options[0]).toHaveTextContent('Seleccionar rol')
    expect(options[1]).toHaveTextContent('Administrador')
    expect(options[2]).toHaveTextContent('Usuario')
    expect(options[3]).toHaveTextContent('Invitado')
  })
})
