import request from 'supertest'
import path from 'path'
import { Utils, constants } from '../../src/api/utils'
import { expect } from 'chai'

describe('UTILS service:', () => {
  describe('constants', () => {
    it('should get a basic constant', async () => {
      expect(constants.PUBLIC).to.be.eql('public')
    })
  })

  describe('Utils', function () {
    describe('.readDockerSecret', function () {
      it('should check whether utils is valid or not', async () => {
        const filePath = path.join(__dirname, 'secret_mock.txt')
        const secretMessage = Utils.readDockerSecret(filePath)
        expect(secretMessage).to.be.eql('That is a very secret message')
      })

      it('should return null when file not exists', async () => {
        const filePath = path.join(__dirname, 'secret_mock_notexists.txt')
        const secretMessage = Utils.readDockerSecret(filePath)
        expect(secretMessage).to.not.be.ok
      })
    })
  })
})
