export default function EndpointRanking({ data, loading }) {
  if (loading) return <div className="skeleton h-40 rounded-xl" />
  if (!data?.length) return <div className="text-center py-8 text-sm text-gray-400">Sin datos</div>

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-200 text-left text-xs font-semibold text-gray-500 uppercase">
            <th className="px-3 py-2">Endpoint</th>
            <th className="px-3 py-2">Método</th>
            <th className="px-3 py-2 text-right">Total</th>
            <th className="px-3 py-2 text-right">Promedio (ms)</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={i} className="border-b border-gray-100 hover:bg-gray-50">
              <td className="px-3 py-2 font-mono text-xs text-gray-800">{row.endpoint}</td>
              <td className="px-3 py-2">
                <span className={`px-1.5 py-0.5 text-xs font-medium rounded ${
                  row.metodo === 'GET' ? 'bg-green-50 text-green-600' :
                  row.metodo === 'POST' ? 'bg-blue-50 text-blue-600' :
                  row.metodo === 'PUT' ? 'bg-yellow-50 text-yellow-600' :
                  'bg-red-50 text-red-600'
                }`}>{row.metodo}</span>
              </td>
              <td className="px-3 py-2 text-right font-medium">{row.total}</td>
              <td className="px-3 py-2 text-right text-gray-500">{row.duracionPromedio?.toFixed(0) ?? '—'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
