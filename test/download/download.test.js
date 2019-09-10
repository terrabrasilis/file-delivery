import { expect } from 'chai'
import request from 'supertest'
import { constants } from '../../src/api/utils'
import app from '../../src/server'

const VALID_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJuYW1lIjoidGhlZHVkZSIsIm5' +
  'hbWUiOiJNci4gTGVib3dza2kifSwiZXhwIjo0NjU4NTkxNzEzLCJpYXQiOjE1MDQ5OTE3MTN9.nZqc6O' +
  'SdccIx4NXovqqHW5iXAyIsPhEkT2SiwyW1LvU'

const EXPIRED_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJuYW1lIjoidGhlZHVkZSIsIm5' +
  'hbWUiOiJNci4gTGVib3dza2kifSwiZXhwIjoxNTA0OTkxODIxLCJpYXQiOjE1MDQ5OTE4MjJ9.llUQYi' +
  'eU1sdd-0RAL6IbqJWT4OkuwPDugumFq_APJPY'

const INVALID_SIGNATURE_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJuYW1lIjoidGhlZHVkZSIsIm5' +
  'hbWUiOiJNci4gTGVib3dza2kifSwiZXhwIjoxNTA0OTkxODIxLCJpYXQiOjE1MDQ5OTE4MjJ9.llUQYi' +
  'eU1sdd-0RAL6IbqJWT4OkuwPDugumFq_APJP1'

const INVALID_TOKEN = 'e1JhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJuYW1lIjoidGhlZHVkZSIsIm5' +
  'hbWUiOiJNci4gTGVib3dza2kifSwiZXhwIjoxNTA0OTkxODIxLCJpYXQiOjE1MDQ5OTE4MjJ9.llUQYi' +
  'eU1sdd-0RAL6IbqJWT4OkuwPDugumFq_APJPY'

const JWT_MALFORMED_TOKEN = 'e1JhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJuYW1lIjoidGhlZHVkZSIsIm5' +
  'hbWUiOiJNci4gTGVib3dza2kifSwiZXhwIjoxNTA0OTkxODIxLCJpYXQiOjE1MDQ5OTE4MjJ9'

describe('DOWNLOAD api: ', () => {
  it('should return 200 when downloading the file (without any token)', async () => {
    const result = await request(app.listen())
      .get('/download/deter-amz/daily')
    expect(result.status).to.be.eql(200)
    expect(result.header['user-type']).to.be.eql(constants.PUBLIC)
    expect(result.header['content-type']).to.be.eql('application/json; charset=utf-8')
  })

  it('should return 200 when downloading the file (VALID_TOKEN)', async () => {
    const result = await request(app.listen())
      .get('/download/deter-amz/daily')
      .set('Authorization', 'Bearer ' + VALID_TOKEN)
    expect(result.status).to.be.eql(200)
    expect(result.header['user-type']).to.be.eql(constants.ADMIN)
    expect(result.header['content-type']).to.be.eql('application/json; charset=utf-8')
  })

  it('EXPIRED_TOKEN', async () => {
    const result = await request(app.listen())
      .get('/download/deter-amz/daily')
      .set('Authorization', 'Bearer ' + EXPIRED_TOKEN)
    expect(result.status).to.be.eql(401)
    expect(result.body).to.be.eql({ error: 'jwt expired' })
  })

  it('INVALID_SIGNATURE_TOKEN', async () => {
    const result = await request(app.listen())
      .get('/download/deter-amz/daily')
      .set('Authorization', 'Bearer ' + INVALID_SIGNATURE_TOKEN)
    expect(result.status).to.be.eql(401)
    expect(result.body).to.be.eql({ error: 'invalid signature' })
  })

  it('INVALID_TOKEN', async () => {
    const result = await request(app.listen())
      .get('/download/deter-amz/daily')
      .set('Authorization', 'Bearer ' + INVALID_TOKEN)
    expect(result.status).to.be.eql(401)
    expect(result.body).to.be.eql({ error: 'invalid token' })
  })

  it('JWT_MALFORMED_TOKEN', async () => {
    const result = await request(app.listen())
      .get('/download/deter-amz/daily')
      .set('Authorization', 'Bearer ' + INVALID_TOKEN)
    expect(result.status).to.be.eql(401)
    expect(result.body).to.be.eql({ error: 'invalid token' })
  })
})
