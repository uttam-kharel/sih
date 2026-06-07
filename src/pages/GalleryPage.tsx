import { useState, useMemo, useCallback, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { useSiteData } from '@contexts/SiteContext'
import { SvgIcon } from '@utils/icon'
import { Chip } from '@components/UI'
import { clsx } from '@utils/helpers'

export function GalleryPage() {
  const { gallery } = useSiteData()
  const [activeCat, setActiveCat] = useState('All')
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [curIndex, setCurIndex] = useState(0)

  const categories = useMemo(() => {
    const set = new Set(gallery.map((g) => g.category))
    return ['All', ...Array.from(set)]
  }, [gallery])

  const filtered = useMemo(() => {
    return gallery.filter((g) => activeCat === 'All' || g.category === activeCat)
  }, [gallery, activeCat])

  const openLightbox = useCallback((i: number) => {
    setCurIndex(i)
    setLightboxOpen(true)
    document.body.style.overflow = 'hidden'
  }, [])

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false)
    document.body.style.overflow = ''
  }, [])

  const navigate = useCallback((dir: number) => {
    setCurIndex((prev) => (prev + dir + filtered.length) % filtered.length)
  }, [filtered.length])

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (!lightboxOpen) return
      if (e.key === 'Escape') closeLightbox()
      if (e.key === 'ArrowLeft') navigate(-1)
      if (e.key === 'ArrowRight') navigate(1)
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [lightboxOpen, closeLightbox, navigate])

  const currentItem = filtered[curIndex]

  return (
    <>
      <Helmet>
        <title>Gallery — Shubham International</title>
        <meta name="description" content="A look inside our facilities, technology, and the compassionate care we provide." />
      </Helmet>

      <section className="py-[clamp(48px,7vw,88px)]">
        <div className="container-wide">
          <p className="font-body font-bold text-[.8rem] tracking-[.18em] uppercase text-teal-600 mb-4">Inside Shubham</p>
          <h1 className="text-[clamp(2.2rem,5.5vw,4rem)] leading-[1.04]">A look inside our world of care.</h1>
          <p className="text-slate-500 max-w-[52ch] text-[1.08rem] mt-5">From state-of-the-art facilities and advanced technology to the compassionate teams who make it all work — explore the spaces where healing happens.</p>
        </div>
      </section>

      <section className="pb-[clamp(40px,6vw,72px)]" style={{ paddingTop: 0 }}>
        <div className="container-wide">
          <div className="flex gap-2.5 flex-wrap mb-9">
            {categories.map((cat) => (
              <button
                key={cat}
                className={clsx(
                  'text-[.88rem] font-semibold py-[.55em] px-[1.1em] rounded-pill border transition-all duration-150',
                  cat === activeCat
                    ? 'bg-navy-900 border-navy-900 text-white'
                    : 'bg-white border-border text-slate-600 hover:border-teal-500 hover:text-teal-600',
                )}
                onClick={() => setActiveCat(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[18px]">
            {filtered.length === 0 ? (
              <div className="col-span-full text-center py-[60px] text-slate-500">
                <div className="w-[52px] h-[52px] rounded-[14px] grid place-items-center bg-cyan-100 text-teal-600 mx-auto mb-4">
                  <SvgIcon name="image" className="[&_svg]:w-6 [&_svg]:h-6" />
                </div>
                <h3 className="text-ink mb-1.5">Nothing here yet</h3>
                <p>Images for this category will appear soon.</p>
              </div>
            ) : (
              filtered.map((item, idx) => (
                <figure
                  key={item.id}
                  className={clsx(
                    'relative rounded-lg overflow-hidden cursor-pointer aspect-[4/3] bg-bg-alt group',
                    idx === 3 && 'aspect-[4/5]',
                  )}
                  tabIndex={0}
                  role="button"
                  aria-label={`View ${item.caption}`}
                  onClick={() => openLightbox(idx)}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openLightbox(idx) } }}
                >
                  {item.image ? (
                    <img src={item.image} alt={item.caption} loading="lazy" className="w-full h-full object-cover transition-transform duration-400 group-hover:scale-106" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-400 font-semibold">
                      <SvgIcon name="image" className="[&_svg]:w-16 [&_svg]:h-16" />
                    </div>
                  )}
                  <figcaption className="absolute inset-x-0 bottom-0 p-3 sm:p-[18px] bg-gradient-to-t from-navy-900/85 to-transparent text-white flex flex-col gap-2 items-start opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 translate-y-2 group-hover:translate-y-0 group-focus-visible:translate-y-0 transition-all duration-250 font-semibold">
                    <Chip>{item.category}</Chip>
                    <span>{item.caption}</span>
                  </figcaption>
                </figure>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxOpen && currentItem && (
        <div
          className="fixed inset-0 z-200 bg-[rgba(8,28,40,.92)] backdrop-blur flex items-center justify-center p-3 sm:p-6 animate-[toastIn_0.25s_ease]"
          onClick={(e) => { if (e.target === e.currentTarget) closeLightbox() }}
          aria-modal="true"
          role="dialog"
        >
          <button
            className="absolute top-5 right-5 w-[46px] h-[46px] rounded-full bg-white/12 text-white grid place-items-center hover:bg-white/24 transition-colors"
            onClick={closeLightbox}
            aria-label="Close"
          >
            <SvgIcon name="close" className="[&_svg]:w-[22px] [&_svg]:h-[22px]" />
          </button>

          <button
            className="absolute top-1/2 -translate-y-1/2 left-5 w-[52px] h-[52px] rounded-full bg-white/12 text-white grid place-items-center hover:bg-white/24 transition-colors"
            onClick={() => navigate(-1)}
            aria-label="Previous"
          >
            <span className="rotate-180"><SvgIcon name="arrow" className="[&_svg]:w-6 [&_svg]:h-6" /></span>
          </button>

          <button
            className="absolute top-1/2 -translate-y-1/2 right-5 w-[52px] h-[52px] rounded-full bg-white/12 text-white grid place-items-center hover:bg-white/24 transition-colors"
            onClick={() => navigate(1)}
            aria-label="Next"
          >
            <SvgIcon name="arrow" className="[&_svg]:w-6 [&_svg]:h-6" />
          </button>

          <div className="max-w-[980px] w-full">
            {currentItem.image ? (
              <img src={currentItem.image} alt={currentItem.caption} className="w-full max-h-[76vh] object-contain rounded-md" />
            ) : (
              <div className="w-full aspect-video bg-bg-alt/30 rounded-md flex items-center justify-center text-white/50 font-semibold">
                <SvgIcon name="image" className="[&_svg]:w-20 [&_svg]:h-20" />
              </div>
            )}
            <div className="text-white mt-4 flex items-center gap-3.5">
              <span className="inline-flex items-center gap-[.4em] text-[.72rem] font-bold tracking-[.04em] px-[.8em] py-[.38em] rounded-pill uppercase" style={{ background: 'rgba(255,255,255,.15)', color: '#fff' }}>{currentItem.category}</span>
              <span>{currentItem.caption}</span>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
