"use client"

import React, { useEffect, useMemo, useState } from "react"
import { useTrail, a } from "@react-spring/web"

function Trail({
  open,
  children,
}: {
  open: boolean
  children: React.ReactNode
}) {
  const items = React.Children.toArray(children)

  const trail = useTrail(items.length, {
    config: { mass: 5, tension: 2000, friction: 200 },
    opacity: open ? 1 : 0,
    x: open ? 0 : 20,
    height: open ? 80 : 0,
    from: { opacity: 0, x: 20, height: 0 },
  })

  return (
    <div>
      {trail.map(({ height, x, opacity }, index) => (
        <a.div
          key={index}
          className="
            relative
            w-full
            h-[80px]
            leading-[80px]
            text-black
            text-[6em]
            font-extrabold
            tracking-[-0.05em]
            will-change-transform
            overflow-hidden
          "
          style={{
            opacity,
            transform: x.to((v) => `translate3d(0,${v}px,0)`),
          }}
        >
          <a.div
            style={{ height }}
            className="pr-[0.05em] overflow-hidden"
          >
            {items[index]}
          </a.div>
        </a.div>
      ))}
    </div>
  )
}

export default function FutureTrail() {
  const [open, setOpen] = useState(true)

  const words = useMemo(
    () => ["The", "future", "is", "now"],
    []
  )

  useEffect(() => {
    const id = setInterval(() => {
      setOpen((v) => !v)
    }, 3500)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="flex h-full items-center justify-center">
      <Trail open={open}>
        {words.map((word) => (
          <span key={word}>{word}</span>
        ))}
      </Trail>
    </div>
  )
}
