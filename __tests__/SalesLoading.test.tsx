import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'

// Import the loading component
import Loading from '@/app/sales/loading'

describe('Sales Loading Component', () => {
  it('renders loading component', () => {
    render(<Loading />)
    
    // Check if the component renders without crashing
    expect(document.body).toBeInTheDocument()
  })

  it('displays loading content', () => {
    const { container } = render(<Loading />)
    
    // Check that something is rendered
    expect(container.firstChild).toBeInTheDocument()
  })
}) 