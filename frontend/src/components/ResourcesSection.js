import React from "react";
import { FaLinkedin, FaGithub, FaRocket } from "react-icons/fa";

const postmanLogo = 'https://cdn.iconscout.com/icon/free/png-256/free-postman-logo-icon-download-in-svg-png-gif-file-formats--technology-social-media-company-brand-vol-5-pack-logos-icons-2945092.png?f=webp&w=256';
const googleDriveLogo = 'https://cdn-icons-png.flaticon.com/512/5968/5968523.png'

const resources = [
  {
    id: 1,
    icon: <img src={postmanLogo} alt="Postman" className="w-8 h-8 mr-4" />,
    title: "Postman Workspace",
    description: "Access API collections and test this project's api endpoints",
    link: "https://www.postman.com/flight-physicist-9054540/workspace/roxiler-assignment/collection/27758306-3059ccef-c1bd-4e5b-aa40-4fbf3e78c396?action=share&creator=27758306", 
  },
  {
    id: 2,
    icon: <FaGithub className="text-gray-800 text-3xl mr-4" />,
    title: "GitHub Repository",
    description: "Read about this project on my Github",
    link: "https://github.com/dee077/Roxiler_Assignment", 
  },
];

const socials = [
  {
    id: 1,
    icon: <FaLinkedin className="text-blue-700 text-3xl mr-4" />,
    title: "LinkedIn",
    description: "Connect with me on LinkedIn",
    link: "https://www.linkedin.com/in/deepanshu-sahu-1a14151a8/",
  },
  {
    id: 2,
    icon: <FaGithub className="text-gray-800 text-3xl mr-4" />,
    title: "GitHub",
    description: "Explore my GitHub repositories",
    link: "https://github.com/dee077/",
  },
  {
    id: 3,
    icon: <span className="text-3xl mr-4" >🚀 </span>,
    title: "Portfolio",
    description: "Visit My personal Portfolio website",
    link: "https://portfolio2.deepanshu-sahu-projects.live/",
  },
  {
    id: 4,
    icon: <img src={googleDriveLogo} alt="Postman" className="w-8 h-8 mr-4" />,
    title: "Resume",
    description: "Checkout my updated Resume",
    link: "https://drive.google.com/file/d/1G9MGApDPl_4zOc0jwQOfn6rZg_qKH8g4/view?usp=sharing",
  },
];

const ResourcesSection = () => {
  return (
    <div className="mt-[3%] mb-[5%]">
      {/* Project Resource Section */}
      <div className="mb-12">
        <h2 className="my-5 text-2xl font-bold mb-4">Project Resources</h2>
        <div className="flex gap-5">
          {resources?.map((resource) => (
            <a
              key={resource.id}
              href={resource.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center bg-white rounded-lg shadow-lg p-4 hover:bg-gray-50 hover:cursor-pointer border-gray-200 border-1 transition duration-300 transform hover:scale-105 transform-origin-center will-change-transform"
            >
              {resource.icon}
              <div>
                <h3 className="text-xl font-semibold">{resource.title}</h3>
                <p className="text-gray-600">{resource.description}</p>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* My Socials Section */}
      <div>
        <h2 className="text-2xl font-bold mb-4">My Socials</h2>
        <div className="flex gap-5">
          {socials?.map((social) => (
            <a
              key={social.id}
              href={social.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center bg-white rounded-lg shadow-lg p-4 hover:bg-gray-50 hover:cursor-pointer border-gray-200 border-1 transition duration-300 transform hover:scale-105 transform-origin-center will-change-transform"
            >
              {social.icon}
              <div>
                <h3 className="text-xl font-semibold">{social.title}</h3>
                <p className="text-gray-600">{social.description}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ResourcesSection;
