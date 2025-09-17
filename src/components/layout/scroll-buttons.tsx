'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { ChevronUp, ChevronDown } from 'lucide-react'

const ScrollButtons = () => {
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [showScrollBottom, setShowScrollBottom] = useState(true)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight

      setShowScrollTop(scrollTop > 300)
      setShowScrollBottom(scrollTop + windowHeight < documentHeight - 300)
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Initial check

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth'
    })
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col space-y-2">
      {showScrollTop && (
        <Button
          onClick={scrollToTop}
          size="icon"
          className="shadow-lg hover:shadow-xl transition-all duration-300"
          aria-label="Scroll to top"
        >
          <ChevronUp className="h-4 w-4" />
        </Button>
      )}
      
      {showScrollBottom && (
        <Button
          onClick={scrollToBottom}
          size="icon"
          variant="outline"
          className="shadow-lg hover:shadow-xl transition-all duration-300"
          aria-label="Scroll to bottom"
        >
          <ChevronDown className="h-4 w-4" />
        </Button>
      )}
    </div>
  )
}

export default ScrollButtons