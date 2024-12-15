import {useState } from "react";


function Baohanh() {
  const [messages] = useState([
    "🛡️ BẢO HÀNH trong 10 năm đối với sản phẩm Đồng Hồ",
    "🔄 ĐỔI TRẢ MIỄN PHÍ trong 3 ngày (Với lỗi từ nhà sản xuất)",
    "🚚 FREE SHIPPING đơn hàng > 499k",
    "🛡️ BẢO HÀNH"
  ]);

  return (
    <div className="  dark:bg-gray-950 dark:text-white duration-200 relative">
    <div className="  w-auto h-[100px] font-semibold text-center flex items-center justify-center   dark:bg-gray-950 dark:text-white duration-200 relative animate-scroll  px-0 py-0 ">
      {messages.map((msg, index) => (
        <div key={index} className="inline-block px-6 ">
          <span>{msg}</span>
        </div>  
      ))}
    </div>
    </div>
  );
}

export default Baohanh;
