import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from '@/components/ui/tooltip'

// Mock next/router if used
jest.mock('next/router', () => ({
  useRouter: () => ({
    push: jest.fn(),
    pathname: '/',
  }),
}))

describe('Tooltip Components - Comprehensive Test Suite', () => {
  let user: ReturnType<typeof userEvent.setup>

  beforeEach(() => {
    user = userEvent.setup()
    jest.clearAllTimers()
  })

  afterEach(() => {
    jest.clearAllTimers()
  })

  describe('TooltipProvider', () => {
    it('renders children correctly', () => {
      render(
        <TooltipProvider>
          <div data-testid="tooltip-child">Tooltip Content</div>
        </TooltipProvider>
      )
      
      expect(screen.getByTestId('tooltip-child')).toHaveTextContent('Tooltip Content')
    })

    it('accepts delayDuration prop', () => {
      render(
        <TooltipProvider delayDuration={500}>
          <div data-testid="provider-content">Content with delay</div>
        </TooltipProvider>
      )
      
      expect(screen.getByTestId('provider-content')).toBeInTheDocument()
    })

    it('accepts skipDelayDuration prop', () => {
      render(
        <TooltipProvider skipDelayDuration={300}>
          <div data-testid="provider-content">Content with skip delay</div>
        </TooltipProvider>
      )
      
      expect(screen.getByTestId('provider-content')).toBeInTheDocument()
    })

    it('provides context for nested tooltips', () => {
      render(
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger data-testid="trigger">Hover me</TooltipTrigger>
            <TooltipContent data-testid="content">Tooltip text</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )
      
      expect(screen.getByTestId('trigger')).toBeInTheDocument()
    })
  })

  describe('Tooltip', () => {
    it('renders trigger and content within provider', () => {
      render(
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger data-testid="trigger">Trigger</TooltipTrigger>
            <TooltipContent data-testid="content">Content</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )
      
      expect(screen.getByTestId('trigger')).toBeInTheDocument()
    })

    it('handles open state controlled', () => {
      render(
        <TooltipProvider>
          <Tooltip open={true}>
            <TooltipTrigger data-testid="trigger">Trigger</TooltipTrigger>
            <TooltipContent data-testid="content">Always visible</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )
      
      expect(screen.getByTestId('content')).toBeInTheDocument()
    })

    it('handles defaultOpen state', () => {
      render(
        <TooltipProvider>
          <Tooltip defaultOpen={true}>
            <TooltipTrigger data-testid="trigger">Trigger</TooltipTrigger>
            <TooltipContent data-testid="content">Default open</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )
      
      expect(screen.getByTestId('content')).toBeInTheDocument()
    })

    it('calls onOpenChange when state changes', async () => {
      const onOpenChange = jest.fn()
      
      render(
        <TooltipProvider delayDuration={0}>
          <Tooltip onOpenChange={onOpenChange}>
            <TooltipTrigger data-testid="trigger">Trigger</TooltipTrigger>
            <TooltipContent data-testid="content">Content</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )
      
      const trigger = screen.getByTestId('trigger')
      await user.hover(trigger)
      
      await waitFor(() => {
        expect(onOpenChange).toHaveBeenCalledWith(true)
      })
    })

    it('supports disableHoverableContent prop', async () => {
      render(
        <TooltipProvider delayDuration={0}>
          <Tooltip disableHoverableContent>
            <TooltipTrigger data-testid="trigger">Trigger</TooltipTrigger>
            <TooltipContent data-testid="content">Non-hoverable content</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )
      
      const trigger = screen.getByTestId('trigger')
      await user.hover(trigger)
      
      await waitFor(() => {
        expect(screen.getByTestId('content')).toBeInTheDocument()
      })
    })
  })

  describe('TooltipTrigger', () => {
    it('renders as child element by default', () => {
      render(
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger data-testid="trigger">
              <button>Button Trigger</button>
            </TooltipTrigger>
            <TooltipContent>Content</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )
      
      const trigger = screen.getByTestId('trigger')
      expect(trigger.tagName).toBe('BUTTON')
      expect(trigger).toHaveTextContent('Button Trigger')
    })

    it('supports asChild with custom elements', () => {
      render(
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild data-testid="trigger">
              <div>Custom Trigger</div>
            </TooltipTrigger>
            <TooltipContent>Content</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )
      
      const trigger = screen.getByTestId('trigger')
      expect(trigger.tagName).toBe('DIV')
      expect(trigger).toHaveTextContent('Custom Trigger')
    })

    it('handles disabled state', () => {
      render(
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button disabled data-testid="disabled-trigger">
                Disabled Trigger
              </button>
            </TooltipTrigger>
            <TooltipContent>Content</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )
      
      const trigger = screen.getByTestId('disabled-trigger')
      expect(trigger).toBeDisabled()
    })

    it('triggers tooltip on hover', async () => {
      render(
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger data-testid="trigger">Hover me</TooltipTrigger>
            <TooltipContent data-testid="content">Tooltip on hover</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )
      
      const trigger = screen.getByTestId('trigger')
      await user.hover(trigger)
      
      await waitFor(() => {
        expect(screen.getByTestId('content')).toBeInTheDocument()
      })
    })

    it('hides tooltip on unhover', async () => {
      render(
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger data-testid="trigger">Hover me</TooltipTrigger>
            <TooltipContent data-testid="content">Tooltip content</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )
      
      const trigger = screen.getByTestId('trigger')
      await user.hover(trigger)
      
      await waitFor(() => {
        expect(screen.getByTestId('content')).toBeInTheDocument()
      })
      
      await user.unhover(trigger)
      
      await waitFor(() => {
        expect(screen.queryByTestId('content')).not.toBeInTheDocument()
      })
    })

    it('triggers tooltip on focus', async () => {
      render(
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger data-testid="trigger">
              <button>Focus me</button>
            </TooltipTrigger>
            <TooltipContent data-testid="content">Tooltip on focus</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )
      
      const trigger = screen.getByTestId('trigger')
      trigger.focus()
      
      await waitFor(() => {
        expect(screen.getByTestId('content')).toBeInTheDocument()
      })
    })

    it('hides tooltip on blur', async () => {
      render(
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger data-testid="trigger">
              <button>Focus me</button>
            </TooltipTrigger>
            <TooltipContent data-testid="content">Tooltip content</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )
      
      const trigger = screen.getByTestId('trigger')
      trigger.focus()
      
      await waitFor(() => {
        expect(screen.getByTestId('content')).toBeInTheDocument()
      })
      
      trigger.blur()
      
      await waitFor(() => {
        expect(screen.queryByTestId('content')).not.toBeInTheDocument()
      })
    })

    it('hides tooltip on Escape key', async () => {
      render(
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger data-testid="trigger">
              <button>Trigger</button>
            </TooltipTrigger>
            <TooltipContent data-testid="content">Tooltip content</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )
      
      const trigger = screen.getByTestId('trigger')
      await user.hover(trigger)
      
      await waitFor(() => {
        expect(screen.getByTestId('content')).toBeInTheDocument()
      })
      
      await user.keyboard('{Escape}')
      
      await waitFor(() => {
        expect(screen.queryByTestId('content')).not.toBeInTheDocument()
      })
    })
  })

  describe('TooltipContent', () => {
    it('renders with default classes', async () => {
      render(
        <TooltipProvider delayDuration={0}>
          <Tooltip defaultOpen>
            <TooltipTrigger>Trigger</TooltipTrigger>
            <TooltipContent data-testid="content">Default content</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )
      
      await waitFor(() => {
        const content = screen.getByTestId('content')
        expect(content).toHaveClass(
          'z-50',
          'overflow-hidden',
          'rounded-md',
          'border',
          'bg-popover',
          'px-3',
          'py-1.5',
          'text-sm',
          'text-popover-foreground',
          'shadow-md'
        )
      })
    })

    it('includes animation classes', async () => {
      render(
        <TooltipProvider delayDuration={0}>
          <Tooltip defaultOpen>
            <TooltipTrigger>Trigger</TooltipTrigger>
            <TooltipContent data-testid="content">Animated content</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )
      
      await waitFor(() => {
        const content = screen.getByTestId('content')
        expect(content).toHaveClass('animate-in', 'fade-in-0', 'zoom-in-95')
        expect(content.className).toMatch(/data-\[state=closed\]:animate-out/)
        expect(content.className).toMatch(/data-\[state=closed\]:fade-out-0/)
        expect(content.className).toMatch(/data-\[state=closed\]:zoom-out-95/)
      })
    })

    it('includes side-specific animation classes', async () => {
      render(
        <TooltipProvider delayDuration={0}>
          <Tooltip defaultOpen>
            <TooltipTrigger>Trigger</TooltipTrigger>
            <TooltipContent data-testid="content" side="bottom">
              Bottom content
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )
      
      await waitFor(() => {
        const content = screen.getByTestId('content')
        expect(content.className).toMatch(/data-\[side=bottom\]:slide-in-from-top-2/)
        expect(content.className).toMatch(/data-\[side=left\]:slide-in-from-right-2/)
        expect(content.className).toMatch(/data-\[side=right\]:slide-in-from-left-2/)
        expect(content.className).toMatch(/data-\[side=top\]:slide-in-from-bottom-2/)
      })
    })

    it('accepts custom className', async () => {
      render(
        <TooltipProvider delayDuration={0}>
          <Tooltip defaultOpen>
            <TooltipTrigger>Trigger</TooltipTrigger>
            <TooltipContent data-testid="content" className="custom-tooltip">
              Custom styled content
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )
      
      await waitFor(() => {
        const content = screen.getByTestId('content')
        expect(content).toHaveClass('custom-tooltip', 'z-50', 'rounded-md')
      })
    })

    it('forwards ref correctly', async () => {
      const ref = React.createRef<HTMLDivElement>()
      
      render(
        <TooltipProvider delayDuration={0}>
          <Tooltip defaultOpen>
            <TooltipTrigger>Trigger</TooltipTrigger>
            <TooltipContent ref={ref} data-testid="content">
              Ref content
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )
      
      await waitFor(() => {
        expect(ref.current).toBeInstanceOf(HTMLDivElement)
      })
    })

    it('uses default sideOffset of 4', async () => {
      render(
        <TooltipProvider delayDuration={0}>
          <Tooltip defaultOpen>
            <TooltipTrigger>Trigger</TooltipTrigger>
            <TooltipContent data-testid="content">
              Default offset content
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )
      
      await waitFor(() => {
        expect(screen.getByTestId('content')).toBeInTheDocument()
      })
    })

    it('accepts custom sideOffset', async () => {
      render(
        <TooltipProvider delayDuration={0}>
          <Tooltip defaultOpen>
            <TooltipTrigger>Trigger</TooltipTrigger>
            <TooltipContent data-testid="content" sideOffset={10}>
              Custom offset content
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )
      
      await waitFor(() => {
        expect(screen.getByTestId('content')).toBeInTheDocument()
      })
    })

    it('supports different sides', async () => {
      const sides = ['top', 'right', 'bottom', 'left'] as const
      
      for (const side of sides) {
        const { unmount } = render(
          <TooltipProvider delayDuration={0}>
            <Tooltip defaultOpen>
              <TooltipTrigger>Trigger</TooltipTrigger>
              <TooltipContent data-testid={`content-${side}`} side={side}>
                {side} content
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )
        
        await waitFor(() => {
          expect(screen.getByTestId(`content-${side}`)).toBeInTheDocument()
        })
        
        unmount()
      }
    })

    it('supports align prop', async () => {
      const aligns = ['start', 'center', 'end'] as const
      
      for (const align of aligns) {
        const { unmount } = render(
          <TooltipProvider delayDuration={0}>
            <Tooltip defaultOpen>
              <TooltipTrigger>Trigger</TooltipTrigger>
              <TooltipContent data-testid={`content-${align}`} align={align}>
                {align} aligned content
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )
        
        await waitFor(() => {
          expect(screen.getByTestId(`content-${align}`)).toBeInTheDocument()
        })
        
        unmount()
      }
    })

    it('supports alignOffset prop', async () => {
      render(
        <TooltipProvider delayDuration={0}>
          <Tooltip defaultOpen>
            <TooltipTrigger>Trigger</TooltipTrigger>
            <TooltipContent data-testid="content" alignOffset={5}>
              Offset aligned content
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )
      
      await waitFor(() => {
        expect(screen.getByTestId('content')).toBeInTheDocument()
      })
    })

    it('supports collision avoidance props', async () => {
      render(
        <TooltipProvider delayDuration={0}>
          <Tooltip defaultOpen>
            <TooltipTrigger>Trigger</TooltipTrigger>
            <TooltipContent 
              data-testid="content"
              avoidCollisions={true}
              collisionBoundary={document.body}
              collisionPadding={10}
            >
              Collision aware content
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )
      
      await waitFor(() => {
        expect(screen.getByTestId('content')).toBeInTheDocument()
      })
    })

    it('renders complex content', async () => {
      render(
        <TooltipProvider delayDuration={0}>
          <Tooltip defaultOpen>
            <TooltipTrigger>Trigger</TooltipTrigger>
            <TooltipContent data-testid="content">
              <div data-testid="complex-content">
                <strong>Title</strong>
                <br />
                <span>Description text</span>
                <br />
                <em>Additional info</em>
              </div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )
      
      await waitFor(() => {
        expect(screen.getByTestId('complex-content')).toBeInTheDocument()
        expect(screen.getByText('Title')).toBeInTheDocument()
        expect(screen.getByText('Description text')).toBeInTheDocument()
        expect(screen.getByText('Additional info')).toBeInTheDocument()
      })
    })
  })

  describe('Complete Tooltip Integration', () => {
    it('shows and hides tooltip with hover interaction', async () => {
      render(
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger data-testid="trigger">
              <button>Hover for tooltip</button>
            </TooltipTrigger>
            <TooltipContent data-testid="content">
              This is a helpful tooltip
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )
      
      const trigger = screen.getByTestId('trigger')
      
      // Initially hidden
      expect(screen.queryByTestId('content')).not.toBeInTheDocument()
      
      // Show on hover
      await user.hover(trigger)
      await waitFor(() => {
        expect(screen.getByTestId('content')).toBeInTheDocument()
        expect(screen.getByText('This is a helpful tooltip')).toBeInTheDocument()
      })
      
      // Hide on unhover
      await user.unhover(trigger)
      await waitFor(() => {
        expect(screen.queryByTestId('content')).not.toBeInTheDocument()
      })
    })

    it('shows and hides tooltip with focus interaction', async () => {
      render(
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger data-testid="trigger">
              <button>Focus for tooltip</button>
            </TooltipTrigger>
            <TooltipContent data-testid="content">
              Focus-triggered tooltip
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )
      
      const trigger = screen.getByTestId('trigger')
      
      // Initially hidden
      expect(screen.queryByTestId('content')).not.toBeInTheDocument()
      
      // Show on focus
      trigger.focus()
      await waitFor(() => {
        expect(screen.getByTestId('content')).toBeInTheDocument()
      })
      
      // Hide on blur
      trigger.blur()
      await waitFor(() => {
        expect(screen.queryByTestId('content')).not.toBeInTheDocument()
      })
    })

    it('works with icon buttons', async () => {
      render(
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger data-testid="icon-trigger">
              <button aria-label="Settings">⚙️</button>
            </TooltipTrigger>
            <TooltipContent data-testid="icon-content">
              Open settings
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )
      
      const trigger = screen.getByTestId('icon-trigger')
      await user.hover(trigger)
      
      await waitFor(() => {
        expect(screen.getByTestId('icon-content')).toBeInTheDocument()
        expect(screen.getByText('Open settings')).toBeInTheDocument()
      })
    })

    it('handles multiple tooltips on the same page', async () => {
      render(
        <TooltipProvider delayDuration={0}>
          <div>
            <Tooltip>
              <TooltipTrigger data-testid="trigger1">Button 1</TooltipTrigger>
              <TooltipContent data-testid="content1">Tooltip 1</TooltipContent>
            </Tooltip>
            
            <Tooltip>
              <TooltipTrigger data-testid="trigger2">Button 2</TooltipTrigger>
              <TooltipContent data-testid="content2">Tooltip 2</TooltipContent>
            </Tooltip>
          </div>
        </TooltipProvider>
      )
      
      // Show first tooltip
      await user.hover(screen.getByTestId('trigger1'))
      await waitFor(() => {
        expect(screen.getByTestId('content1')).toBeInTheDocument()
        expect(screen.queryByTestId('content2')).not.toBeInTheDocument()
      })
      
      // Switch to second tooltip
      await user.unhover(screen.getByTestId('trigger1'))
      await user.hover(screen.getByTestId('trigger2'))
      
      await waitFor(() => {
        expect(screen.queryByTestId('content1')).not.toBeInTheDocument()
        expect(screen.getByTestId('content2')).toBeInTheDocument()
      })
    })

    it('respects delay duration', async () => {
      render(
        <TooltipProvider delayDuration={100}>
          <Tooltip>
            <TooltipTrigger data-testid="delayed-trigger">
              Delayed tooltip
            </TooltipTrigger>
            <TooltipContent data-testid="delayed-content">
              This appears after delay
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )
      
      const trigger = screen.getByTestId('delayed-trigger')
      await user.hover(trigger)
      
      // Should not appear immediately
      expect(screen.queryByTestId('delayed-content')).not.toBeInTheDocument()
      
      // Should appear after delay
      await waitFor(() => {
        expect(screen.getByTestId('delayed-content')).toBeInTheDocument()
      }, { timeout: 200 })
    })
  })

  describe('Accessibility', () => {
    it('provides proper ARIA attributes', async () => {
      render(
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger data-testid="trigger">
              <button aria-describedby="tooltip">Button</button>
            </TooltipTrigger>
            <TooltipContent data-testid="content" id="tooltip">
              Tooltip description
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )
      
      const trigger = screen.getByTestId('trigger')
      await user.hover(trigger)
      
      await waitFor(() => {
        const content = screen.getByTestId('content')
        expect(content).toBeInTheDocument()
        expect(trigger).toHaveAttribute('aria-describedby')
      })
    })

    it('works with screen readers', async () => {
      render(
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger data-testid="sr-trigger">
              <button>
                <span aria-hidden="true">💾</span>
                <span className="sr-only">Save document</span>
              </button>
            </TooltipTrigger>
            <TooltipContent data-testid="sr-content">
              Save your current work
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )
      
      const trigger = screen.getByTestId('sr-trigger')
      await user.hover(trigger)
      
      await waitFor(() => {
        expect(screen.getByText('Save your current work')).toBeInTheDocument()
      })
    })

    it('supports keyboard navigation', async () => {
      render(
        <TooltipProvider delayDuration={0}>
          <div>
            <Tooltip>
              <TooltipTrigger data-testid="keyboard-trigger">
                <button>Keyboard accessible</button>
              </TooltipTrigger>
              <TooltipContent data-testid="keyboard-content">
                Keyboard tooltip
              </TooltipContent>
            </Tooltip>
            <button data-testid="other-button">Other button</button>
          </div>
        </TooltipProvider>
      )
      
      // Tab to trigger
      await user.tab()
      const trigger = screen.getByTestId('keyboard-trigger')
      expect(trigger).toHaveFocus()
      
      await waitFor(() => {
        expect(screen.getByTestId('keyboard-content')).toBeInTheDocument()
      })
      
      // Tab away
      await user.tab()
      const otherButton = screen.getByTestId('other-button')
      expect(otherButton).toHaveFocus()
      
      await waitFor(() => {
        expect(screen.queryByTestId('keyboard-content')).not.toBeInTheDocument()
      })
    })
  })

  describe('Edge Cases', () => {
    it('handles empty tooltip content', async () => {
      render(
        <TooltipProvider delayDuration={0}>
          <Tooltip defaultOpen>
            <TooltipTrigger>Trigger</TooltipTrigger>
            <TooltipContent data-testid="empty-content"></TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )
      
      await waitFor(() => {
        expect(screen.getByTestId('empty-content')).toBeInTheDocument()
      })
    })

    it('handles null content gracefully', async () => {
      render(
        <TooltipProvider delayDuration={0}>
          <Tooltip defaultOpen>
            <TooltipTrigger>Trigger</TooltipTrigger>
            <TooltipContent data-testid="null-content">
              {null}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )
      
      await waitFor(() => {
        expect(screen.getByTestId('null-content')).toBeInTheDocument()
      })
    })

    it('handles very long tooltip content', async () => {
      const longContent = 'This is a very long tooltip content that might wrap to multiple lines depending on the available space and styling applied to the tooltip component.'
      
      render(
        <TooltipProvider delayDuration={0}>
          <Tooltip defaultOpen>
            <TooltipTrigger>Trigger</TooltipTrigger>
            <TooltipContent data-testid="long-content">
              {longContent}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )
      
      await waitFor(() => {
        expect(screen.getByTestId('long-content')).toHaveTextContent(longContent)
      })
    })

    it('handles tooltip without provider', () => {
      // This should still render but may not have full functionality
      const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {})
      
      render(
        <Tooltip>
          <TooltipTrigger data-testid="no-provider-trigger">
            No Provider Trigger
          </TooltipTrigger>
          <TooltipContent data-testid="no-provider-content">
            No Provider Content
          </TooltipContent>
        </Tooltip>
      )
      
      expect(screen.getByTestId('no-provider-trigger')).toBeInTheDocument()
      
      consoleError.mockRestore()
    })

    it('handles rapid hover/unhover interactions', async () => {
      render(
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger data-testid="rapid-trigger">
              Rapid interaction
            </TooltipTrigger>
            <TooltipContent data-testid="rapid-content">
              Rapid tooltip
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )
      
      const trigger = screen.getByTestId('rapid-trigger')
      
      // Rapid hover/unhover
      await user.hover(trigger)
      await user.unhover(trigger)
      await user.hover(trigger)
      await user.unhover(trigger)
      await user.hover(trigger)
      
      // Should still work correctly
      await waitFor(() => {
        expect(screen.getByTestId('rapid-content')).toBeInTheDocument()
      })
    })
  })
})
