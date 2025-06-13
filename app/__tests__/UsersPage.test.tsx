import { render, screen, fireEvent } from '@testing-library/react'
import Users from '@/app/users/page'

// Mock de next/link
jest.mock('next/link', () => {
  return ({ children, href }: { children: React.ReactNode; href: string }) => {
    return <a href={href}>{children}</a>
  }
})

// Mock de lucide-react
jest.mock('lucide-react', () => ({
  PawPrint: () => <div data-testid="paw-print-icon" />,
}))

describe('Users Component', () => {
  it('renders the users page correctly', () => {
    render(<Users />)
    
    // Verificar que los elementos principales están presentes
    expect(screen.getByText('USUARIOS DEL SISTEMA')).toBeInTheDocument()
    expect(screen.getByText('New user')).toBeInTheDocument()
    expect(screen.getByTestId('paw-print-icon')).toBeInTheDocument()
    
    // Verificar que la tabla tiene los encabezados correctos
    expect(screen.getByRole('columnheader', { name: /Name/i })).toBeInTheDocument()
    expect(screen.getByRole('columnheader', { name: /Email/i })).toBeInTheDocument()
    expect(screen.getByRole('columnheader', { name: /Role/i })).toBeInTheDocument()
    expect(screen.getByRole('columnheader', { name: /Permissions/i })).toBeInTheDocument()
    expect(screen.getByRole('columnheader', { name: /Editar/i })).toBeInTheDocument()
    expect(screen.getByRole('columnheader', { name: /Eliminar/i })).toBeInTheDocument()
  })

  it('displays user data in the table', () => {
    render(<Users />)
    
    // Verificar que hay 7 filas de usuarios (basado en los datos de ejemplo)
    const nameElements = screen.getAllByText('Name')
    // -1 porque uno es el encabezado de la columna
    expect(nameElements.length - 1).toBe(7)
    
    // Verificar que los botones de acción están presentes para cada usuario
    const editButtons = screen.getAllByText('Editar')
    const deleteButtons = screen.getAllByText('Eliminar')
    
    expect(editButtons.length).toBe(8) // 7 users + 1 header
    expect(deleteButtons.length).toBe(8) // 7 users + 1 header
  })

  it('deletes a user when delete button is clicked', () => {
    render(<Users />)
    
    // Contar usuarios iniciales
    const initialRows = screen.getAllByText('Name').length - 1 // -1 por el encabezado
    
    // Hacer clic en el primer botón de eliminar
    const deleteButtons = screen.getAllByText('Eliminar')
    fireEvent.click(deleteButtons[1]) // Click the first actual delete button (skip header)
    
    // Verificar que hay un usuario menos
    const remainingRows = screen.getAllByText('Name').length - 1 // -1 por el encabezado
    expect(remainingRows).toBe(initialRows - 1)
  })

  it('has a working link to create new user', () => {
    render(<Users />)
    
    const newUserLink = screen.getByText('New user')
    expect(newUserLink.getAttribute('href')).toBe('/users/new')
  })
})
