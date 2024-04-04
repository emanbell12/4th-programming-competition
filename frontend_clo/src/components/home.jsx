import React, {useState, useEffect} from 'react';
import { Link, useParams } from 'react-router-dom';
import { addcourse } from '../assets';
import axios from 'axios';
  const Home = () => {
    const [classes, setClasses] = useState([]);
    const [courseData, setCourseData] = useState({
      name: '',
      code: '',
      section: ''
    });
  
    // Event handler to update state when input changes
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setCourseData(prevState => ({
        ...prevState,
        [name]: value
      }));
    };
    useEffect(() => {
      const fetchClasses = async () => {
        try {
          const response = await fetch('http://127.0.0.1:8000/courses/');
          if (!response.ok) {
            throw new Error('Failed to fetch classes');
          }
          const data = await response.json();
          setClasses(data);
        } catch (error) {
          console.error('Error fetching classes:', error);
        }
      };
  
      fetchClasses();
    }, []);
    const postAsync = async () => {
          axios.post('http://127.0.0.1:8000/courses/', courseData, {
            headers: {
              'Content-Type': 'application/json',
            }
          }).then(response => {
            console.log(response)
            window.location.reload();
        })
        .catch(error => {
            console.error('Error posting', error);
        });
  
        
        
    } 
    console.log(classes);
  
    return (
        <div className='item-center py-20 min-h-[700px] text-center justify-center md:px-40 px-10 flex '>
            <div className='flex flex-col'>
            <h1 className='text-4xl mb-10'>Select a course to <span className='text-rose-900 font-bold '>START</span></h1>
      <div className=' flex text-slate-600  flex-wrap'>
        {classes.map((course, index) => (
          <Link to= {`/options/${course.id} `} key={index} className='transition ease-in-out cursor-pointer delay-80 hover:-translate-y-1 hover:scale-110 hover:bg-rose-50 duration-100 ml-10 p-6 rounded-xl border-r-4 border-rose-800 text-center border'>
            <h2 className='text-2xl font-bold'>{course.code} - {course.section}</h2>
            <p className='text-2xl'> {course.name}</p>
            
          </Link>
        ))}
      </div> 
      <h2 className='mt-20 text-2xl mb-10'>Or add a course</h2>
      <div className='flex w-full'>
       
        <div className='flex my-auto w-full flex-col'>
    
     <label >Course Name</label>
     <input name="name"
        value={courseData.name}
        onChange={handleInputChange} required className='px-10 border border-gray-300 rounded-full'>
     </input>
     <label className='mt-6'>Course Code</label>
     <input name="code"
        value={courseData.code}
        onChange={handleInputChange} required className='px-10 border border-gray-300 rounded-full'>

     </input>
     <label className='mt-6' >Course Section</label>
     <input name="section"
        value={courseData.section}
        onChange={handleInputChange} required className='px-10 border border-gray-300 rounded-full'>

     </input></div> 
     <img className='my-auto mx-auto max-h-[250px] mr-20' src={addcourse} /></div>
     <button onClick= { postAsync} className='bg-rose-900 text-white p-2 hover:bg-rose-700 rounded-full mt-10 mx-auto w-1/2'>Add Course</button>
      </div></div>
    );
  };
  
  export default Home;
  
