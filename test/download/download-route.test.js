import { expect } from 'chai'
import request from 'supertest'
import path from 'path'
import AdmZip from 'adm-zip'
import { constants } from '../../src/api/utils'
import app from '../../src/server'
import sinon from 'sinon'
import moment from 'moment'

const now = moment('2019-09-12').toDate()
let clock


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
  beforeEach(() => {
    clock = sinon.useFakeTimers(now.getTime())
  })

  afterEach(() => {
    clock.restore()
  })

  describe('DETER-AMZ', () => {
    describe('PUBLIC', () => {
      it('should return 200 when downloading daily the file (without any token)', async () => {
        const result = await request(app.listen()).get('/download/deter-amz/daily')
        expect(result.status).to.be.eql(200)
        expect(result.body).to.be.eql({ data: 'deter-amz daily public file!' })

        console.log('=======================')
        console.log(JSON.stringify(result.header))
        console.log('=======================')

        expect(result.header['user-type']).to.be.eql(constants.PUBLIC)
        expect(result.header['content-type']).to.be.eql('application/json; charset=utf-8')
      })

      it('should return 200 when downloading the monthly file (without any token)', async () => {
        const result = await request(app.listen()).get('/download/deter-amz/monthly')
        expect(result.status).to.be.eql(200)
        expect(result.body).to.be.eql({ data: 'deter-amz monthly public file!' })
        expect(result.header['user-type']).to.be.eql(constants.PUBLIC)
        expect(result.header['content-type']).to.be.eql('application/json; charset=utf-8')
      })

      it('should return 200 when downloading the deter-amz shape file (without any token)', async () => {
        const result = await request(app.listen())
          .get('/download/deter-amz/shape')
          .buffer()
          .parse(binaryParser)

        expect(result.header['user-type']).to.be.eql(constants.PUBLIC)
        expect(result.header['content-type']).to.be.eql('application/zip')
        expect(result.status).to.be.eql(200)
        expect(getZipContentAsText(result.body)).to.be.eql('deter-amz public shape file!')
      })
    })

    describe('AUTHENTICATED', () => {
      it('should return 200 when downloading the file (VALID_TOKEN)', async () => {
        const result = await request(app.listen())
          .get('/download/deter-amz/daily')
          .set('Authorization', 'Bearer ' + VALID_TOKEN)
        expect(result.status).to.be.eql(200)
        expect(result.body).to.be.eql({ data: 'deter-amz daily authenticated file!' })
        expect(result.header['user-type']).to.be.eql(constants.ADMIN)
        expect(result.header['content-type']).to.be.eql('application/json; charset=utf-8')
      })

      it('should return 200 when downloading the file (VALID_TOKEN)', async () => {
        const result = await request(app.listen())
          .get('/download/deter-amz/monthly')
          .set('Authorization', 'Bearer ' + VALID_TOKEN)
        expect(result.status).to.be.eql(200)
        expect(result.body).to.be.eql({ data: 'deter-amz monthly authenticated file!' })
        expect(result.header['user-type']).to.be.eql(constants.ADMIN)
        expect(result.header['content-type']).to.be.eql('application/json; charset=utf-8')
      })

      it('should return 200 when downloading the deter-amz shape file (authenticated token)', async () => {
        const result = await request(app.listen())
          .get('/download/deter-amz/shape')
          .set('Authorization', 'Bearer ' + VALID_TOKEN)
          .buffer()
          .parse(binaryParser)

        expect(result.header['user-type']).to.be.eql(constants.ADMIN)
        expect(result.header['content-type']).to.be.eql('application/zip')
        expect(result.status).to.be.eql(200)
        expect(getZipContentAsText(result.body)).to.be.eql('deter-amz authenticated shape file!')
      })
    })
  })

  describe('DETER-CERRADO', () => {
    describe('PUBLIC', () => {
      it('should return 200 when downloading daily the file (without any token)', async () => {
        const result = await request(app.listen()).get('/download/deter-cerrado/daily')
        expect(result.status).to.be.eql(200)
        expect(result.body).to.be.eql({ data: 'deter-cerrado daily public file!' })
        expect(result.header['user-type']).to.be.eql(constants.PUBLIC)
        expect(result.header['content-type']).to.be.eql('application/json; charset=utf-8')
      })

      it('should return 200 when downloading the monthly file (without any token)', async () => {
        const result = await request(app.listen()).get('/download/deter-cerrado/monthly')
        expect(result.status).to.be.eql(200)
        expect(result.body).to.be.eql({ data: 'deter-cerrado monthly public file!' })
        expect(result.header['user-type']).to.be.eql(constants.PUBLIC)
        expect(result.header['content-type']).to.be.eql('application/json; charset=utf-8')
      })

      it('should return 200 when downloading the deter-cerrado shape file (without any token)', async () => {
        const result = await request(app.listen())
          .get('/download/deter-cerrado/shape')
          .buffer()
          .parse(binaryParser)

        expect(result.header['user-type']).to.be.eql(constants.PUBLIC)
        expect(result.header['content-type']).to.be.eql('application/zip')
        expect(result.status).to.be.eql(200)
        expect(getZipContentAsText(result.body)).to.be.eql('deter-cerrado public shape file!')
      })
    })

    describe('AUTHENTICATED', () => {
      it('should return 200 when downloading the file (VALID_TOKEN)', async () => {
        const result = await request(app.listen())
          .get('/download/deter-cerrado/daily')
          .set('Authorization', 'Bearer ' + VALID_TOKEN)
        expect(result.status).to.be.eql(200)
        expect(result.body).to.be.eql({ data: 'deter-cerrado daily authenticated file!' })
        expect(result.header['user-type']).to.be.eql(constants.ADMIN)
        expect(result.header['content-type']).to.be.eql('application/json; charset=utf-8')
      })

      it('should return 200 when downloading the file (VALID_TOKEN)', async () => {
        const result = await request(app.listen())
          .get('/download/deter-cerrado/monthly')
          .set('Authorization', 'Bearer ' + VALID_TOKEN)
        expect(result.status).to.be.eql(200)
        expect(result.body).to.be.eql({ data: 'deter-cerrado monthly authenticated file!' })
        expect(result.header['user-type']).to.be.eql(constants.ADMIN)
        expect(result.header['content-type']).to.be.eql('application/json; charset=utf-8')
      })

      it('should return 200 when downloading the deter-cerrado shape file (authenticated token)', async () => {
        const result = await request(app.listen())
          .get('/download/deter-cerrado/shape')
          .set('Authorization', 'Bearer ' + VALID_TOKEN)
          .buffer()
          .parse(binaryParser)

        expect(result.header['user-type']).to.be.eql(constants.ADMIN)
        expect(result.header['content-type']).to.be.eql('application/zip')
        expect(result.status).to.be.eql(200)
        expect(getZipContentAsText(result.body)).to.be.eql('deter-cerrado authenticated shape file!')
      })
    })
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

function getZipContentAsText (filePath) {
  const zip = new AdmZip(filePath)
  const zipEntries = zip.getEntries()
  let textResult = ''

  zipEntries.forEach(function (zipEntry) {
    textResult += zipEntry.getData().toString('utf8')
  })

  return textResult
}

function binaryParser (res, callback) {
  res.setEncoding('binary')
  res.data = ''
  res.on('data', function (chunk) {
    res.data += chunk
  })
  res.on('end', function () {
    callback(null, new Buffer(res.data, 'binary'))
  })
}
