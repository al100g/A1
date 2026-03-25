# Security Policy

## Supported Versions

The following versions of A1 are currently supported with security updates:

| Version | Supported          |
| ------- | ------------------ |
| latest  | :white_check_mark: |

## Reporting a Vulnerability

If you discover a security vulnerability in A1, **please do not open a public GitHub issue**.

Instead, please report it privately using one of the following methods:

1. **GitHub Private Vulnerability Reporting** – Use the
   [Security tab → "Report a vulnerability"](../../security/advisories/new)
   button in this repository.
2. **Email** – Send details to the repository owner directly via their GitHub
   profile contact information.

Please include as much detail as possible:

- A description of the vulnerability and its potential impact
- Steps to reproduce the issue
- Any proof-of-concept code or screenshots

You can expect an initial response within **48 hours** and a resolution or
status update within **7 days**.

## Security Best Practices for Contributors

- Never commit secrets, API keys, tokens, or passwords to the repository.
- Keep all dependencies up to date (Dependabot alerts are enabled).
- All pull requests require a passing CodeQL scan before merging.
- All pull requests require at least one owner approval (see `CODEOWNERS`).
