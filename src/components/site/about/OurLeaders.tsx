"use client";
const upskillTeam = [
  {
    name: "Ajinkya Panday",
    designation: "",
    imageUrl: "/images/AjinkyaPanday.jpeg",
    description:
      "Expert in Artificial Intelligence and Machine Learning with 10+ years of experience.",
  },
  {
    name: "Aman Raj ",
    designation: "",
    imageUrl: "/images/AmanRaj.jpeg",
    description:
      "Aman Raj is a Cyber Security Instructor and Cloud Security Specialist with expertise in cybersecurity training, cloud technologies, and security operations. He has trained professionals from the Indian Army, CID, Cyber Police, NIC, NHAI, the Ministry of Power, Bhilai Steel Plant (SAIL), and other government organizations and public sector enterprises under national-level cybersecurity initiatives. He has worked with C3iHub, IIT Kanpur, on projects supported by the Ministry of Home Affairs (MHA), where he has delivered hands-on training in ethical hacking, cyber threat intelligence (CTI), OSINT, cloud security, Linux hardening, and cybercrime investigation. His work focuses on strengthening cyber resilience by equipping professionals with the practical skills needed to identify, investigate, and respond to evolving cyber threats.",
  },
  {
    name: "Amrish Khari",
    designation: "",
    imageUrl: "/images/AmrishKhari.jpeg",
    description:
      "Cyber Security Instructor | C3iHub, IIT Kanpur- Amrish Khari is a Cyber Security Instructor at C3iHub, IIT Kanpur, with nearly 10 years of experience in Cybersecurity, Ethical Hacking, Vulnerability Assessment & Penetration Testing (VAPT), Network Security, and Incident Response. He specializes in delivering practical, hands-on cybersecurity training and is known for simplifying complex security concepts into engaging and accessible learning experiences. Areas of Expertise: VAPT, Ethical Hacking, Network Security, Web Application Security, Incident Response, Cybersecurity Awareness, CTF Development, and Hands-on Cybersecurity Training.",
  },
  {
    name: "Deexitha Valurowtu ",
    designation: "",
    imageUrl: "/images/DeexithaValurowtu.jpeg",
    description:
      "Forensic Analyst | Digital Forensics & Cyber Security- Deexitha is a Forensic Analyst at C3iHub, IIT Kanpur, specializing in Digital Forensics, Incident Response, Log Analysis, and Cyber Security Investigations. She holds a Postgraduate degree in Forensic Science and a Postgraduate Certificate in Cyber Security and Cyber Law. She is also qualified in the Forensic Aptitude and Caliber Test (FACTS) conducted by the Ministry of Home Affairs (MHA), Government of India.",
  },
  {
    name: "Ganesh",
    designation: "",
    imageUrl: "/images/Ganesh .jpeg",
    description:
      "Kuche Ganesh is a Cybersecurity Professional, Researcher, and Trainer from Anantapur, Andhra Pradesh. He holds a Master of Science (M.Sc) in Cybersecurity and is currently pursuing a Ph.D. in Cybersecurity, with a focus on advancing research in cyber defense and emerging security technologies. The Combined industry and training experience in cybersecurity and cloud security. my expertise includes Cyber Defense, Vulnerability Assessment and Penetration Testing (VAPT), Ethical Hacking, Network Security, Cloud Security, Digital Forensics, and Security Operations. I have successfully delivered hands-on cybersecurity training programs, workshops, and practical labs for students, professionals, and government personnel",
  },
   {
    name: "Ivan Das",
    designation: "",
    imageUrl: "/images/Ivan.jpg.jpeg",
    description:
    "Ivan Das is a Cybersecurity Instructor at C3iHub, IIT Kanpur, from Guwahati, Assam, with over 10 years of experience in cybersecurity. He holds a BCA, an MBA in Information Technology, and is currently pursuing an MSc in Information Security. As a Certified EC-Council Instructor (CEI), he specializes in Ethical Hacking, Vulnerability Assessment and Penetration Testing (VAPT), Digital Forensics, Incident Response, and SOC Operations. Ivan has trained and mentored hundreds of students and professionals and has contributed to live VAPT projects for government and private organizations on behalf of CERT-In empaneled organizations, helping strengthen their security posture against evolving cyber threats. He is passionate about cybersecurity awareness, CTF development, gamified learning, and hands-on skill development. He also volunteers as a Cyber Crime Intervention Officer, assisting cybercrime victims and promoting cyber safety."
  },
   {
    name: "Kuldeep Sonar",
    designation: "",
    imageUrl: "/images/KuldeepSonar.jpeg",
    description:
    "Kuldeep is a Senior Program Manager with 15+ years of expertise in AI Security, Cyber Security, Application Security, and Supply Chain Security. He holds leading global certifications and has deep experience across ISMS, Dark Web Analysis, ZTNA, ITAM/ITSAM, ITSM, Cyber Threat Intelligence, IAM, IoT Security, DevSecOps. Delivering high‑impact training for global certification bodies and diverse sectors including Defence, IT, BFSI, Telecom, Government, Healthcare, and Manufacturing. His work includes designing tailored courseware, labs, and assessments that drive measurable skill development."
  },
   {
    name: "Dr. Satya Prakash",
    designation: "",
    imageUrl: "/images/SatyaPrakash.jpg",
    description:
    "Satya Prakash is currently working as Senior Program Manager (Cyber Security) at C3iHub, IIT Kanpur. Prior to this, he served as an Assistant Professor at National Law Institute University (NLIU), Bhopal, a Visiting Faculty at National Forensic Sciences University (NFSU), Bhopal, and a Guest Lecturer at ECC, Prayagraj. He has been actively involved in conducting cybersecurity training programs and in designing academic and professional course curricula."
  },
    {
    name: "Shweta Verma ",
    designation: "",
    imageUrl: "/images/ShwetaVerma.jpeg",
    description:
    "Shweta Verma is currently working at C3iHub IIT Kanpur. She   is a Senior Lead Cybersecurity Expert with more than 15 years of experience in Network Administration, Enterprise Firewalls, Ethical Hacking, Digital forensics, and cybercrime investigation. She has successfully trained Engineers, Security professionals, and technology teams across leading global organizations, delivering both foundational and advanced cybersecurity programs."
  },
];
type Leader = {
  name: string;
  designation: string;
  experience?: string;
  subject?: string;
  imageUrl: string;
  description?: string;
  video?: string;
};

