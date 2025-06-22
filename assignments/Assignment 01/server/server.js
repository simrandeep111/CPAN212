const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 8000;

// Enable CORS for React app running on port 3000
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:5173'], // Support both CRA and Vite
  credentials: true
}));

app.use(express.json());

// Education endpoint
app.get('/getEdu', (req, res) => {
  const education = [
    {
      id: 1,
      degree: "Bachelor of Computer Science",
      institution: "University of Technology",
      location: "Toronto, ON",
      duration: "2020 - 2024",
      gpa: "3.8/4.0",
      achievements: ["Dean's List", "Computer Science Excellence Award"]
    },
    {
      id: 2,
      degree: "Web Development Bootcamp",
      institution: "Tech Academy",
      location: "Online",
      duration: "2023",
      gpa: "95%",
      achievements: ["Full Stack Development Certificate", "Top 10% Graduate"]
    }
  ];
  res.json(education);
});

// Experience endpoint
app.get('/getExp', (req, res) => {
  const experience = [
    {
      id: 1,
      position: "Full Stack Developer",
      company: "TechCorp Solutions",
      location: "Mississauga, ON",
      duration: "Jan 2024 - Present",
      responsibilities: [
        "Developed responsive web applications using React and Node.js",
        "Collaborated with cross-functional teams to deliver high-quality software",
        "Implemented RESTful APIs and database optimization techniques",
        "Mentored junior developers and conducted code reviews"
      ]
    },
    {
      id: 2,
      position: "Frontend Developer Intern",
      company: "Digital Innovations Inc.",
      location: "Toronto, ON",
      duration: "May 2023 - Aug 2023",
      responsibilities: [
        "Built interactive user interfaces using React and CSS",
        "Worked with design teams to implement pixel-perfect designs",
        "Optimized application performance and user experience",
        "Participated in agile development processes"
      ]
    }
  ];
  res.json(experience);
});

// Overview endpoint
app.get('/getOverview', (req, res) => {
  const overview = {
    name: "Alex Johnson",
    title: "Full Stack Developer",
    email: "alex.johnson@email.com",
    phone: "(555) 123-4567",
    location: "Mississauga, ON, Canada",
    linkedin: "linkedin.com/in/alexjohnson",
    github: "github.com/alexjohnson",
    summary: "Passionate Full Stack Developer with 2+ years of experience building modern web applications. Proficient in React, Node.js, and cloud technologies. Strong problem-solving skills and a commitment to writing clean, maintainable code. Eager to contribute to innovative projects and continue learning new technologies."
  };
  res.json(overview);
});

// Skills endpoint
app.get('/getSkills', (req, res) => {
  const skills = {
    technical: [
      "JavaScript (ES6+)",
      "React.js",
      "Node.js",
      "Express.js",
      "HTML5 & CSS3",
      "MongoDB",
      "SQL",
      "Git & GitHub",
      "RESTful APIs",
      "Responsive Design"
    ],
    soft: [
      "Problem Solving",
      "Team Collaboration",
      "Communication",
      "Time Management",
      "Adaptability",
      "Critical Thinking"
    ]
  };
  res.json(skills);
});

// Certifications endpoint
app.get('/getCertifications', (req, res) => {
  const certifications = [
    {
      id: 1,
      name: "AWS Certified Developer Associate",
      issuer: "Amazon Web Services",
      date: "March 2024",
      credentialId: "AWS-CDA-2024-001"
    },
    {
      id: 2,
      name: "React Developer Certification",
      issuer: "Meta",
      date: "January 2024",
      credentialId: "META-REACT-2024-001"
    },
    {
      id: 3,
      name: "JavaScript Algorithms and Data Structures",
      issuer: "freeCodeCamp",
      date: "December 2023",
      credentialId: "FCC-JSADS-2023-001"
    }
  ];
  res.json(certifications);
});

// Projects endpoint
app.get('/getProjects', (req, res) => {
  const projects = [
    {
      id: 1,
      name: "E-Commerce Platform",
      description: "Full-stack e-commerce application with user authentication, product management, and payment integration",
      technologies: ["React", "Node.js", "MongoDB", "Stripe API"],
      github: "github.com/alexjohnson/ecommerce-platform",
      live: "ecommerce-demo.com"
    },
    {
      id: 2,
      name: "Task Management App",
      description: "Collaborative task management tool with real-time updates and team collaboration features",
      technologies: ["React", "Socket.io", "Express", "PostgreSQL"],
      github: "github.com/alexjohnson/task-manager",
      live: "taskmanager-demo.com"
    },
    {
      id: 3,
      name: "Weather Dashboard",
      description: "Responsive weather application with location-based forecasts and interactive charts",
      technologies: ["React", "Chart.js", "OpenWeather API", "CSS3"],
      github: "github.com/alexjohnson/weather-dashboard",
      live: "weather-demo.com"
    }
  ];
  res.json(projects);
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'Server is running successfully!' });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log('Available endpoints:');
  console.log('- GET /getEdu - Education details');
  console.log('- GET /getExp - Experience details');
  console.log('- GET /getOverview - Personal overview');
  console.log('- GET /getSkills - Skills information');
  console.log('- GET /getCertifications - Certifications');
  console.log('- GET /getProjects - Project portfolio');
  console.log('- GET /health - Health check');
});