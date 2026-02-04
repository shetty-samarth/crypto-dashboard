import React from 'react'

const page = async ({params}: NextPageProps) => {
    const {id} = await params;
  return (
    <div>Details for {id}</div>
  )
}

export default page