import * as core from '@actions/core'
import * as fs from 'fs'
import {wait} from './wait'
import {make} from './make'
import {parsetime} from './parsetime'
import * as exec from '@actions/exec'

const startAsync = async (callback: {
  (text: string): void
  (arg0: string): void
}): Promise<void> => {
  await exec.exec('mkdir', ['-p', '.vscode-action'])

  const makefile = make()
  fs.writeFileSync('.vscode-action/Makefile', makefile)

  await exec.exec('make', ['-C', '.vscode-action', 'download'])
  await exec.exec('make', ['-C', '.vscode-action', 'downloadNgrok'])

  const ngrokToken: string = core.getInput('ngrok_token')
  const port: string = core.getInput('vscode_port')
  const duration: string = core.getInput('wait_duration')

  exec.exec('./.vscode-action/code-server/bin/code-server', [
    '--bind-addr',
    `127.0.0.1:${port}`,
    '--auth',
    'none'
  ])
  exec.exec('./.vscode-action/ngrok', ['authtoken', `${ngrokToken}`])

  wait(parsetime(duration)).then(isDone => {
    exec.exec('sudo', ['shutdown', 'now'])
  })

  await exec.exec('./.vscode-action/ngrok', ['http', `${port}`])

  callback('Done main')
}

async function run(): Promise<void> {
  try {
    startAsync((text: string) => {
      core.debug(text)
    })
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
