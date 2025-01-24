import * as React from 'react'

const faq = {
  title: 'Frequently Asked Questions',
  items: [
    {
      q: 'How does the AI-powered time tracking work?',
      a: (
        <>
          Our AI analyzes your activities and context to automatically categorize and track your time across tasks, projects, and clients. You can also manually adjust entries for accuracy if needed. <br />
          It's designed to make time tracking effortless and more accurate.
        </>
      ),
    },
    {
      q: 'Can I use this tool for tracking multiple projects?',
      a: 'Absolutely! Our tool is built to handle multiple projects seamlessly. You can track time across various projects, assign clients, tags, and even add descriptions for each timer.',
    },
    {
      q: 'Is my data secure?',
      a: 'Yes, we take data security very seriously. Your data is encrypted both in transit and at rest. We also follow industry best practices to ensure your information is safe and secure.',
    },
    {
      q: 'Does the tool support team collaboration?',
      a: 'Yes, our tool supports team features like shared projects, team member tracking, and reporting, so you can collaborate effectively with your team while maintaining visibility over individual contributions.',
    },
    {
      q: 'Can I integrate this tool with other apps?',
      a: 'Yes, we offer integrations with popular tools like Google Calendar, Slack, Trello, and more. Our API is also available for custom integrations.',
    },
    {
      q: 'Does the tool work offline?',
      a: 'Yes, you can track your time offline, and the data will sync automatically when you’re back online. This ensures you never miss tracking important tasks, even without an internet connection.',
    },
    {
      q: 'Is there a free version available?',
      a: 'Yes, we offer a free version with core features. For advanced features like AI-based time suggestions, team collaboration, and detailed analytics, you can upgrade to a premium plan.',
    },
  ],
}

export default faq
