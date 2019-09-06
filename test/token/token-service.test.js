import request from 'supertest'
import tokenService from '../../src/api/token'
import { expect } from 'chai'

describe('TOKEN service:', () => {
  it('should check whether token is valid or not', async () => {
  	const isValid = tokenService.isValid()
  	expect(isValid).to.be.eql(true)
  })
})
