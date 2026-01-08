import React from 'react'
import Image from 'next/image'
import DataTable from '@/components/DataTable'

const page = () => {
  
  return (
    <main className='main-container'>
      <section className='home-grid'>
        <div id='coin-overview'>
          <div className='header'>
            <Image src="https://assets.coingecko.com/coins/images/1/large/bitcoin.png" alt="Bitcoin" width={56} height={56} />
            <div className='info'>
              <p>Bitcoin /</p>
              <h1>$27,000</h1>
          </div>
          </div>

        </div>
        <p>Trending Coins</p>
        <DataTable />
      </section>
      <section className='w-full mt-7 space-y-4'>
        <p>Categories</p>
      </section>
    </main>
  )
}

export default page