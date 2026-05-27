import React, { useRef, useEffect } from 'react'
import * as d3 from 'd3'

export interface TemaBarChartItem {
  tema: string
  total: number
  credibilidadPromedio: number
}

export interface TemaBarChartProps {
  data?: TemaBarChartItem[]
  loading?: boolean
}

export default function TemaBarChart({ data, loading }: TemaBarChartProps) {
  const svgRef = useRef<SVGSVGElement | null>(null)

  useEffect(() => {
    if (!data?.length || !svgRef.current) return

    const width = 400
    const height = 200
    const margin = { top: 10, right: 100, bottom: 10, left: 80 }

    const svg = d3.select(svgRef.current)
    svg.selectAll('*').remove()

    const sorted = [...data].sort((a, b) => d3.ascending(a.total, b.total))

    const y = d3.scaleBand()
      .domain(sorted.map(d => d.tema))
      .range([margin.top, height - margin.bottom])
      .padding(0.3)

    const x = d3.scaleLinear()
      .domain([0, d3.max(sorted, d => d.total) || 1])
      .nice()
      .range([margin.left, width - margin.right])

    svg.append('g')
      .attr('transform', `translate(${margin.left},0)`)
      .call(d3.axisLeft(y).tickSize(0))
      .selectAll('text')
      .style('font-size', '10px')
      .style('fill', '#374151')

    svg.append('g')
      .attr('transform', `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x).ticks(4))
      .selectAll('text')
      .style('font-size', '9px')
      .style('fill', '#64748b')

    const credColor = d3.scaleLinear<string>()
      .domain([0, 0.3, 0.6, 1])
      .range(['#ef4444', '#ef4444', '#eab308', '#22c55e'])

    const rects = svg.selectAll<SVGRectElement, TemaBarChartItem>('rect')
      .data(sorted)
      .enter()
      .append('rect')
      .attr('y', d => y(d.tema) ?? 0)
      .attr('x', margin.left)
      .attr('height', y.bandwidth())
      .attr('width', 0)
      .attr('fill', d => credColor(d.credibilidadPromedio))
      .attr('rx', 4)
      .attr('opacity', 0.85)
      .on('mouseenter', function () {
        d3.select(this).attr('opacity', 1).attr('stroke', '#1e293b').attr('stroke-width', 1)
      })
      .on('mouseleave', function () {
        d3.select(this).attr('opacity', 0.85).attr('stroke', 'none')
      })

    rects.append('title')
      .text(d => `${d.tema}: ${d.total} noticias\nCred. prom: ${d.credibilidadPromedio}`)

    rects.transition()
      .duration(600)
      .ease(d3.easeCubicOut)
      .attr('width', d => x(d.total) - margin.left)

    svg.selectAll('.label')
      .data(sorted)
      .enter()
      .append('text')
      .attr('class', 'label')
      .attr('x', d => x(d.total) + 6)
      .attr('y', d => (y(d.tema) ?? 0) + y.bandwidth() / 2 + 3)
      .attr('font-size', '10px')
      .attr('fill', '#64748b')
      .text(d => `${d.credibilidadPromedio}`)

  }, [data])

  if (loading) return <div className="skeleton h-52 rounded-xl" />

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-card">
      <svg ref={svgRef} width="100%" height="220" viewBox="0 0 400 220" />
      {(!data || data.length === 0) && (
        <div className="flex items-center justify-center text-sm text-gray-400 py-10">
          Sin datos de temas
        </div>
      )}
    </div>
  )
}
