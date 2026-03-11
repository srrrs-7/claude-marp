export const defaultConfigYaml = `# Marp Slide Generator Configuration
topic: "Your Presentation Topic"
audience: "developers"
goal: "Explain the core concepts and practical usage"
language: "ja"

slides:
  count: 10
  includeTableOfContents: true
  includeTitleSlide: true
  includeSummarySlide: true

marp:
  theme: "gaia"           # gaia | default | uncover
  class: "invert"         # invert = dark mode (gaia only); remove for light mode
  size: "16:9"
  paginate: true
  header: ""
  footer: ""
  style: |
    /* Note: overflow prevention + readability base CSS is auto-injected by the
       render pipeline (markdown.ts BASE_CSS). Add only presentation-specific
       overrides here. */
    section pre code {
      font-size: 0.56em;   /* slightly smaller than base 0.58em for long code */
      line-height: 1.35;
    }

content:
  codeBlocks: true
  codeLanguage: "typescript"
  bulletPointsMax: 5
  speakerNotes: true

output:
  # IMPORTANT: Paths are resolved from the command execution directory (usually project root)
  # For /create-slides workflow: use "docs/<timestamp>_<title>" to output inside project directory
  # For standalone use: use "./docs" or absolute path
  dir: "./docs"
  baseName: ""            # Empty = auto-generate from topic
`;
