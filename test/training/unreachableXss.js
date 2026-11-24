/*
 * Copyright (c) 2014-2023 Bjoern Kimminich & the OWASP Juice Shop contributors.
 * SPDX-License-Identifier: MIT
 */

const assert = require('assert')
const unreachableXss = require('../../lib/training/unreachableXss')

function verifyDisabled (req) {
  const calls = []
  const res = {
    status (code) {
      calls.push(['status', code])
      return this
    },
    type (contentType) {
      calls.push(['type', contentType])
      return this
    },
    send (body) {
      calls.push(['send', body])
      return this
    }
  }

  assert.strictEqual(unreachableXss(req, res), res)
  assert.deepStrictEqual(calls, [
    ['status', 410],
    ['type', 'text/plain'],
    ['send', 'Training example disabled']
  ])
}

verifyDisabled({ query: {} })
verifyDisabled({ query: { message: '<script>alert("training")</script>' } })
verifyDisabled({
  get query () {
    throw new Error('Unreachable request source was accessed')
  }
})

console.log('Unreachable XSS checks passed: fixed plaintext response; request source never accessed')
