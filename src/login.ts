import * as core from '@actions/core'
import * as exec from '@actions/exec'

export async function login(
  registry: string,
  username: string,
  password: string
): Promise<void> {
  if (!registry || !username || !password) {
    throw new Error('Registry, username, and password required')
  }

  const args = ['login', '--password-stdin', '--username', username, registry]

  core.info(`Logging into ${registry}...`)

  const res = await exec.getExecOutput('acorn', args, {
    ignoreReturnCode: true,
    silent: true,
    input: Buffer.from(password)
  })

  if (res.stderr.length > 0 && res.exitCode !== 0) {
    throw new Error(res.stderr.trim())
  }

  core.info(`Login Succeeded!`)
}

export async function logout(registry: string): Promise<void> {
  const res = await exec.getExecOutput('acorn', ['logout', registry], {
    ignoreReturnCode: true
  })

  if (res.stderr.length > 0 && res.exitCode !== 0) {
    core.warning(res.stderr.trim())
  }
}
