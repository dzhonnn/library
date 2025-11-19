import './WallpapersExplorerComponent.css'
import { useEffect, useState, useRef } from 'react'
import gsap from 'gsap'
import ScrambleTextPlugin from 'gsap/ScrambleTextPlugin'

gsap.registerPlugin(ScrambleTextPlugin)

type WallpaperImage = {
  name: string
  url: string
}

function WallpapersExplorer() {
  const [wallpapers, setImages] = useState<WallpaperImage[]>([])
  const refs = useRef<{ [key: string]: HTMLElement | null }>({})

  useEffect(() => {
    const wallpaperModules = import.meta.glob(`/src/assets/wallpapers/*.{jpg,jpeg,png,webp}`, {
      eager: true,
      query: 'url',
      import: 'default',
    })

    const wallpapers: WallpaperImage[] = Object.entries(wallpaperModules).map(([path, url]) => ({
      name: path.split('/').pop() || '',
      url: url as string,
    }))

    setImages(wallpapers)
  }, [])

  const handleMouseEnter = (name: string) => {
    const el = refs.current[name]
    if (!el) return

    gsap.to(el, {
      scrambleText: {
        text: '{original}',
      },
      color: 'rgba(60, 160, 80)',
      duration: 1,
    })
  }

  const handleMouseLeave = (name: string) => {
    const el = refs.current[name]
    if (!el) return

    gsap.killTweensOf(el)

    if (!el.dataset.original) return

    gsap.to(el, {
      scrambleText: {
        text: el.dataset.original,
        rightToLeft: true,
      },
      color: 'white',
      duration: 1,
    })
  }

  return (
    <div className="border border-gray-500 py-3" style={{ backgroundColor: 'rgba(20, 20, 20)' }}>
      {wallpapers.map((img, index) => (
        <a key={img.name} href={img.url} download>
          <p
            ref={(el) => (refs.current[img.name] = el)}
            data-original={img.url}
            className="border-b border-gray-500 px-4 file"
            style={
              {
                backgroundColor: index % 2 === 0 ? 'rgba(20, 20, 20)' : 'rgba(32, 32, 32)',
                '--url': `url("${img.url}")`,
              } as React.CSSProperties
            }
            onMouseEnter={() => handleMouseEnter(img.name)}
            onMouseLeave={() => handleMouseLeave(img.name)}
          >
            {img.url}
          </p>
        </a>
      ))}
    </div>
  )
}

export default WallpapersExplorer
