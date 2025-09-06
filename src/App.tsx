import React, { useState, useEffect } from 'react';
import {
  Menu,
  X,
  Home,
  User,
  GraduationCap,
  Code,
  FolderOpen,
  Briefcase,
  Award,
  Mail,
  Github,
  Linkedin,
  ExternalLink,
  ChevronDown,
  Cpu,
  Zap,
  Wrench,
  BookOpen,
  Star,
  Sparkles
} from 'lucide-react';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isLoaded, setIsLoaded] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const navigation = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'about', label: 'About', icon: User },
    { id: 'education', label: 'Education', icon: GraduationCap },
    { id: 'skills', label: 'Skills', icon: Code },
    { id: 'projects', label: 'Projects', icon: FolderOpen },
    { id: 'internships', label: 'Internships', icon: Briefcase },
    { id: 'achievements', label: 'Achievements', icon: Award },
    { id: 'contact', label: 'Contact', icon: Mail },
  ];

  useEffect(() => {
    setIsLoaded(true);

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = navigation.map(nav => nav.id);
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const height = element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 relative overflow-x-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div
          className="absolute w-96 h-96 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-3xl animate-pulse"
          style={{
            left: mousePosition.x - 192,
            top: mousePosition.y - 192,
            transition: 'all 0.3s ease-out'
          }}
        />
        <div className="absolute top-20 left-10 w-2 h-2 bg-blue-400 rounded-full animate-ping" />
        <div className="absolute top-40 right-20 w-1 h-1 bg-purple-400 rounded-full animate-pulse" />
        <div className="absolute bottom-40 left-1/4 w-1.5 h-1.5 bg-green-400 rounded-full animate-bounce" />
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-orange-400 rounded-full animate-ping" />
      </div>

      {/* Navigation */}
      <nav className={`fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b border-slate-200 z-50 transition-all duration-500 ${isLoaded ? 'translate-y-0' : '-translate-y-full'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0">
              <h1 className="text-xl font-bold text-blue-700 hover:scale-105 transition-transform duration-300 cursor-pointer">
                Harsh Sahu
              </h1>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {navigation.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 flex items-center space-x-1 hover:scale-105 transform ${activeSection === item.id
                          ? 'bg-blue-100 text-blue-700'
                          : 'text-slate-600 hover:text-blue-700 hover:bg-blue-50'
                        }`}
                    >
                      <Icon size={16} className="transition-transform duration-300 group-hover:rotate-12" />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-slate-600 hover:text-blue-700 hover:bg-blue-50 transition-all duration-300 hover:scale-110"
              >
                {isMenuOpen ? <X size={24} className="rotate-180 transition-transform duration-300" /> : <Menu size={24} className="transition-transform duration-300" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className={`md:hidden transition-all duration-300 overflow-hidden ${isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
          {isMenuOpen && (
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-slate-200">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`w-full text-left px-3 py-2 rounded-md text-base font-medium transition-all duration-300 flex items-center space-x-2 hover:scale-105 transform ${activeSection === item.id
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-slate-600 hover:text-blue-700 hover:bg-blue-50'
                      }`}
                  >
                    <Icon size={20} />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-16 min-h-screen flex items-center bg-gradient-to-br from-blue-50 via-purple-50 to-slate-100 relative overflow-hidden">
        {/* Animated Background Shapes */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-20 h-20 bg-blue-200/30 rounded-full animate-bounce" style={{ animationDelay: '0s', animationDuration: '3s' }} />
          <div className="absolute top-40 right-20 w-16 h-16 bg-purple-200/30 rounded-full animate-bounce" style={{ animationDelay: '1s', animationDuration: '4s' }} />
          <div className="absolute bottom-40 left-1/4 w-12 h-12 bg-green-200/30 rounded-full animate-bounce" style={{ animationDelay: '2s', animationDuration: '5s' }} />
          <div className="absolute top-1/3 right-1/3 w-8 h-8 bg-orange-200/30 rounded-full animate-bounce" style={{ animationDelay: '0.5s', animationDuration: '3.5s' }} />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className={`text-center transition-all duration-1000 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="mb-8 relative">
              <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-all duration-500 hover:shadow-blue-500/25 relative group">
                <Cpu size={64} className="text-white group-hover:rotate-12 transition-transform duration-500" />
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-400 to-purple-400 opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
                <Sparkles className="absolute -top-2 -right-2 w-6 h-6 text-yellow-400 animate-pulse" />
              </div>
            </div>
            <h1 className={`text-4xl md:text-6xl font-bold text-slate-900 mb-4 transition-all duration-1000 delay-300 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              Harsh Sahu
            </h1>
            <p className={`text-xl md:text-2xl text-slate-600 mb-8 max-w-3xl mx-auto transition-all duration-1000 delay-500 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              Electronics & Communication Engineering Student | Embedded Systems & VLSI Enthusiast
            </p>
            <p className={`text-lg text-slate-500 mb-8 max-w-2xl mx-auto transition-all duration-1000 delay-700 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              Passionate about designing innovative semiconductor solutions and embedded systems
              that bridge the gap between hardware and software innovation.
            </p>
            <div className={`flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4 transition-all duration-1000 delay-1000 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <button
                onClick={() => scrollToSection('about')}
                className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-3 rounded-lg font-medium hover:from-blue-700 hover:to-blue-800 transition-all duration-300 flex items-center justify-center space-x-2 hover:scale-105 transform shadow-lg hover:shadow-blue-500/25"
              >
                <span>Learn More</span>
                <ChevronDown size={20} className="animate-bounce" />
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="bg-white text-blue-700 px-8 py-3 rounded-lg font-medium hover:bg-blue-50 border border-blue-200 transition-all duration-300 hover:scale-105 transform shadow-lg hover:shadow-xl"
              >
                Get In Touch
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 hover:text-blue-700 transition-colors duration-300">About Me</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full hover:w-32 transition-all duration-500"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 hover:translate-x-2 transition-transform duration-500">
              <p className="text-lg text-slate-600 leading-relaxed">
                I am <strong className="text-slate-900">Harsh Sahu</strong>, a 3rd year Electronics and Communication Engineering
                student at Geetanjali Institute of Technical Studies. My journey in ECE has been driven by
                an insatiable curiosity about how electronic systems work and how they can be optimized for
                better performance.
              </p>
              <p className="text-lg text-slate-600 leading-relaxed">
                I am passionate about <strong className="text-blue-700">Embedded Systems</strong>,
                <strong className="text-blue-700"> VLSI Design</strong>, and
                <strong className="text-blue-700"> Communication Networks</strong>. Through hands-on projects
                and continuous learning, I've developed a strong foundation in both theoretical concepts
                and practical applications.
              </p>
              <p className="text-lg text-slate-600 leading-relaxed">
                My goal is to grow as a <strong className="text-slate-900">VLSI & Embedded Technology professional</strong>,
                contributing to innovative semiconductor solutions that shape the future of technology.
                I believe in the power of continuous learning and staying updated with the latest
                industry trends and technologies.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg text-center hover:scale-105 transition-all duration-300 hover:shadow-lg group">
                <Zap className="w-12 h-12 text-blue-600 mx-auto mb-4 group-hover:animate-pulse" />
                <h3 className="text-lg font-semibold text-slate-900 mb-2">Embedded Systems</h3>
                <p className="text-slate-600">IoT, Arduino, Raspberry Pi</p>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg text-center hover:scale-105 transition-all duration-300 hover:shadow-lg group">
                <Cpu className="w-12 h-12 text-green-600 mx-auto mb-4 group-hover:rotate-12 transition-transform duration-300" />
                <h3 className="text-lg font-semibold text-slate-900 mb-2">VLSI Design</h3>
                <p className="text-slate-600">Digital Circuits, Verilog</p>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-lg text-center hover:scale-105 transition-all duration-300 hover:shadow-lg group">
                <Code className="w-12 h-12 text-purple-600 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
                <h3 className="text-lg font-semibold text-slate-900 mb-2">Programming</h3>
                <p className="text-slate-600">C, Python, MATLAB</p>
              </div>
              <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-lg text-center hover:scale-105 transition-all duration-300 hover:shadow-lg group">
                <Wrench className="w-12 h-12 text-orange-600 mx-auto mb-4 group-hover:rotate-12 transition-transform duration-300" />
                <h3 className="text-lg font-semibold text-slate-900 mb-2">Tools & Simulation</h3>
                <p className="text-slate-600">Xilinx, Proteus, Multisim</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 hover:text-blue-700 transition-colors duration-300">Education</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full hover:w-32 transition-all duration-500"></div>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg p-8 border border-slate-200 hover:shadow-2xl hover:scale-105 transition-all duration-500 hover:border-blue-300">
              <div className="flex items-start space-x-6">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300 group">
                    <GraduationCap className="w-8 h-8 text-blue-600 group-hover:rotate-12 transition-transform duration-300" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">
                    Bachelor of Technology (B.Tech)
                  </h3>
                  <p className="text-xl text-blue-700 font-semibold mb-2">
                    Electronics & Communication Engineering
                  </p>
                  <p className="text-lg text-slate-600 mb-4">
                    Geetanjali Institute of Technical Studies
                  </p>
                  <div className="flex flex-wrap items-center space-x-4 text-slate-500">
                    <span className="bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 px-3 py-1 rounded-full text-sm font-medium hover:scale-105 transition-transform duration-300">
                      3rd Year Student
                    </span>
                    <span className="bg-gradient-to-r from-green-100 to-green-200 text-green-800 px-3 py-1 rounded-full text-sm font-medium hover:scale-105 transition-transform duration-300">
                      Currently Pursuing
                    </span>
                  </div>
                  <div className="mt-6 grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold text-slate-900 mb-2">Core Subjects</h4>
                      <ul className="text-slate-600 space-y-1">
                        <li>• Digital Electronics</li>
                        <li>• Microprocessors & Microcontrollers</li>
                        <li>• VLSI Design</li>
                        <li>• Communication Systems</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900 mb-2">Specializations</h4>
                      <ul className="text-slate-600 space-y-1">
                        <li>• Embedded Systems</li>
                        <li>• Signal Processing</li>
                        <li>• Network Theory</li>
                        <li>• Control Systems</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 hover:text-blue-700 transition-colors duration-300">Skills & Expertise</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full hover:w-32 transition-all duration-500"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Programming Languages */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg hover:scale-105 transition-all duration-500 hover:shadow-xl group">
              <div className="flex items-center mb-4">
                <Code className="w-8 h-8 text-blue-600 mr-3 group-hover:rotate-12 transition-transform duration-300" />
                <h3 className="text-xl font-bold text-slate-900">Programming</h3>
              </div>
              <div className="space-y-3">
                {['C Programming', 'Python', 'Verilog HDL', 'MATLAB'].map((skill) => (
                  <div key={skill} className="flex items-center justify-between">
                    <span className="text-slate-700">{skill}</span>
                    <div className="w-16 h-2 bg-blue-200 rounded-full overflow-hidden">
                      <div className="h-2 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full w-full animate-pulse"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tools & Software */}
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg hover:scale-105 transition-all duration-500 hover:shadow-xl group">
              <div className="flex items-center mb-4">
                <Wrench className="w-8 h-8 text-green-600 mr-3 group-hover:rotate-12 transition-transform duration-300" />
                <h3 className="text-xl font-bold text-slate-900">Tools & Software</h3>
              </div>
              <div className="space-y-3">
                {['Arduino IDE', 'Raspberry Pi', 'Xilinx ISE', 'Proteus', 'Multisim'].map((tool) => (
                  <div key={tool} className="flex items-center justify-between">
                    <span className="text-slate-700">{tool}</span>
                    <div className="w-16 h-2 bg-green-200 rounded-full overflow-hidden">
                      <div className="h-2 bg-gradient-to-r from-green-500 to-green-600 rounded-full w-full animate-pulse"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Core Competencies */}
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-lg hover:scale-105 transition-all duration-500 hover:shadow-xl group">
              <div className="flex items-center mb-4">
                <Cpu className="w-8 h-8 text-purple-600 mr-3 group-hover:rotate-12 transition-transform duration-300" />
                <h3 className="text-xl font-bold text-slate-900">Core Areas</h3>
              </div>
              <div className="space-y-3">
                {[
                  'Embedded Systems',
                  'VLSI Basics',
                  'Digital Circuit Design',
                  'Communication Networks',
                  'IoT Development'
                ].map((area) => (
                  <div key={area} className="flex items-center justify-between">
                    <span className="text-slate-700">{area}</span>
                    <div className="w-16 h-2 bg-purple-200 rounded-full overflow-hidden">
                      <div className="h-2 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full w-full animate-pulse"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 hover:text-blue-700 transition-colors duration-300">Featured Projects</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full hover:w-32 transition-all duration-500"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
            {[
              {
                title: 'IoT Based Smart Carbon Emission Monitoring System',
                description: 'Real-time monitoring system using IoT sensors to track and analyze carbon emissions with cloud-based data storage and mobile alerts.',
                tech: ['Arduino', 'IoT Sensors', 'Cloud Integration', 'Mobile App'],
                icon: Zap,
                color: 'blue'
              },
              {
                title: 'Traffic Light Automation using Arduino',
                description: 'Intelligent traffic management system with sensor-based detection and adaptive timing for optimized traffic flow.',
                tech: ['Arduino', 'Sensors', 'LED Control', 'C Programming'],
                icon: Cpu,
                color: 'green'
              },
              {
                title: 'Smart Irrigation System using Sensors',
                description: 'Automated irrigation system with soil moisture detection, weather monitoring, and water conservation features.',
                tech: ['Raspberry Pi', 'Moisture Sensors', 'Python', 'Automation'],
                icon: Wrench,
                color: 'orange'
              },
              {
                title: 'VLSI based 4-bit ALU Design',
                description: 'Complete 4-bit Arithmetic Logic Unit design using Verilog HDL with FPGA implementation and comprehensive testing.',
                tech: ['Verilog', 'FPGA', 'Xilinx', 'Digital Design'],
                icon: Code,
                color: 'purple'
              }
            ].map((project, index) => {
              const Icon = project.icon;
              const colorClasses = {
                blue: 'from-blue-500 to-blue-600 bg-blue-50 text-blue-600',
                green: 'from-green-500 to-green-600 bg-green-50 text-green-600',
                orange: 'from-orange-500 to-orange-600 bg-orange-50 text-orange-600',
                purple: 'from-purple-500 to-purple-600 bg-purple-50 text-purple-600'
              };

              return (
                <div key={index} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 group border border-transparent hover:border-blue-200">
                  <div className="flex items-center mb-4">
                    <div className={`w-12 h-12 ${colorClasses[project.color as keyof typeof colorClasses].split(' ')[2]} ${colorClasses[project.color as keyof typeof colorClasses].split(' ')[3]} rounded-lg flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 line-clamp-2">{project.title}</h3>
                  </div>
                  <p className="text-slate-600 mb-4 leading-relaxed">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className={`px-3 py-1 text-sm font-medium rounded-full ${colorClasses[project.color as keyof typeof colorClasses].split(' ')[2]} ${colorClasses[project.color as keyof typeof colorClasses].split(' ')[3]} hover:scale-105 transition-transform duration-300 cursor-pointer`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Star className="w-5 h-5 text-yellow-400 animate-pulse" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Internships Section */}
      <section id="internships" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 hover:text-blue-700 transition-colors duration-300">Internships & Training</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full hover:w-32 transition-all duration-500"></div>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-blue-50 via-purple-50 to-slate-50 rounded-lg p-8 text-center border border-blue-200 hover:shadow-2xl hover:scale-105 transition-all duration-500 group">
              <Briefcase className="w-16 h-16 text-blue-600 mx-auto mb-6 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500" />
              <h3 className="text-2xl font-bold text-slate-900 mb-4">
                Exciting Opportunities Ahead
              </h3>
              <p className="text-lg text-slate-600 mb-6 max-w-2xl mx-auto">
                Currently seeking internship opportunities in VLSI Design, Embedded Systems,
                and Semiconductor Technology. Open to learning from industry experts and
                contributing to innovative projects.
              </p>
              <p className="text-xl font-semibold text-blue-700 animate-pulse">
                To be added soon...
              </p>
              <div className="mt-6 flex justify-center space-x-4">
                <span className="bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 px-4 py-2 rounded-full text-sm font-medium hover:scale-105 transition-transform duration-300 cursor-pointer">
                  VLSI Design
                </span>
                <span className="bg-gradient-to-r from-green-100 to-green-200 text-green-800 px-4 py-2 rounded-full text-sm font-medium hover:scale-105 transition-transform duration-300 cursor-pointer">
                  Embedded Systems
                </span>
                <span className="bg-gradient-to-r from-purple-100 to-purple-200 text-purple-800 px-4 py-2 rounded-full text-sm font-medium hover:scale-105 transition-transform duration-300 cursor-pointer">
                  Semiconductor Tech
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section id="achievements" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 hover:text-blue-700 transition-colors duration-300">Achievements & Certifications</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full hover:w-32 transition-all duration-500"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-2xl hover:scale-105 transition-all duration-500 group">
              <div className="flex items-center mb-4">
                <BookOpen className="w-8 h-8 text-green-600 mr-3 group-hover:rotate-12 transition-transform duration-300" />
                <h3 className="text-xl font-bold text-slate-900">Online Certifications</h3>
              </div>
              <div className="space-y-4">
                <div className="border-l-4 border-green-500 pl-4 hover:border-l-8 transition-all duration-300 hover:translate-x-2">
                  <h4 className="font-semibold text-slate-900">NPTEL Certifications</h4>
                  <p className="text-slate-600">VLSI Design and Embedded Systems courses</p>
                </div>
                <div className="border-l-4 border-blue-500 pl-4 hover:border-l-8 transition-all duration-300 hover:translate-x-2">
                  <h4 className="font-semibold text-slate-900">Coursera Specializations</h4>
                  <p className="text-slate-600">Digital Signal Processing and IoT</p>
                </div>
                <div className="border-l-4 border-purple-500 pl-4 hover:border-l-8 transition-all duration-300 hover:translate-x-2">
                  <h4 className="font-semibold text-slate-900">Udemy Courses</h4>
                  <p className="text-slate-600">Advanced Arduino and Raspberry Pi projects</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-2xl hover:scale-105 transition-all duration-500 group">
              <div className="flex items-center mb-4">
                <Award className="w-8 h-8 text-orange-600 mr-3 group-hover:rotate-12 transition-transform duration-300" />
                <h3 className="text-xl font-bold text-slate-900">Competitions & Events</h3>
              </div>
              <div className="space-y-4">
                <div className="border-l-4 border-orange-500 pl-4 hover:border-l-8 transition-all duration-300 hover:translate-x-2">
                  <h4 className="font-semibold text-slate-900">Technical Fest Participation</h4>
                  <p className="text-slate-600">Active participant in college and inter-college technical events</p>
                </div>
                <div className="border-l-4 border-red-500 pl-4 hover:border-l-8 transition-all duration-300 hover:translate-x-2">
                  <h4 className="font-semibold text-slate-900">Hackathon Participation</h4>
                  <p className="text-slate-600">Participated in IoT and embedded systems hackathons</p>
                </div>
                <div className="border-l-4 border-teal-500 pl-4 hover:border-l-8 transition-all duration-300 hover:translate-x-2">
                  <h4 className="font-semibold text-slate-900">Project Exhibitions</h4>
                  <p className="text-slate-600">Showcased projects at various technical exhibitions</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gradient-to-br from-slate-50 via-blue-100 to-purple-50 text-slate-900 relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-32 h-32 bg-blue-400/10 rounded-full animate-pulse" />
          <div className="absolute bottom-20 right-20 w-24 h-24 bg-purple-400/10 rounded-full animate-bounce" />
          <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-green-400/10 rounded-full animate-ping" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 hover:text-blue-700 transition-colors duration-300">Get In Touch</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto rounded-full hover:w-32 transition-all duration-500"></div>
            <p className="text-xl text-slate-600 mt-6 max-w-2xl mx-auto">
              I'm always open to discussing new opportunities, collaborations,
              and interesting projects in the field of electronics and embedded systems.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <a
              href="mailto:harshsahu3425@gmail.com"
              className="bg-white/70 backdrop-blur-sm p-6 rounded-lg hover:bg-blue-50 transition-all duration-500 group text-center hover:scale-105 transform hover:shadow-2xl border border-slate-200 hover:border-blue-400"
            >
              <Mail className="w-12 h-12 text-blue-600 mx-auto mb-4 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500" />
              <h3 className="text-xl font-semibold mb-2">Email</h3>
              <p className="text-slate-700">harshsahu3425@gmail.com</p>
            </a>

            <a
              href="https://linkedin.com/in/harsh-sahu"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/70 backdrop-blur-sm p-6 rounded-lg hover:bg-blue-50 transition-all duration-500 group text-center hover:scale-105 transform hover:shadow-2xl border border-slate-200 hover:border-blue-400"
            >
              <Linkedin className="w-12 h-12 text-blue-600 mx-auto mb-4 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500" />
              <h3 className="text-xl font-semibold mb-2">LinkedIn</h3>
              <p className="text-slate-700 flex items-center justify-center">
                linkedin.com/in/harsh-sahu
                <ExternalLink className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </p>
            </a>

            <a
              href="https://github.com/HarshSahu270"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/70 backdrop-blur-sm p-6 rounded-lg hover:bg-blue-50 transition-all duration-500 group text-center hover:scale-105 transform hover:shadow-2xl border border-slate-200 hover:border-blue-400"
            >
              <Github className="w-12 h-12 text-blue-600 mx-auto mb-4 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500" />
              <h3 className="text-xl font-semibold mb-2">GitHub</h3>
              <p className="text-slate-700 flex items-center justify-center">
                github.com/harshsahu
                <ExternalLink className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </p>
            </a>
          </div>

          <div className="text-center mt-16 pt-8 border-t border-slate-200">
            <p className="text-slate-500 hover:text-slate-700 transition-colors duration-300">
              © 2025 Harsh Sahu. Designed with passion for electronics and innovation.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;