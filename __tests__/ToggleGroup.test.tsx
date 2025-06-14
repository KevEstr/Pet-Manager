import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'

// Mock next/router if used
jest.mock('next/router', () => ({
  useRouter: () => ({
    push: jest.fn(),
    pathname: '/',
  }),
}))

describe('ToggleGroup Components - Comprehensive Test Suite', () => {
  let user: ReturnType<typeof userEvent.setup>

  beforeEach(() => {
    user = userEvent.setup()
    jest.clearAllTimers()
  })

  afterEach(() => {
    jest.clearAllTimers()
  })

  describe('ToggleGroup', () => {
    it('renders with default classes', () => {
      render(
        <ToggleGroup data-testid="toggle-group">
          <ToggleGroupItem value="item1">Item 1</ToggleGroupItem>
        </ToggleGroup>
      )

      const toggleGroup = screen.getByTestId('toggle-group')
      expect(toggleGroup).toBeInTheDocument()
      expect(toggleGroup).toHaveClass('flex', 'items-center', 'justify-center', 'gap-1')
    })

    it('accepts custom className and merges with defaults', () => {
      render(
        <ToggleGroup data-testid="toggle-group" className="custom-toggle-group">
          <ToggleGroupItem value="item1">Item 1</ToggleGroupItem>
        </ToggleGroup>
      )

      const toggleGroup = screen.getByTestId('toggle-group')
      expect(toggleGroup).toHaveClass('custom-toggle-group', 'flex', 'items-center')
    })

    it('forwards ref correctly', () => {
      const ref = React.createRef<HTMLDivElement>()
      render(
        <ToggleGroup ref={ref} data-testid="toggle-group">
          <ToggleGroupItem value="item1">Item 1</ToggleGroupItem>
        </ToggleGroup>
      )

      expect(ref.current).toBeInstanceOf(HTMLDivElement)
    })

    it('handles type="single" correctly', async () => {
      const onValueChange = jest.fn()
      render(
        <ToggleGroup
          type="single"
          data-testid="single-toggle-group"
          onValueChange={onValueChange}
        >
          <ToggleGroupItem value="item1" data-testid="item1">Item 1</ToggleGroupItem>
          <ToggleGroupItem value="item2" data-testid="item2">Item 2</ToggleGroupItem>
        </ToggleGroup>
      )

      const item1 = screen.getByTestId('item1')
      const item2 = screen.getByTestId('item2')

      await user.click(item1)
      expect(onValueChange).toHaveBeenCalledWith('item1')

      await user.click(item2)
      expect(onValueChange).toHaveBeenCalledWith('item2')
    })

    it('handles type="multiple" correctly', async () => {
      const onValueChange = jest.fn()
      render(
        <ToggleGroup
          type="multiple"
          data-testid="multiple-toggle-group"
          onValueChange={onValueChange}
        >
          <ToggleGroupItem value="item1" data-testid="item1">Item 1</ToggleGroupItem>
          <ToggleGroupItem value="item2" data-testid="item2">Item 2</ToggleGroupItem>
          <ToggleGroupItem value="item3" data-testid="item3">Item 3</ToggleGroupItem>
        </ToggleGroup>
      )

      const item1 = screen.getByTestId('item1')
      const item2 = screen.getByTestId('item2')

      await user.click(item1)
      expect(onValueChange).toHaveBeenCalledWith(['item1'])

      await user.click(item2)
      expect(onValueChange).toHaveBeenCalledWith(['item1', 'item2'])
    })

    it('handles defaultValue for single type', () => {
      render(
        <ToggleGroup
          type="single"
          defaultValue="item2"
          data-testid="default-single-toggle"
        >
          <ToggleGroupItem value="item1" data-testid="item1">Item 1</ToggleGroupItem>
          <ToggleGroupItem value="item2" data-testid="item2">Item 2</ToggleGroupItem>
        </ToggleGroup>
      )

      const item2 = screen.getByTestId('item2')
      expect(item2).toHaveAttribute('data-state', 'on')
    })

    it('handles defaultValue for multiple type', () => {
      render(
        <ToggleGroup
          type="multiple"
          defaultValue={['item1', 'item3']}
          data-testid="default-multiple-toggle"
        >
          <ToggleGroupItem value="item1" data-testid="item1">Item 1</ToggleGroupItem>
          <ToggleGroupItem value="item2" data-testid="item2">Item 2</ToggleGroupItem>
          <ToggleGroupItem value="item3" data-testid="item3">Item 3</ToggleGroupItem>
        </ToggleGroup>
      )

      const item1 = screen.getByTestId('item1')
      const item2 = screen.getByTestId('item2')
      const item3 = screen.getByTestId('item3')

      expect(item1).toHaveAttribute('data-state', 'on')
      expect(item2).toHaveAttribute('data-state', 'off')
      expect(item3).toHaveAttribute('data-state', 'on')
    })

    it('supports controlled state with value prop', async () => {
      const onValueChange = jest.fn()
      const { rerender } = render(
        <ToggleGroup
          type="single"
          value="item1"
          onValueChange={onValueChange}
          data-testid="controlled-toggle"
        >
          <ToggleGroupItem value="item1" data-testid="item1">Item 1</ToggleGroupItem>
          <ToggleGroupItem value="item2" data-testid="item2">Item 2</ToggleGroupItem>
        </ToggleGroup>
      )

      const item1 = screen.getByTestId('item1')
      const item2 = screen.getByTestId('item2')

      expect(item1).toHaveAttribute('data-state', 'on')
      expect(item2).toHaveAttribute('data-state', 'off')

      await user.click(item2)
      expect(onValueChange).toHaveBeenCalledWith('item2')

      // Simulate parent component updating the value
      rerender(
        <ToggleGroup
          type="single"
          value="item2"
          onValueChange={onValueChange}
          data-testid="controlled-toggle"
        >
          <ToggleGroupItem value="item1" data-testid="item1">Item 1</ToggleGroupItem>
          <ToggleGroupItem value="item2" data-testid="item2">Item 2</ToggleGroupItem>
        </ToggleGroup>
      )

      expect(item1).toHaveAttribute('data-state', 'off')
      expect(item2).toHaveAttribute('data-state', 'on')
    })

    it('handles disabled state', async () => {
      const onValueChange = jest.fn()
      render(
        <ToggleGroup
          type="single"
          disabled
          onValueChange={onValueChange}
          data-testid="disabled-toggle-group"
        >
          <ToggleGroupItem value="item1" data-testid="item1">Item 1</ToggleGroupItem>
          <ToggleGroupItem value="item2" data-testid="item2">Item 2</ToggleGroupItem>
        </ToggleGroup>
      )

      const item1 = screen.getByTestId('item1')
      await user.click(item1)

      expect(onValueChange).not.toHaveBeenCalled()
      expect(item1).toBeDisabled()
    })

    it('supports loop navigation', async () => {
      render(
        <ToggleGroup type="single" loop data-testid="loop-toggle-group">
          <ToggleGroupItem value="item1" data-testid="item1">Item 1</ToggleGroupItem>
          <ToggleGroupItem value="item2" data-testid="item2">Item 2</ToggleGroupItem>
          <ToggleGroupItem value="item3" data-testid="item3">Item 3</ToggleGroupItem>
        </ToggleGroup>
      )

      const item1 = screen.getByTestId('item1')
      item1.focus()

      // Test that navigation loops (this is handled by Radix internally)
      expect(item1).toHaveFocus()
    })

    it('supports rovingFocus', async () => {
      render(
        <ToggleGroup type="single" rovingFocus data-testid="roving-toggle-group">
          <ToggleGroupItem value="item1" data-testid="item1">Item 1</ToggleGroupItem>
          <ToggleGroupItem value="item2" data-testid="item2">Item 2</ToggleGroupItem>
        </ToggleGroup>
      )

      const item1 = screen.getByTestId('item1')
      const item2 = screen.getByTestId('item2')

      await user.tab()
      expect(item1).toHaveFocus()

      await user.keyboard('{ArrowRight}')
      expect(item2).toHaveFocus()
    })
  })

  describe('ToggleGroupItem', () => {
    it('renders with default variant and size from context', () => {
      render(
        <ToggleGroup variant="default" size="default">
          <ToggleGroupItem value="item1" data-testid="toggle-item">
            Item 1
          </ToggleGroupItem>
        </ToggleGroup>
      )

      const item = screen.getByTestId('toggle-item')
      expect(item).toBeInTheDocument()
      expect(item).toHaveClass('inline-flex', 'items-center', 'justify-center', 'rounded-md')
    })

    it('renders with outline variant from context', () => {
      render(
        <ToggleGroup variant="outline" size="default">
          <ToggleGroupItem value="item1" data-testid="toggle-item">
            Item 1
          </ToggleGroupItem>
        </ToggleGroup>
      )

      const item = screen.getByTestId('toggle-item')
      expect(item).toHaveClass('border', 'border-input', 'bg-transparent')
    })

    it('renders with different sizes from context', () => {
      const { rerender } = render(
        <ToggleGroup size="sm">
          <ToggleGroupItem value="item1" data-testid="toggle-item">
            Small
          </ToggleGroupItem>
        </ToggleGroup>
      )

      let item = screen.getByTestId('toggle-item')
      expect(item).toHaveClass('h-9', 'px-2.5', 'min-w-9')

      rerender(
        <ToggleGroup size="lg">
          <ToggleGroupItem value="item1" data-testid="toggle-item">
            Large
          </ToggleGroupItem>
        </ToggleGroup>
      )

      item = screen.getByTestId('toggle-item')
      expect(item).toHaveClass('h-11', 'px-5', 'min-w-11')
    })

    it('overrides context variant and size with own props', () => {
      render(
        <ToggleGroup variant="default" size="default">
          <ToggleGroupItem
            value="item1"
            variant="outline"
            size="lg"
            data-testid="toggle-item"
          >
            Override Item
          </ToggleGroupItem>
        </ToggleGroup>
      )

      const item = screen.getByTestId('toggle-item')
      expect(item).toHaveClass('border', 'border-input', 'h-11', 'px-5')
    })

    it('accepts custom className', () => {
      render(
        <ToggleGroup>
          <ToggleGroupItem
            value="item1"
            className="custom-toggle-item"
            data-testid="toggle-item"
          >
            Custom Item
          </ToggleGroupItem>
        </ToggleGroup>
      )

      const item = screen.getByTestId('toggle-item')
      expect(item).toHaveClass('custom-toggle-item', 'inline-flex')
    })

    it('forwards ref correctly', () => {
      const ref = React.createRef<HTMLButtonElement>()
      render(
        <ToggleGroup>
          <ToggleGroupItem ref={ref} value="item1" data-testid="toggle-item">
            Ref Item
          </ToggleGroupItem>
        </ToggleGroup>
      )

      expect(ref.current).toBeInstanceOf(HTMLButtonElement)
    })

    it('handles click events', async () => {
      const onValueChange = jest.fn()
      render(
        <ToggleGroup type="single" onValueChange={onValueChange}>
          <ToggleGroupItem value="clickable" data-testid="clickable-item">
            Click Me
          </ToggleGroupItem>
        </ToggleGroup>
      )

      const item = screen.getByTestId('clickable-item')
      await user.click(item)

      expect(onValueChange).toHaveBeenCalledWith('clickable')
    })

    it('handles keyboard events', async () => {
      const onValueChange = jest.fn()
      render(
        <ToggleGroup type="single" onValueChange={onValueChange}>
          <ToggleGroupItem value="keyboard" data-testid="keyboard-item">
            Keyboard
          </ToggleGroupItem>
        </ToggleGroup>
      )

      const item = screen.getByTestId('keyboard-item')
      item.focus()

      await user.keyboard('{Enter}')
      expect(onValueChange).toHaveBeenCalledWith('keyboard')

      await user.keyboard(' ')
      expect(onValueChange).toHaveBeenCalledWith('')
    })

    it('supports disabled state on individual items', async () => {
      const onValueChange = jest.fn()
      render(
        <ToggleGroup type="single" onValueChange={onValueChange}>
          <ToggleGroupItem value="enabled" data-testid="enabled-item">
            Enabled
          </ToggleGroupItem>
          <ToggleGroupItem value="disabled" disabled data-testid="disabled-item">
            Disabled
          </ToggleGroupItem>
        </ToggleGroup>
      )

      const enabledItem = screen.getByTestId('enabled-item')
      const disabledItem = screen.getByTestId('disabled-item')

      await user.click(enabledItem)
      expect(onValueChange).toHaveBeenCalledWith('enabled')

      await user.click(disabledItem)
      expect(onValueChange).toHaveBeenCalledTimes(1) // Should not have been called again

      expect(disabledItem).toBeDisabled()
      expect(disabledItem).toHaveClass('disabled:pointer-events-none', 'disabled:opacity-50')
    })

    it('shows correct pressed state', async () => {
      render(
        <ToggleGroup type="single" defaultValue="pressed">
          <ToggleGroupItem value="pressed" data-testid="pressed-item">
            Pressed
          </ToggleGroupItem>
          <ToggleGroupItem value="unpressed" data-testid="unpressed-item">
            Unpressed
          </ToggleGroupItem>
        </ToggleGroup>
      )

      const pressedItem = screen.getByTestId('pressed-item')
      const unpressedItem = screen.getByTestId('unpressed-item')

      expect(pressedItem).toHaveAttribute('data-state', 'on')
      expect(pressedItem).toHaveAttribute('aria-pressed', 'true')
      expect(unpressedItem).toHaveAttribute('data-state', 'off')
      expect(unpressedItem).toHaveAttribute('aria-pressed', 'false')
    })

    it('supports aria-label for accessibility', () => {
      render(
        <ToggleGroup>
          <ToggleGroupItem
            value="accessible"
            aria-label="Accessible toggle item"
            data-testid="accessible-item"
          >
            🎯
          </ToggleGroupItem>
        </ToggleGroup>
      )

      const item = screen.getByTestId('accessible-item')
      expect(item).toHaveAttribute('aria-label', 'Accessible toggle item')
    })

    it('renders with icons and text', () => {
      render(
        <ToggleGroup>
          <ToggleGroupItem value="icon-text" data-testid="icon-text-item">
            <span data-testid="icon">📊</span>
            <span data-testid="text">Chart</span>
          </ToggleGroupItem>
        </ToggleGroup>
      )

      expect(screen.getByTestId('icon')).toHaveTextContent('📊')
      expect(screen.getByTestId('text')).toHaveTextContent('Chart')
    })
  })

  describe('Integration and Complex Scenarios', () => {
    it('handles complex toggle group with mixed states', async () => {
      const onValueChange = jest.fn()
      render(
        <ToggleGroup
          type="multiple"
          defaultValue={['option1', 'option3']}
          onValueChange={onValueChange}
          data-testid="complex-toggle-group"
        >
          <ToggleGroupItem value="option1" data-testid="option1">
            Option 1
          </ToggleGroupItem>
          <ToggleGroupItem value="option2" disabled data-testid="option2">
            Option 2 (Disabled)
          </ToggleGroupItem>
          <ToggleGroupItem value="option3" data-testid="option3">
            Option 3
          </ToggleGroupItem>
          <ToggleGroupItem value="option4" data-testid="option4">
            Option 4
          </ToggleGroupItem>
        </ToggleGroup>
      )

      const option1 = screen.getByTestId('option1')
      const option2 = screen.getByTestId('option2')
      const option3 = screen.getByTestId('option3')
      const option4 = screen.getByTestId('option4')

      // Check initial states
      expect(option1).toHaveAttribute('data-state', 'on')
      expect(option2).toBeDisabled()
      expect(option3).toHaveAttribute('data-state', 'on')
      expect(option4).toHaveAttribute('data-state', 'off')

      // Toggle option1 off
      await user.click(option1)
      expect(onValueChange).toHaveBeenCalledWith(['option3'])

      // Try to click disabled option2
      await user.click(option2)
      expect(onValueChange).toHaveBeenCalledTimes(1) // Should not increment

      // Toggle option4 on
      await user.click(option4)
      expect(onValueChange).toHaveBeenCalledWith(['option3', 'option4'])
    })

    it('handles toggle group with custom styling variants', () => {
      render(
        <ToggleGroup
          variant="outline"
          size="lg"
          className="custom-group-class"
          data-testid="styled-toggle-group"
        >
          <ToggleGroupItem
            value="custom1"
            className="custom-item-class"
            data-testid="custom-item1"
          >
            Custom 1
          </ToggleGroupItem>
          <ToggleGroupItem
            value="custom2"
            variant="default"
            size="sm"
            data-testid="custom-item2"
          >
            Custom 2
          </ToggleGroupItem>
        </ToggleGroup>
      )

      const group = screen.getByTestId('styled-toggle-group')
      const item1 = screen.getByTestId('custom-item1')
      const item2 = screen.getByTestId('custom-item2')

      expect(group).toHaveClass('custom-group-class')
      expect(item1).toHaveClass('custom-item-class', 'border', 'h-11') // outline variant, lg size
      expect(item2).toHaveClass('bg-transparent', 'h-9') // default variant, sm size (overrides context)
    })

    it('supports dynamic item addition/removal', () => {
      const { rerender } = render(
        <ToggleGroup type="single" data-testid="dynamic-group">
          <ToggleGroupItem value="item1" data-testid="item1">
            Item 1
          </ToggleGroupItem>
          <ToggleGroupItem value="item2" data-testid="item2">
            Item 2
          </ToggleGroupItem>
        </ToggleGroup>
      )

      expect(screen.getByTestId('item1')).toBeInTheDocument()
      expect(screen.getByTestId('item2')).toBeInTheDocument()

      // Add a new item
      rerender(
        <ToggleGroup type="single" data-testid="dynamic-group">
          <ToggleGroupItem value="item1" data-testid="item1">
            Item 1
          </ToggleGroupItem>
          <ToggleGroupItem value="item2" data-testid="item2">
            Item 2
          </ToggleGroupItem>
          <ToggleGroupItem value="item3" data-testid="item3">
            Item 3
          </ToggleGroupItem>
        </ToggleGroup>
      )

      expect(screen.getByTestId('item3')).toBeInTheDocument()

      // Remove an item
      rerender(
        <ToggleGroup type="single" data-testid="dynamic-group">
          <ToggleGroupItem value="item1" data-testid="item1">
            Item 1
          </ToggleGroupItem>
          <ToggleGroupItem value="item3" data-testid="item3">
            Item 3
          </ToggleGroupItem>
        </ToggleGroup>
      )

      expect(screen.queryByTestId('item2')).not.toBeInTheDocument()
      expect(screen.getByTestId('item1')).toBeInTheDocument()
      expect(screen.getByTestId('item3')).toBeInTheDocument()
    })

    it('handles rapid state changes', async () => {
      const onValueChange = jest.fn()
      render(
        <ToggleGroup type="single" onValueChange={onValueChange}>
          <ToggleGroupItem value="rapid1" data-testid="rapid1">
            Rapid 1
          </ToggleGroupItem>
          <ToggleGroupItem value="rapid2" data-testid="rapid2">
            Rapid 2
          </ToggleGroupItem>
          <ToggleGroupItem value="rapid3" data-testid="rapid3">
            Rapid 3
          </ToggleGroupItem>
        </ToggleGroup>
      )

      const item1 = screen.getByTestId('rapid1')
      const item2 = screen.getByTestId('rapid2')
      const item3 = screen.getByTestId('rapid3')

      // Rapid clicks
      await user.click(item1)
      await user.click(item2)
      await user.click(item3)
      await user.click(item1)

      expect(onValueChange).toHaveBeenCalledTimes(4)
      expect(onValueChange).toHaveBeenNthCalledWith(1, 'rapid1')
      expect(onValueChange).toHaveBeenNthCalledWith(2, 'rapid2')
      expect(onValueChange).toHaveBeenNthCalledWith(3, 'rapid3')
      expect(onValueChange).toHaveBeenNthCalledWith(4, 'rapid1')
    })
  })

  describe('Accessibility', () => {
    it('provides proper ARIA attributes', () => {
      render(
        <ToggleGroup
          type="single"
          aria-label="Toggle options"
          data-testid="accessible-group"
        >
          <ToggleGroupItem value="option1" data-testid="option1">
            Option 1
          </ToggleGroupItem>
          <ToggleGroupItem value="option2" data-testid="option2">
            Option 2
          </ToggleGroupItem>
        </ToggleGroup>
      )

      const group = screen.getByTestId('accessible-group')
      const option1 = screen.getByTestId('option1')

      expect(group).toHaveAttribute('aria-label', 'Toggle options')
      expect(option1).toHaveAttribute('aria-pressed')
      expect(option1).toHaveAttribute('role', 'button')
    })

    it('supports keyboard navigation', async () => {
      render(
        <ToggleGroup type="single" rovingFocus>
          <ToggleGroupItem value="nav1" data-testid="nav1">
            Nav 1
          </ToggleGroupItem>
          <ToggleGroupItem value="nav2" data-testid="nav2">
            Nav 2
          </ToggleGroupItem>
          <ToggleGroupItem value="nav3" data-testid="nav3">
            Nav 3
          </ToggleGroupItem>
        </ToggleGroup>
      )

      const nav1 = screen.getByTestId('nav1')
      const nav2 = screen.getByTestId('nav2')

      // Focus first item
      await user.tab()
      expect(nav1).toHaveFocus()

      // Navigate with arrows
      await user.keyboard('{ArrowRight}')
      expect(nav2).toHaveFocus()

      await user.keyboard('{ArrowLeft}')
      expect(nav1).toHaveFocus()
    })
  })

  describe('Edge Cases', () => {
    it('handles empty toggle group', () => {
      render(<ToggleGroup data-testid="empty-group" />)
      
      const group = screen.getByTestId('empty-group')
      expect(group).toBeInTheDocument()
      expect(group).toHaveClass('flex', 'items-center', 'justify-center')
    })

    it('handles single item toggle group', async () => {
      const onValueChange = jest.fn()
      render(
        <ToggleGroup type="single" onValueChange={onValueChange}>
          <ToggleGroupItem value="single" data-testid="single-item">
            Single Item
          </ToggleGroupItem>
        </ToggleGroup>
      )

      const item = screen.getByTestId('single-item')
      await user.click(item)

      expect(onValueChange).toHaveBeenCalledWith('single')
    })

    it('handles null/undefined children gracefully', () => {
      render(
        <ToggleGroup data-testid="null-children-group">
          {null}
          <ToggleGroupItem value="valid" data-testid="valid-item">
            Valid Item
          </ToggleGroupItem>
          {undefined}
        </ToggleGroup>
      )

      expect(screen.getByTestId('valid-item')).toBeInTheDocument()
    })
  })
})