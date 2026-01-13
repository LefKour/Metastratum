import Link from "next/link";
import InteractiveHeightmapGrid from '@/app/(components)/InteractiveHeightmapGrid';

export default function Home() {
  return (
      <main className="w-full h-full flex justify-between bg-[#0A0A0A]">
        {/*Background*/}
        <InteractiveHeightmapGrid />

        {/*Panel*/}
        <div
          className="absolute left-1/2 -translate-x-1/2 translate-y-1/8 h-3/4 w-full md:w-1/2
          flex flex-col justify-center gap-2 bg-radial from-[#0A0A0A] from-60% to-[#0A0A0A]/0 gap-12"
        >

          {/*Title Block*/}
          <div className={"flex flex-col justify-center text-7xl font-bold text-center"}>
            <p className='relative inline-block group'>
              <span className='text-neutral-400'>Locate.</span>
              <span className='absolute inset-0 bg-gradient-to-t from-neutral-500 to-neutral-200
              text-transparent bg-clip-text opacity-0 group-hover:opacity-100 transition-opacity
              duration-300 ease-in-out'>Locate.</span>
            </p>
            <p className='relative inline-block group'>
              <span className='text-neutral-200'>Analyze.</span>
              <span className='absolute inset-0 bg-gradient-to-t from-neutral-500 to-neutral-200
              text-transparent bg-clip-text opacity-0 group-hover:opacity-100 transition-opacity
               duration-300 ease-in-out'>Analyze.</span>
            </p>
            <p className='relative inline-block group'>
              <span className='text-neutral-500'>Export.</span>
              <span className='absolute inset-0 bg-gradient-to-t from-neutral-500 to-neutral-200
              text-transparent bg-clip-text opacity-0 group-hover:opacity-100 transition-opacity
              duration-300 ease-in-out'>Export.</span>
            </p>
          </div>

          {/*Subheading*/}
          <p className="text-lg font-light px-20 text-center">
            Metastratum is a web platform for terrain exploration and analysis.
            It allows performing different types of DEM analysis on extracted
            terrains, visualization and export in different formats.
          </p>

          {/*Launch Button*/}
          <Link href="map_selection"
                className="w-fit mx-auto px-4 py-2 text-2xl font-bold rounded-xl border border-gray-300 bg-linear-135 from-gray-300/20
                to-black/20 backdrop-blur-lg hover:cursor-pointer hover:outline hover:outline-2 hover:outline-white hover:outline-offset-0
                transition duration-150 ease-in-out">
            Start
          </Link>
        </div>
      </main>
  );
}
