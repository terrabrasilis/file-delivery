import request from 'supertest'
import { Utils, constants } from '../../src/api/utils'
import { expect } from 'chai'

describe('UTILS service:', () => {
  describe('constants', () => {
    it('should get a basic constant', async () => {
      expect(constants.PUBLIC).to.be.eql('public')
    })
  })

  describe('Utils', function() {
    it('should check whether utils is valid or not', async () => {
      const isWorking = Utils.isWorking()
      expect(isWorking).to.be.eql(true)
    })
  })

})
