import {ArrowUpRight, Lock} from "lucide-react";
import Link from "next/link";
import { SectionBadge } from "@/components/ui/SectionBadge";
import { Subheading } from "@/components/ui/Subheading";
import { AnimateIn } from "@/components/ui/AnimateIn";

export default function AiItSolutions(){
    return(
         <div className="relative z-[1] mx-[13px] rounded-[20px] bg-[#ddd] bg-[url('/assets/img/cta-bg-1.jpg')] bg-cover bg-center bg-no-repeat py-[60px] md:py-20 min-[992px]:py-[100px] min-[1200px]:py-[120px] min-[1920px]:mx-[182px] max-md:after:absolute max-md:after:inset-0 max-md:after:z-[-1] max-md:after:bg-white/50 max-md:after:content-['']">
                <div className="mx-auto w-full px-3 min-[576px]:max-w-[540px] min-[768px]:max-w-[720px] min-[992px]:max-w-[960px] min-[1200px]:max-w-[1140px] min-[1400px]:max-w-[1300px]">
                  <div className="flex flex-wrap items-center">
                    <div className="w-full md:w-1/2 2xl:w-5/12 2xl:pr-12 md:mb-[30px] text-center md:text-left">
                      <SectionBadge variant="dark">AI &amp; IT Solutions</SectionBadge>
                      <AnimateIn direction="up" delay={300}>
                        <Subheading
                          className="mb-0"
                          text="Ready to Experience AI-Powered Cybersecurity That Works"
                        />
                      </AnimateIn>
                    </div>
                    <div className="w-full md:w-1/2 2xl:w-1/2 2xl:ml-[8.333%]">
                      <style>{`
                        @keyframes spinCTA { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
                      `}</style>
                      <Link href="/ai-it-solutions" className="group rounded-full relative md:ml-auto h-[155px] w-[155px] md:h-[185px] md:w-[185px] min-[992px]:h-[231px] min-[992px]:w-[227px] flex items-center justify-center cursor-pointer">
                        {/* Center arrow */}
                        <div  className="absolute inset-0 flex flex-col items-center justify-center z-10">
                          <div style={{backgroundColor:"var(--color-violet-600)"}} className="flex items-center justify-center w-10 h-10 rounded-full transition-colors duration-200 group-hover:bg-violet-600">
                            <ArrowUpRight style={{color:"white"}} size={22} className="text-violet-500 transition-colors duration-200 group-hover:text-white" />
                          </div>
                        </div>
                        {/* Rotating SVG text */}
                        <svg viewBox="0 0 160 160" className="w-full h-full" style={{ animation: "spinCTA 10s linear infinite" }}>
                          <defs>
                            <path id="ctaCirclePath" d="M 80,80 m -60,0 a 60,60 0 1,1 120,0 a 60,60 0 1,1 -120,0" />
                          </defs>
                          <text style={{ fontSize: 11, fontWeight: 600 }}>
                            <textPath href="#ctaCirclePath" startOffset="0%" fill="#8B5CF6">
                              AI &amp; IT SOLUTIONS • MINDLYFTAI • EXPLORE NOW •&nbsp;
                            </textPath>
                          </text>
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
    )
}