# Phoenix 2.0 - Next.js Template for Tavus CVI

A modern, customizable Next.js template designed for building applications with Tavus Conversational Video Intelligence (CVI) service integration.

## Features

- 🚀 Built with Next.js 14
- 💅 Styled with Tailwind CSS
- 🎨 Customizable UI components using shadcn/ui
- 🔄 Framer Motion animations
- 🌐 Dead simple API route setup for Tavus integration
- 📱 Responsive design
- 🎯 TypeScript support
- 🛠 Development tools configured (ESLint, Prettier)

## Quick Start

1. Clone this template:
```bash
npx create-next-app@latest your-app-name -e https://github.com/yourusername/phoenix-template
```

2. Install dependencies:
```bash
cd your-app-name
npm install
```

3. Configure your Tavus API key:

Create a `.env.local` file in the root directory:
```bash
TAVUS_API_KEY=your_api_key_here
```

Alternatively, if deploying to Vercel or another hosting platform, add `TAVUS_API_KEY` as an environment variable in your deployment settings.

> ⚠️ **Important**: Never commit your `.env.local` file to version control. It's already included in `.gitignore` for your security.

4. Start the development server:
```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see your application.

## Project Structure

```
├── app/
│   ├── api/          # API routes
│   ├── components/   # UI components
│   ├── lib/          # Utility functions
│   └── styles/       # Global styles
├── public/           # Static assets
└── types/           # TypeScript types
```

## Customization

This template uses shadcn/ui components which can be customized in the `components/ui` directory. The main theme and styling can be adjusted in `tailwind.config.ts`.

## Deployment

Deploy your application using [Vercel](https://vercel.com/new?utm_source=github&utm_medium=readme&utm_campaign=next-example):

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/phoenix-template)

## Learn More

To learn more about the technologies used in this template:

- [Next.js Documentation](https://nextjs.org/docs)
- [Tavus API Documentation](https://docs.tavus.io)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [shadcn/ui](https://ui.shadcn.com)
- [Framer Motion](https://www.framer.com/motion/)

## License

MIT © [Your Name]
