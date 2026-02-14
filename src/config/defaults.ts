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
  style: |
    /* コードブロックのフォントサイズを縮小してはみ出しを防ぐ */
    section pre code {
      font-size: 0.6em;
      line-height: 1.4;
    }

    /* Mermaid図解をスライドに収める */
    section .mermaid {
      display: flex;
      justify-content: center;
      align-items: center;
      max-height: 70vh;
      max-width: 100%;
    }

    section .mermaid svg {
      max-width: 100%;
      max-height: 70vh;
      height: auto;
      width: auto;
    }

content:
  codeBlocks: true
  codeLanguage: "typescript"
  mermaidDiagrams: true
  bulletPointsMax: 5
  speakerNotes: true

output:
  # IMPORTANT: Paths are resolved from the command execution directory (usually project root)
  # For /create-slides workflow: use "docs/<timestamp>_<title>" to output inside project directory
  # For standalone use: use "./docs" or absolute path
  dir: "./docs"
  baseName: ""            # Empty = auto-generate from topic
`;
