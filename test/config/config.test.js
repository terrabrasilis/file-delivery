import request from 'supertest'
import { expect } from 'chai'
import path from 'path'
import config from '../../src/config'

describe('CONFIG:', () => {
  it('should get a basic environment variable', async () => {
    expect(config.publicFilePath).to.be.eql('public_path')
    expect(config.privateFilePath).to.be.eql('private_path')
  })
})
