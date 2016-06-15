'use strict'

import React, { Component, PropTypes } from 'react'
import marked from 'marked'
import { connect } from 'react-redux'
import { selectPublisher, fetchDataIfNeeded } from '../actions'
import { Table } from '../components/tables'
import { Main as Overview } from '../components/overviews'

class Main extends Component {
  componentDidMount() {
    const { dispatch } = this.props
    dispatch(fetchDataIfNeeded())
  }
  safe(content) {
    return { __html: marked(content) }
  }
  render() {
    const { ui, data, route } = this.props
    return (
      <div>
      {ui.isFetching &&
        <div className='is-fetching'>
          <div>טוען נתונים...</div>
        </div>
      }
      {!ui.isFetching &&
        <div>
          <div className='dashboard'>
            <div className='jumbotron'>
              <Overview instance={data.instance}
                results={data.results} publishers={data.publishers} />
            </div>
            {data.instance.context &&
            <section className='context'>
              <div className='container col-md-5 col-md-offset-1'>
                <h2>איך מחושב המדד?</h2>
                <div className='explanation col-md-12'
                     dangerouslySetInnerHTML={this.safe(data.instance['method'] || '')} />
              </div>
              <div className='container col-md-5'>
                <h2>מה בדיוק הסיפור?</h2>
                <div className='explanation col-md-12'
                     dangerouslySetInnerHTML={this.safe(data.instance.context || '')} />
              </div>
            </section>
            }
            <section className='publishers'>
              <Table title='גופים מדווחים' rows={data.publishers}
                results={data.results} columns={ui.tableHeaders.main}
                sort={ui.tableSorters.main} route='publishers' parentRoute={route.path} />
            </section>
          </div>
        </div>
      }
    </div>
    )
  }
}

Main.propTypes = {
  data: PropTypes.object.isRequired,
  ui: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  const { ui, data } = state
  return { ui, data }
}

export default connect(mapStateToProps)(Main)
