# Tavus Conversational Video Template - Next.js Template for Tavus CVI

A modern, customizable Next.js template designed for building applications with [Tavus](https://www.tavus.io/) Conversational Video Intelligence (CVI) service integration. The [Conversational Video Interface (CVI)](https://www.tavus.io/product/conversational-video) enables you to build video conversations with digital twins that can speak, see, and hear - with response times under 600ms. This template provides everything you need to get started with Tavus CVI integration.

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

You can start using this template in one of two ways:

### Option 1: Using create-next-app

```bash
npx create-next-app@latest your-app-name -e https://github.com/alexbehrens/tavus-public-template
```

### Option 2: Using Git

```bash
# Clone the repository
git clone https://github.com/alexbehrens/tavus-public-template.git your-app-name

# Navigate to the project directory
cd your-app-name

# Remove the existing git history
rm -rf .git

# Initialize a new git repository
git init
```

Then, for both options:

1. Install dependencies:
```bash
npm install
```

2. Configure your Tavus API key:

Create a `.env.local` file in the root directory:
```bash
TAVUS_API_KEY=your_api_key_here
```

You can obtain your API key from the [Tavus Developer Portal](https://docs.tavus.io/sections/introduction). For more information about API setup and usage, refer to the [Tavus Documentation](https://docs.tavus.io/sections/introduction).

3. Update Persona IDs:

> ⚠️ **Important**: Before running the application, you need to replace the replica and persona IDs in `app/page.tsx` with your own IDs from the Tavus platform. The current IDs are placeholders and won't work:

```typescript
const REPLICA_IDS = {
  Alice: 'your_replica_id_here',
  Brian: 'your_replica_id_here',
  Greg: 'your_replica_id_here'
} as const;

const PERSONA_IDS = {
  Doctor: 'your_persona_id_here',
  Therapist: 'your_persona_id_here',
  Mechanic: 'your_persona_id_here',
  PersonalTrainer: 'your_persona_id_here',
  Tutor: 'your_persona_id_here'
} as const;
```

You can find your replica and persona IDs in the [Tavus Developer Portal](https://docs.tavus.io/sections/introduction).

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

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/alexbehrens/tavus-public-template)

## Learn More

To learn more about the technologies used in this template:

- [Next.js Documentation](https://nextjs.org/docs)
- [Tavus Documentation](https://docs.tavus.io/sections/introduction)
- [Tavus CVI Overview](https://www.tavus.io/product/conversational-video)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [shadcn/ui](https://ui.shadcn.com)
- [Framer Motion](https://www.framer.com/motion/)

## License

MIT © Tavus Inc.
