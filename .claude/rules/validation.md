---
description: Pre-flight validation checklist for slide generation
paths:
  - "**/slides-data.json"
  - "**/slides.config.yaml"
---

# Validation Rules

## 🔴 Critical: Always Execute Before Generation

### Schema Validation

**Before creating any slides-data.json:**

1. **Read the schema first**: `src/generate/slide-schema.ts`
2. **Verify field names**: Use `content`, not `bullets`
3. **Check layout enum**: Only `"default"`, `"center"`, or `"section"`
4. **Understand structure**: Required vs optional fields

### Directory Structure Validation

**Before creating any slides.config.yaml:**

1. **Use full paths**: `output.dir: "docs/<timestamp>_<slug>"`
2. **Never use relative paths**: Avoid `"."` or `"./"`
3. **Timestamp format**: `yyyymmddhhmmss` (14 digits)
4. **Slug format**: Lowercase, hyphens only

### Post-Generation Validation

**Before writing slides-data.json to disk:**

1. Validate JSON structure against schema
2. If validation fails, fix and retry
3. After 3 failures, stop and report to user
4. Only write file after validation passes

## Validation Checklist

**Pre-Generation:**
- [ ] Schema file read and understood
- [ ] Valid field names memorized
- [ ] Layout enum values confirmed
- [ ] Directory structure rules reviewed

**During Generation:**
- [ ] Using correct field names (`content`, not `bullets`)
- [ ] Layout values are from enum only
- [ ] Full path used for `output.dir`
- [ ] Timestamp prefix included

**Post-Generation:**
- [ ] JSON validated against schema
- [ ] No validation errors
- [ ] File written to correct location
- [ ] Directory structure is correct

## Error Recovery

**If validation fails:**

1. Identify error type (field name, enum value, structure)
2. Fix the specific issue
3. Re-validate
4. Report fix to user
5. Continue only after validation passes

## Common Errors and Fixes

### Error: Invalid field name "bullets"

```diff
- "bullets": ["Item 1", "Item 2"]
+ "content": ["Item 1", "Item 2"]
```

### Error: Invalid layout value "custom"

```diff
- "layout": "custom"
+ "layout": "default"
```

### Error: Relative path in output.dir

```diff
- output.dir: "."
+ output.dir: "docs/20260214153045_example"
```

### Error: Missing timestamp prefix

```diff
- output.dir: "docs/example"
+ output.dir: "docs/20260214153045_example"
```
