import { render, screen, fireEvent } from '@testing-library/react'
import { DataTable } from '@/components/ui/data-table'

const mockColumns = [
  {
    accessorKey: 'name',
    header: 'Nombre',
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
]

const mockData = [
  { name: 'John Doe', email: 'john@example.com' },
  { name: 'Jane Smith', email: 'jane@example.com' },
]

describe('DataTable Component', () => {
  it('renders table with data', () => {
    render(
      <DataTable
        columns={mockColumns}
        data={mockData}
      />
    )
    
    expect(screen.getByText('Nombre')).toBeInTheDocument()
    expect(screen.getByText('Email')).toBeInTheDocument()
    expect(screen.getByText('John Doe')).toBeInTheDocument()
    expect(screen.getByText('john@example.com')).toBeInTheDocument()
  })

  it('renders empty state when no data', () => {
    render(
      <DataTable
        columns={mockColumns}
        data={[]}
      />
    )
    
    expect(screen.getByText('No hay datos disponibles')).toBeInTheDocument()
  })

  it('renders loading state', () => {
    render(
      <DataTable
        columns={mockColumns}
        data={mockData}
        isLoading={true}
      />
    )
    
    expect(screen.getByText('Cargando...')).toBeInTheDocument()
  })

  it('handles row click', () => {
    const onRowClick = jest.fn()
    
    render(
      <DataTable
        columns={mockColumns}
        data={mockData}
        onRowClick={onRowClick}
      />
    )
    
    const row = screen.getByText('John Doe').closest('tr')
    fireEvent.click(row!)
    
    expect(onRowClick).toHaveBeenCalledWith(mockData[0])
  })
}) 