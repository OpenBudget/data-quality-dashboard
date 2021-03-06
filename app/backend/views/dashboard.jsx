'use strict'

import React, { Component } from 'react'
import DefaultView from './default'

class DashboardView extends Component {
  render() {
    const { instance, embed } = this.props
    return (
      <DefaultView instance={instance} embed={embed}>
        <section id='application'></section>
      </DefaultView>
    )
  }
}

export default DashboardView
