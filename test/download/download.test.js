import { expect } from 'chai'
import request from 'supertest'
import app from '../../src/server'

describe('DOWNLOAD api: ', () => {
  it('should return 200 when downloading the file', async () => {
    const result = await request(app.listen()).get('/download')
    expect(result.status).to.be.eql(200)
    expect(result.header['content-type']).to.be.eql('application/zip')
  })
})
