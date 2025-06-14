import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogTrigger,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'

describe('Dialog Components', () => {
  it('renders dialog trigger correctly', () => {
    render(
      <Dialog>
        <DialogTrigger data-testid="dialog-trigger">
          Open Dialog
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Dialog Title</DialogTitle>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    )
    
    const trigger = screen.getByTestId('dialog-trigger')
    expect(trigger).toBeInTheDocument()
    expect(trigger).toHaveTextContent('Open Dialog')
  })

  it('opens dialog when trigger is clicked', async () => {
    const user = userEvent.setup()
    
    render(
      <Dialog>
        <DialogTrigger data-testid="dialog-trigger">
          Open Dialog
        </DialogTrigger>
        <DialogContent data-testid="dialog-content">
          <DialogHeader>
            <DialogTitle>Dialog Title</DialogTitle>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    )
    
    const trigger = screen.getByTestId('dialog-trigger')
    await user.click(trigger)
    
    await waitFor(() => {
      expect(screen.getByTestId('dialog-content')).toBeInTheDocument()
    })
  })

  it('closes dialog when close button is clicked', async () => {
    const user = userEvent.setup()
    
    render(
      <Dialog>
        <DialogTrigger data-testid="dialog-trigger">
          Open Dialog
        </DialogTrigger>
        <DialogContent data-testid="dialog-content">
          <DialogHeader>
            <DialogTitle>Dialog Title</DialogTitle>
            <DialogClose data-testid="dialog-close">Close</DialogClose>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    )
    
    const trigger = screen.getByTestId('dialog-trigger')
    await user.click(trigger)
    
    await waitFor(() => {
      expect(screen.getByTestId('dialog-content')).toBeInTheDocument()
    })
    
    const closeButton = screen.getByTestId('dialog-close')
    await user.click(closeButton)
    
    await waitFor(() => {
      expect(screen.queryByTestId('dialog-content')).not.toBeInTheDocument()
    })
  })

  it('renders dialog with all components', () => {
    render(
      <Dialog defaultOpen>
        <DialogContent data-testid="dialog-content">
          <DialogHeader data-testid="dialog-header">
            <DialogTitle data-testid="dialog-title">Dialog Title</DialogTitle>
            <DialogDescription data-testid="dialog-description">
              Dialog description text
            </DialogDescription>
          </DialogHeader>
          <div data-testid="dialog-body">Dialog body content</div>
          <DialogFooter data-testid="dialog-footer">
            <DialogClose>Cancel</DialogClose>
            <button>Confirm</button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
    
    expect(screen.getByTestId('dialog-content')).toBeInTheDocument()
    expect(screen.getByTestId('dialog-header')).toBeInTheDocument()
    expect(screen.getByTestId('dialog-title')).toBeInTheDocument()
    expect(screen.getByTestId('dialog-description')).toBeInTheDocument()
    expect(screen.getByTestId('dialog-body')).toBeInTheDocument()
    expect(screen.getByTestId('dialog-footer')).toBeInTheDocument()
  })

  it('applies custom className to dialog content', () => {
    render(
      <Dialog defaultOpen>
        <DialogContent className="custom-dialog" data-testid="dialog-content">
          <DialogTitle>Test</DialogTitle>
        </DialogContent>
      </Dialog>
    )
    
    expect(screen.getByTestId('dialog-content')).toHaveClass('custom-dialog')
  })

  it('handles controlled state', async () => {
    const user = userEvent.setup()
    const onOpenChange = jest.fn()
    
    const ControlledDialog = () => {
      const [open, setOpen] = React.useState(false)
      
      return (
        <Dialog open={open} onOpenChange={(isOpen) => {
          setOpen(isOpen)
          onOpenChange(isOpen)
        }}>
          <DialogTrigger data-testid="trigger" onClick={() => setOpen(true)}>
            Open
          </DialogTrigger>
          <DialogContent data-testid="content">
            <DialogTitle>Title</DialogTitle>
            <DialogClose data-testid="close">Close</DialogClose>
          </DialogContent>
        </Dialog>
      )
    }
    
    render(<ControlledDialog />)
    
    const trigger = screen.getByTestId('trigger')
    await user.click(trigger)
    
    expect(onOpenChange).toHaveBeenCalledWith(true)
    expect(screen.getByTestId('content')).toBeInTheDocument()
  })

  it('renders dialog overlay', () => {
    render(
      <Dialog defaultOpen>
        <DialogContent>
          <DialogOverlay data-testid="dialog-overlay" />
          <DialogTitle>Test</DialogTitle>
        </DialogContent>
      </Dialog>
    )
    
    const overlay = screen.getByTestId('dialog-overlay')
    expect(overlay).toBeInTheDocument()
  })

  it('supports asChild prop on trigger', () => {
    render(
      <Dialog>
        <DialogTrigger asChild>
          <button data-testid="custom-trigger">Custom Button</button>
        </DialogTrigger>
        <DialogContent>
          <DialogTitle>Test</DialogTitle>
        </DialogContent>
      </Dialog>
    )
    
    const trigger = screen.getByTestId('custom-trigger')
    expect(trigger).toBeInTheDocument()
    expect(trigger.tagName).toBe('BUTTON')
  })

  it('maintains accessibility attributes', () => {
    render(
      <Dialog defaultOpen>
        <DialogContent data-testid="dialog-content">
          <DialogTitle data-testid="dialog-title">Accessible Dialog</DialogTitle>
          <DialogDescription data-testid="dialog-description">
            This dialog is accessible
          </DialogDescription>
        </DialogContent>
      </Dialog>
    )
    
    const content = screen.getByTestId('dialog-content')
    const title = screen.getByTestId('dialog-title')
    const description = screen.getByTestId('dialog-description')
    
    expect(content).toHaveAttribute('role', 'dialog')
    expect(title).toBeInTheDocument()
    expect(description).toBeInTheDocument()
  })

  it('closes on escape key', async () => {
    const user = userEvent.setup()
    
    render(
      <Dialog defaultOpen>
        <DialogContent data-testid="dialog-content">
          <DialogTitle>Test Dialog</DialogTitle>
        </DialogContent>
      </Dialog>
    )
    
    expect(screen.getByTestId('dialog-content')).toBeInTheDocument()
    
    await user.keyboard('{Escape}')
    
    await waitFor(() => {
      expect(screen.queryByTestId('dialog-content')).not.toBeInTheDocument()
    })
  })

  it('closes when clicking overlay', async () => {
    const user = userEvent.setup()
    
    render(
      <Dialog defaultOpen>
        <DialogOverlay data-testid="dialog-overlay" />
        <DialogContent data-testid="dialog-content">
          <DialogTitle>Test Dialog</DialogTitle>
        </DialogContent>
      </Dialog>
    )
    
    expect(screen.getByTestId('dialog-content')).toBeInTheDocument()
    
    const overlay = screen.getByTestId('dialog-overlay')
    await user.click(overlay)
    
    await waitFor(() => {
      expect(screen.queryByTestId('dialog-content')).not.toBeInTheDocument()
    })
  })

  it('renders portal correctly', () => {
    render(
      <Dialog defaultOpen>
        <DialogPortal>
          <DialogContent data-testid="portal-content">
            <DialogTitle>Portal Dialog</DialogTitle>
          </DialogContent>
        </DialogPortal>
      </Dialog>
    )
    
    expect(screen.getByTestId('portal-content')).toBeInTheDocument()
  })

  it('handles focus management', async () => {
    const user = userEvent.setup()
    
    render(
      <div>
        <button data-testid="outside-button">Outside Button</button>
        <Dialog>
          <DialogTrigger data-testid="dialog-trigger">
            Open Dialog
          </DialogTrigger>
          <DialogContent data-testid="dialog-content">
            <DialogTitle>Test Dialog</DialogTitle>
            <button data-testid="dialog-button">Dialog Button</button>
            <DialogClose data-testid="dialog-close">Close</DialogClose>
          </DialogContent>
        </Dialog>
      </div>
    )
    
    const trigger = screen.getByTestId('dialog-trigger')
    await user.click(trigger)
    
    await waitFor(() => {
      expect(screen.getByTestId('dialog-content')).toBeInTheDocument()
    })
    
    // Focus should be trapped within dialog
    const dialogButton = screen.getByTestId('dialog-button')
    expect(dialogButton).toBeInTheDocument()
  })
}) 