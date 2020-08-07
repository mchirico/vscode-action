import * as core from '@actions/core'
import * as fs from 'fs'
import {wait} from './wait'
import {make} from './make'
import * as exec from '@actions/exec'

const startAsync = async (callback: {
  (text: string): void
  (arg0: string): void
}): Promise<void> => {
  await exec.exec('mkdir', ['-p', '.vscode-action'])

  const makefile = make()
  fs.writeFileSync('.vscode-action/Makefile', makefile)

  await exec.exec('make', ['-C', '.vscode-action', 'download'])

  // const idRsa: string = core.getInput('id_rsa')
  // fs.writeFileSync('.vscode-action/sshDocker/id_rsa', `${idRsa}`)

  // const user: string = core.getInput('user')
  // fs.writeFileSync('.vscode-action/sshDocker/USER', user)

  // const server: string = core.getInput('server')
  // fs.writeFileSync('.vscode-action/sshDocker/SERVER', server)

  // await exec.exec('make', ['-C', '.vscode-action', 'runDocker'])
  // core.setOutput('time', `Exe...`)

  // const ms: string = core.getInput('milliseconds')
  // await wait(parseInt(ms, 10))
  callback('Done wait')
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
