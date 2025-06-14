import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'

describe('Avatar Components', () => {
  describe('Avatar', () => {
    it('renders with default classes', () => {
      render(<Avatar data-testid="avatar" />)
      
      const avatar = screen.getByTestId('avatar')
      expect(avatar).toBeInTheDocument()
      expect(avatar).toHaveClass('relative', 'flex', 'h-10', 'w-10', 'shrink-0', 'overflow-hidden', 'rounded-full')
    })

    it('accepts custom className', () => {
      render(<Avatar data-testid="avatar" className="custom-avatar h-12 w-12" />)
      
      const avatar = screen.getByTestId('avatar')
      expect(avatar).toHaveClass('custom-avatar', 'h-12', 'w-12')
    })

    it('renders children correctly', () => {
      render(
        <Avatar data-testid="avatar">
          <AvatarImage src="/test.jpg" alt="Test User" />
          <AvatarFallback>TU</AvatarFallback>
        </Avatar>
      )
      
      const avatar = screen.getByTestId('avatar')
      expect(avatar).toBeInTheDocument()
    })
  })

  describe('AvatarImage', () => {
    it('renders image with correct attributes', () => {
      render(<AvatarImage data-testid="avatar-image" src="/test.jpg" alt="Test User" />)
      
      const image = screen.getByTestId('avatar-image')
      expect(image).toBeInTheDocument()
      expect(image).toHaveAttribute('src', '/test.jpg')
      expect(image).toHaveAttribute('alt', 'Test User')
      expect(image).toHaveClass('aspect-square', 'h-full', 'w-full')
    })

    it('accepts custom className', () => {
      render(<AvatarImage data-testid="avatar-image" src="/test.jpg" className="custom-image" />)
      
      const image = screen.getByTestId('avatar-image')
      expect(image).toHaveClass('custom-image')
    })

    it('forwards all props to img element', () => {
      render(
        <AvatarImage 
          data-testid="avatar-image" 
          src="/test.jpg" 
          alt="Test User"
          loading="lazy"
          onLoad={() => {}}
        />
      )
      
      const image = screen.getByTestId('avatar-image')
      expect(image).toHaveAttribute('loading', 'lazy')
    })
  })

  describe('AvatarFallback', () => {
    it('renders fallback content with correct classes', () => {
      render(<AvatarFallback data-testid="avatar-fallback">JD</AvatarFallback>)
      
      const fallback = screen.getByTestId('avatar-fallback')
      expect(fallback).toBeInTheDocument()
      expect(fallback).toHaveTextContent('JD')
      expect(fallback).toHaveClass('flex', 'h-full', 'w-full', 'items-center', 'justify-center', 'rounded-full', 'bg-muted')
    })

    it('accepts custom className', () => {
      render(<AvatarFallback data-testid="avatar-fallback" className="custom-fallback">JD</AvatarFallback>)
      
      const fallback = screen.getByTestId('avatar-fallback')
      expect(fallback).toHaveClass('custom-fallback')
    })

    it('handles different content types', () => {
      render(
        <AvatarFallback data-testid="avatar-fallback">
          <span>👤</span>
        </AvatarFallback>
      )
      
      const fallback = screen.getByTestId('avatar-fallback')
      expect(fallback).toContainHTML('<span>👤</span>')
    })
  })

  describe('Complete Avatar Usage', () => {
    it('renders complete avatar with image and fallback', () => {
      render(
        <Avatar data-testid="complete-avatar">
          <AvatarImage data-testid="avatar-image" src="/user.jpg" alt="John Doe" />
          <AvatarFallback data-testid="avatar-fallback">JD</AvatarFallback>
        </Avatar>
      )
      
      expect(screen.getByTestId('complete-avatar')).toBeInTheDocument()
      expect(screen.getByTestId('avatar-image')).toBeInTheDocument()
      expect(screen.getByTestId('avatar-fallback')).toBeInTheDocument()
    })

    it('handles missing image gracefully', () => {
      render(
        <Avatar data-testid="avatar-no-image">
          <AvatarFallback data-testid="fallback-only">AB</AvatarFallback>
        </Avatar>
      )
      
      expect(screen.getByTestId('avatar-no-image')).toBeInTheDocument()
      expect(screen.getByTestId('fallback-only')).toHaveTextContent('AB')
    })

    it('maintains responsive design classes', () => {
      render(
        <Avatar data-testid="responsive-avatar" className="h-8 w-8 md:h-10 md:w-10">
          <AvatarImage src="/user.jpg" alt="User" />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
      )
      
      const avatar = screen.getByTestId('responsive-avatar')
      expect(avatar).toHaveClass('h-8', 'w-8', 'md:h-10', 'md:w-10')
    })
  })
}) 