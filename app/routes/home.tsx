import type { Route } from './+types/home'

// eslint-disable-next-line no-empty-pattern
export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Life Tracking' },
    { name: 'description', content: 'Welcome to Life Tracking' },
  ]
}

export default function Home() {
  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <img src="icon.svg" alt="Life Tracking Icon" className="mb-4 w-24 h-24" />
      <h1 className="text-2xl">Coming Soon</h1>
    </div>
  )
}
