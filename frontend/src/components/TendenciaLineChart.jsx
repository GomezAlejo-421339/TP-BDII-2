import { useRef, useEffect } from 'react'
import * as d3 from 'd3'

export default function TendenciaLineChart({ data, loading }) {
  const svgRef = useRef(null)

  useEffect(() => {
    if (!data?.length) return

    const width = 700
    const height = 220
    const margin = { top: 20, right: 70, bottom: 40, left: 50 }

    const svg = d3.select(svgRef.current)
    svg.selectAll('*').remove()

    const sorted = [...data]

    const x = d3.scalePoint()
      .domain(sorted.map(d => d.fecha))
      .range([margin.left, width - margin.right])

    const y = d3.scaleLinear()
      .domain([0, d3.max(sorted, d => Math.max(d.total, d.credibilidadPromedio * 10)) || 1])
      .nice()
      .range([height - margin.bottom, margin.top])

    svg.append('g')
      .attr('transform', `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x).tickValues(
        sorted.filter((_, i) => i % Math.max(1, Math.floor(sorted.length / 5)) === 0).map(d => d.fecha)
      ).tickFormat(d => d?.length > 10 ? d.slice(0, 10) : d))
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

    const lineTotal = d3.line()
      .x(d => x(d.fecha))
      .y(d => y(d.total))
      .curve(d3.curveMonotoneX)

    const lineCred = d3.line()
      .x(d => x(d.fecha))
      .y(d => y(d.credibilidadPromedio * 10))
      .curve(d3.curveMonotoneX)

    svg.append('path')
      .datum(sorted)
      .attr('fill', 'none')
      .attr('stroke', '#3b82f6')
      .attr('stroke-width', 2)
      .attr('d', lineTotal)

    svg.selectAll('.dot-total')
      .data(sorted)
      .enter()
      .append('circle')
      .attr('class', 'dot-total')
      .attr('cx', d => x(d.fecha))
      .attr('cy', d => y(d.total))
      .attr('r', 3)
      .attr('fill', '#3b82f6')
      .attr('stroke', '#fff')
      .attr('stroke-width', 1.5)
      .append('title')
      .text(d => `${d.fecha}: ${d.total} noticias`)

    svg.append('path')
      .datum(sorted)
      .attr('fill', 'none')
      .attr('stroke', '#22c55e')
      .attr('stroke-width', 2)
      .attr('stroke-dasharray', '4,4')
      .attr('d', lineCred)

    svg.selectAll('.dot-cred')
      .data(sorted)
      .enter()
      .append('circle')
      .attr('class', 'dot-cred')
      .attr('cx', d => x(d.fecha))
      .attr('cy', d => y(d.credibilidadPromedio * 10))
      .attr('r', 3)
      .attr('fill', '#22c55e')
      .attr('stroke', '#fff')
      .attr('stroke-width', 1.5)
      .append('title')
      .text(d => `${d.fecha}: cred. ${d.credibilidadPromedio}`)

    const legend = svg.append('g')
      .attr('transform', `translate(${width - margin.right - 10}, ${margin.top})`)

    legend.append('line')
      .attr('x1', 0).attr('x2', 20)
      .attr('y1', 0).attr('y2', 0)
      .attr('stroke', '#3b82f6')
      .attr('stroke-width', 2)

    legend.append('text')
      .attr('x', 26).attr('y', 4)
      .attr('font-size', '10px')
      .attr('fill', '#64748b')
      .text('Noticias')

    legend.append('line')
      .attr('x1', 0).attr('x2', 20)
      .attr('y1', 16).attr('y2', 16)
      .attr('stroke', '#22c55e')
      .attr('stroke-width', 2)
      .attr('stroke-dasharray', '4,4')

    legend.append('text')
      .attr('x', 26).attr('y', 20)
      .attr('font-size', '10px')
      .attr('fill', '#64748b')
      .text('Cred. prom (×10)')

  }, [data])

  if (loading) return <div className="skeleton h-56 rounded-xl" />

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-card">
      <svg ref={svgRef} width="100%" height="240" viewBox="0 0 700 240" />
      {(!data || data.length === 0) && (
        <div className="flex items-center justify-center text-sm text-gray-400 py-10">
          Sin datos históricos
        </div>
      )}
    </div>
  )
}
