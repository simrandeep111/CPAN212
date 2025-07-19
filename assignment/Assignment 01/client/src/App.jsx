import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Linkedin, Github, ExternalLink, Award, Briefcase, GraduationCap, Code, User, FolderOpen } from 'lucide-react';

const App = () => {
  const [overview, setOverview] = useState(null);
  const [education, setEducation] = useState([]);
  const [experience, setExperience] = useState([]);
  const [skills, setSkills] = useState({ technical: [], soft: [] });
  const [certifications, setCertifications] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_BASE_URL = 'http://localhost:8000';

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        const [overviewRes, educationRes, experienceRes, skillsRes, certificationsRes, projectsRes] = await Promise.all([
          fetch(`${API_BASE_URL}/getOverview`),
          fetch(`${API_BASE_URL}/getEdu`),
          fetch(`${API_BASE_URL}/getExp`),
          fetch(`${API_BASE_URL}/getSkills`),
          fetch(`${API_BASE_URL}/getCertifications`),
          fetch(`${API_BASE_URL}/getProjects`)
        ]);

        if (!overviewRes.ok || !educationRes.ok || !experienceRes.ok || !skillsRes.ok || !certificationsRes.ok || !projectsRes.ok) {
          throw new Error('Failed to fetch data');
        }

        const [overviewData, educationData, experienceData, skillsData, certificationsData, projectsData] = await Promise.all([
          overviewRes.json(),
          educationRes.json(),
          experienceRes.json(),
          skillsRes.json(),
          certificationsRes.json(),
          projectsRes.json()
        ]);

        setOverview(overviewData);
        setEducation(educationData);
        setExperience(experienceData);
        setSkills(skillsData);
        setCertifications(certificationsData);
        setProjects(projectsData);
      } catch (err) {
        setError('Failed to load resume data. Please make sure the server is running on port 8000.');
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-gray-600 text-lg">Loading resume...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-100 flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-lg shadow-lg max-w-md">
          <div className="text-red-500 mb-4">
            <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 18.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">Error Loading Resume</h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
          <div className="text-center mb-6">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">{overview?.name}</h1>
            <h2 className="text-2xl text-blue-600 mb-4">{overview?.title}</h2>
            <p className="text-gray-600 text-lg leading-relaxed max-w-3xl mx-auto">{overview?.summary}</p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4 text-gray-600">
            <div className="flex items-center gap-2">
              <Mail className="h-5 w-5 text-blue-600" />
              <span>{overview?.email}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-5 w-5 text-blue-600" />
              <span>{overview?.phone}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-blue-600" />
              <span>{overview?.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <Linkedin className="h-5 w-5 text-blue-600" />
              <span>{overview?.linkedin}</span>
            </div>
            <div className="flex items-center gap-2">
              <Github className="h-5 w-5 text-blue-600" />
              <span>{overview?.github}</span>
            </div>
          </div>
        </div>

        {/* Experience Section */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
          <div className="flex items-center gap-3 mb-6">
            <Briefcase className="h-6 w-6 text-blue-600" />
            <h2 className="text-2xl font-bold text-gray-800">Professional Experience</h2>
          </div>
          
          <div className="space-y-6">
            {experience.map((exp) => (
              <div key={exp.id} className="border-l-4 border-blue-200 pl-6 pb-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                  <h3 className="text-xl font-semibold text-gray-800">{exp.position}</h3>
                  <span className="text-blue-600 font-medium">{exp.duration}</span>
                </div>
                <p className="text-lg text-gray-600 mb-3">{exp.company} • {exp.location}</p>
                <ul className="space-y-2">
                  {exp.responsibilities.map((resp, index) => (
                    <li key={index} className="text-gray-700 flex items-start gap-2">
                      <span className="text-blue-600 mt-1">•</span>
                      <span>{resp}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Education Section */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
          <div className="flex items-center gap-3 mb-6">
            <GraduationCap className="h-6 w-6 text-blue-600" />
            <h2 className="text-2xl font-bold text-gray-800">Education</h2>
          </div>
          
          <div className="space-y-6">
            {education.map((edu) => (
              <div key={edu.id} className="border-l-4 border-green-200 pl-6 pb-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                  <h3 className="text-xl font-semibold text-gray-800">{edu.degree}</h3>
                  <span className="text-green-600 font-medium">{edu.duration}</span>
                </div>
                <p className="text-lg text-gray-600 mb-2">{edu.institution} • {edu.location}</p>
                <p className="text-gray-700 mb-3">GPA: {edu.gpa}</p>
                <div className="flex flex-wrap gap-2">
                  {edu.achievements.map((achievement, index) => (
                    <span key={index} className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                      {achievement}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Skills Section */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
          <div className="flex items-center gap-3 mb-6">
            <Code className="h-6 w-6 text-blue-600" />
            <h2 className="text-2xl font-bold text-gray-800">Skills</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Technical Skills</h3>
              <div className="flex flex-wrap gap-2">
                {skills.technical.map((skill, index) => (
                  <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Soft Skills</h3>
              <div className="flex flex-wrap gap-2">
                {skills.soft.map((skill, index) => (
                  <span key={index} className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Projects Section */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
          <div className="flex items-center gap-3 mb-6">
            <FolderOpen className="h-6 w-6 text-blue-600" />
            <h2 className="text-2xl font-bold text-gray-800">Projects</h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <div key={project.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{project.name}</h3>
                <p className="text-gray-600 mb-4 text-sm">{project.description}</p>
                
                <div className="flex flex-wrap gap-1 mb-4">
                  {project.technologies.map((tech, index) => (
                    <span key={index} className="bg-orange-100 text-orange-800 px-2 py-1 rounded text-xs">
                      {tech}
                    </span>
                  ))}
                </div>
                
                <div className="flex gap-3 text-sm">
                  <a href={`https://${project.github}`} className="flex items-center gap-1 text-blue-600 hover:text-blue-800">
                    <Github className="h-4 w-4" />
                    Code
                  </a>
                  <a href={`https://${project.live}`} className="flex items-center gap-1 text-green-600 hover:text-green-800">
                    <ExternalLink className="h-4 w-4" />
                    Live
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications Section */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
          <div className="flex items-center gap-3 mb-6">
            <Award className="h-6 w-6 text-blue-600" />
            <h2 className="text-2xl font-bold text-gray-800">Certifications</h2>
          </div>
          
          <div className="space-y-4">
            {certifications.map((cert) => (
              <div key={cert.id} className="flex flex-col md:flex-row md:items-center md:justify-between p-4 border border-gray-200 rounded-lg">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">{cert.name}</h3>
                  <p className="text-gray-600">{cert.issuer}</p>
                  <p className="text-sm text-gray-500">Credential ID: {cert.credentialId}</p>
                </div>
                <div className="mt-2 md:mt-0 md:text-right">
                  <span className="text-yellow-600 font-medium">{cert.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-gray-500 py-6">
          <p>Built with React and Express • Professional Resume</p>
        </div>
      </div>
    </div>
  );
};

export default App;