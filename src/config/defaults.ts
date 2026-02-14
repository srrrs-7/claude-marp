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
  size: "16:9"
  paginate: true
  header: ""
  footer: ""
  style: ""               # Custom CSS

content:
  codeBlocks: true
  codeLanguage: "typescript"
  mermaidDiagrams: true
  bulletPointsMax: 5
  speakerNotes: true

output:
  dir: "./docs"
  baseName: ""            # Empty = auto-generate from topic
`;
