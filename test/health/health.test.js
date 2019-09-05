'use strict'

import request from 'supertest'
import app from '../../src/server'

describe('health api', () => {
  it('should return 200 and config json', done => {
    const expectResult = {
      status: 'OK'
    }

    request(app.listen())
      .get('/')
      .expect(200, expectResult)
      .end(done)
  })
})
