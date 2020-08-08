import {wait} from '../src/wait'
import {parsetime} from '../src/parsetime'

import * as process from 'process'
import * as cp from 'child_process'
import * as path from 'path'

test('parse time',  () => {

  console.log(parsetime('5h'))
  expect(parsetime('5s')).toEqual(5000)
  expect(parsetime('5 s')).toEqual(5000)
  expect(parsetime('5 seconds')).toEqual(5000)
  expect(parsetime('5h')).toEqual(18000000)
  expect(parsetime('5hr')).toEqual(18000000)
  expect(parsetime('5 hours')).toEqual(18000000)


})

test('throws invalid number', async () => {
  const input = parseInt('foo', 10)
  await expect(wait(input)).rejects.toThrow('milliseconds not a number')
})



test('wait 500 ms', async () => {
  const start = new Date()
  wait(3).then(isDone => {
    console.log('done...')
  })
  await wait(500)
  const end = new Date()
  var delta = Math.abs(end.getTime() - start.getTime())
  expect(delta).toBeGreaterThan(450)
})


// shows how the runner will run a javascript action with env / stdout protocol
test('test runs', () => {
  process.env['ngrok_token'] = 'ngrok_token_999'
  process.env['vscode_port'] = '8773'
  process.env['wait_duration'] = '5m'
  const ip = path.join(__dirname, '..', 'dist', 'index.js')
  const options: cp.ExecSyncOptions = {
    env: process.env
  }
  console.log(cp.execSync(`node ${ip}`, options).toString())
})
