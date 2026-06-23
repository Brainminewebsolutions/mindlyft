import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";

export default function Project(){
    return(
        <>
  {/* Project Section Start */}
  <div style={{ backgroundColor: "rgb(220, 243, 252)" }}>
  <div
  className="container style-one pt-130"
>
    <div className="flex flex-wrap items-center mb-40">
      <div className="w-full md:w-8/12 xl:w-1/2">
        <span
          className="block fs-14 font-bold ls-15 text_primary mb-12"
          data-cue="slideInUp"
        >
          PROJECTS
        </span>
        <h2
          className="section-title style-one font-medium text-title"
          data-cue="slideInUp"
          data-delay={400}
        >
          Smart Robotic Assembly Line Automation For Global Electronics
        </h2>
      </div>
      <div className="w-full md:w-4/12 xl:w-1/2">
        <div
          className="slider-btn style-three flex flex-wrap items-center md:justify-end"
          data-cue="slideInUp"
        >
          <button className="prev-btn project-prev relative border-0 mr-2 flex flex-col items-center justify-center rounded-full">
            <ArrowLeft size={18} />
          </button>
          <button className="next-btn project-prev relative border-0 ml-2 flex flex-col items-center justify-center rounded-full">
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  </div>
  <div className="container-fluid pb-130" >
    <div className="project-slider-one swiper" data-cue="slideInUp" style={{ backgroundColor: "rgb(252, 252, 252)" }}>
      <div className="swiper-wrapper">
        <div className="swiper-slide">
          <div className="project-card style-one relative z-[1]">
            <div className="project-bg bg-f bg-1 absolute top-0 left-0 w-full h-full" />
            <span className="project-counter">01</span>
            <div className="project-info flex flex-wrap items-end justify-between">
              <div >
                <a
                  href="projects.html"
                  className="project-category inline-block fs-15 font-medium round-oval"
                >
                  Automation
                </a>
                <h3 className="fs-24 font-semibold mb-0">
                  <a
                    href="project-single.html"
                    className="text-black link-hover-white trasnition"
                  >
                    Industrial Automation
                  </a>
                </h3>
              </div>
              <a
                href="project-single.html"
                className="project-link flex flex-col items-center justify-center rounded-full bg_primary"
              >
                <ArrowUpRight size={18} />
              </a>
            </div>
          </div>
        </div>
        <div className="swiper-slide">
          <div className="project-card style-one relative z-[1]">
            <div className="project-bg bg-f bg-2 absolute top-0 left-0 w-full h-full" />
            <span className="project-counter">02</span>
            <div className="project-info flex flex-wrap items-end justify-between">
              <div>
                <a
                  href="projects.html"
                  className="project-category inline-block fs-15 font-medium round-oval"
                >
                  Robotics
                </a>
                <h3 className="fs-24 font-semibold mb-0">
                  <a
                    href="project-single.html"
                    className="text-black link-hover-white trasnition"
                  >
                    Surgical Robotics
                  </a>
                </h3>
              </div>
              <a
                href="project-single.html"
                className="project-link flex flex-col items-center justify-center rounded-full bg_primary"
              >
                <ArrowUpRight size={18} />
              </a>
            </div>
          </div>
        </div>
        <div className="swiper-slide" >
          <div className="project-card style-one relative z-[1]">
            <div className="project-bg bg-f bg-3 absolute top-0 left-0 w-full h-full" />
            <span className="project-counter">03</span>
            <div className="project-info flex flex-wrap items-end justify-between">
              <div>
                <a
                  href="projects.html"
                  className="project-category inline-block fs-15 font-medium round-oval"
                >
                  Automation
                </a>
                <h3 className="fs-24 font-semibold mb-0">
                  <a
                    href="project-single.html"
                    className="text-black link-hover-white trasnition"
                  >
                    Advances Sensors
                  </a>
                </h3>
              </div>
              <a
                href="project-single.html"
                className="project-link flex flex-col items-center justify-center rounded-full bg_primary"
              >
                <ArrowUpRight size={18} />
              </a>
            </div>
          </div>
        </div>
        <div className="swiper-slide">
          <div className="project-card style-one relative z-[1]">
            <div className="project-bg bg-f bg-4 absolute top-0 left-0 w-full h-full" />
            <span className="project-counter">04</span>
            <div className="project-info flex flex-wrap items-end justify-between">
              <div>
                <a
                  href="projects.html"
                  className="project-category inline-block fs-15 font-medium round-oval"
                >
                  Automation
                </a>
                <h3 className="fs-24 font-semibold mb-0">
                  <a
                    href="project-single.html"
                    className="text-black link-hover-white trasnition"
                  >
                    Autonomous Vehicles
                  </a>
                </h3>
              </div>
              <a
                href="project-single.html"
                className="project-link flex flex-col items-center justify-center rounded-full bg_primary"
              >
                <ArrowUpRight size={18} />
              </a>
            </div>
          </div>
        </div>
        <div className="swiper-slide">
          <div className="project-card style-one relative z-[1]">
            <div className="project-bg bg-f bg-5 absolute top-0 left-0 w-full h-full" />
            <span className="project-counter">05</span>
            <div className="project-info flex flex-wrap items-end justify-between">
              <div>
                <a
                  href="projects.html"
                  className="project-category inline-block fs-15 font-medium round-oval"
                >
                  AI Technology
                </a>
                <h3 className="fs-24 font-semibold mb-0">
                  <a
                    href="project-single.html"
                    className="text-black link-hover-white trasnition"
                  >
                    Machine Learning
                  </a>
                </h3>
              </div>
              <a
                href="project-single.html"
                className="project-link flex flex-col items-center justify-center rounded-full bg_primary"
              >
                <ArrowUpRight size={18} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  </div>
  {/* Project Section End */}
</>

    );
}
