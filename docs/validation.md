# Validation scope

Run `node scripts/validate.mjs` from any directory; the default root is resolved from the script location. An optional directory argument validates another checkout or test fixture. Run `node --test scripts/validate.test.mjs scripts/install.test.mjs` for regression tests.

The validator checks the required 17 skills, supported frontmatter subset, required docs/resources, relative Markdown file links (inline and reference style), local heading anchors, and generated tree freshness. It ignores fenced code, external URLs, and inline code. It is a lightweight repository validator, not a general Markdown or YAML parser: this kit permits only top-level name, description, and license scalar fields. Standard skills can support additional metadata; extending this kit's schema requires extending its validator. HTML links and dynamically constructed references are outside scope. External URL reachability is not tested in CI.

The installer tests copy self-contained references, dry-run behavior, conflict prevention, and invalid-agent/target rejection. No global configuration or actual client process is changed by the tests. CI is configured for Windows and Linux; local results do not prove remote CI succeeded.

[Validation results](validation-results.md) records commands actually executed in this generation session. Re-run checks after edits. Use `node scripts/tree.mjs --write` to refresh the complete tree; `node scripts/tree.mjs` prints it.
