import * as core from '@actions/core'
import {login, logout} from './login'

async function setup(): Promise<void> {
  const registry = core.getInput('registry')
  const username = core.getInput('username')
  const password = core.getInput('password')
  const local= core.getInput('local') === 'true'

  core.saveState('registry', registry)
  await login(registry, username, password, local)
}

async function teardown(): Promise<void> {
  const registry = core.getState('registry')
  await logout(registry)
}

async function run(): Promise<void> {
  try {
    if (core.getState('isPost')) {
      await teardown()
    } else {
      core.saveState('isPost', 'true')
      await setup()
    }
  } catch (error) {
    if (error instanceof Error) {
      core.setFailed(error.message)
    }
  }
}

run()
