import { useEffect, useState } from 'react'

interface TypewriterProps {
  words: string[]
  typingSpeed?: number
  deletingSpeed?: number
  pauseDuration?: number
  className?: string
}

export function Typewriter({
  words,
  typingSpeed = 90,
  deletingSpeed = 45,
  pauseDuration = 1800,
  className = '',
}: TypewriterProps) {
  const [wordIndex, setWordIndex] = useState(0)
  const [text, setText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const currentWord = words[wordIndex % words.length]

    let timeout: ReturnType<typeof setTimeout>

    if (isDeleting) {
      timeout = setTimeout(() => {
        setText((prev) => prev.slice(0, -1))
      }, deletingSpeed)
    } else {
      timeout = setTimeout(() => {
        setText((prev) => currentWord.slice(0, prev.length + 1))
      }, typingSpeed)
    }

    if (!isDeleting && text === currentWord) {
      timeout = setTimeout(() => setIsDeleting(true), pauseDuration)
    } else if (isDeleting && text === '') {
      setIsDeleting(false)
      setWordIndex((prev) => (prev + 1) % words.length)
    }

    return () => clearTimeout(timeout)
  }, [text, isDeleting, wordIndex, words, typingSpeed, deletingSpeed, pauseDuration])

  return (
    <span className={`typewriter-text ${className}`}>
      {text}
      <span className="typewriter-cursor" aria-hidden="true">
        |
      </span>
    </span>
  )
}
