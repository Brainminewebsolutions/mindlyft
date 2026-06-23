import {ArrowUpRight, Lock} from "lucide-react";
import Link from "next/link";

export default function CallToAction(){
    return(
         <div className="cta-area style-two bg-f relative z-[1] ptb-130 round-20">
                <div className="container style-one">
                  <div className="flex flex-wrap items-center">
                    <div className="w-full md:w-1/2 2xl:w-5/12 2xl:pr-12 md:mb-[30px]">
                      <span
                        className="section-subtitle style-two fs-13 font-medium ls-1 inline-block bg-gradient-to-r from-violet-600 to-blue-500 text-white round-oval mb-15"
                        data-cue="slideInUp">
                         AI &amp; IT Solutions
                      </span>
                      <h2
                        className="section-title style-one text-title font-medium mb-0"
                        data-cue="slideInUp"
                        data-delay="300">
                        Ready to Experience AI-Powered Cybersecurity That Works
                      </h2>
                    </div>
                    <div className="w-full md:w-1/2 2xl:w-1/2 2xl:ml-[8.333%]">
                      <style>{`
                        @keyframes spinCTA { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
                      `}</style>
                      <Link href="/ai-it-solutions" className="circle-text-wrap group rounded-full relative md:ml-auto w-[160px] h-[160px] flex items-center justify-center cursor-pointer">
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