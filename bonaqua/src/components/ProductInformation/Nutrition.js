import React from 'react'

export default function Nutrition() {
  return (
    <div className='ProductC flex justify-center mx-auto'>
      <ul className='text-sm text-slate-500 font-medium w-[50%] xl:w-[70%]'>
        <h5 className='flex justify-center'>Тэжээллэг чанар (100мл)</h5>
        <div className='ilchleg flex justify-between items-center my-1 px-3'>
          <div className='kkal flex w-1/2'>
            <p className='mr-3'>Илчлэг: </p>
            <p>0 ккал</p>
          </div>
          <div className='flex'>
            <p className='mr-3'>Уураг:</p>
            <p>0 г</p>
          </div>
        </div>
        <div className='ilchleg flex justify-between items-center my-1 px-3'>
          <div className='flex kkal w-1/2'>
            <p className='mr-3'>Нүүрс ус: </p>
            <p>0 г</p>
          </div>
          <div className='flex'>
            <p className='mr-3'>Тос:</p>
            <p>0 г</p>
          </div>
        </div>
        <div className='ilchleg flex justify-between items-center my-1 px-3'>
          <div className='flex kkal w-1/2'>
            <p className='mr-3'> Сахар: </p>
            <p>0 г</p>
          </div>
          <div className='flex'>
            <p className='mr-3'>Натри:</p>
            <p>1 мг</p>
          </div>
        </div>
      </ul>
    </div>
  )
}
