import './index.css'
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import VaccinationCoverage from '../VaccinationCoverage'
import VaccinationByGender from '../VaccinationByGender'
import VaccinationByAge from '../VaccinationByAge'

class CowinDasdboard extends Component {
  state = {
    vaccCoverList: [],
    vaccAgeList: [],
    vaccGenderList: [],
    isLoading: true,
    error: false,
  }

  componentDidMount() {
    this.getVaccList()
  }

  getVaccList = async () => {
    this.setState({isLoading: true, error: false})
    const response = await fetch('https://apis.ccbp.in/covid-vaccination-data')
    const data = await response.json()
    if (!response.ok) {
      this.setState({error: true, isLoading: false})
      return
    }
    console.log(data)
    const vaccCov = data.last_7_days_vaccination.map(day => ({
      dose2: day.dose_2,
      dose1: day.dose_1,
      vaccineDate: day.vaccine_date,
    }))

    console.log(vaccCov)

    const vaccAge = data.vaccination_by_age
    const vaccGender = data.vaccination_by_gender

    this.setState({
      vaccCoverList: vaccCov,
      vaccAgeList: vaccAge,
      vaccGenderList: vaccGender,
      isLoading: false,
    })
  }

  renderFailureView = () => (
    <div className="container">
      <img
        className="fail-img"
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
      />
      <h1 className="chart-head">Something went wrong</h1>
    </div>
  )

  renderLoadingView = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height={80} width={80} />
    </div>
  )

  render() {
    const {vaccCoverList, vaccGenderList, vaccAgeList, isLoading, error} =
      this.state

    return (
      <>
        {isLoading && this.renderLoadingView()}
        {error && !isLoading && this.renderFailureView()}
        {!error && !isLoading && (
          <div className="container">
            <div className="nav">
              <img
                className="web-logo"
                src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
                alt="website logo"
              />
              <p className="web-head">Co-WIN</p>
            </div>
            <h1 className="chart-head">CoWIN Vaccination in India</h1>
            <div className="chart-div">
              <h1 className="chart-head">Vaccination Coverage</h1>
              <VaccinationCoverage vaccCoverList={vaccCoverList} />
            </div>
            <div className="chart-div">
              <h1 className="chart-head">Vaccination by gender</h1>
              <VaccinationByGender vaccGenderList={vaccGenderList} />
            </div>

            <div className="chart-div">
              <h1 className="chart-head">Vaccination by Age</h1>
              <VaccinationByAge vaccAgeList={vaccAgeList} />
            </div>
          </div>
        )}
      </>
    )
  }
}

export default CowinDasdboard
