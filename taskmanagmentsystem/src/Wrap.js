import React from 'react'
import { FaUserAlt } from "react-icons/fa";
import Navbar1 from './Navbar';

function Wrap({children}) {
  return (
    <div>
  <Navbar1 />

    <div className='text-center mt-5'>

    Welcome to our Task Management System demo! We're thrilled to showcase how our platform streamlines task organization, collaboration, and productivity for teams of all sizes.
User Management:
Register and log in with ease! Our system ensures each user's security with unique usernames and passwords, granting personalized access to the platform.
Task Management:
Create tasks effortlessly by providing essential details such as title, description, and due date. Update existing tasks seamlessly, modify titles, descriptions, due dates, and even assign tasks to different team members. Mark tasks as complete or incomplete at your convenience and delete tasks effortlessly when they're no longer needed.

Search and Filtering:
Find what you need, when you need it! Our robust search functionality allows users to search tasks based on titles, descriptions, or assigned users, making it a breeze to locate specific tasks. Filtering capabilities empower users to sort tasks by completion status and due date, ensuring optimal organization and prioritization of tasks.

Get Started Today:
Experience the power of efficient task management firsthand! Whether you're an individual seeking better personal task organization or a team striving for enhanced collaboration and productivity, our Task Management System is here to simplify your workflow.

Ready to revolutionize the way you manage tasks? Sign up for a demo today and discover how our platform can elevate your productivity to new heights!

Best regards,
[Your Company Name] Team

Feel free to customize this demo note with your company's branding and specific features of your Task Management System!
    </div>
    </div>
  )
}

export default Wrap
