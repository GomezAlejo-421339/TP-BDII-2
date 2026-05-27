import React, { useRef, useEffect, useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ForceGraph2D from 'react-force-graph-2d'

export interface GrafoNode {
  id: string | number
  type: 'noticia' | 'fuente' | 'tema' | 'usuario'
  scoreCredibilidad?: number
  nombre?: string
  titulo?: string
  val?: number
  color?: string
  label?: string
  x?: number
  y?: number
}

export interface GrafoLink {
  source: string | number | { id: string | number }
  target: string | number | { id: string | number }
}

export interface GrafoVisualizationProps {
  nodes?: GrafoNode[]
  links?: GrafoLink[]
}

const NODE_COLORS: Record<string, string | ((d: any) => string)> = {
  noticia: (d: any) => d.scoreCredibilidad < 0.3 ? '#ef4444' : d.scoreCredibilidad < 0.6 ? '#eab308' : '#22c55e',
  fuente: '#8b5cf6',
  tema: '#06b6d4',
  usuario: '#3b82f6',
}

const NODE_LABELS: Record<string, string> = {
  noticia: 'titulo',
  fuente: 'nombre',
  tema: 'nombre',
  usuario: 'nombre',
}

function truncate(str?: string, len = 30): string {
  if (!str) return ''
  return str.length > len ? str.slice(0, len) + '…' : str
}

function useContainerWidth(ref: React.RefObject<HTMLDivElement | null>): number {
  const [width, setWidth] = useState(700)
  useEffect(() => {
    if (!ref.current) return
    const resizeObserver = new ResizeObserver(entries => {
      for (const entry of entries) {
        setWidth(entry.contentRect.width)
      }
    })
    resizeObserver.observe(ref.current)
    return () => resizeObserver.disconnect()
  }, [ref])
  return width
}

export default function GrafoVisualization({ nodes, links }: GrafoVisualizationProps) {
  const fgRef = useRef<any>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const containerWidth = useContainerWidth(containerRef)
  const navigate = useNavigate()

  useEffect(() => {
    if (fgRef.current) {
      fgRef.current.d3Force('charge').strength(-250)
      fgRef.current.d3Force('link').distance((d: any) => {
        if (d.source.type === 'noticia' && d.target.type === 'fuente') return 60
        if (d.source.type === 'noticia' && d.target.type === 'tema') return 60
        return 80
      })
    }
  }, [nodes, links])

  const handleNodeClick = useCallback((node: any) => {
    if (node.type === 'noticia') {
      navigate(`/noticia/${node.id}`)
    }
  }, [navigate])

  if (!nodes?.length) {
    return (
      <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-card text-center text-sm text-gray-400">
        Cargá noticias para ver el grafo
      </div>
    )
  }

  const graphData = {
    nodes: nodes.map(n => {
      const colorVal = NODE_COLORS[n.type]
      return {
        ...n,
        id: n.id,
        color: typeof colorVal === 'function' ? colorVal(n) : (colorVal || '#6b7280'),
        label: truncate((n as any)[NODE_LABELS[n.type]] || n.id, 25),
        val: n.type === 'noticia' ? (n.scoreCredibilidad != null ? 2 + n.scoreCredibilidad * 4 : 2) : 3,
      }
    }),
    links: (links || []).map(l => ({
      source: typeof l.source === 'object' ? l.source.id : l.source,
      target: typeof l.target === 'object' ? l.target.id : l.target,
    })),
  }

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-card" ref={containerRef}>
      <ForceGraph2D
        ref={fgRef}
        graphData={graphData}
        width={containerWidth}
        height={480}
        backgroundColor="#f8fafc"
        nodeLabel={(node: any) => {
          const lines = [`${node[NODE_LABELS[node.type]] || node.id}`]
          if (node.type === 'noticia' && node.scoreCredibilidad != null) {
            lines.push(`Credibilidad: ${(node.scoreCredibilidad * 100).toFixed(0)}%`)
          }
          if (node.type === 'fuente' && node.nombre) lines.push(`Fuente: ${node.nombre}`)
          return lines.join('\n')
        }}
        nodeColor={(node: any) => node.color}
        nodeVal={(node: any) => node.val}
        nodeRelSize={6}
        linkColor={() => '#cbd5e1'}
        linkWidth={1.2}
        linkDirectionalArrowLength={5}
        linkDirectionalArrowRelPos={1}
        linkDirectionalParticles={1}
        linkDirectionalParticleWidth={1.5}
        linkDirectionalParticleSpeed={0.003}
        onNodeClick={handleNodeClick}
        onNodeHover={(node: any) => {
          if (fgRef.current) {
            fgRef.current.container().style.cursor = node ? 'pointer' : 'default'
          }
        }}
        nodeCanvasObject={(node: any, ctx: CanvasRenderingContext2D, globalScale: number) => {
          const label = node.label
          const fontSize = Math.max(8, 10 / globalScale)
          ctx.font = `${fontSize}px Inter, sans-serif`

          const r = Math.sqrt(node.val) * 3

          ctx.beginPath()
          ctx.arc(node.x, node.y, r, 0, 2 * Math.PI)
          ctx.fillStyle = node.color
          ctx.fill()
          ctx.strokeStyle = '#ffffff'
          ctx.lineWidth = 1.5
          ctx.stroke()

          if (globalScale > 0.7) {
            const textWidth = ctx.measureText(label).width
            const bgWidth = textWidth + 8
            const bgHeight = fontSize + 4

            ctx.fillStyle = 'rgba(255, 255, 255, 0.9)'
            ctx.beginPath()
            if (typeof (ctx as any).roundRect === 'function') {
              (ctx as any).roundRect(node.x - bgWidth / 2, node.y + r + 3, bgWidth, bgHeight, 3)
            } else {
              ctx.rect(node.x - bgWidth / 2, node.y + r + 3, bgWidth, bgHeight)
            }
            ctx.fill()

            ctx.fillStyle = '#374151'
            ctx.textAlign = 'center'
            ctx.textBaseline = 'middle'
            ctx.fillText(label, node.x, node.y + r + 3 + bgHeight / 2)
          }
        }}
      />
      <div className="flex flex-wrap gap-3 mt-3 text-xs text-gray-500 justify-center">
        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-red-500" /> Crítica</span>
        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-yellow-500" /> Dudosa</span>
        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-green-500" /> Confiable</span>
        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-blue-500" /> Usuario</span>
        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-purple-500" /> Fuente</span>
        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-cyan-500" /> Tema</span>
      </div>
    </div>
  )
}
