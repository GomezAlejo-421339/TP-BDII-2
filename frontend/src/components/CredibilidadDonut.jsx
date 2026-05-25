import { useRef, useEffect } from 'react'
import * as d3 from 'd3'

const COLORS = { 'Confiable': '#22c55e', 'Dudosa': '#eab308', 'Crítica': '#ef4444' }

export default function CredibilidadDonut({ data, loading }) {
  const svgRef = useRef(null)
  const tooltipRef = useRef(null)

  useEffect(() => {
    if (!data?.length) return

    const sorted = [...data].sort((a, b) => b.cantidad - a.cantidad)

    const width = 340
    const height = 310
    const radius = Math.min(width, height) / 2 - 50

    const svg = d3.select(svgRef.current)
    svg.selectAll('*').remove()

    const g = svg.append('g')
      .attr('transform', `translate(${width / 2},${height / 2 - 20})`)

    const pie = d3.pie().value(d => d.cantidad).sort(null)
    const arc = d3.arc().innerRadius(radius * 0.5).outerRadius(radius)
    const arcHover = d3.arc().innerRadius(radius * 0.5).outerRadius(radius + 10)

    const paths = g.selectAll('path')
      .data(pie(sorted))
      .enter()
      .append('path')
      .attr('d', arc)
      .attr('fill', d => COLORS[d.data.rango] || '#6b7280')
      .attr('stroke', '#fff')
      .attr('stroke-width', 2.5)
      .style('cursor', 'pointer')
      .on('mouseenter', function (event, d) {
        d3.select(this).transition().duration(200).attr('d', arcHover)
        const tooltip = d3.select(tooltipRef.current)
        tooltip.style('display', 'block')
          .style('left', `${event.clientX + 12}px`)
          .style('top', `${event.clientY - 45}px`)
          .html(`<strong>${d.data.rango}</strong><br/>${d.data.cantidad} noticias (${d.data.porcentaje}%)`)
      })
      .on('mouseleave', function () {
        d3.select(this).transition().duration(200).attr('d', arc)
        d3.select(tooltipRef.current).style('display', 'none')
      })

    paths.transition()
      .duration(600)
      .ease(d3.easeCubicOut)
      .attrTween('d', function (d) {
        const startAngle = d.startAngle
        const endAngle = d.endAngle
        const interpolate = d3.interpolate({ startAngle: 0, endAngle: 0 }, d)
        return t => arc(interpolate(t))
      })

    const labels = g.selectAll('.arc-label')
      .data(pie(sorted))
      .enter()
      .append('text')
      .attr('class', 'arc-label')
      .attr('transform', d => `translate(${arc.centroid(d)})`)
      .attr('text-anchor', 'middle')
      .attr('dominant-baseline', 'middle')
      .attr('font-size', d => {
        const pct = d.data.porcentaje
        if (pct < 10) return '9px'
        if (pct < 20) return '11px'
        return '13px'
      })
      .attr('font-weight', '700')
      .attr('fill', '#fff')
      .attr('paint-order', 'stroke')
      .attr('stroke', 'rgba(0,0,0,0.3)')
      .attr('stroke-width', '2px')
      .attr('opacity', 0)
      .text(d => `${d.data.porcentaje}%`)

    labels.transition()
      .delay(400)
      .duration(300)
      .attr('opacity', 1)

    const legendG = svg.append('g')
      .attr('transform', `translate(0, ${height - 30})`)

    const legendData = sorted.filter(d => d.cantidad > 0)
    const itemWidth = 115
    const totalWidth = legendData.length * itemWidth
    const startX = Math.max(0, (width - totalWidth) / 2)

    legendData.forEach((d, i) => {
      const lx = startX + i * itemWidth
      const lg = legendG.append('g').attr('transform', `translate(${lx}, 0)`)
      lg.append('circle').attr('r', 6).attr('fill', COLORS[d.rango] || '#6b7280')
      lg.append('text')
        .attr('x', 14).attr('y', 5)
        .attr('font-size', '12px')
        .attr('fill', '#64748b')
        .text(`${d.rango}: ${d.cantidad} (${d.porcentaje}%)`)
    })

  }, [data])

  if (loading) return <div className="skeleton h-64 rounded-xl" />

  return (
    <div className="relative bg-white border border-gray-200 rounded-xl p-4 shadow-card">
      <svg ref={svgRef} width="100%" height="310" viewBox="0 0 340 310" />
      <div ref={tooltipRef} className="fixed pointer-events-none hidden bg-gray-900 text-white text-xs rounded-lg px-3 py-2 shadow-lg z-50" />
      {(!data || data.length === 0) && (
        <div className="absolute inset-0 flex items-center justify-center text-sm text-gray-400">
          Sin datos de credibilidad
        </div>
      )}
    </div>
  )
}
