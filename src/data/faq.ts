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
        question: "What is Spatial Intelligence?",
        answer: `<p>Spatial Intelligence uses AI to interpret, analyse and optimise spatial data such as geometry, point-cloud and Geo-spatial information.</p>`
      },
      {
        id: "gen-2",
        question: "How does Godel Technologies differ from other AI services companies?",
        answer: `<p>Our core strength is rooted in deep R&D and first-principles thinking across advanced technical domains like 3D modeling, computer vision, geometry, and mathematical modeling.</p><p>We specialize in engineering sophisticated systems that solve complex challenges requiring high precision and deep contextual understanding. By building custom frameworks and integrating advanced AI, we translate fundamental research into powerful, scalable solutions for high-stakes business and industrial problems.</p>`
      },
      {
        id: "gen-3",
        question: "Who is Godel's typical client?",
        answer: `<p>We partner with ambitious startups and tech-driven teams who may not have the resources for a full-scale tech team until their MVP is launched, or who want to rapidly validate new products in the market without committing to large R&D budgets.</p>`
      },
      {
        id: "gen-4",
        question: "Can you show me an example?",
        answer: `https://www.youtube.com/watch?v=APVdaQKvoyg`
      },
      {
        id: "gen-5",
        question: "How do I contact Godel?",
        answer: `<p>Email us at <a href="mailto:info@godeltech.in" class="text-[#FF4A22] hover:underline transition-colors font-medium">info@godeltech.in</a> or schedule a call via our meeting link in Contact page.</p>`
      }
    ]
  },
  {
    title: "Services & Engagement",
    items: [
      {
        id: "serv-1",
        question: "What services does Godel offer?",
        answer: `<p>We deliver MVPs across a various domains, we audit your current AI pipeline and optimise it for speed/accuracy, and we prototype your research solutions.</p>`
      },
      {
        id: "serv-2",
        question: "How do I start a project with Godel?",
        answer: `<p>Contact us via our email <a href="mailto:info@godeltech.in" class="text-[#FF4A22] hover:underline transition-colors font-medium">info@godeltech.in</a> or schedule an introductory call to discuss your requirements and receive a tailored solution proposal.</p>`
      },
      {
        id: "serv-3",
        question: "What industries have you worked with?",
        answer: `<p>We have delivered solutions across Manufacturing, AEC, Healthcare and automotive industries.</p>`
      }
    ]
  },
  {
    title: "Technical and Implementation",
    items: [
      {
        id: "tech-1",
        question: "How will you integrate your solution with our current system?",
        answer: `<p>SaaS product, on-premise tool based on your requirements.</p>`
      },
      {
        id: "tech-2",
        question: "How will you integrate your solutions with our existing system?",
        answer: `<p>We offer free compatibility audits to gauge the ease of integration with your current pipeline. Post which we will have a customised solution developed for your case.</p>`
      },
      {
        id: "tech-3",
        question: "What is involved in an Audit?",
        answer: `<p>We ask for a live demo of your product and development methodologies and provide a report on scope for improvement to get better accuracy, productivity and cost saving.</p>`
      }
    ]
  },
  {
    title: "MVP & Prototypes",
    items: [
      {
        id: "mvp-1",
        question: "How fast can you deliver an MVP?",
        answer: `<p>The MVPs are broken into smaller milestones and early results are shared in less than 4 weeks. The full MVP delivery depends on the scope of the project.</p>`
      },
      {
        id: "mvp-2",
        question: "How production-ready are the MVPs?",
        answer: `<p>We build scalable, extensible MVPs with clear developer documentation. While it cannot be compared to production grade robustness, it can be easily iterated upon and scaled.</p>`
      }
    ]
  },
  {
    title: "Pricing & Engagement Model",
    items: [
      {
        id: "price-1",
        question: "How is pricing structured?",
        answer: `<div class="space-y-4">
  <div>
    <strong class="text-black font-semibold">Pipeline Optimization Projects:</strong>
    <p class="mt-1">Pricing is tailored on a per-project basis. We provide a detailed breakdown of tasks and milestones upfront, and we're flexible in allowing you to take on certain deliverables within your own team to further optimize for speed and cost.</p>
  </div>
  <div>
    <strong class="text-black font-semibold">Audit Engagements:</strong>
    <p class="mt-1">These projects are billed using a fixed hourly rate, offering transparency and predictability for process reviews and technical assessments.</p>
  </div>
  <div>
    <strong class="text-black font-semibold">Research & Prototyping Initiatives:</strong>
    <p class="mt-1">For exploratory work where prototypes may not have an immediate market presence, we offer an IP-sharing model to foster long-term collaboration, aligning incentives and supporting shared growth as the technology matures.</p>
  </div>
</div>`
      },
      {
        id: "price-2",
        question: "What are your typical engagement models?",
        answer: `<p>Yes, we provide post-delivery support, maintenance, and scale-up options tailored to your growth phase.</p>`
      }
    ]
  }
];
