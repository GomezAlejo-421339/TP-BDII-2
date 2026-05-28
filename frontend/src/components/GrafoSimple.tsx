import React, { useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import * as d3 from 'd3'
import type { Noticia } from '../types/Noticia'

interface Props {
  noticias: Noticia[]
}

interface SimNode extends d3.SimulationNodeDatum {
  id: string
  tipo: 'noticia' | 'fuente' | 'tema'
  label: string
  scoreCredibilidad?: number
}

interface SimLink extends d3.SimulationLinkDatum<SimNode> {
  source: string | SimNode
  target: string | SimNode
}

const ANCHO = 550
const ALTO = 400
const COLOR_TIPO: Record<string, (n: SimNode) => string> = {
  noticia: (n) => {
    const s = n.scoreCredibilidad ?? 0.5
    return s < 0.3 ? '#ef4444' : s < 0.6 ? '#eab308' : '#22c55e'
  },
  fuente: () => '#8b5cf6',
  tema: () => '#06b6d4',
}

export default function GrafoSimple({ noticias }: Props) {
  const svgRef = useRef<SVGSVGElement | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const tooltipRef = useRef<HTMLDivElement | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (!noticias.length || !svgRef.current) return

    const svg = d3.select(svgRef.current)
    svg.selectAll('*').remove()
    svg.style('cursor', 'grab')

    const nodes: SimNode[] = []
    const links: SimLink[] = []
    const fuentesSet = new Set<string>()
    const temasSet = new Set<string>()

    for (const n of noticias) {
      const nid = `n-${n.id}`
      nodes.push({ id: nid, tipo: 'noticia', label: n.titulo, scoreCredibilidad: n.scoreCredibilidad })
      if (n.nombreFuente && !fuentesSet.has(n.nombreFuente)) {
        fuentesSet.add(n.nombreFuente)
        nodes.push({ id: `f-${n.nombreFuente}`, tipo: 'fuente', label: n.nombreFuente })
      }
      if (n.nombreFuente) links.push({ source: nid, target: `f-${n.nombreFuente}` })
      if (n.tema && !temasSet.has(n.tema)) {
        temasSet.add(n.tema)
        nodes.push({ id: `t-${n.tema}`, tipo: 'tema', label: n.tema })
      }
      if (n.tema) links.push({ source: nid, target: `t-${n.tema}` })
    }

    const simulation = d3.forceSimulation<SimNode>(nodes)
      .force('link', d3.forceLink<SimNode, SimLink>(links).id(d => d.id).distance(100))
      .force('charge', d3.forceManyBody().strength(-300))
      .force('center', d3.forceCenter(ANCHO / 2, ALTO / 2))
      .stop()

    for (let i = 0; i < 120; i++) simulation.tick()

    const zoomContainer = svg.append('g').attr('class', 'zoom-container')

    zoomContainer.append('g')
      .selectAll('line')
      .data(links)
      .enter().append('line')
      .attr('stroke', '#cbd5e1')
      .attr('stroke-width', 1.5)
      .attr('x1', d => (d.source as SimNode).x!)
      .attr('y1', d => (d.source as SimNode).y!)
      .attr('x2', d => (d.target as SimNode).x!)
      .attr('y2', d => (d.target as SimNode).y!)

    const nodeGroup = zoomContainer.append('g')
    const nodeEnter = nodeGroup.selectAll('g')
      .data(nodes)
      .enter().append('g')
      .attr('transform', d => `translate(${d.x!},${d.y!})`)
      .style('cursor', d => d.tipo === 'noticia' ? 'pointer' : 'default')

    nodeEnter.each(function (d) {
      const el = d3.select(this)
      const color = COLOR_TIPO[d.tipo](d)

      if (d.tipo === 'noticia') {
        el.append('circle').attr('r', 8).attr('fill', color).attr('stroke', '#fff').attr('stroke-width', 2)
      } else if (d.tipo === 'fuente') {
        el.append('rect').attr('x', -7).attr('y', -7).attr('width', 14).attr('height', 14).attr('rx', 3).attr('fill', color).attr('stroke', '#fff').attr('stroke-width', 2)
      } else {
        el.append('polygon').attr('points', '0,-9 8,6 -8,6').attr('fill', color).attr('stroke', '#fff').attr('stroke-width', 2)
      }

      el.append('text')
        .attr('class', 'node-label')
        .attr('x', 12)
        .attr('y', 4)
        .attr('font-size', '11px')
        .attr('fill', '#374151')
        .attr('font-family', 'Inter, sans-serif')
        .text(d.label.length > 28 ? d.label.slice(0, 28) + '...' : d.label)
    })

    nodeEnter.on('mouseenter', function (event: MouseEvent, d) {
      d3.select(this).select('circle, rect, polygon').attr('stroke', '#1e293b').attr('stroke-width', 3)
      const tip = d3.select(tooltipRef.current)
      if (tip.empty()) return
      tip.style('display', 'block')
        .style('left', `${event.clientX + 12}px`)
        .style('top', `${event.clientY - 35}px`)
        .html(`<strong>${d.label}</strong>` + (d.tipo === 'noticia' && d.scoreCredibilidad != null ? `<br/>Credibilidad: ${(d.scoreCredibilidad * 100).toFixed(0)}%` : ''))
    })
    nodeEnter.on('mouseleave', function () {
      d3.select(this).select('circle, rect, polygon').attr('stroke', '#fff').attr('stroke-width', 2)
      d3.select(tooltipRef.current).style('display', 'none')
    })
    nodeEnter.on('click', function (_event: MouseEvent, d) {
      if (d.tipo === 'noticia') {
        const id = d.id.replace('n-', '')
        navigate(`/noticia/${id}`)
      }
    })

    const zoom = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.2, 4])
      .on('start', () => svg.style('cursor', 'grabbing'))
      .on('end', () => svg.style('cursor', 'grab'))
      .on('zoom', (event) => {
        zoomContainer.attr('transform', event.transform.toString())
        zoomContainer.selectAll<SVGTextElement, SimNode>('.node-label')
          .style('display', event.transform.k < 0.45 ? 'none' : 'block')
          .attr('font-size', `${Math.max(7, Math.min(14, 11 / event.transform.k))}px`)
      })

    svg.call(zoom)

    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect()
      if (rect.width > 0) {
        svg.attr('viewBox', `0 0 ${rect.width} ${ALTO}`)
      }
    }

  }, [noticias, navigate])

  function handleZoomIn() {
    if (!svgRef.current) return
    const svg = d3.select(svgRef.current)
    svg.transition().duration(300).call(d3.zoom<SVGSVGElement, unknown>().scaleBy, 1.4)
  }

  function handleZoomOut() {
    if (!svgRef.current) return
    const svg = d3.select(svgRef.current)
    svg.transition().duration(300).call(d3.zoom<SVGSVGElement, unknown>().scaleBy, 0.7)
  }

  function handleReset() {
    if (!svgRef.current) return
    const svg = d3.select(svgRef.current)
    svg.transition().duration(400).call(
      d3.zoom<SVGSVGElement, unknown>().transform,
      d3.zoomIdentity,
    )
  }

  if (!noticias.length) {
    return (
      <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-card text-center text-sm text-gray-400">
        Sin noticias para mostrar
      </div>
    )
  }

  return (
    <div ref={containerRef} className="bg-white border border-gray-200 rounded-xl p-4 shadow-card relative overflow-hidden">
      <svg ref={svgRef} width="100%" height={ALTO} viewBox={`0 0 ${ANCHO} ${ALTO}`} />
      <div ref={tooltipRef} className="fixed pointer-events-none hidden bg-gray-900 text-white text-xs rounded-lg px-3 py-2 shadow-lg z-50" />
      <div className="absolute top-3 right-3 flex gap-1.5">
        <button onClick={handleZoomIn} title="Acercar" className="w-7 h-7 flex items-center justify-center rounded-md bg-white border border-gray-300 text-gray-600 hover:bg-gray-100 text-sm font-bold leading-none cursor-pointer shadow-sm">+</button>
        <button onClick={handleZoomOut} title="Alejar" className="w-7 h-7 flex items-center justify-center rounded-md bg-white border border-gray-300 text-gray-600 hover:bg-gray-100 text-sm font-bold leading-none cursor-pointer shadow-sm">-</button>
        <button onClick={handleReset} title="Restablecer" className="w-7 h-7 flex items-center justify-center rounded-md bg-white border border-gray-300 text-gray-600 hover:bg-gray-100 text-xs leading-none cursor-pointer shadow-sm">&orarr;</button>
      </div>
      <div className="flex flex-wrap gap-3 mt-2 text-xs text-gray-500 justify-center">
        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-red-500" /> Critica</span>
        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-yellow-500" /> Dudosa</span>
        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-green-500" /> Confiable</span>
        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-purple-500" /> Fuente</span>
        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-cyan-500" /> Tema</span>
      </div>
    </div>
  )
}
