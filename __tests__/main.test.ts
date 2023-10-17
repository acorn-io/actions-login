import {expect, jest, test} from '@jest/globals'
import {login, logout} from '../src/login'
import * as path from 'path'
import * as exec from '@actions/exec'

process.env['RUNNER_TEMP'] = path.join(__dirname, 'runner')

const registry = 'https://ahcr.io'

test('loginStandard calls exec', async () => {
  // @ts-ignore
  const execSpy = jest
    .spyOn(exec, 'getExecOutput')
    .mockImplementation(async () => {
      // @ts-ignore
      return {
        exitCode: expect.any(Number),
        stdout: expect.any(Function),
        stderr: expect.any(Function)
      } as exec.ExecOutput
    })

  const username = 'hello'
  const password = 'world'
  const local = false

  await login(registry, username, password, local)

  expect(execSpy).toHaveBeenCalledWith(
    `acorn`,
    ['login', '--password-stdin', '--username', username, registry],
    {
      input: Buffer.from(password),
      silent: true,
      ignoreReturnCode: true
    }
  )
})

test('logout calls exec', async () => {
  // @ts-ignore
  const execSpy = jest
    .spyOn(exec, 'getExecOutput')
    .mockImplementation(async () => {
      // @ts-ignore
      return {
        exitCode: expect.any(Number),
        stdout: expect.any(Function),
        stderr: expect.any(Function)
      } as exec.ExecOutput
    })

  await logout(registry)

  expect(execSpy).toHaveBeenCalledWith(`acorn`, ['logout', registry], {
    ignoreReturnCode: true
  })
})
