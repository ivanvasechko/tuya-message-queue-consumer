# Tuya message-queue consumer (unofficial)

**Unofficial. Not affiliated with, endorsed by, or supported by Tuya.**

[![CI](https://github.com/ivanvasechko/tuya-message-queue-consumer/actions/workflows/ci.yml/badge.svg)](https://github.com/ivanvasechko/tuya-message-queue-consumer/actions/workflows/ci.yml)
[![License](https://img.shields.io/badge/license-MIT-blue)](LICENSE)

## Status

Repository bootstrap only. No WebSocket client, decryptor, spool, health server
or released version exists yet. Do not use in production.
Runtime extraction follows in power-platform task 15-07.

## Install and quick start

Once released:

```sh
npm install @ivanvasechko/tuya-message-queue-consumer
```

There is no working consumer quick start yet. The built entry point intentionally
exports nothing. ESM-only; CommonJS callers must use dynamic `import()`.
Requires Node 20 or newer. Local version `0.0.0` is a manifest
placeholder only; publishing it is blocked and no placeholder tag is created.

## Disclaimer and attribution

The intended package uses Tuya's documented API with the user's own developer
credentials. Availability and compatibility are not guaranteed. Obtain necessary
authorization and follow applicable laws and vendor terms.
All trademarks belong to their owners; no affiliation or endorsement is implied.

Thanks to [tuya/tuya-pulsar-ws-node](https://github.com/tuya/tuya-pulsar-ws-node)
(MIT) for the original WebSocket client design. No upstream runtime source is
included in this scaffold. Derived files added later must retain upstream notices.

## Rights-holder concerns

Contact me through a
[private report](https://github.com/ivanvasechko/tuya-message-queue-consumer/security/advisories/new)
and I will promptly change or remove disputed material.

## Development

```sh
npm ci
npm run lint
npm run typecheck
npm test
npm run check-package
npm audit
```

CI runs Node 20, 22, 24 and 26. Coverage thresholds are 90% for lines, statements,
functions and branches. Bootstrap coverage does not demonstrate consumer behavior.
Package checks build and inspect the actual npm file list, run `publint` and
`@arethetypeswrong/cli` with its `esm-only` profile (CommonJS is not supported).
npm always includes `package.json` alongside the allowlist.

## Releases

See [CONTRIBUTING.md](CONTRIBUTING.md). Publishing uses a protected `release`
environment and npm trusted publishing with provenance. Initial npm account/package
registration and trusted-publisher setup require the maintainer's npm account.

## Licence

[MIT](LICENSE). See [NOTICE](NOTICE) for attribution.
