import React from 'react';

const Searchbox = (props) => {
  return (
    <div className='pt-2 pb-2 md:inline-flex gap-4 p-2 mt-4 sm:pl-16 pl-8'>
      <h1 className='text-white font-bold text-3xl justify-between mb-4'><span className='text-yellow-500'> [ AZ ] </span> movie<span className='text-yellow-500'>x</span></h1>
      <div className='pr-2 justify-items-start md:ml-96 md:mt-4'>
      <input
        type="text"
        className='text-center p-3 rounded text-l text-black text-xl md:w-96 md:pt-1'
        placeholder="Search for anything"
        value={props.value}
        onChange={(event) => props.setsearchvalue(event.target.value)}
      />
      </div>
      
    </div>
  );
};

export default Searchbox;
