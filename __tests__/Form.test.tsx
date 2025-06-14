import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from '@/components/ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

const formSchema = z.object({
  username: z.string().min(2, 'Username must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
})

type FormValues = z.infer<typeof formSchema>

describe('Form Component', () => {
  const TestForm = () => {
    const form = useForm<FormValues>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        username: '',
        email: '',
        password: '',
      },
    })

    const onSubmit = jest.fn()

    return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} data-testid="test-form">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <input {...field} />
                </FormControl>
                <FormDescription>Enter your username</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <input {...field} />
                </FormControl>
                <FormDescription>Enter your email</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <input type="password" {...field} />
                </FormControl>
                <FormDescription>Enter your password</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <button type="submit">Submit</button>
        </form>
      </Form>
    )
  }

  it('renders form with all fields', () => {
    render(<TestForm />)
    
    expect(screen.getByLabelText('Username')).toBeInTheDocument()
    expect(screen.getByLabelText('Email')).toBeInTheDocument()
    expect(screen.getByLabelText('Password')).toBeInTheDocument()
    expect(screen.getByText('Submit')).toBeInTheDocument()
  })

  it('shows validation errors for invalid input', async () => {
    render(<TestForm />)
    
    const submitButton = screen.getByText('Submit')
    fireEvent.click(submitButton)
    
    await waitFor(() => {
      expect(screen.getByText('Username must be at least 2 characters')).toBeInTheDocument()
      expect(screen.getByText('Invalid email address')).toBeInTheDocument()
      expect(screen.getByText('Password must be at least 8 characters')).toBeInTheDocument()
    })
  })

  it('submits form with valid data', async () => {
    const onSubmit = jest.fn()
    render(<TestForm />)
    
    const usernameInput = screen.getByLabelText('Username')
    const emailInput = screen.getByLabelText('Email')
    const passwordInput = screen.getByLabelText('Password')
    
    fireEvent.change(usernameInput, { target: { value: 'testuser' } })
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } })
    fireEvent.change(passwordInput, { target: { value: 'password123' } })
    
    const submitButton = screen.getByText('Submit')
    fireEvent.click(submitButton)
    
    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith({
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123',
      })
    })
  })

  it('shows field descriptions', () => {
    render(<TestForm />)
    
    expect(screen.getByText('Enter your username')).toBeInTheDocument()
    expect(screen.getByText('Enter your email')).toBeInTheDocument()
    expect(screen.getByText('Enter your password')).toBeInTheDocument()
  })

  it('clears validation errors when input becomes valid', async () => {
    render(<TestForm />)
    
    const usernameInput = screen.getByLabelText('Username')
    const submitButton = screen.getByText('Submit')
    
    // Submit with invalid data
    fireEvent.click(submitButton)
    await waitFor(() => {
      expect(screen.getByText('Username must be at least 2 characters')).toBeInTheDocument()
    })
    
    // Fix the input
    fireEvent.change(usernameInput, { target: { value: 'testuser' } })
    
    await waitFor(() => {
      expect(screen.queryByText('Username must be at least 2 characters')).not.toBeInTheDocument()
    })
  })
}) 