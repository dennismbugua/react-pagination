import React from 'react'

function makeDummyPosts(count = 24) {
  const sample = []
  const colors = [
    ['#667eea', '#764ba2'], ['#f093fb', '#f5576c'], ['#4facfe', '#00f2fe'],
    ['#43e97b', '#38f9d7'], ['#fa709a', '#fee140'], ['#30cfd0', '#330867'],
    ['#a8edea', '#fed6e3'], ['#ff9a9e', '#fecfef'], ['#ffecd2', '#fcb69f'],
    ['#ff6e7f', '#bfe9ff'], ['#e0c3fc', '#8ec5fc'], ['#fbc2eb', '#a6c1ee']
  ]
  
  for (let i = 1; i <= count; i++) {
    const tags = i % 2 === 0 ? ['ui', 'design'] : ['react', 'patterns']
    const [c1, c2] = colors[(i - 1) % colors.length]
    // Generate a beautiful gradient as a data URI - always works, no external deps
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="520" height="300"><defs><linearGradient id="g${i}" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:${c1}"/><stop offset="100%" style="stop-color:${c2}"/></linearGradient></defs><rect width="520" height="300" fill="url(#g${i})"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="white" font-size="48" font-weight="600" opacity="0.3">Post ${i}</text></svg>`
    const image = `data:image/svg+xml;base64,${btoa(svg)}`

    sample.push({
      id: i,
      title: `Exploring modern UI patterns — Post #${i}`,
      excerpt:
        'A concise summary that teases the content. This excerpt is intentionally a few lines long so you can see how text wraps in the card layout and how the pagination looks at the bottom of the page.',
      author: i % 3 === 0 ? 'A. Rivera' : i % 3 === 1 ? 'Dev Team' : 'S. Patel',
      date: new Date(Date.now() - i * 86400000).toLocaleDateString(),
      tags,
      image
    })
  }
  return sample
}

function Posts({ posts }) {
  const items = Array.isArray(posts) && posts.length ? posts : makeDummyPosts(28)

  return (
    <section className="posts-grid" aria-live="polite">
      {items.map((post, index) => (
        <article className="post-card" key={post.id ?? index} aria-labelledby={`post-${index}-title`}>
          <div
            className="post-media"
            role="img"
            aria-label={`${post.title} — ${post.tags ? post.tags.join(', ') : 'article image'}`}
          >
            <img
              src={post.image}
              alt=""
              loading="lazy"
            />
          </div>

          <div className="post-body">
            <h3 id={`post-${index}-title`} className="post-title">{post.title}</h3>
            <p className="post-excerpt">{post.excerpt}</p>

            <div className="post-meta">
              <div className="meta-left">
                <span className="meta-author">{post.author}</span>
                <span className="meta-sep">•</span>
                <time className="meta-date" dateTime={new Date().toISOString()}>{post.date}</time>
              </div>
              <div className="meta-right">
                {post.tags && post.tags.map((t) => (
                  <span key={t} className="tag">{t}</span>
                ))}
              </div>
            </div>
          </div>
        </article>
      ))}
    </section>
  )
}

export default Posts