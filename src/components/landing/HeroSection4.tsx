import { GridBackground } from "@/components/background/philharmony-background"
import Hero from "../../../public/Assets/SVG/ViconiaLogoQueroBG.svg"
import Image from "next/image"
export default function Page() {
  return (
    <div className="relative min-h-screen">
      <GridBackground />
      <div className="relative z-10 flex items-center justify-center min-h-screen">
        <div className="w-full max-w-7xl mx-auto p-8 bg-teal-900/10">
          <div className="w-full flex flex-col items-center justify-center">
          <Image src={Hero} alt="Hero Image"  width={1200} className="bg-stone-300 rounded-lg p-7 "/>
        </div>
          
        </div>
      </div>
    </div>
  )
}