import { Lock, Bug, ShieldCheck, Unlock, AlertTriangle } from "lucide-react";

export default function CYBERSECURITYFEATURES() {
    return (
        <>
         <div className="container style-one pt-130 pb-100">
        <div className="flex flex-wrap">
          <div className="w-full md:w-10/12 md:ml-[8.333%] xl:w-8/12 xl:ml-[16.666%] text-center 2xl:px-12">
            <span
              className="section-subtitle style-two bg_secondary fs-13 font-medium ls-1 text-black inline-block bg_primary round-oval mb-15"
              data-cue="slideInUp">
              <Lock size={14} />
              AIXIO AI CYBERSECURITY FEATURES
            </span>
            <h2
              className="section-title style-one font-secondary font-medium text-center mb-40"
              data-cue="slideInUp"
              data-delay="400">
              Zero Trust Access Control For Safer User Authentication & Access
            </h2>
          </div>
        </div>
        <div className="flex flex-wrap justify-center relative z-[1]">
          <div
            className="w-full md:w-1/2 xl:w-1/4 2xl:pr-12"
            data-cue="slideInUp">
            <div className="feature-card style-two mb-30">
              <div className="feature-icon flex flex-col items-center justify-center relative z-[1] round-10">
                <Bug size={32} className="transition" />
              </div>
              <h3 className="fs-20 font-semibold 2xl:pr-12">
                Real-Time Threat Detection
              </h3>
              <p className="mb-0">
                Real-time scanning and pattern recognition to evolving in
                threats before.
              </p>
            </div>
          </div>
          <div
            className="w-full md:w-1/2 xl:w-1/4 2xl:pl-12 2xl:pr-6"
            data-cue="slideInUp">
            <div className="feature-card style-two mb-30">
              <div className="feature-icon flex flex-col items-center justify-center relative z-[1] round-10">
                <ShieldCheck size={32} className="transition" />
              </div>
              <h3 className="fs-20 font-semibold 2xl:pr-12">
                Predictive Risk Analytics
              </h3>
              <p className="mb-0">
                Automatically contain and neralize cyberattacks minimal human
                intervention.
              </p>
            </div>
          </div>
          <div
            className="w-full md:w-1/2 xl:w-1/4 2xl:pl-12 2xl:pr-6"
            data-cue="slideInUp">
            <div className="feature-card style-two mb-30">
              <div className="feature-icon flex flex-col items-center justify-center relative z-[1] round-10">
                <Unlock size={32} className="transition" />
              </div>
              <h3 className="fs-20 font-semibold 2xl:pr-12">
                Autonomous Incident Response
              </h3>
              <p className="mb-0">
                Comprehensive protection for AWS Azure Google Cloud & hybrid
                environments.
              </p>
            </div>
          </div>
          <div
            className="w-full md:w-1/2 xl:w-1/4 2xl:pl-12 2xl:pr-6"
            data-cue="slideInUp">
            <div className="feature-card style-two mb-30">
              <div className="feature-icon flex flex-col items-center justify-center relative z-[1] round-10">
                <AlertTriangle size={32} className="transition" />
              </div>
              <h3 className="fs-20 font-semibold 2xl:pr-12">
                Security Analytics Dashboard
              </h3>
              <p className="mb-0">
                Centralized visibility into threats performance & metrics in
                real time.
              </p>
            </div>
          </div>
        </div>
      </div>
        </>
    )
}
