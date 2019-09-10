import request from 'supertest'
import { expect } from 'chai'
import path from 'path'
import config from '../../src/config'

describe('CONFIG:', () => {
  it('should get a basic environment variable', async () => {
    expect(config.port).to.be.eql(9000)
  })
})
