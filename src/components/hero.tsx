import React from 'react'

const Hero = () => {
      return (
  
        <section className="text-blueish body-font hero p-10 mx-auto">
          <div className="container mx-auto flex px-5 py-24 items-center justify-center flex-col">
            <div className="text-center lg:w-2/3 w-full">
              <h1 className="title-font sm:text-4xl text-5xl mb-4 font-bold text-teal-400">Sofa Sets</h1>
              <p className="mb-8 leading-relaxed text-xl font-semibold my-10">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Laborum aut ipsam cumque nam dolorum nemo natus deserunt, nisi architecto ipsa nostrum fuga iste consequatur eos molestiae sit dolore facilis reprehenderit.</p>
              <div className="flex justify-center">
                <button className="inline-flex text-white border-0 bg-teal-900 py-2 px-6 group hover:bg-teal-400 hover:scale-125 duration-300 rounded-full text-lg">View More</button>
              </div>
            </div>
          </div>
        </section>
      );
    }
  

export default Hero