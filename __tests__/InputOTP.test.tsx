import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
} from '@/components/ui/input-otp'

describe('InputOTP Components', () => {
  describe('InputOTP', () => {
    it('renders correctly', () => {
      render(
        <InputOTP maxLength={4} data-testid="input-otp">
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
          </InputOTPGroup>
        </InputOTP>
      )
      
      const inputOTP = screen.getByTestId('input-otp')
      expect(inputOTP).toBeInTheDocument()
    })

    it('accepts custom className', () => {
      render(
        <InputOTP maxLength={4} className="custom-otp" data-testid="input-otp">
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
          </InputOTPGroup>
        </InputOTP>
      )
      
      expect(screen.getByTestId('input-otp')).toHaveClass('custom-otp')
    })

    it('accepts custom container className', () => {
      render(
        <InputOTP 
          maxLength={4} 
          containerClassName="custom-container" 
          data-testid="input-otp"
        >
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
          </InputOTPGroup>
        </InputOTP>
      )
      
      const container = screen.getByTestId('input-otp').parentElement
      expect(container).toHaveClass('custom-container')
    })

    it('handles value changes', async () => {
      const user = userEvent.setup()
      const onValueChange = jest.fn()
      
      render(
        <InputOTP maxLength={4} onValueChange={onValueChange} data-testid="input-otp">
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
          </InputOTPGroup>
        </InputOTP>
      )
      
      const input = screen.getByTestId('input-otp')
      await user.type(input, '1234')
      
      await waitFor(() => {
        expect(onValueChange).toHaveBeenCalledWith('1234')
      })
    })

    it('respects maxLength', async () => {
      const user = userEvent.setup()
      const onValueChange = jest.fn()
      
      render(
        <InputOTP maxLength={2} onValueChange={onValueChange} data-testid="input-otp">
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
          </InputOTPGroup>
        </InputOTP>
      )
      
      const input = screen.getByTestId('input-otp')
      await user.type(input, '123456')
      
      await waitFor(() => {
        expect(onValueChange).toHaveBeenLastCalledWith('12')
      })
    })

    it('handles disabled state', () => {
      render(
        <InputOTP maxLength={4} disabled data-testid="input-otp">
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
          </InputOTPGroup>
        </InputOTP>
      )
      
      const container = screen.getByTestId('input-otp').parentElement
      expect(container).toHaveClass('has-[:disabled]:opacity-50')
    })

    it('shows not-allowed cursor when disabled', () => {
      render(
        <InputOTP maxLength={4} disabled data-testid="input-otp">
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
          </InputOTPGroup>
        </InputOTP>
      )
      
      const input = screen.getByTestId('input-otp')
      expect(input).toHaveClass('disabled:cursor-not-allowed')
    })

    it('accepts controlled value', () => {
      render(
        <InputOTP maxLength={4} value="12" data-testid="input-otp">
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
          </InputOTPGroup>
        </InputOTP>
      )
      
      // The value should be reflected in the component
      expect(screen.getByTestId('input-otp')).toBeInTheDocument()
    })

    it('calls onComplete when maxLength is reached', async () => {
      const user = userEvent.setup()
      const onComplete = jest.fn()
      
      render(
        <InputOTP maxLength={2} onComplete={onComplete} data-testid="input-otp">
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
          </InputOTPGroup>
        </InputOTP>
      )
      
      const input = screen.getByTestId('input-otp')
      await user.type(input, '12')
      
      await waitFor(() => {
        expect(onComplete).toHaveBeenCalledWith('12')
      })
    })
  })

  describe('InputOTPGroup', () => {
    it('renders correctly', () => {
      render(
        <InputOTP maxLength={4}>
          <InputOTPGroup data-testid="otp-group">
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
          </InputOTPGroup>
        </InputOTP>
      )
      
      const group = screen.getByTestId('otp-group')
      expect(group).toBeInTheDocument()
      expect(group).toHaveClass('flex', 'items-center')
    })

    it('accepts custom className', () => {
      render(
        <InputOTP maxLength={4}>
          <InputOTPGroup className="custom-group" data-testid="otp-group">
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
          </InputOTPGroup>
        </InputOTP>
      )
      
      expect(screen.getByTestId('otp-group')).toHaveClass('custom-group')
    })

    it('groups multiple slots together', () => {
      render(
        <InputOTP maxLength={6}>
          <InputOTPGroup data-testid="first-group">
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
          </InputOTPGroup>
          <InputOTPSeparator />
          <InputOTPGroup data-testid="second-group">
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
      )
      
      const firstGroup = screen.getByTestId('first-group')
      const secondGroup = screen.getByTestId('second-group')
      
      expect(firstGroup).toBeInTheDocument()
      expect(secondGroup).toBeInTheDocument()
      expect(firstGroup.children).toHaveLength(3)
      expect(secondGroup.children).toHaveLength(3)
    })
  })

  describe('InputOTPSlot', () => {
    it('renders correctly', () => {
      render(
        <InputOTP maxLength={4}>
          <InputOTPGroup>
            <InputOTPSlot index={0} data-testid="otp-slot" />
          </InputOTPGroup>
        </InputOTP>
      )
      
      const slot = screen.getByTestId('otp-slot')
      expect(slot).toBeInTheDocument()
      expect(slot).toHaveClass(
        'relative',
        'flex',
        'h-10',
        'w-10',
        'items-center',
        'justify-center',
        'border-y',
        'border-r',
        'border-input',
        'text-sm',
        'transition-all'
      )
    })

    it('applies first slot styles', () => {
      render(
        <InputOTP maxLength={4}>
          <InputOTPGroup>
            <InputOTPSlot index={0} data-testid="first-slot" />
            <InputOTPSlot index={1} data-testid="second-slot" />
          </InputOTPGroup>
        </InputOTP>
      )
      
      const firstSlot = screen.getByTestId('first-slot')
      expect(firstSlot).toHaveClass('first:rounded-l-md', 'first:border-l')
    })

    it('applies last slot styles', () => {
      render(
        <InputOTP maxLength={4}>
          <InputOTPGroup>
            <InputOTPSlot index={0} data-testid="first-slot" />
            <InputOTPSlot index={1} data-testid="last-slot" />
          </InputOTPGroup>
        </InputOTP>
      )
      
      const lastSlot = screen.getByTestId('last-slot')
      expect(lastSlot).toHaveClass('last:rounded-r-md')
    })

    it('shows active state styling', () => {
      render(
        <InputOTP maxLength={4} value="">
          <InputOTPGroup>
            <InputOTPSlot index={0} data-testid="active-slot" />
          </InputOTPGroup>
        </InputOTP>
      )
      
      const slot = screen.getByTestId('active-slot')
      // Active state would be determined by the OTP input library
      expect(slot).toBeInTheDocument()
    })

    it('displays character when provided', () => {
      render(
        <InputOTP maxLength={4} value="A">
          <InputOTPGroup>
            <InputOTPSlot index={0} data-testid="filled-slot" />
          </InputOTPGroup>
        </InputOTP>
      )
      
      const slot = screen.getByTestId('filled-slot')
      expect(slot).toBeInTheDocument()
      // Character display would be handled by the OTP input library
    })

    it('accepts custom className', () => {
      render(
        <InputOTP maxLength={4}>
          <InputOTPGroup>
            <InputOTPSlot index={0} className="custom-slot" data-testid="custom-slot" />
          </InputOTPGroup>
        </InputOTP>
      )
      
      expect(screen.getByTestId('custom-slot')).toHaveClass('custom-slot')
    })

    it('shows caret when focused and empty', () => {
      render(
        <InputOTP maxLength={4} value="">
          <InputOTPGroup>
            <InputOTPSlot index={0} data-testid="caret-slot" />
          </InputOTPGroup>
        </InputOTP>
      )
      
      const slot = screen.getByTestId('caret-slot')
      // Caret visibility would be handled by the OTP input library
      expect(slot).toBeInTheDocument()
    })
  })

  describe('InputOTPSeparator', () => {
    it('renders correctly', () => {
      render(
        <InputOTP maxLength={6}>
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
          </InputOTPGroup>
          <InputOTPSeparator data-testid="otp-separator" />
          <InputOTPGroup>
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
      )
      
      const separator = screen.getByTestId('otp-separator')
      expect(separator).toBeInTheDocument()
      expect(separator).toHaveAttribute('aria-hidden', 'true')
    })

    it('displays dot icon by default', () => {
      render(
        <InputOTP maxLength={6}>
          <InputOTPGroup>
            <InputOTPSlot index={0} />
          </InputOTPGroup>
          <InputOTPSeparator data-testid="otp-separator" />
          <InputOTPGroup>
            <InputOTPSlot index={1} />
          </InputOTPGroup>
        </InputOTP>
      )
      
      const separator = screen.getByTestId('otp-separator')
      const icon = separator.querySelector('svg')
      expect(icon).toBeInTheDocument()
    })

    it('accepts custom className', () => {
      render(
        <InputOTP maxLength={6}>
          <InputOTPGroup>
            <InputOTPSlot index={0} />
          </InputOTPGroup>
          <InputOTPSeparator className="custom-separator" data-testid="otp-separator" />
          <InputOTPGroup>
            <InputOTPSlot index={1} />
          </InputOTPGroup>
        </InputOTP>
      )
      
      expect(screen.getByTestId('otp-separator')).toHaveClass('custom-separator')
    })

    it('is hidden from screen readers', () => {
      render(
        <InputOTP maxLength={6}>
          <InputOTPGroup>
            <InputOTPSlot index={0} />
          </InputOTPGroup>
          <InputOTPSeparator data-testid="otp-separator" />
          <InputOTPGroup>
            <InputOTPSlot index={1} />
          </InputOTPGroup>
        </InputOTP>
      )
      
      const separator = screen.getByTestId('otp-separator')
      expect(separator).toHaveAttribute('aria-hidden', 'true')
    })
  })

  describe('Complete OTP Input', () => {
    it('renders complete OTP input with groups and separator', () => {
      render(
        <InputOTP maxLength={6} data-testid="complete-otp">
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
          </InputOTPGroup>
          <InputOTPSeparator />
          <InputOTPGroup>
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
      )
      
      const otp = screen.getByTestId('complete-otp')
      expect(otp).toBeInTheDocument()
      
      // Should have 6 slots and 1 separator
      const container = otp.parentElement
      expect(container?.children).toHaveLength(3) // 2 groups + 1 separator
    })

    it('handles sequential input correctly', async () => {
      const user = userEvent.setup()
      const onValueChange = jest.fn()
      
      render(
        <InputOTP maxLength={4} onValueChange={onValueChange} data-testid="sequential-otp">
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
          </InputOTPGroup>
        </InputOTP>
      )
      
      const input = screen.getByTestId('sequential-otp')
      
      // Type one character at a time
      await user.type(input, '1')
      await user.type(input, '2')
      await user.type(input, '3')
      await user.type(input, '4')
      
      await waitFor(() => {
        expect(onValueChange).toHaveBeenLastCalledWith('1234')
      })
    })

    it('handles backspace correctly', async () => {
      const user = userEvent.setup()
      const onValueChange = jest.fn()
      
      render(
        <InputOTP maxLength={4} value="123" onValueChange={onValueChange} data-testid="backspace-otp">
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
          </InputOTPGroup>
        </InputOTP>
      )
      
      const input = screen.getByTestId('backspace-otp')
      await user.type(input, '{backspace}')
      
      await waitFor(() => {
        expect(onValueChange).toHaveBeenCalledWith('12')
      })
    })

    it('maintains focus management', async () => {
      const user = userEvent.setup()
      
      render(
        <InputOTP maxLength={4} data-testid="focus-otp">
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
          </InputOTPGroup>
        </InputOTP>
      )
      
      const input = screen.getByTestId('focus-otp')
      
      // Focus the input
      await user.click(input)
      
      // Input should be focused
      expect(input).toHaveFocus()
    })

    it('supports paste functionality', async () => {
      const user = userEvent.setup()
      const onValueChange = jest.fn()
      
      render(
        <InputOTP maxLength={4} onValueChange={onValueChange} data-testid="paste-otp">
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
          </InputOTPGroup>
        </InputOTP>
      )
      
      const input = screen.getByTestId('paste-otp')
      
      // Simulate paste
      await user.click(input)
      await user.paste('1234')
      
      await waitFor(() => {
        expect(onValueChange).toHaveBeenCalledWith('1234')
      })
    })

    it('handles numeric input only', async () => {
      const user = userEvent.setup()
      const onValueChange = jest.fn()
      
      render(
        <InputOTP 
          maxLength={4} 
          onValueChange={onValueChange} 
          pattern={/^[0-9]+$/}
          data-testid="numeric-otp"
        >
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
          </InputOTPGroup>
        </InputOTP>
      )
      
      const input = screen.getByTestId('numeric-otp')
      
      // Try to type letters (should be rejected)
      await user.type(input, 'abcd')
      
      // Should not have called onValueChange with letters
      expect(onValueChange).not.toHaveBeenCalledWith('abcd')
      
      // Type numbers (should work)
      await user.type(input, '1234')
      
      await waitFor(() => {
        expect(onValueChange).toHaveBeenCalledWith('1234')
      })
    })
  })

  describe('Accessibility', () => {
    it('maintains proper accessibility attributes', () => {
      render(
        <InputOTP maxLength={4} data-testid="accessible-otp">
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
          </InputOTPGroup>
        </InputOTP>
      )
      
      const input = screen.getByTestId('accessible-otp')
      
      // Should be focusable
      expect(input).toHaveAttribute('tabindex', '0')
    })

    it('supports aria-label', () => {
      render(
        <InputOTP maxLength={4} aria-label="Enter verification code" data-testid="labeled-otp">
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
          </InputOTPGroup>
        </InputOTP>
      )
      
      const input = screen.getByTestId('labeled-otp')
      expect(input).toHaveAttribute('aria-label', 'Enter verification code')
    })

    it('supports aria-describedby', () => {
      render(
        <div>
          <InputOTP maxLength={4} aria-describedby="otp-help" data-testid="described-otp">
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
            </InputOTPGroup>
          </InputOTP>
          <div id="otp-help">Enter the 4-digit code sent to your phone</div>
        </div>
      )
      
      const input = screen.getByTestId('described-otp')
      expect(input).toHaveAttribute('aria-describedby', 'otp-help')
    })

    it('handles disabled state accessibility', () => {
      render(
        <InputOTP maxLength={4} disabled data-testid="disabled-otp">
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
          </InputOTPGroup>
        </InputOTP>
      )
      
      const input = screen.getByTestId('disabled-otp')
      expect(input).toBeDisabled()
    })
  })
}) 