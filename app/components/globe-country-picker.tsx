'use client'

import React, { useEffect, useMemo, useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'
import { countries as appCountries } from '@/app/data/countries'

// react-globe.gl must be dynamically imported on the client
const Globe = dynamic(() => import('react-globe.gl'), { ssr: false })

type CountryCode =
  | 'japan'
  | 'south-korea'
  | 'china'
  | 'mexico'
  | 'france'
  | 'vietnam'
  | 'canada'
  | 'us'

type GlobeCountry = {
  code: CountryCode
  name: string
  lat: number
  lng: number
}

const countryCoordinates: Record<CountryCode, { lat: number; lng: number }> = {
  japan: { lat: 36.2048, lng: 138.2529 }, // Japan center
  'south-korea': { lat: 36.5, lng: 127.8 }, // near center
  china: { lat: 35.8617, lng: 104.1954 }, // center
  mexico: { lat: 23.6345, lng: -102.5528 }, // center
  france: { lat: 46.2276, lng: 2.2137 }, // center
  vietnam: { lat: 14.0583, lng: 108.2772 }, // center
  canada: { lat: 56.1304, lng: -106.3468 }, // center
  us: { lat: 39.8283, lng: -98.5795 }, // approx center of contiguous US
}

function useElementSize<T extends HTMLElement>() {
  const ref = useRef<T | null>(null)
  const [size, setSize] = useState({ width: 0, height: 0 })
  useEffect(() => {
    if (!ref.current) return
    const el = ref.current
    const observer = new ResizeObserver(entries => {
      for (const entry of entries) {
        const cr = entry.contentRect
        setSize({ width: Math.round(cr.width), height: Math.round(cr.height) })
      }
    })
    observer.observe(el)
    setSize({ width: el.clientWidth, height: el.clientHeight })
    return () => observer.disconnect()
  }, [])
  return { ref, size }
}

export default function GlobeCountryPicker({
  className,
  initialPointOfView = { lat: 20, lng: 20, altitude: 2.1 },
  autoRotate = true,
}: {
  className?: string
  initialPointOfView?: { lat: number; lng: number; altitude?: number }
  autoRotate?: boolean
}) {
  const router = useRouter()
  const { ref, size } = useElementSize<HTMLDivElement>()
  const globeRef = useRef<any>(null)

  // Merge app country names with coordinates
  const labelData = useMemo<GlobeCountry[]>(() => {
    const namesByCode = Object.fromEntries(appCountries.map(c => [c.code, c.name]))
    const codes = Object.keys(countryCoordinates) as CountryCode[]
    return codes.map(code => ({
      code,
      name: (namesByCode[code] as string) || code,
      lat: countryCoordinates[code].lat,
      lng: countryCoordinates[code].lng,
    }))
  }, [])

  useEffect(() => {
    const globe = globeRef.current
    if (!globe) return

    // Set initial camera view
    globe.pointOfView(initialPointOfView, 1000)

    // Configure controls
    const controls = globe.controls()
    controls.enableDamping = true
    controls.dampingFactor = 0.05
    controls.rotateSpeed = 0.6
    controls.zoomSpeed = 0.5
    controls.minDistance = 150
    controls.maxDistance = 800

    // Auto rotate until user interacts
    controls.autoRotate = autoRotate
    controls.autoRotateSpeed = 0.6

    const stopAutoOnUser = () => {
      controls.autoRotate = false
    }
    controls.addEventListener?.('start', stopAutoOnUser)
    return () => {
      controls.removeEventListener?.('start', stopAutoOnUser)
    }
  }, [initialPointOfView, autoRotate])

  // Improve pointer cursor on label hover
  useEffect(() => {
    const canvasContainer = globeRef.current?.container()
    if (!canvasContainer) return
    const onMove = (ev: MouseEvent) => {
      // A bit of heuristic: react-globe.gl calls hover handlers; we also set CSS when hovering labels
      // We'll rely on onLabelHover to set style; this is a fallback noop here.
      return
    }
    canvasContainer.addEventListener('mousemove', onMove)
    return () => canvasContainer.removeEventListener('mousemove', onMove)
  }, [])

  const handleLabelClick = (d: GlobeCountry) => {
    router.push(`/country/${d.code}/category/all`)
  }

  const handleLabelHover = (d?: GlobeCountry) => {
    const canvasEl: HTMLElement | null = globeRef.current?.container() ?? null
    if (!canvasEl) return
    canvasEl.style.cursor = d ? 'pointer' : 'grab'
  }

  return (
    <div className={cn('w-full', className)}>
      <div
        ref={ref}
        className="relative w-full h-[360px] sm:h-[440px] md:h-[560px] rounded-xl overflow-hidden bg-[#1f2023]"
        aria-label="Interactive world globe to select a country"
      >
        {size.width > 0 && size.height > 0 && (
          <Globe
            ref={globeRef}
            width={size.width}
            height={size.height}
            backgroundImageUrl="/images/night-sky.png"
            globeImageUrl="/images/earth-blue-marble.png"
            showAtmosphere
            atmosphereAltitude={0.18}
            atmosphereColor="#7dd3fc"
            hexPolygonsData={[]}
            labelsData={labelData}
            labelText={(d: GlobeCountry) => d.name}
            labelLat={(d: GlobeCountry) => d.lat}
            labelLng={(d: GlobeCountry) => d.lng}
            labelSize={1.2}
            labelDotRadius={0.7}
            labelAltitude={0.01}
            labelColor={() => '#e2b714'}
            onLabelClick={(d: GlobeCountry) => handleLabelClick(d)}
            onLabelHover={(d: GlobeCountry | undefined) => handleLabelHover(d)}
          />
        )}

        {/* SR-only list for accessibility and as a fallback */}
        <ul className="sr-only">
          {labelData.map(c => (
            <li key={c.code}>
              <a href={`/country/${c.code}/category/all`}>{c.name}</a>
            </li>
          ))}
        </ul>

        {/* Subtle legend overlay */}
        <div className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 bg-black/40 text-white text-xs px-3 py-1.5 rounded-full">
          {'Drag to rotate • Scroll to zoom • Click a label to open'}
        </div>
      </div>
    </div>
  )
}
