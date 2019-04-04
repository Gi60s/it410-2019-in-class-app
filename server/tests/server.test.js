const expect = require('chai').expect
const server = require('../server')

describe('server', () => {
  let data

  beforeEach(async () => {
    data = await server()
  })

  afterEach(() => {
    data.stop()
  })

  it('can call the home route', () => {
    // look at the "request" and "request-promise-native"
    // npm packages
  })

})