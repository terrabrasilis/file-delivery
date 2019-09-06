'use strict'

import request from 'supertest'
import app from '../../src/server'

describe('DOWNLOAD api: ', () => {
  it('should return 200 and config json', done => {
    const expectResult = {
      download: 'OK'
    }

    request(app.listen())
      .get('/download')
      .expect(200, expectResult)
      .end(done)
  })
})
