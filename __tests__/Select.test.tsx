import { render, screen, fireEvent } from '@testing-library/react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

describe('Select Component', () => {
  it('renders select trigger', () => {
    render(
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Select an option" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="1">Option 1</SelectItem>
          <SelectItem value="2">Option 2</SelectItem>
        </SelectContent>
      </Select>
    )
    
    expect(screen.getByText('Select an option')).toBeInTheDocument()
  })

  it('shows options when clicked', () => {
    render(
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Select an option" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="1">Option 1</SelectItem>
          <SelectItem value="2">Option 2</SelectItem>
        </SelectContent>
      </Select>
    )
    
    const trigger = screen.getByRole('combobox')
    fireEvent.click(trigger)
    
    expect(screen.getByText('Option 1')).toBeInTheDocument()
    expect(screen.getByText('Option 2')).toBeInTheDocument()
  })

  it('handles option selection', () => {
    const onValueChange = jest.fn()
    
    render(
      <Select onValueChange={onValueChange}>
        <SelectTrigger>
          <SelectValue placeholder="Select an option" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="1">Option 1</SelectItem>
          <SelectItem value="2">Option 2</SelectItem>
        </SelectContent>
      </Select>
    )
    
    const trigger = screen.getByRole('combobox')
    fireEvent.click(trigger)
    
    const option = screen.getByText('Option 1')
    fireEvent.click(option)
    
    expect(onValueChange).toHaveBeenCalledWith('1')
  })
}) 