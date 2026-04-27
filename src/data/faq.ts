export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface FAQCategory {
  title: string;
  items: FAQItem[];
}

export const FAQ_DATA: FAQCategory[] = [
  {
    title: "General",
    items: [
      {
        id: "gen-1",
        question: "What is Spatial Intelligence",
        answer: "To be updated"
      },
      {
        id: "gen-2",
        question: "How does Godel Technologies differ from other AI services company",
        answer: "To be updated"
      },
      {
        id: "gen-3",
        question: "Who is Godel's typical client",
        answer: "To be updated"
      },
      {
        id: "gen-4",
        question: "Show me an example",
        answer: "https://www.youtube.com/watch?v=APVdaQKvoyg"
      },
      {
        id: "gen-5",
        question: "How do I contact Godel",
        answer: "To be updated"
      }
    ]
  },
  {
    title: "Services & Engagement",
    items: [
      {
        id: "serv-1",
        question: "What services does Godel offer",
        answer: "To be updated"
      },
      {
        id: "serv-2",
        question: "How do I start a project with Godel",
        answer: "To be updated"
      },
      {
        id: "serv-3",
        question: "What Industries have you worked with",
        answer: "Architecture, Agritech, and a few more"
      }
    ]
  },
  {
    title: "Technical and Implementation",
    items: [
      {
        id: "tech-1",
        question: "How will you integrate your solution with our current system: ",
        answer: "SaaS product, on-premise tool based on your "
      },
      {
        id: "tech-2",
        question: "How will you integrate your solutions with our existing system",
        answer: "To be updated"
      },
      {
        id: "tech-3",
        question: "What is involved in an Audit",
        answer: "To be updated"
      }
    ]
  },
  {
    title: "MVP & Prototypes",
    items: [
      {
        id: "mvp-1",
        question: "How fast can you deliver an MVP?",
        answer: "To be updated"
      },
      {
        id: "mvp-2",
        question: "How production-ready are the MVPs",
        answer: "To be updated"
      }
    ]
  },
  {
    title: "Pricing & Engagement Model",
    items: [
      {
        id: "price-1",
        question: "How is pricing structured?",
        answer: "To be updated"
      },
      {
        id: "price-2",
        question: "What are your typical engagement models?",
        answer: "To be updated"
      }
    ]
  }
];
