import { useState, useEffect, useRef } from 'react';
import { ChevronDown, Users, BarChart2, TrendingUp, Award, Target, ArrowRight } from 'lucide-react';

// Add Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';
// Import Bootstrap JavaScript
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

export default function AboutPage() {
  const [activeSection, setActiveSection] = useState('mission');
  const [isVisible, setIsVisible] = useState({});
  const sectionRefs = {
    mission: useRef(null),
    who: useRef(null),
    approach: useRef(null),
    expertise: useRef(null),
    commitment: useRef(null)
  };

  // Animation for section visibility
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.id;
          setIsVisible(prev => ({
            ...prev,
            [id]: entry.isIntersecting
          }));
          
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        });
      },
      { threshold: 0.5 }
    );

    Object.values(sectionRefs).forEach(ref => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    return () => {
      Object.values(sectionRefs).forEach(ref => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      });
    };
  }, []);

  const scrollToSection = (id) => {
    setActiveSection(id);
    sectionRefs[id].current.scrollIntoView({ behavior: 'smooth' });
  };

  // Animated counter for stats
  const AnimatedCounter = ({ end, duration = 2000, label }) => {
    const [count, setCount] = useState(0);
    const [started, setStarted] = useState(false);
    const counterRef = useRef(null);

    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && !started) {
            setStarted(true);
            const start = 0;
            const increment = end / (duration / 16);
            let current = start;
            const timer = setInterval(() => {
              current += increment;
              if (current >= end) {
                setCount(end);
                clearInterval(timer);
              } else {
                setCount(Math.floor(current));
              }
            }, 60);
          }
        },
        { threshold: 0.1 }
      );

      if (counterRef.current) {
        observer.observe(counterRef.current);
      }

      return () => {
        if (counterRef.current) {
          observer.unobserve(counterRef.current);
        }
      };
    }, [end, duration, started]);

    return (
      <div ref={counterRef} className="text-center p-4">
        <div className="display-5 fw-bold text-primary mb-2">{count}+</div>
        <div className="text-secondary">{label}</div>
      </div>
    );
  };

  // Expertise card component
  const ExpertiseCard = ({ icon: Icon, title, description }) => {
    const [isHovered, setIsHovered] = useState(false);
    
    return (
      <div 
        className={`card border-0 shadow-lg h-100 ${isHovered ? 'animate__animated animate__pulse' : ''}`}
        style={{ transition: 'all 0.3s ease' }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="card-body">
          <div className="d-flex align-items-center mb-4">
            <div className="bg-primary bg-opacity-10 p-3 rounded-circle me-3">
              <Icon className="text-primary" size={24} />
            </div>
            <h3 className="h5 fw-bold mb-0">{title}</h3>
          </div>
          <p className="text-muted">{description}</p>
          <div className={`mt-3 d-flex align-items-center text-primary fw-medium ${isHovered ? 'opacity-100' : 'opacity-0'}`} 
               style={{ transition: 'opacity 0.3s ease' }}>
            <span>Learn more</span>
            <ArrowRight size={16} className="ms-1" />
          </div>
        </div>
      </div>
    );
  };

  // Custom CSS for the animated background
  const customStyles = `
    .hero-bg {
      background-color:rgb(85, 1, 1);
      position: relative;
      overflow: hidden;
    }
    
    .hero-bg::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(135deg,rgb(15, 15, 15) 0%,rgb(2, 121, 168) 100%);
      z-index: 1;
    }
    
    .hero-content {
      position: relative;
      z-index: 2;
    }
    
    .animate-bubble {
      position: absolute;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.05);
      animation: float 15s infinite ease-in-out;
    }
    
    @keyframes float {
      0% { transform: translate(0, 0) rotate(0deg); opacity: 0; }
      20% { opacity: 0.5; }
      50% { transform: translate(100px, -100px) rotate(180deg); opacity: 0.3; }
      80% { opacity: 0.5; }
      100% { transform: translate(0, 0) rotate(360deg); opacity: 0; }
    }
    
    .navy-bg {
      background-color: #0a192f;
    }
    
    .navy-gradient {
      background: linear-gradient(135deg, #0a192f 0%, #112240 100%);
    }
    
    .section-scroll {
      transition: all 0.8s cubic-bezier(0.77, 0, 0.175, 1);
    }
    
    .btn-primary {
      background-color: #3a7bd5;
      border-color: #3a7bd5;
    }
    
    .btn-primary:hover {
      background-color: #2d62b5;
      border-color: #2d62b5;
    }
    
    .btn-outline-light:hover {
      color: #0a192f;
    }
    
    .section-title {
      position: relative;
      display: inline-block;
      padding-bottom: 10px;
    }
    
    .section-title::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 4px;
      background: linear-gradient(90deg, #3a7bd5, #5a9eee);
      border-radius: 2px;
    }
    
    .sticky-nav {
      backdrop-filter: blur(10px);
      background-color: rgba(10, 25, 47, 0.9);
    }
    
    .nav-pill {
      border-radius: 50px;
      transition: all 0.3s ease;
    }
    
    .nav-pill.active {
      background-color: #3a7bd5;
      color: white;
      box-shadow: 0 4px 12px rgba(58, 123, 213, 0.3);
    }
    
    .counter-card {
      background-color: rgba(255, 255, 255, 0.03);
      backdrop-filter: blur(10px);
      border-radius: 10px;
      border: 1px solid rgba(255, 255, 255, 0.05);
    }
    
    .expertise-grid {
      gap: 24px;
    }

    .animated-bg {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      overflow: hidden;
      z-index: 0;
    }

    .approach-item {
      transition: all 0.3s ease;
    }
    
    .approach-item:hover {
      transform: translateY(-5px);
    }
    
    .approach-item-number {
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(135deg, #3a7bd5, #5a9eee);
      color: white;
      border-radius: 50%;
      margin-right: 15px;
      flex-shrink: 0;
    }

    .commitment-section {
      background: linear-gradient(135deg, #0a192f 0%, #112240 100%);
      border-radius: 12px;
      overflow: hidden;
      position: relative;
    }
    
    .commitment-bg {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      overflow: hidden;
      opacity: 0.1;
    }

    .animate__animated {
      animation-duration: 1s;
    }
    
    .animate__fadeInUp {
      animation-name: fadeInUp;
    }
    
    .animate__delay-1s {
      animation-delay: 0.5s;
    }
    
    .animate__delay-2s {
      animation-delay: 1s;
    }
    
    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translate3d(0, 30px, 0);
      }
      to {
        opacity: 1;
        transform: translate3d(0, 0, 0);
      }
    }
    
    @keyframes pulse {
      from {
        transform: scale3d(1, 1, 1);
      }
      50% {
        transform: scale3d(1.05, 1.05, 1.05);
      }
      to {
        transform: scale3d(1, 1, 1);
      }
    }
    
    .hide-scrollbar::-webkit-scrollbar {
      display: none;
    }
    
    .hide-scrollbar {
      -ms-overflow-style: none;
      scrollbar-width: none;
    }
  `;

  // Function to create animated background bubbles
  const createBubbles = () => {
    const bubbles = [];
    for (let i = 0; i < 10; i++) {
      const size = Math.random() * 200 + 50;
      const left = Math.random() * 100;
      const top = Math.random() * 100;
      const delay = Math.random() * 5;
      const duration = Math.random() * 10 + 10;
      
      bubbles.push(
        <div 
          key={i}
          className="animate-bubble"
          style={{
            width: `${size}px`,
            height: `${size}px`,
            left: `${left}%`,
            top: `${top}%`,
            animationDelay: `${delay}s`,
            animationDuration: `${duration}s`
          }}
        />
      );
    }
    return bubbles;
  };

  return (
    <div className="navy-bg text-light">
        <div className="bg-dark">
        <div style={{ height: "3px" }} className="container bg-white rounded-circle">
        </div>
      </div>
      <style>{customStyles}</style>
      
      {/* Hero Section */}
      <div className="hero-bg py-5 py-md-6">
        <div className="animated-bg">
          {createBubbles()}
        </div>
        <div className="container py-5 hero-content">
          <div className="row min-vh-75 align-items-center">
            <div className="col-lg-8 py-5">
              <h1 className="display-3 fw-bold mb-4 animate__animated animate__fadeInUp">About Superlative Business</h1>
              <p className="lead mb-5 text-light opacity-75 animate__animated animate__fadeInUp animate__delay-1s">
                We transform how organizations approach their most critical challenges through innovative solutions and unwavering support.
              </p>
              <button 
                onClick={() => scrollToSection('mission')}
                className="btn btn-light btn-lg px-4 shadow-lg animate__animated animate__fadeInUp animate__delay-2s"
              >
                Discover Our Story
                <ChevronDown className="ms-2" size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="sticky-top sticky-nav shadow py-3">
        <div className="container">
          <div className="d-flex justify-content-center overflow-auto pb-2 hide-scrollbar">
            {['mission', 'who', 'approach', 'expertise', 'commitment'].map((section) => (
              <button
                key={section}
                onClick={() => scrollToSection(section)}
                className={`btn mx-1 mx-md-2 nav-pill ${
                  activeSection === section ? 'active' : 'btn-outline-light'
                }`}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container py-5 ">
        {/* Mission Section */}
        <section 
          id="mission" 
          ref={sectionRefs.mission}
          className={`mb-5 pb-5 section-scroll   ${
            isVisible.mission ? 'opacity-100' : 'opacity-0 translate-y-4'
          }`}
        >
          <div className="text-center mb-5 ">
            <h2 className="display-5 fw-bold section-title mb-5">Our Mission</h2>
          </div>
          <div className="row justify-content-center ">
            <div className="col-lg-8">
              <div className="card border-0 shadow-lg  navy-gradient text-light p-4 p-md-5">
                <div className="card-body">
                  <p className="lead mb-4">
                    At Superlative Business, we're dedicated to transforming how organizations approach their most critical challenges. We believe that exceptional businesses are built on exceptional ideas, strategies, and execution.
                  </p>
                  <p className="lead">
                    Our mission is to help our clients achieve extraordinary results by providing insightful consultation, innovative solutions, and unwavering support throughout their business journey.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Who We Are Section */}
        <section 
          id="who" 
          ref={sectionRefs.who}
          className={`mb-5 pb-5 section-scroll ${
            isVisible.who ? 'opacity-100' : 'opacity-0 translate-y-4'
          }`}
        >
          <div className="text-center mb-5">
            <h2 className="display-5 fw-bold section-title mb-5">Who We Are</h2>
          </div>
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="card border-0 shadow-lg navy-gradient text-light p-4 p-md-5 position-relative overflow-hidden mb-5">
                <div className="position-absolute top-0 end-0 w-25 h-25 bg-primary opacity-10 rounded-circle translate-middle-y"></div>
                <div className="card-body position-relative">
                  <p className="lead mb-4">
                    Superlative Business is a premier business consultancy founded by professionals with extensive experience across diverse industries. Our team combines deep industry knowledge with cutting-edge methodologies to deliver tailored solutions that address your unique business needs.
                  </p>
                  <p className="lead">
                    We pride ourselves on being more than just advisors – we're partners in your success. Through collaborative relationships built on trust and transparency, we work alongside you to navigate complexities, seize opportunities, and drive sustainable growth.
                  </p>
                </div>
              </div>
              
              <div className="row justify-content-center text-center">
                <div className="col-md-4 mb-4 mb-md-0">
                  <div className="counter-card p-4">
                    <AnimatedCounter end={150} label="Clients Served" />
                  </div>
                </div>
                <div className="col-md-4 mb-4 mb-md-0">
                  <div className="counter-card p-4">
                    <AnimatedCounter end={85} label="Success Stories" />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="counter-card p-4">
                    <AnimatedCounter end={12} label="Years of Experience" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Approach Section */}
        <section 
          id="approach" 
          ref={sectionRefs.approach}
          className={`mb-5 pb-5 section-scroll ${
            isVisible.approach ? 'opacity-100' : 'opacity-0 translate-y-4'
          }`}
        >
          <div className="text-center mb-5">
            <h2 className="display-5 fw-bold section-title mb-5">Our Approach</h2>
          </div>
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="card border-0 shadow-lg navy-gradient text-light p-4 p-md-5 mb-5">
                <div className="card-body">
                  <p className="lead">
                    Our approach is rooted in a profound understanding that each business faces unique challenges requiring personalized solutions. We begin by diving deep into your organization's structure, culture, and goals to develop strategies that align perfectly with your vision.
                  </p>
                </div>
              </div>
              
              <div className="card border-0 shadow-lg p-4 p-md-5">
                <div className="card-body">
                  <h3 className="h4 fw-bold text-center mb-4">We believe in:</h3>
                  <div className="row g-4">
                    {[
                      {
                        title: "Evidence-based decision making",
                        description: "Utilizing data analytics and market research to inform strategic choices"
                      },
                      {
                        title: "Collaborative problem-solving",
                        description: "Working closely with your team to ensure buy-in and successful implementation"
                      },
                      {
                        title: "Continuous improvement",
                        description: "Regularly assessing and refining strategies to adapt to changing market conditions"
                      },
                      {
                        title: "Sustainable growth",
                        description: "Creating long-term value that extends beyond immediate gains"
                      }
                    ].map((item, index) => (
                      <div key={index} className="col-md-6">
                        <div className="d-flex approach-item p-3 rounded bg-light bg-opacity-10">
                          <div className="approach-item-number">
                            {index + 1}
                          </div>
                          <div>
                            <h4 className="h5 fw-semibold mb-2">{item.title}</h4>
                            <p className="text-muted mb-0">{item.description}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Expertise Section */}
        <section 
          id="expertise" 
          ref={sectionRefs.expertise}
          className={`mb-5 pb-5 section-scroll ${
            isVisible.expertise ? 'opacity-100' : 'opacity-0 translate-y-4'
          }`}
        >
          <div className="text-center mb-5">
            <h2 className="display-5 fw-bold section-title mb-5">Our Expertise</h2>
            <p className="lead mb-5 mx-auto" style={{ maxWidth: '800px' }}>
              Superlative Business offers comprehensive consulting services across key business functions:
            </p>
          </div>
          
          <div className="row g-4 expertise-grid">
            <div className="col">
              <ExpertiseCard 
                icon={Target} 
                title="Strategic Planning" 
                description="Charting clear paths for sustainable growth and competitive advantage"
              />
            </div>
            <div className="col">
              <ExpertiseCard 
                icon={BarChart2} 
                title="Operational Excellence" 
                description="Optimizing processes to enhance efficiency and reduce costs"
              />
            </div>
            <div className="col">
              <ExpertiseCard 
                icon={TrendingUp} 
                title="Financial Management" 
                description="Ensuring robust financial health and strategic resource allocation"
              />
            </div>
            <div className="col">
              <ExpertiseCard 
                icon={Award} 
                title="Marketing & Sales" 
                description="Developing compelling market positions and effective customer acquisition strategies"
              />
            </div>
            <div className="col">
              <ExpertiseCard 
                icon={Users} 
                title="Leadership Development" 
                description="Building high-performing teams and nurturing future leaders"
              />
            </div>
          </div>
        </section>

        {/* Commitment Section */}
        <section 
          id="commitment" 
          ref={sectionRefs.commitment}
          className={`mb-5 section-scroll ${
            isVisible.commitment ? 'opacity-100' : 'opacity-0 translate-y-4'
          }`}
        >
          <div className="commitment-section p-4 p-md-5 shadow-lg">
            <div className="commitment-bg">
              {createBubbles()}
            </div>
            <div className="row justify-content-center position-relative">
              <div className="col-lg-10">
                <div className="text-center">
                  <h2 className="display-5 fw-bold mb-4">Our Commitment</h2>
                  <p className="lead mb-5">
                    We measure our success by the tangible results we deliver to our clients. Whether you're a startup seeking direction, a mid-size company facing growth challenges, or an established enterprise pursuing innovation, Superlative Business is committed to elevating your performance and helping you achieve truly superlative results.
                  </p>
                  <button className="btn btn-light btn-lg px-4 py-3 shadow-lg fw-semibold">
                    Connect With Us Today
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}