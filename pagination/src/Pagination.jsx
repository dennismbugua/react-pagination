import React, { useState, useEffect, useRef } from 'react';

function Pagination({ pages = 10, setCurrentPage }) {
  // Build pages array once per render
  const numberOfPages = Array.from({ length: pages }, (_, i) => i + 1)

  const [currentButton, setCurrentButton] = useState(1)
  const [arrOfCurrButtons, setArrOfCurrButtons] = useState([])
  const navRef = useRef(null)

  // Compute the visible pagination items (numbers and ellipses)
  useEffect(() => {
    const total = numberOfPages.length
    const current = currentButton
    let temp = []

    if (total <= 7) {
      temp = numberOfPages
    } else if (current <= 4) {
      temp = [1, 2, 3, 4, 5, '...', total]
    } else if (current >= total - 3) {
      temp = [1, '...', total - 4, total - 3, total - 2, total - 1, total]
    } else {
      temp = [1, '...', current - 1, current, current + 1, '...', total]
    }

    setArrOfCurrButtons(temp)
    // notify parent about the page change
    if (typeof setCurrentPage === 'function') setCurrentPage(current)
  }, [currentButton, pages])

  // Reset when pages count changes
  useEffect(() => {
    setCurrentButton(1)
  }, [pages])

  // Keyboard navigation (Left/Right/Home/End)
  useEffect(() => {
    const el = navRef.current
    if (!el) return

    const onKey = (e) => {
      if (e.key === 'ArrowLeft') {
        setCurrentButton((p) => Math.max(1, p - 1))
      } else if (e.key === 'ArrowRight') {
        setCurrentButton((p) => Math.min(numberOfPages.length, p + 1))
      } else if (e.key === 'Home') {
        setCurrentButton(1)
      } else if (e.key === 'End') {
        setCurrentButton(numberOfPages.length)
      }
    }

    el.addEventListener('keydown', onKey)
    return () => el.removeEventListener('keydown', onKey)
  }, [numberOfPages.length])

  const goPrev = () => setCurrentButton((p) => Math.max(1, p - 1))
  const goNext = () => setCurrentButton((p) => Math.min(numberOfPages.length, p + 1))

  return (
    <nav
      className="pagination"
      aria-label="Pagination Navigation"
      ref={navRef}
      tabIndex={0} // allow keyboard focus for arrow navigation
    >
      <ul className="pagination-list" role="list">
        <li>
          <button
            type="button"
            className={`page-btn prev ${currentButton === 1 ? 'is-disabled' : ''}`}
            onClick={goPrev}
            disabled={currentButton === 1}
            aria-label="Previous page"
          >
            <span aria-hidden>
              {/* left caret */}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </button>
        </li>

        {arrOfCurrButtons.map((item, idx) => (
          <li key={String(item) + idx}>
            {typeof item === 'number' ? (
              <button
                type="button"
                className={`page-btn page-number ${currentButton === item ? 'is-active' : ''}`}
                onClick={() => setCurrentButton(item)}
                aria-current={currentButton === item ? 'page' : undefined}
                aria-label={currentButton === item ? `Page ${item}, current page` : `Go to page ${item}`}
              >
                {item}
              </button>
            ) : (
              <span className="page-ellipsis" aria-hidden="true">&hellip;</span>
            )}
          </li>
        ))}

        <li>
          <button
            type="button"
            className={`page-btn next ${currentButton === numberOfPages.length ? 'is-disabled' : ''}`}
            onClick={goNext}
            disabled={currentButton === numberOfPages.length}
            aria-label="Next page"
          >
            <span aria-hidden>
              {/* right caret */}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 6L15 12L9 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </button>
        </li>
      </ul>
    </nav>
  )
}

export default Pagination