type Category = {
  title: string;
  icon: string;
  leaders: Leader[];
};

type OurLeadersProps = {
  categories: Category[];
};

function LeaderAvatar({ name, imageUrl }: { name: string; imageUrl: string }) {
  if (imageUrl) {
    return (
      <img
        src={imageUrl}
        alt={name}
        className="w-full h-full object-cover object-top"
      />
    );
  }
  return (
    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-violet-500 to-blue-500">
      <span className="text-4xl font-bold text-white">{name.slice(0, 2).toUpperCase()}</span>
    </div>
  );
}

function LeaderCard({ leader }: { leader: Leader }) {
  return (
    <div className="relative h-[350px] cursor-pointer group" style={{ perspective: "1000px" }}>
      {/* Flipper */}
      <div
        className="relative w-full h-full transition-transform duration-700 group-hover:[transform:rotateY(180deg)]"
        style={{ transformStyle: "preserve-3d" }}
      >

        {/* ── FRONT ── */}
        <div
          className="absolute inset-0 rounded-3xl overflow-hidden"
          style={{ backfaceVisibility: "hidden" }}
        >
          {/* Full-card image */}
          <LeaderAvatar name={leader.name} imageUrl={leader.imageUrl} />

          {/* Subject badge */}
          {leader.subject && (
            <div className="absolute top-4 right-4 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full z-10">
              {leader.subject}
            </div>
          )}

          {/* Bottom gradient overlay with name/designation */}
          <div className="absolute bottom-0 left-0 right-0 z-10 pt-14 px-4 pb-4 bg-gradient-to-t from-violet-900/90 to-transparent">
            <h4 className="text-lg font-extrabold !text-white leading-tight drop-shadow">{leader.name}</h4>
            {leader.designation && (
              <p className="text-white text-base   mt-1 drop-shadow">{leader.designation}</p>
            )}
          </div>
        </div>

        {/* ── BACK ── */}
        <div
          className="absolute inset-0 rounded-3xl overflow-hidden shadow-xl bg-gradient-to-br from-violet-600 to-blue-600"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          {leader.video ? (
            <video
              src={leader.video}
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="flex flex-col justify-center h-full px-7 py-8 text-white space-y-4">
              <h4 className="text-xl font-bold">{leader.name}</h4>
              {leader.designation && (
                <p className="text-white/70 text-sm font-medium">{leader.designation}</p>
              )}
              <div className="w-10 h-0.5 bg-white/30 rounded-full" />
              <p className="text-sm text-white/85 leading-relaxed line-clamp-6">
                {leader.description || "No description available."}
              </p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

export default function OurLeaders({ categories, bg = "bg-white" }: OurLeadersProps & { bg?: string }) {
  if (categories.length === 0) return null;

  return (
    <section className={`${bg} px-6 py-20`}>
      <div className="max-w-6xl mx-auto space-y-20">

        {/* Heading */}
        <div className="text-center space-y-4">
          <span className="inline-block text-sm font-bold uppercase tracking-widest text-blue-600 bg-blue-100 px-4 py-2 rounded-full">
            Our Team
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
            Meet Our <span className="text-blue-600">Leaders</span>
          </h2>
          <div className="w-16 h-1 bg-blue-600 rounded-full mx-auto" />
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            Our experienced and dedicated team of educators is committed to
            helping every student reach their full potential.
          </p>
        </div>

        {/* Categories */}
        {categories.map((category) => (
          <div key={category.title} className="space-y-8">

            {/* Category Heading */}
            <div>
               
              <div>
                {/* <h3 className="text-2xl font-bold text-gray-900">
                
                </h3> */}
                <div className="mb-6 flex items-center justify-center gap-4">
        <div className="h-px w-16 bg-violet-300" />
        <span className="text-2xl font-semibold uppercase tracking-[0.3em] text-violet-600">
           {category.title}
        </span>
        <div className="h-px w-16 bg-violet-300" />
      </div>

              </div>
              <div className="flex-1 h-px bg-gray-200 ml-2" />
            </div>

            {/* Leaders Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {category.leaders.map((leader) => (
                <LeaderCard key={leader.name} leader={leader} />
              ))}
            </div>

          </div>
        ))}

 <div className="text-center space-y-4">
          <span className="inline-block text-sm font-bold uppercase tracking-widest text-blue-600 bg-blue-100 px-4 py-2 rounded-full">
            Our Team
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
           Meet Our Expert <span className="text-blue-600">Upskill Team</span>
          </h2>
          <div className="w-16 h-1 bg-blue-600 rounded-full mx-auto" />
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
           Learn from experienced mentors who turn potential into performance and ambition into achievement.
          </p>
        </div>
      </div>
      <div className="space-y-12">
       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
  {upskillTeam.map((leader) => (
    <LeaderCard
      key={leader.name}
      leader={leader}
    />
  ))}
</div>
</div>
    </section>
  );
}
