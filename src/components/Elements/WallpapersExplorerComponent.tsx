import './WallpapersExplorerComponent.css'
import { useEffect, useState } from 'react'

interface WallpapersExplorerProps {
  folder: string
}

type WallpaperImage = {
  name: string
  url: string
}

function WallpapersExplorer() {
  const [wallpapers, setImages] = useState<WallpaperImage[]>([])

  useEffect(() => {
    const wallpaperModules = import.meta.glob(`/src/assets/wallpapers/*.{jpg,jpeg,png,webp}`, {
      eager: true,
      as: 'url',
    })

    const wallpapers: WallpaperImage[] = Object.entries(wallpaperModules).map(([path, url]) => ({
      name: path.split('/').pop() || '',
      url: url as string,
    }))

    setImages(wallpapers)
  }, [])

  return (
    <div className="border border-gray-500 py-3" style={{ backgroundColor: 'rgba(20, 20, 20)' }}>
      {wallpapers.map((img, index) => (
        <a key={img.name} href={img.url} download>
          <p
            className="border-b border-gray-500 px-4 file"
            style={
              {
                backgroundColor: index % 2 === 0 ? 'rgba(20, 20, 20)' : 'rgba(32, 32, 32)',
                '--url': `url("${img.url}")`,
              } as React.CSSProperties
            }
          >
            {img.url}
          </p>
        </a>
      ))}
    </div>
  )
}

export default WallpapersExplorer
