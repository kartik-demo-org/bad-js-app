/*
 * Copyright (c) 2014-2023 Bjoern Kimminich & the OWASP Juice Shop contributors.
 * SPDX-License-Identifier: MIT
 */

import frisby = require('frisby')

const URL = 'http://localhost:3000'

describe('/sast-training/greeting', () => {
  it('greets a visitor', () => {
    return frisby.get(`${URL}/sast-training/greeting?name=Alice`)
      .expect('status', 200)
      .expect('header', 'content-type', /text\/html/)
      .expect('bodyContains', '<h1>Hello, Alice!</h1>')
  })

  it('reflects HTML supplied in the name parameter without escaping it', () => {
    const payload = '<img src=x onerror=alert(1)>'
    return frisby.get(`${URL}/sast-training/greeting?name=${encodeURIComponent(payload)}`)
      .expect('status', 200)
      .expect('header', 'content-type', /text\/html/)
      .expect('bodyContains', payload)
  })
})
