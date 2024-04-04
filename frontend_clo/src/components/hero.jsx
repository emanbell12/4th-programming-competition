import React, {useState} from 'react';
import { options } from '../constants';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
const Hero = () => {

    const {id}=useParams();
   
    return (
        <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
  

      

          <div className="flex flex-col text-center w-full mb-20">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">Please select the options for the selected course</h1>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base">Manage your students, grades, and the learning outcomes of your course</p>
          </div>
          <div className="flex items-center justify-center flex-wrap -m-4">
            {options . map (option => (
            
                 <Link to={`${option.link}/${id}`} className="shadow  lg:w-1/3 sm:w-1/2 p-4">
              <div className="flex relative">
                <img alt="gallery" className="absolute inset-0 w-full h-full object-contain object-center" src={option.img} />
                <div className="px-8 py-10 relative z-10 w-full border-4 border-gray-200 bg-white opacity-0 hover:opacity-100">
                  <h1 className="title-font text-lg font-medium text-rose-800	mb-3">{option.option}</h1>
                  <p className="leading-relaxed">{option.description}</p>
                </div>
              </div>
            </Link>
            ))}
           
          </div>
        </div>
      </section>
    );
};

export default Hero;
