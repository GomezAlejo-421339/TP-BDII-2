import { useRef, useEffect } from 'react'
import * as d3 from 'd3'

export default function CredibilidadChart({ noticias }) {
  const svgRef = useRef(null)
  const tooltipRef = useRef(null)

  useEffect(() => {
    if (!noticias.length) return

    const width = 450
    const height = 250
    const margin = { top: 20, right: 30, bottom: 35, left: 45 }

    const scores = noticias.map(n => n.scoreCredibilidad ?? 0.5)
    const bins = d3.bin().domain([0, 1]).thresholds(10)(scores)

    const svg = d3.select(svgRef.current)
    svg.selectAll('*').remove()

    const x = d3.scaleLinear().domain([0, 1]).range([margin.left, width - margin.right])
    const y = d3.scaleLinear()
      .domain([0, d3.max(bins, d => d.length) || 1])
      .nice()
      .range([height - margin.bottom, margin.top])

    svg.append('g')
      .attr('transform', `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x).ticks(5).tickFormat(d3.format('.1f')))
      .selectAll('text')
      .style('font-size', '11px')
      .style('fill', '#64748b')

    svg.append('g')
      .attr('transform', `translate(${margin.left},0)`)
      .call(d3.axisLeft(y).ticks(4))
      .selectAll('text')
      .style('font-size', '11px')
      .style('fill', '#64748b')

    svg.selectAll('.bar')
      .data(bins)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', d => x(d.x0) + 2)
      .attr('width', d => Math.max(0, x(d.x1) - x(d.x0) - 3))
      .attr('y', height - margin.bottom)
      .attr('height', 0)
      .attr('fill', d => {
        const mid = (d.x0 + d.x1) / 2
        if (mid < 0.3) return '#ef4444'
        if (mid < 0.6) return '#eab308'
        return '#22c55e'
      })
      .attr('rx', 4)
      .attr('opacity', 0.85)
      .on('mouseenter', function (event, d) {
        d3.select(this).attr('opacity', 1).attr('stroke', '#1e293b').attr('stroke-width', 1.5)
        const tooltip = d3.select(tooltipRef.current)
        tooltip.style('display', 'block')
          .style('left', `${event.clientX + 12}px`)
          .style('top', `${event.clientY - 35}px`)
          .html(`<strong>${d.x0.toFixed(1)} - ${d.x1.toFixed(1)}</strong><br/>${d.length} noticias`)
      })
      .on('mouseleave', function () {
        d3.select(this).attr('opacity', 0.85).attr('stroke', 'none')
        d3.select(tooltipRef.current).style('display', 'none')
      })
      .transition()
      .duration(600)
      .ease(d3.easeCubicOut)
      .attr('y', d => y(d.length))
      .attr('height', d => y(0) - y(d.length))

    svg.selectAll('.count-label')
      .data(bins.filter(d => d.length > 0))
      .enter()
      .append('text')
      .attr('class', 'count-label')
      .attr('x', d => x((d.x0 + d.x1) / 2))
      .attr('y', d => y(d.length) - 6)
      .attr('text-anchor', 'middle')
      .attr('font-size', '10px')
      .attr('font-weight', '600')
      .attr('fill', '#475569')
      .text(d => d.length)

  }, [noticias])

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-card relative">
      <svg ref={svgRef} width="100%" height="250" viewBox="0 0 450 250" />
      <div ref={tooltipRef} className="fixed pointer-events-none hidden bg-gray-900 text-white text-xs rounded-lg px-3 py-2 shadow-lg z-50" />
      {!noticias.length && (
        <div className="flex items-center justify-center text-sm text-gray-400 py-10">
          Sin datos de credibilidad
        </div>
      )}
      <div className="flex gap-4 mt-2 text-xs text-gray-500 justify-center">
        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-red-500" /> Crítica (&lt;0.3)</span>
        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-yellow-500" /> Dudosa (0.3–0.6)</span>
        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-green-500" /> Confiable (&gt;0.6)</span>
      </div>
    </div>
  )
}
