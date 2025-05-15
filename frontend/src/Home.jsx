import { useState, useEffect, useRef } from "react";
// Note: This component assumes Bootstrap CSS is already included in your project
// You'll need to have Bootstrap installed: npm install bootstrap

export default function ProfessionalHeroAnimation() {
  const [isHovering, setIsHovering] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState([]);
  const animationRef = useRef();
  const containerRef = useRef();

  const colors = {
    primary: "#0d6efd", // Bootstrap primary blue
    secondary: "#6c757d", // Bootstrap secondary
    accent: "#6610f2", // Bootstrap indigo
    light: "#f8f9fa", // Bootstrap light
    dark: "#212529", // Bootstrap dark
  };

  // Initialize particles on mount
  useEffect(() => {
    const initParticles = () => {
      const newParticles = [];
      const count = 60;

      for (let i = 0; i < count; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 3 + 1,
          color: [
            colors.primary,
            colors.secondary,
            colors.accent,
            colors.light,
          ][Math.floor(Math.random() * 4)],
          speedX: (Math.random() - 0.5) * 0.1,
          speedY: (Math.random() - 0.5) * 0.1,
          opacity: 0.1 + Math.random() * 0.5,
        });
      }

      setParticles(newParticles);
    };

    initParticles();

    // Set up event listeners
    window.addEventListener("resize", initParticles);
    return () => window.removeEventListener("resize", initParticles);
  }, []);

  // Update particle positions and handle interactions
  useEffect(() => {
    const updateAnimation = () => {
      setParticles((prevParticles) => {
        return prevParticles.map((p) => {
          let newX = p.x + p.speedX;
          let newY = p.y + p.speedY;

          // Boundary check
          if (newX < 0) newX = 100;
          if (newX > 100) newX = 0;
          if (newY < 0) newY = 100;
          if (newY > 100) newY = 0;

          // If mouse is hovering, create attraction effect
          if (isHovering) {
            const dx = mousePosition.x - newX;
            const dy = mousePosition.y - newY;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 20) {
              const angle = Math.atan2(dy, dx);
              newX -= Math.cos(angle) * (0.2 / (distance || 1));
              newY -= Math.sin(angle) * (0.2 / (distance || 1));
            }
          }

          return {
            ...p,
            x: newX,
            y: newY,
          };
        });
      });

      animationRef.current = requestAnimationFrame(updateAnimation);
    };

    animationRef.current = requestAnimationFrame(updateAnimation);
    return () => cancelAnimationFrame(animationRef.current);
  }, [isHovering, mousePosition]);

  // Handle mouse movement
  const handleMouseMove = (e) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    setMousePosition({ x, y });
  };

  // Connect nearby particles
  const connections = [];
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const p1 = particles[i];
      const p2 = particles[j];
      const dx = p1.x - p2.x;
      const dy = p1.y - p2.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < 15) {
        connections.push({
          id: `${p1.id}-${p2.id}`,
          x1: p1.x,
          y1: p1.y,
          x2: p2.x,
          y2: p2.y,
          opacity: (1 - distance / 15) * 0.2,
        });
      }
    }
  }

  const heroStyle = {
    background: "linear-gradient(135deg,rgb(15, 15, 15) 0%,rgb(2, 121, 168) 100%)",
    height: "100vh",
    position: "relative",
    overflow: "hidden",
    boxShadow: "0 0.5rem 1rem rgba(0, 0, 0, 0.15)",
  };

  const animationContainerStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
  };

  const contentStyle = {
    position: "relative",
    zIndex: 10,
    height: "100%",
  };

  return (
    <div className="mt">
      <div className="bg-dark">
        <div style={{ height: "3px" }} className="container bg-white w-100 rounded-circle "> 
        </div>
      </div>
      <div style={heroStyle}>
        {/* Animation Container */}
        <div
          ref={containerRef}
          style={animationContainerStyle}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          onMouseMove={handleMouseMove}
        >
          {/* Particles */}
          {particles.map((particle) => (
            <div
              key={particle.id}
              style={{
                position: "absolute",
                left: `${particle.x}%`,
                top: `${particle.y}%`,
                width: `${particle.size}px`,
                height: `${particle.size}px`,
                backgroundColor: particle.color,
                opacity: particle.opacity,
                transition: "width 0.3s, height 0.3s",
                borderRadius: "100%",
                transform:
                  isHovering &&
                  Math.abs(mousePosition.x - particle.x) < 10 &&
                  Math.abs(mousePosition.y - particle.y) < 10
                    ? "scale(1.5)"
                    : "scale(1.5)",
              }}
            />
          ))}

          {/* Connections between particles */}
          <svg style={animationContainerStyle} className="pointer-events-none">
            {connections.map((conn) => (
              <line
                key={conn.id}
                x1={`${conn.x1}%`}
                y1={`${conn.y1}%`}
                x2={`${conn.x2}%`}
                y2={`${conn.y2}%`}
                stroke={colors.light}
                strokeWidth="2"
                opacity={conn.opacity}
              />
            ))}
          </svg>
        </div>

        {/* Content Overlay */}
        <div
          style={contentStyle}
          className="container d-flex flex-column align-items-center justify-content-center text-center p-4"
        >
          <h1 className="display-4 fw-bold text-white mb-3">
            <span className="d-block">Superlative Business LLP</span>
            <span className="d-block text-info">Smart Tech, Simple Solutions</span>
          </h1>

          <p
            className="lead text-white-50 mb-4 mx-auto"
            style={{ maxWidth: "600px" }}
          >
            Our cutting-edge technology transforms how businesses interact with
            their customers, creating seamless experiences in an ever-evolving
            digital landscape.
          </p>

          <div className="d-flex gap-3">
            <button className="btn btn-light btn-lg shadow">Get Started</button>
            <button className="btn btn-outline-light btn-lg">
              <a href="https://www.superlativebusiness.com" className="text-white text-decoration-none">Learn More</a>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
