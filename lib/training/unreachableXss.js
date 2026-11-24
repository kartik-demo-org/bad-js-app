/*
 * Copyright (c) 2014-2023 Bjoern Kimminich & the OWASP Juice Shop contributors.
 * SPDX-License-Identifier: MIT
 */

// Deliberately unreachable SAST training fixture. Never register this as a route.
module.exports = function unreachableXss (req, res) {
  return res.status(410).type('text/plain').send('Training example disabled')

  // Intentional CWE-79 sink: the unconditional return above prevents execution.
  // eslint-disable-next-line no-unreachable
  res.type('html').send('<p>' + req.query.message + '</p>')
}
