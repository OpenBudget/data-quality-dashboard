'use strict'

import React, { Component } from 'react'

class DefaultView extends Component {
  render() {
    const { children, instance, embed } = this.props
    return (
      <html>
        <head>
          <meta charSet='utf-8' />
          <base href='/' />
          <meta httpEquiv='x-ua-compatible' content='ie=edge' />
          <meta name='description' content={instance.description} />
          <meta name='viewport' content='width=device-width, initial-scale=1' />
          <title>
            {instance.name} | {instance.organization}
          </title>
          <link rel='apple-touch-icon' href='images/apple-touch-icon.png' />
          <link rel='stylesheet' type='text/css' href='/styles/app.min.css' />
          <link rel="stylesheet" type='text/css' href='//a.okfn.org/html/oki/panel/assets/css/frontend.css' />
          <link href="https://fonts.googleapis.com/css?family=Rubik" rel="stylesheet" />
        </head>
        <body>

          <div className="header">
            <img src="https://raw.githubusercontent.com/OpenBudget/data-quality-dashboard/master/assets/pkw_logo.png" style={{float:'left'}}/>
            <img src="https://raw.githubusercontent.com/OpenBudget/data-quality-dashboard/master/assets/obudget_logo_wide.png" style={{float:'right'}}/>
          </div>

          {children}

          <footer className={embed ? 'hidden' : 'site-footer'}>
            <div className='container'>
              <p>
                פרויקט של <a href="http://www.obudget.org/">מפתח התקציב</a> מבית <a href="http://hasadna.org.il/" target="_blank">הסדנא לידע ציבורי</a>
              </p>
              <p>
                מבוסס על קוד של <a href="http://okfn.org/" target="_blank">Open Knowledge International</a>
              </p>
              <p>
                קוד האתר: <a href="http://github.com/OpenBudget/data-quality-dashboard/" target="_blank">GitHub</a>
              </p>
            </div>
          </footer>
          <script src='/scripts/app.min.js'></script>
        </body>
      </html>
    )
  }
}

//<script src='//a.okfn.org/html/oki/panel/assets/js/frontend.js'></script>

export default DefaultView
