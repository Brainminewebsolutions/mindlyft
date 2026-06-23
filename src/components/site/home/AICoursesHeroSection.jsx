export default function AICoursesHeroSection() {
  return (
    <section className="relative overflow-hidden bg-black text-white py-24 px-6 lg:px-16">
      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-500/20 blur-3xl rounded-full" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/20 blur-3xl rounded-full" />

      <div className="relative z-10 max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        {/* Left Content */}
        <div>
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/10 px-4 py-2 rounded-full mb-6 backdrop-blur-md">
            <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
            <span className="text-sm tracking-wide text-gray-300">
              AI Powered Learning Platform
            </span>
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black leading-tight">
            Master The Future
            <span className="block bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
              With AI Courses
            </span>
          </h1>

          <p className="mt-6 text-lg text-gray-400 max-w-xl leading-relaxed">
            Learn Artificial Intelligence, Machine Learning, Prompt Engineering,
            and AI App Development with hands-on projects and real-world tools.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <button className="px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 font-semibold hover:scale-105 transition-all duration-300 shadow-2xl shadow-cyan-500/30">
              Explore Courses
            </button>

            <button className="px-8 py-4 rounded-2xl border border-white/20 bg-white/5 backdrop-blur-md hover:bg-white/10 transition-all duration-300">
              Watch Demo
            </button>
          </div>

          {/* Stats */}
          <div className="mt-14 grid grid-cols-3 gap-6 max-w-lg">
            <div>
              <h3 className="text-3xl font-bold text-cyan-400">15K+</h3>
              <p className="text-gray-400 text-sm mt-1">Students</p>
            </div>

            <div>
              <h3 className="text-3xl font-bold text-purple-400">120+</h3>
              <p className="text-gray-400 text-sm mt-1">AI Lessons</p>
            </div>

            <div>
              <h3 className="text-3xl font-bold text-pink-400">98%</h3>
              <p className="text-gray-400 text-sm mt-1">Success Rate</p>
            </div>
          </div>
        </div>

        {/* Right Side Card */}
        <div className="relative flex justify-center">
          <div className="relative w-full max-w-lg rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 shadow-2xl shadow-cyan-500/10">
            <div className="flex items-center justify-between mb-8">
              <div>
                <p className="text-sm text-gray-400">AI Assistant</p>
                <h3 className="text-2xl font-bold mt-1">Course Mentor</h3>
              </div>

              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-400 to-purple-500 flex items-center justify-center text-xl font-bold shadow-lg shadow-cyan-500/30">
                AI
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
                <p className="text-gray-300 text-sm">
                  “Recommend the best AI roadmap for beginners.”
                </p>
              </div>

              <div className="bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-400/20 rounded-2xl p-4">
                <p className="text-gray-200 text-sm leading-relaxed">
                  Start with Python → Machine Learning → Deep Learning →
                  Generative AI → Build Real AI Projects.
                </p>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="bg-black/40 rounded-2xl p-5 border border-white/10">
                <p className="text-gray-400 text-sm">Live Projects</p>
                <h4 className="text-2xl font-bold mt-2">45+</h4>
              </div>

              <div className="bg-black/40 rounded-2xl p-5 border border-white/10">
                <p className="text-gray-400 text-sm">AI Tools</p>
                <h4 className="text-2xl font-bold mt-2">30+</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
