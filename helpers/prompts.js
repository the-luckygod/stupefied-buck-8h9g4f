const prompts = [
  {
    name: "Article Essay Writer",
    subtitle:
      "Input the title to your article or essay, we'll generate the rest.",
    basePrompt: `
        Write me a short article or essay with title for about:
        `,
  },
  {
    name: "Summarizer",
    subtitle: "Input the text you want to summarize.",
    basePrompt: `
        Summarize the text below.
        Text:
        `,
  },
  {
    name: "Proof Reader",
    subtitle: "Input the text you want to proof read.",
    basePrompt: `
        Proofread and autocorrect this text.
        Text:
        `,
  },
];

export default prompts;
