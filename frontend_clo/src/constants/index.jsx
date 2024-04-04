export const navLinks = [
    {
      id: "About",
      title: "About",
      link: "#About"
    },
    {
      id: "Marketplace",
      title:  "Marketplace",
      link: "#Marketplace"
    },
    {
      id: "Roadmap",
      title: "Roadmap",
      link: "#Roadmap"
    },
    {
      id: "Team",
      title: "Team",
      link: "#Team"
    },
  ];

  export const contact = [
    {
      title: "Telegram",
      src: <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor" width="30" height="30"
      viewBox="0 0 496 512">
     {/*Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc. */}
      <path
        d="M248 8C111 8 0 119 0 256S111 504 248 504 496 393 496 256 385 8 248 8zM363 176.7c-3.7 39.2-19.9 134.4-28.1 178.3-3.5 18.6-10.3 24.8-16.9 25.4-14.4 1.3-25.3-9.5-39.3-18.7-21.8-14.3-34.2-23.2-55.3-37.2-24.5-16.1-8.6-25 5.3-39.5 3.7-3.8 67.1-61.5 68.3-66.7 .2-.7 .3-3.1-1.2-4.4s-3.6-.8-5.1-.5q-3.3 .7-104.6 69.1-14.8 10.2-26.9 9.9c-8.9-.2-25.9-5-38.6-9.1-15.5-5-27.9-7.7-26.8-16.3q.8-6.7 18.5-13.7 108.4-47.2 144.6-62.3c68.9-28.6 83.2-33.6 92.5-33.8 2.1 0 6.6 .5 9.6 2.9a10.5 10.5 0 0 1 3.5 6.7A43.8 43.8 0 0 1 363 176.7z" />
    </svg>
    },
    {
      title:  "Github",
      src:<svg width="30" height="30" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24">
      <path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd"></path>
  </svg>
    },
    {
      title: "Twitter",
      src: <svg width="30" height="30" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24">
      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
  </svg>
    }
  ];

import {students , grades, outcomes, summary, activities} from "../assets/index.js";

  export const options=[
    {
      option: "Course Outcomes" ,
      link: "/info",
      description: "Manage course's outcomes",
      img: outcomes
    },{
      option: "Course Activities" ,
      link: "/activity",
      description: "Manage course activities, percentages",
      img: activities
    },{
      option: "Add Students" ,
      link: "/addstudents",
      description: "Add Students to your course to manage their grades",
      img: students
    },
    {
      option: "Manage grades" ,
      link: "/managegrades",
      description: "Add Students to your course to manage their grades",
      img: grades
    },  {
      option: "CLO Summary" ,
      link: "/clo",
      description: "View the course learning outcome summary from your enteries",
      img: summary
    },  
    
   
  ]