# Contributing

Use Conventional Commits and submit focused pull requests against `main`.
Add regression tests and run all development checks listed in README.
Contributions are provided under the MIT licence.

Never commit real credentials, account emails, device/product keys, tokens,
`authKey` values, Tuya access IDs/keys, UIDs or webhook URLs.
Fixtures must contain generated identifiers and cryptographic keys only.
Retain upstream copyright and MIT notices in every derived source file.

## Release procedure

1. Wait for all CI jobs and the secret scan to pass.
2. Replace the local-only `0.0.0` version with a real release version, update
   `package-lock.json`, and add a matching dated CHANGELOG heading.
3. Commit through a pull request. Never publish a placeholder to reserve a name.
4. Create and verify a signed annotated `vX.Y.Z` tag, then push it.
5. The release workflow verifies the signature, version and latest changelog,
   repeats CI and waits for the protected `release` environment before publishing
   with `npm publish --provenance --access public` and creating a GitHub Release.

The maintainer must own the `@ivanvasechko` npm scope and configure a trusted
publisher for this repository's `release.yml` workflow and `release` environment.
An initial real release may need a manual authenticated publish before npm allows
trusted-publisher setup. Do not store an npm token in source or issue comments.
The workflow uses OIDC; it intentionally has no long-lived token fallback.
