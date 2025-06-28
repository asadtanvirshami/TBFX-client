import React from 'react'
import { Button } from '../button'

const HeroSection = () => {
    return (
        <div className='w-[50rem]'>
            <div>
                <h1 aria-label='title' className='text-[4rem] text-wrap font-semibold'>Optimize your trading with effective visual backtesting.</h1>
                <desc aria-label='desc' className='text-[2.5rem]'>Analyze, record and improve operations with real data & accurate tools.</desc>
            </div>
            <div className='mt-5'>
                <Button size={'lg'} className=' bg-gradient-to-tr from-pink-500 via-pin-500 to-pink-500 dark:text-white light:text-black'>Subscribe</Button>
            </div>
        </div>
    )
}

export default HeroSection
