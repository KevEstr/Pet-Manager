import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import {
  Table,
  TableBody,
  TableRow,
  TableCell
} from '@/components/ui/table'

describe('Table Components', () => {
  it('renders Table correctly', () => {
    render(
      <Table data-testid="table">
        <TableBody>
          <TableRow>
            <TableCell>Cell</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    )
    
    const table = screen.getByTestId('table')
    expect(table).toBeInTheDocument()
    expect(table.tagName).toBe('TABLE')
  })

  it('renders TableCell correctly', () => {
    render(
      <Table>
        <TableBody>
          <TableRow>
            <TableCell data-testid="table-cell">Cell Content</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    )
    
    const cell = screen.getByTestId('table-cell')
    expect(cell).toBeInTheDocument()
    expect(cell).toHaveTextContent('Cell Content')
  })
}) 