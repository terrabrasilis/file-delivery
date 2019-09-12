import request from 'supertest'
import path from 'path'
import Controller from '../../src/api/download/download.controller'
import { expect } from 'chai'
import sinon from 'sinon'
import moment from 'moment'

const now = moment('2019-09-12').toDate()
let clock

describe('DOWNLOAD Controller:', () => {
  beforeEach(() => {
    clock = sinon.useFakeTimers(now.getTime())
  })

  afterEach(() => {
    clock.restore()
  })

  describe('createFileName', () => {
    it('should create a fileName with extension .json and date', async () => {
      expect(Controller.createFileName('project', '/usr/path/test.json')).to.be.eql('project-test-2019Set12.json')
    })

    it('should create a fileName with extension .zip and date', async () => {
      expect(Controller.createFileName('project', '/usr/path/zipzop.zip')).to.be.eql('project-zipzop-2019Set12.zip')
    })
  })
})
