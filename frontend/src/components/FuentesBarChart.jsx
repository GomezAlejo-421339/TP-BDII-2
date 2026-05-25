import { useRef, useEffect } from 'react'
import * as d3 from 'd3'

export default function FuentesBarChart({ data, loading }) {
  const svgRef = useRef(null)

  useEffect(() => {
    if (!data?.length) return

    const width = 400
    const height = 200
    const margin = { top: 10, right: 20, bottom: 60, left: 40 }

    const svg = d3.select(svgRef.current)
    svg.selectAll('*').remove()

    const x = d3.scaleBand()
      .domain(data.map(d => d.fuente))
      .range([margin.left, width - margin.right])
      .padding(0.3)

    const y = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.total) || 1])
      .nice()
      .range([height - margin.bottom, margin.top])

    svg.append('g')
      .attr('transform', `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x).tickSize(0))
      .selectAll('text')
      .style('font-size', '9px')
      .style('fill', '#64748b')
      .attr('transform', 'rotate(-20)')
      .attr('text-anchor', 'end')
      .attr('dx', '-4')
      .attr('dy', '4')

    svg.append('g')
      .attr('transform', `translate(${margin.left},0)`)
      .call(d3.axisLeft(y).ticks(4))
      .selectAll('text')
      .style('font-size', '9px')
      .style('fill', '#64748b')

    const rects = svg.selectAll('rect')
      .data(data)
      .enter()
      .append('rect')
      .attr('x', d => x(d.fuente))
      .attr('y', height - margin.bottom)
      .attr('width', x.bandwidth())
      .attr('height', 0)
      .attr('fill', d => d.verificada ? '#22c55e' : '#ef4444')
      .attr('rx', 4)
      .attr('opacity', 0.85)
      .on('mouseenter', function (event, d) {
        d3.select(this).attr('opacity', 1).attr('stroke', '#1e293b').attr('stroke-width', 1)
      })
      .on('mouseleave', function () {
        d3.select(this).attr('opacity', 0.85).attr('stroke', 'none')
      })

    rects.append('title')
      .text(d => `${d.fuente} (${d.total} noticias)\nCred. prom: ${d.credibilidadPromedio}\n${d.verificada ? 'Verificada' : 'No verificada'}`)

    rects.transition()
      .duration(600)
      .ease(d3.easeCubicOut)
      .attr('y', d => y(d.total))
      .attr('height', d => y(0) - y(d.total))

  }, [data])

  if (loading) return <div className="skeleton h-52 rounded-xl" />

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-card">
      <svg ref={svgRef} width="100%" height="220" viewBox="0 0 400 220" />
      {(!data || data.length === 0) && (
        <div className="flex items-center justify-center text-sm text-gray-400 py-10">
          Sin datos de fuentes
        </div>
      )}
      <div className="flex gap-4 mt-2 text-xs text-gray-500 justify-center">
        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-green-500" /> Verificada</span>
        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-red-500" /> No verificada</span>
      </div>
    </div>
  )
}
