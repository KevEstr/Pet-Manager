import { render, screen, fireEvent } from '@testing-library/react'
import Sales from '@/app/sales/page'

describe('Sales Component', () => {
  beforeEach(() => {
    // Spy on console.log
    jest.spyOn(console, 'log').mockImplementation()
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('renders the sales page correctly', () => {
    render(<Sales />)
    
    // Verificar que los elementos principales están presentes
    expect(screen.getByText('LISTA DE VENTAS')).toBeInTheDocument()
    expect(screen.getByText('Nueva venta')).toBeInTheDocument()
    expect(screen.getByText('Exportar')).toBeInTheDocument()
    expect(screen.getByText('Registro de Ventas')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Buscar venta...')).toBeInTheDocument()
  })

  it('displays sales data in the table', () => {
    render(<Sales />)
    
    // Verificar que los datos de ejemplo se muestran en la tabla
    expect(screen.getByText('#1')).toBeInTheDocument()
    expect(screen.getByText('Juan Pérez')).toBeInTheDocument()
    expect(screen.getByText('$120.50')).toBeInTheDocument()
    
    // Verificar que los estados se muestran correctamente
    const completedStatuses = screen.getAllByText('Completed')
    const pendingStatuses = screen.getAllByText('Pending')
    const cancelledStatus = screen.getByText('Cancelled')
    
    expect(completedStatuses.length).toBeGreaterThan(0)
    expect(pendingStatuses.length).toBeGreaterThan(0)
    expect(cancelledStatus).toBeInTheDocument()
  })

  it('filters sales based on search term', () => {
    render(<Sales />)
    
    const searchInput = screen.getByPlaceholderText('Buscar venta...')
    
    // Buscar por nombre de cliente
    fireEvent.change(searchInput, { target: { value: 'Juan' } })
    expect(screen.getByText('Juan Pérez')).toBeInTheDocument()
    expect(screen.queryByText('María García')).not.toBeInTheDocument()
    
    // Buscar por ID
    fireEvent.change(searchInput, { target: { value: '2' } })
    expect(screen.queryByText('Juan Pérez')).not.toBeInTheDocument()
    expect(screen.getByText('María García')).toBeInTheDocument()
    
    // Limpiar búsqueda
    fireEvent.change(searchInput, { target: { value: '' } })
    expect(screen.getByText('Juan Pérez')).toBeInTheDocument()
    expect(screen.getByText('María García')).toBeInTheDocument()
  })

  it('opens and closes the new sale form modal', () => {
    render(<Sales />)
    
    // Verificar que el modal no está visible inicialmente
    expect(screen.queryByText('Nueva Venta')).not.toBeInTheDocument()
    
    // Abrir el modal
    const newSaleButton = screen.getByText('Nueva venta')
    fireEvent.click(newSaleButton)
    
    // Verificar que el modal está visible
    expect(screen.getByText('Nueva Venta')).toBeInTheDocument()
    
    // Cerrar el modal
    const cancelButton = screen.getByText('Cancel')
    fireEvent.click(cancelButton)
    
    // Verificar que el modal no está visible
    expect(screen.queryByText('Nueva Venta')).not.toBeInTheDocument()
  })

  it('handles form input changes in the new sale form', () => {
    render(<Sales />)
    
    // Abrir el modal
    const newSaleButton = screen.getByText('Nueva venta')
    fireEvent.click(newSaleButton)
    
    // Cambiar valores en los campos
    const usernameInput = screen.getByLabelText('Username')
    const nameInput = screen.getByLabelText('Name')
    const emailInput = screen.getByLabelText('Email')
    
    fireEvent.change(usernameInput, { target: { value: 'testuser' } })
    fireEvent.change(nameInput, { target: { value: 'Test User' } })
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } })
    
    expect(usernameInput).toHaveValue('testuser')
    expect(nameInput).toHaveValue('Test User')
    expect(emailInput).toHaveValue('test@example.com')
  })

  it('submits the new sale form', () => {
    render(<Sales />)
    
    // Abrir el modal
    const newSaleButton = screen.getByText('Nueva venta')
    fireEvent.click(newSaleButton)
    
    // Llenar el formulario
    const usernameInput = screen.getByLabelText('Username')
    const nameInput = screen.getByLabelText('Name')
    const emailInput = screen.getByLabelText('Email')
    const idInput = screen.getByLabelText('ID')
    const addressInput = screen.getByLabelText('Address')
    const phoneInput = screen.getByLabelText('Phone')
    const roleSelect = screen.getByLabelText('Role')
    
    fireEvent.change(usernameInput, { target: { value: 'testuser' } })
    fireEvent.change(nameInput, { target: { value: 'Test User' } })
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } })
    fireEvent.change(idInput, { target: { value: '123' } })
    fireEvent.change(addressInput, { target: { value: 'Test Address' } })
    fireEvent.change(phoneInput, { target: { value: '1234567890' } })
    fireEvent.change(roleSelect, { target: { value: 'admin' } })
    
    // Enviar el formulario
    const saveButton = screen.getByText('Save')
    fireEvent.click(saveButton)
    
    // Verificar que console.log fue llamado con los datos correctos
    expect(console.log).toHaveBeenCalledWith('Nueva venta:', {
      username: 'testuser',
      name: 'Test User',
      email: 'test@example.com',
      id: '123',
      address: 'Test Address',
      phone: '1234567890',
      role: 'admin',
    })
    
    // Verificar que el modal se cierra
    expect(screen.queryByText('Nueva Venta')).not.toBeInTheDocument()
  })

  it('applies correct status colors', () => {
    render(<Sales />)
    
    // Obtener todos los elementos de estado
    const completedStatuses = screen.getAllByText('Completed')
    const pendingStatuses = screen.getAllByText('Pending')
    const cancelledStatus = screen.getByText('Cancelled')
    
    // Verificar las clases de color
    expect(completedStatuses[0].className).toContain('bg-green-100')
    expect(completedStatuses[0].className).toContain('text-green-800')
    
    expect(pendingStatuses[0].className).toContain('bg-yellow-100')
    expect(pendingStatuses[0].className).toContain('text-yellow-800')
    
    expect(cancelledStatus.className).toContain('bg-red-100')
    expect(cancelledStatus.className).toContain('text-red-800')
  })
})
