import React from 'react'
import Image from 'next/image'
import HeroImage from '../../../public/Assets/SVG/ViconiaLogoQueroBG.svg'

const HeroSection5 = () => {
  return (
    <section className='relative w-full min-h-screen flex flex-col items-center justify-center'>
      <Image
        src="/Assets/SVG/Herobg.svg"
        alt=""
        fill
        className='object-cover opacity-10'
      />
      <div className='flex flex-col items-center '>
        <Image src={HeroImage} alt="Hero Section 5" className='lg:p-96 size-[80vw] relative top-[-20vh]'/>
      </div>
     

    </section>
  )
}

export default HeroSection5