import { useEffect, useState } from 'react';
function BannerPro() {
    const [dmHot , setDmHot] = useState([]);
    useEffect(() => {
        const fetchDm = async () => {
          try {
            const response = await fetch('http://localhost:3001/danhmuc');
            const data = await response.json();
            setDmHot(data);
          } catch (error) {
            console.error('Lỗi khi lấy danh mục:', error);
          }
        };
    
        fetchDm();
      }, []);

return (
    <div className='  mx-auto w-full h-[600px] overflow-hidden flex flex-row  shadow-md px-0 py-0  dark:bg-gray-950 dark:text-white duration-200 relative'>
        {dmHot.slice(0, 2).map((danhmuc) => (
            <div key={danhmuc.id} className='w-1/2 h-full bg-black text-white flex flex-col items-center justify-center py-0 px-0'>
                <img src={danhmuc.image} alt={danhmuc.name} className='w-full h-[600px] overflow-hidden py-0 px-0'/>
                <div className='text-2xl font-bold'>{danhmuc.name}</div>
                <a href='/' className='mt-auto border-2 border-white rounded-full px-4 py-1 hover:bg-white hover:text-black transition-colors'>Xem Thêm</a>    
            </div>
        ))}
    </div>
)

}
export default BannerPro;