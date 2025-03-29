import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Legend,
} from 'recharts'
import './index.css'

const VaccinationCoverage = props => {
  const {vaccCoverList} = props
  console.log(vaccCoverList)

  const DataFormatter = number => {
    const num = Number(number)
    if (num > 1000) {
      return `${(num / 1000).toString()}k`
    }
    return num.toString()
  }
  return (
    <>
      <ResponsiveContainer width="100%" height={500}>
        <BarChart
          width={1000}
          height={300}
          data={vaccCoverList}
          margin={{top: 5}}
        >
          <XAxis
            dataKey="vaccineDate"
            tick={{stroke: 'gray', strokeWidth: 1}}
          />
          <YAxis
            tickFormatter={DataFormatter}
            tick={{stroke: 'gray', strokeWidth: 0}}
          />
          <Legend
            wrapperStyle={{
              padding: 30,
            }}
          />
          <Bar
            dataKey="dose1"
            name="Dose1"
            fill=" #5a8dee"
            barSize="20%"
            radius={[10, 10, 0, 0]}
          />
          <Bar
            dataKey="dose2"
            name="Dose2"
            fill="#f54394"
            barSize="20%"
            radius={[10, 10, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </>
  )
}

export default VaccinationCoverage
