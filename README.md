# actions-login

[![build-test](https://github.com/acorn-io/actions-login/actions/workflows/test.yml/badge.svg)](https://github.com/acorn-io/actions-login/actions/workflows/test.yml)

GitHub action to install Acorn CLI and spin up a k3s cluster

# Usage

```yaml
steps:
- uses: actions/checkout@master
- uses: acorn-io/actions-setup@v1
- uses: acorn-io/actions-login@v1
  with:
    registry: ${{secrets.YOUR_REGISTRY}}
    username: ${{secrets.YOUR_USERNAME}}
    password: ${{secrets.YOUR_PASSWORD}}
    local:    false
- run: |
  acorn build . # Whatever you want to do with acorn
```

# Options

| Key        | Default      | Description |
| ---------- | ------------ | ----------- |
| `registry` | **Required** | Registry address to login to (e.g. ghcr.io or docker.io)
| `username` | **Required** | Registry username
| `password` | **Required** | Registry password
| `local`    | 'false'      | Adds the `--local-storage` argument to `acorn login` if set to 'true'

# License

Copyright (c) 2022 Acorn Labs, Inc.

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
