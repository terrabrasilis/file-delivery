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
        process.env.MY_SECRET_DATA_ENV_VAR = filePath

        const secretMessage = Utils.readDockerSecret(process.env.MY_SECRET_DATA_ENV_VAR)
        expect(secretMessage).to.be.eql('That is a very secret message')
      })

      it('should return null when file not exists', async () => {
        const filePath = path.join(__dirname, 'secret_mock_notexists.txt')
        process.env.MY_SECRET_DATA_ENV_VAR = filePath

        const secretMessage = Utils.readDockerSecret(process.env.MY_SECRET_DATA_ENV_VAR)
        expect(secretMessage).to.not.be.ok
      })
    })
  })
})
