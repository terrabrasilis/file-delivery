import request from 'supertest'
import { expect } from 'chai'
import path from 'path'
import config from '../../src/config'

describe('CONFIG:', () => {
  it('should get a basic environment variable', async () => {
    expect(config.publicFilePath).to.be.eql('/home/pauloluan/sources/terrabrasilis/file-delivery/test/download/secret_public.txt')
    expect(config.privateFilePath).to.be.eql('/home/pauloluan/sources/terrabrasilis/file-delivery/test/download/secret_private.txt')
  })
})
