import { render, screen, fireEvent } from '@testing-library/react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

describe('DropdownMenu Component', () => {
  const TestDropdown = () => (
    <DropdownMenu>
      <DropdownMenuTrigger>Open Menu</DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>Settings</DropdownMenuItem>
        <DropdownMenuItem>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )

  it('renders trigger button', () => {
    render(<TestDropdown />)
    expect(screen.getByText('Open Menu')).toBeInTheDocument()
  })

  it('shows menu content when trigger is clicked', () => {
    render(<TestDropdown />)
    
    const trigger = screen.getByText('Open Menu')
    fireEvent.click(trigger)
    
    expect(screen.getByText('My Account')).toBeInTheDocument()
    expect(screen.getByText('Profile')).toBeInTheDocument()
    expect(screen.getByText('Settings')).toBeInTheDocument()
    expect(screen.getByText('Logout')).toBeInTheDocument()
  })

  it('handles menu item clicks', () => {
    const onSelect = jest.fn()
    
    render(
      <DropdownMenu>
        <DropdownMenuTrigger>Open Menu</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onSelect={onSelect}>Click Me</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
    
    const trigger = screen.getByText('Open Menu')
    fireEvent.click(trigger)
    
    const menuItem = screen.getByText('Click Me')
    fireEvent.click(menuItem)
    
    expect(onSelect).toHaveBeenCalled()
  })

  it('closes menu when clicking outside', () => {
    render(<TestDropdown />)
    
    // Open menu
    const trigger = screen.getByText('Open Menu')
    fireEvent.click(trigger)
    expect(screen.getByText('My Account')).toBeInTheDocument()
    
    // Click outside
    fireEvent.mouseDown(document.body)
    expect(screen.queryByText('My Account')).not.toBeInTheDocument()
  })

  it('renders with custom className', () => {
    render(
      <DropdownMenu>
        <DropdownMenuTrigger className="custom-trigger">Open Menu</DropdownMenuTrigger>
        <DropdownMenuContent className="custom-content">
          <DropdownMenuItem>Item</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
    
    const trigger = screen.getByText('Open Menu')
    fireEvent.click(trigger)
    
    expect(trigger).toHaveClass('custom-trigger')
    expect(screen.getByText('Item').closest('[role="menu"]')).toHaveClass('custom-content')
  })

  it('handles keyboard navigation', () => {
    render(<TestDropdown />)
    
    // Open menu
    const trigger = screen.getByText('Open Menu')
    fireEvent.click(trigger)
    
    // Press arrow down
    fireEvent.keyDown(trigger, { key: 'ArrowDown' })
    expect(screen.getByText('Profile')).toHaveFocus()
    
    // Press arrow down again
    fireEvent.keyDown(screen.getByText('Profile'), { key: 'ArrowDown' })
    expect(screen.getByText('Settings')).toHaveFocus()
    
    // Press escape to close
    fireEvent.keyDown(screen.getByText('Settings'), { key: 'Escape' })
    expect(screen.queryByText('My Account')).not.toBeInTheDocument()
  })
}) 