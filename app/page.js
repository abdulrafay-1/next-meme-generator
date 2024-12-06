import React from 'react'
import MemeCard from './components/MemeCard'
import Link from 'next/link'
import fetchMemes from './utils/fetchMemes'

const Home = async () => {
  const data = await fetchMemes()
  return (
    <div className="min-h-screen bg-gray-800 text-gray-300">
      <header className="py-6 bg-gray-900 text-center">
        <h1 className="text-3xl font-bold text-indigo-400">
          Memes Generator
        </h1>
      </header>
      <main className="p-6">
        <div className="columns-xs">
          {data.data.memes.map((meme) => (
            <Link key={meme.id} href={`/meme/${meme.id}`} prefetch={false}>
              <MemeCard meme={meme} />
            </Link>
          ))}
        </div>
      </main>
    </div>

  )
}

export default Home