import { useEffect, useState } from 'react';

function DanhMuchot() {
  const [dmHot, setDmHot] = useState([]);

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
    <div className=" dark:bg-gray-950 dark:text-white duration-200 relative">
      <div className=" mx-auto px-0">
        <div className="grid grid-cols-6 gap-0 px-0 relative">
          {dmHot.slice(2, 8).map((danhmuc) => (
            <div key={danhmuc.id} className="flex flex-col items-center border border-black/10 hover:shadow-lg transition-shadow duration-300">
              <div className="w-full aspect-square overflow-hidden">
                <img 
                  src={danhmuc.image}
                  alt={danhmuc.name}
                  className=" dark:bg-gray-950 dark:text-white duration-200 relative"
                />
              </div>
              <h3 className="text-center dark:bg-gray-950 dark:text-white duration-200 relative">
                {danhmuc.name} 
              </h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DanhMuchot;
