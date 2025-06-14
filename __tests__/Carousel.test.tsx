import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'

// Mock useEmblaCarousel
jest.mock('embla-carousel-react', () => ({
  __esModule: true,
  default: jest.fn(() => [
    React.createRef(),
    {
      canScrollPrev: jest.fn(() => true),
      canScrollNext: jest.fn(() => true),
      scrollPrev: jest.fn(),
      scrollNext: jest.fn(),
      on: jest.fn(),
      off: jest.fn(),
    }
  ])
}))

describe('Carousel Components', () => {
  describe('Carousel', () => {
    it('renders correctly', () => {
      render(
        <Carousel data-testid="carousel">
          <CarouselContent>
            <CarouselItem>Slide 1</CarouselItem>
            <CarouselItem>Slide 2</CarouselItem>
          </CarouselContent>
        </Carousel>
      )
      
      const carousel = screen.getByTestId('carousel')
      expect(carousel).toBeInTheDocument()
      expect(carousel.tagName).toBe('SECTION')
      expect(carousel).toHaveAttribute('aria-label', 'carousel')
      expect(carousel).toHaveAttribute('aria-roledescription', 'carousel')
    })

    it('applies default classes', () => {
      render(
        <Carousel data-testid="carousel">
          <CarouselContent>
            <CarouselItem>Slide 1</CarouselItem>
          </CarouselContent>
        </Carousel>
      )
      
      const carousel = screen.getByTestId('carousel')
      expect(carousel).toHaveClass('relative')
    })

    it('accepts custom className', () => {
      render(
        <Carousel className="custom-carousel" data-testid="carousel">
          <CarouselContent>
            <CarouselItem>Slide 1</CarouselItem>
          </CarouselContent>
        </Carousel>
      )
      
      expect(screen.getByTestId('carousel')).toHaveClass('custom-carousel')
    })

    it('handles keyboard navigation - ArrowLeft', () => {
      const mockScrollPrev = jest.fn()
      const mockScrollNext = jest.fn()
      
      require('embla-carousel-react').default.mockReturnValue([
        React.createRef(),
        {
          canScrollPrev: () => true,
          canScrollNext: () => true,
          scrollPrev: mockScrollPrev,
          scrollNext: mockScrollNext,
          on: jest.fn(),
          off: jest.fn(),
        }
      ])

      render(
        <Carousel data-testid="carousel">
          <CarouselContent>
            <CarouselItem>Slide 1</CarouselItem>
            <CarouselItem>Slide 2</CarouselItem>
          </CarouselContent>
        </Carousel>
      )
      
      const carousel = screen.getByTestId('carousel')
      fireEvent.keyDown(carousel, { key: 'ArrowLeft' })
      
      expect(mockScrollPrev).toHaveBeenCalled()
    })

    it('handles keyboard navigation - ArrowRight', () => {
      const mockScrollPrev = jest.fn()
      const mockScrollNext = jest.fn()
      
      require('embla-carousel-react').default.mockReturnValue([
        React.createRef(),
        {
          canScrollPrev: () => true,
          canScrollNext: () => true,
          scrollPrev: mockScrollPrev,
          scrollNext: mockScrollNext,
          on: jest.fn(),
          off: jest.fn(),
        }
      ])

      render(
        <Carousel data-testid="carousel">
          <CarouselContent>
            <CarouselItem>Slide 1</CarouselItem>
            <CarouselItem>Slide 2</CarouselItem>
          </CarouselContent>
        </Carousel>
      )
      
      const carousel = screen.getByTestId('carousel')
      fireEvent.keyDown(carousel, { key: 'ArrowRight' })
      
      expect(mockScrollNext).toHaveBeenCalled()
    })

    it('prevents default behavior on arrow key navigation', () => {
      render(
        <Carousel data-testid="carousel">
          <CarouselContent>
            <CarouselItem>Slide 1</CarouselItem>
            <CarouselItem>Slide 2</CarouselItem>
          </CarouselContent>
        </Carousel>
      )
      
      const carousel = screen.getByTestId('carousel')
      const event = new KeyboardEvent('keydown', { key: 'ArrowLeft' })
      const preventDefaultSpy = jest.spyOn(event, 'preventDefault')
      
      fireEvent(carousel, event)
      
      expect(preventDefaultSpy).toHaveBeenCalled()
    })

    it('supports horizontal orientation by default', () => {
      render(
        <Carousel data-testid="carousel">
          <CarouselContent>
            <CarouselItem>Slide 1</CarouselItem>
          </CarouselContent>
        </Carousel>
      )
      
      const carousel = screen.getByTestId('carousel')
      expect(carousel).toBeInTheDocument()
      // Default orientation should be horizontal
    })

    it('supports vertical orientation', () => {
      render(
        <Carousel orientation="vertical" data-testid="carousel">
          <CarouselContent>
            <CarouselItem>Slide 1</CarouselItem>
          </CarouselContent>
        </Carousel>
      )
      
      const carousel = screen.getByTestId('carousel')
      expect(carousel).toBeInTheDocument()
    })

    it('accepts custom options', () => {
      const customOpts = { loop: true, align: 'center' as const }
      
      render(
        <Carousel opts={customOpts} data-testid="carousel">
          <CarouselContent>
            <CarouselItem>Slide 1</CarouselItem>
          </CarouselContent>
        </Carousel>
      )
      
      const carousel = screen.getByTestId('carousel')
      expect(carousel).toBeInTheDocument()
    })

    it('calls setApi when provided', async () => {
      const setApiMock = jest.fn()
      
      render(
        <Carousel setApi={setApiMock} data-testid="carousel">
          <CarouselContent>
            <CarouselItem>Slide 1</CarouselItem>
          </CarouselContent>
        </Carousel>
      )
      
      await waitFor(() => {
        expect(setApiMock).toHaveBeenCalled()
      })
    })
  })

  describe('CarouselContent', () => {
    it('renders correctly', () => {
      render(
        <Carousel>
          <CarouselContent data-testid="carousel-content">
            <CarouselItem>Slide 1</CarouselItem>
            <CarouselItem>Slide 2</CarouselItem>
          </CarouselContent>
        </Carousel>
      )
      
      const content = screen.getByTestId('carousel-content')
      expect(content).toBeInTheDocument()
    })

    it('applies horizontal layout classes by default', () => {
      render(
        <Carousel>
          <CarouselContent data-testid="carousel-content">
            <CarouselItem>Slide 1</CarouselItem>
          </CarouselContent>
        </Carousel>
      )
      
      const content = screen.getByTestId('carousel-content')
      expect(content).toHaveClass('flex', '-ml-4')
    })

    it('applies vertical layout classes when orientation is vertical', () => {
      render(
        <Carousel orientation="vertical">
          <CarouselContent data-testid="carousel-content">
            <CarouselItem>Slide 1</CarouselItem>
          </CarouselContent>
        </Carousel>
      )
      
      const content = screen.getByTestId('carousel-content')
      expect(content).toHaveClass('flex', '-mt-4', 'flex-col')
    })

    it('accepts custom className', () => {
      render(
        <Carousel>
          <CarouselContent className="custom-content" data-testid="carousel-content">
            <CarouselItem>Slide 1</CarouselItem>
          </CarouselContent>
        </Carousel>
      )
      
      expect(screen.getByTestId('carousel-content')).toHaveClass('custom-content')
    })
  })

  describe('CarouselItem', () => {
    it('renders correctly', () => {
      render(
        <Carousel>
          <CarouselContent>
            <CarouselItem data-testid="carousel-item">
              Slide Content
            </CarouselItem>
          </CarouselContent>
        </Carousel>
      )
      
      const item = screen.getByTestId('carousel-item')
      expect(item).toBeInTheDocument()
      expect(item).toHaveTextContent('Slide Content')
      expect(item).toHaveAttribute('aria-roledescription', 'slide')
    })

    it('applies horizontal layout classes by default', () => {
      render(
        <Carousel>
          <CarouselContent>
            <CarouselItem data-testid="carousel-item">
              Slide Content
            </CarouselItem>
          </CarouselContent>
        </Carousel>
      )
      
      const item = screen.getByTestId('carousel-item')
      expect(item).toHaveClass('min-w-0', 'shrink-0', 'grow-0', 'basis-full', 'pl-4')
    })

    it('applies vertical layout classes when orientation is vertical', () => {
      render(
        <Carousel orientation="vertical">
          <CarouselContent>
            <CarouselItem data-testid="carousel-item">
              Slide Content
            </CarouselItem>
          </CarouselContent>
        </Carousel>
      )
      
      const item = screen.getByTestId('carousel-item')
      expect(item).toHaveClass('pt-4')
    })

    it('accepts custom className', () => {
      render(
        <Carousel>
          <CarouselContent>
            <CarouselItem className="custom-item" data-testid="carousel-item">
              Slide Content
            </CarouselItem>
          </CarouselContent>
        </Carousel>
      )
      
      expect(screen.getByTestId('carousel-item')).toHaveClass('custom-item')
    })
  })

  describe('CarouselPrevious', () => {
    it('renders correctly', () => {
      render(
        <Carousel>
          <CarouselContent>
            <CarouselItem>Slide 1</CarouselItem>
          </CarouselContent>
          <CarouselPrevious data-testid="carousel-previous" />
        </Carousel>
      )
      
      const prevButton = screen.getByTestId('carousel-previous')
      expect(prevButton).toBeInTheDocument()
      expect(prevButton.tagName).toBe('BUTTON')
    })

    it('has correct accessibility attributes', () => {
      render(
        <Carousel>
          <CarouselContent>
            <CarouselItem>Slide 1</CarouselItem>
          </CarouselContent>
          <CarouselPrevious data-testid="carousel-previous" />
        </Carousel>
      )
      
      const prevButton = screen.getByTestId('carousel-previous')
      expect(screen.getByText('Previous slide')).toBeInTheDocument()
      
      const srText = screen.getByText('Previous slide')
      expect(srText).toHaveClass('sr-only')
    })

    it('displays arrow left icon', () => {
      render(
        <Carousel>
          <CarouselContent>
            <CarouselItem>Slide 1</CarouselItem>
          </CarouselContent>
          <CarouselPrevious data-testid="carousel-previous" />
        </Carousel>
      )
      
      const prevButton = screen.getByTestId('carousel-previous')
      const icon = prevButton.querySelector('svg')
      expect(icon).toBeInTheDocument()
    })

    it('calls scrollPrev when clicked', () => {
      const mockScrollPrev = jest.fn()
      
      require('embla-carousel-react').default.mockReturnValue([
        React.createRef(),
        {
          canScrollPrev: () => true,
          canScrollNext: () => true,
          scrollPrev: mockScrollPrev,
          scrollNext: jest.fn(),
          on: jest.fn(),
          off: jest.fn(),
        }
      ])

      render(
        <Carousel>
          <CarouselContent>
            <CarouselItem>Slide 1</CarouselItem>
          </CarouselContent>
          <CarouselPrevious data-testid="carousel-previous" />
        </Carousel>
      )
      
      const prevButton = screen.getByTestId('carousel-previous')
      fireEvent.click(prevButton)
      
      expect(mockScrollPrev).toHaveBeenCalled()
    })

    it('is disabled when cannot scroll previous', () => {
      require('embla-carousel-react').default.mockReturnValue([
        React.createRef(),
        {
          canScrollPrev: () => false,
          canScrollNext: () => true,
          scrollPrev: jest.fn(),
          scrollNext: jest.fn(),
          on: jest.fn(),
          off: jest.fn(),
        }
      ])

      render(
        <Carousel>
          <CarouselContent>
            <CarouselItem>Slide 1</CarouselItem>
          </CarouselContent>
          <CarouselPrevious data-testid="carousel-previous" />
        </Carousel>
      )
      
      const prevButton = screen.getByTestId('carousel-previous')
      expect(prevButton).toBeDisabled()
    })

    it('positions correctly for horizontal orientation', () => {
      render(
        <Carousel>
          <CarouselContent>
            <CarouselItem>Slide 1</CarouselItem>
          </CarouselContent>
          <CarouselPrevious data-testid="carousel-previous" />
        </Carousel>
      )
      
      const prevButton = screen.getByTestId('carousel-previous')
      expect(prevButton).toHaveClass('absolute', '-left-12', 'top-1/2', '-translate-y-1/2')
    })

    it('positions correctly for vertical orientation', () => {
      render(
        <Carousel orientation="vertical">
          <CarouselContent>
            <CarouselItem>Slide 1</CarouselItem>
          </CarouselContent>
          <CarouselPrevious data-testid="carousel-previous" />
        </Carousel>
      )
      
      const prevButton = screen.getByTestId('carousel-previous')
      expect(prevButton).toHaveClass('-top-12', 'left-1/2', '-translate-x-1/2', 'rotate-90')
    })

    it('accepts custom className', () => {
      render(
        <Carousel>
          <CarouselContent>
            <CarouselItem>Slide 1</CarouselItem>
          </CarouselContent>
          <CarouselPrevious className="custom-prev" data-testid="carousel-previous" />
        </Carousel>
      )
      
      expect(screen.getByTestId('carousel-previous')).toHaveClass('custom-prev')
    })
  })

  describe('CarouselNext', () => {
    it('renders correctly', () => {
      render(
        <Carousel>
          <CarouselContent>
            <CarouselItem>Slide 1</CarouselItem>
          </CarouselContent>
          <CarouselNext data-testid="carousel-next" />
        </Carousel>
      )
      
      const nextButton = screen.getByTestId('carousel-next')
      expect(nextButton).toBeInTheDocument()
      expect(nextButton.tagName).toBe('BUTTON')
    })

    it('has correct accessibility attributes', () => {
      render(
        <Carousel>
          <CarouselContent>
            <CarouselItem>Slide 1</CarouselItem>
          </CarouselContent>
          <CarouselNext data-testid="carousel-next" />
        </Carousel>
      )
      
      const nextButton = screen.getByTestId('carousel-next')
      expect(screen.getByText('Next slide')).toBeInTheDocument()
      
      const srText = screen.getByText('Next slide')
      expect(srText).toHaveClass('sr-only')
    })

    it('displays arrow right icon', () => {
      render(
        <Carousel>
          <CarouselContent>
            <CarouselItem>Slide 1</CarouselItem>
          </CarouselContent>
          <CarouselNext data-testid="carousel-next" />
        </Carousel>
      )
      
      const nextButton = screen.getByTestId('carousel-next')
      const icon = nextButton.querySelector('svg')
      expect(icon).toBeInTheDocument()
    })

    it('calls scrollNext when clicked', () => {
      const mockScrollNext = jest.fn()
      
      require('embla-carousel-react').default.mockReturnValue([
        React.createRef(),
        {
          canScrollPrev: () => true,
          canScrollNext: () => true,
          scrollPrev: jest.fn(),
          scrollNext: mockScrollNext,
          on: jest.fn(),
          off: jest.fn(),
        }
      ])

      render(
        <Carousel>
          <CarouselContent>
            <CarouselItem>Slide 1</CarouselItem>
          </CarouselContent>
          <CarouselNext data-testid="carousel-next" />
        </Carousel>
      )
      
      const nextButton = screen.getByTestId('carousel-next')
      fireEvent.click(nextButton)
      
      expect(mockScrollNext).toHaveBeenCalled()
    })

    it('is disabled when cannot scroll next', () => {
      require('embla-carousel-react').default.mockReturnValue([
        React.createRef(),
        {
          canScrollPrev: () => true,
          canScrollNext: () => false,
          scrollPrev: jest.fn(),
          scrollNext: jest.fn(),
          on: jest.fn(),
          off: jest.fn(),
        }
      ])

      render(
        <Carousel>
          <CarouselContent>
            <CarouselItem>Slide 1</CarouselItem>
          </CarouselContent>
          <CarouselNext data-testid="carousel-next" />
        </Carousel>
      )
      
      const nextButton = screen.getByTestId('carousel-next')
      expect(nextButton).toBeDisabled()
    })

    it('positions correctly for horizontal orientation', () => {
      render(
        <Carousel>
          <CarouselContent>
            <CarouselItem>Slide 1</CarouselItem>
          </CarouselContent>
          <CarouselNext data-testid="carousel-next" />
        </Carousel>
      )
      
      const nextButton = screen.getByTestId('carousel-next')
      expect(nextButton).toHaveClass('absolute', '-right-12', 'top-1/2', '-translate-y-1/2')
    })

    it('positions correctly for vertical orientation', () => {
      render(
        <Carousel orientation="vertical">
          <CarouselContent>
            <CarouselItem>Slide 1</CarouselItem>
          </CarouselContent>
          <CarouselNext data-testid="carousel-next" />
        </Carousel>
      )
      
      const nextButton = screen.getByTestId('carousel-next')
      expect(nextButton).toHaveClass('-bottom-12', 'left-1/2', '-translate-x-1/2', 'rotate-90')
    })

    it('accepts custom className', () => {
      render(
        <Carousel>
          <CarouselContent>
            <CarouselItem>Slide 1</CarouselItem>
          </CarouselContent>
          <CarouselNext className="custom-next" data-testid="carousel-next" />
        </Carousel>
      )
      
      expect(screen.getByTestId('carousel-next')).toHaveClass('custom-next')
    })
  })

  describe('Complete Carousel', () => {
    it('renders complete carousel with all components', () => {
      render(
        <Carousel data-testid="complete-carousel">
          <CarouselContent>
            <CarouselItem>
              <div className="p-1">
                <div className="flex aspect-square items-center justify-center p-6">
                  <span className="text-4xl font-semibold">1</span>
                </div>
              </div>
            </CarouselItem>
            <CarouselItem>
              <div className="p-1">
                <div className="flex aspect-square items-center justify-center p-6">
                  <span className="text-4xl font-semibold">2</span>
                </div>
              </div>
            </CarouselItem>
            <CarouselItem>
              <div className="p-1">
                <div className="flex aspect-square items-center justify-center p-6">
                  <span className="text-4xl font-semibold">3</span>
                </div>
              </div>
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      )
      
      expect(screen.getByTestId('complete-carousel')).toBeInTheDocument()
      expect(screen.getByText('1')).toBeInTheDocument()
      expect(screen.getByText('2')).toBeInTheDocument()
      expect(screen.getByText('3')).toBeInTheDocument()
      expect(screen.getByText('Previous slide')).toBeInTheDocument()
      expect(screen.getByText('Next slide')).toBeInTheDocument()
    })

    it('maintains accessibility across all components', () => {
      render(
        <Carousel>
          <CarouselContent>
            <CarouselItem>Slide 1</CarouselItem>
            <CarouselItem>Slide 2</CarouselItem>
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      )
      
      // Check carousel container accessibility
      const carousel = screen.getAllByRole('button')[0].closest('section')
      expect(carousel).toHaveAttribute('aria-label', 'carousel')
      expect(carousel).toHaveAttribute('aria-roledescription', 'carousel')
      
      // Check navigation buttons
      const buttons = screen.getAllByRole('button')
      expect(buttons).toHaveLength(2)
      
      // Check screen reader text
      expect(screen.getByText('Previous slide')).toHaveClass('sr-only')
      expect(screen.getByText('Next slide')).toHaveClass('sr-only')
    })

    it('handles edge case with single slide', () => {
      require('embla-carousel-react').default.mockReturnValue([
        React.createRef(),
        {
          canScrollPrev: () => false,
          canScrollNext: () => false,
          scrollPrev: jest.fn(),
          scrollNext: jest.fn(),
          on: jest.fn(),
          off: jest.fn(),
        }
      ])

      render(
        <Carousel>
          <CarouselContent>
            <CarouselItem>Only Slide</CarouselItem>
          </CarouselContent>
          <CarouselPrevious data-testid="prev" />
          <CarouselNext data-testid="next" />
        </Carousel>
      )
      
      const prevButton = screen.getByTestId('prev')
      const nextButton = screen.getByTestId('next')
      
      expect(prevButton).toBeDisabled()
      expect(nextButton).toBeDisabled()
    })
  })
}) 