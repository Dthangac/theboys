const mysql = require("mysql");
const express = require("express");
const exp = require("express");
const app = exp();
const jwt = require('jsonwebtoken');
const fs = require('fs');
const PRIVATE_KEY = fs.readFileSync("private-key.txt");
var cors = require("cors");
app.use([cors(), exp.json()]);

// kết nối database
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  port: 3306,
  database: "the_boys", 
});
db.connect((err) => {
  if (err) throw err;
  console.log("Đã kết nối database");
});
// nơi định nghĩa các đường route


// lấy tất cả sản phẩm
app.get("/products", (req, res) => {
  const sql = "SELECT * FROM sanpham";
  db.query(sql, (err, data) => {
    if (err) {
      return res.status(500).json({ message: "Error retrieving all products", error: err });
    }
    res.json(data);
  });
});

// lấy 1 sản phẩm theo id
app.get("/products/:id", function (req, res) {
  let id = parseInt(req.params.id);
  if (isNaN(id) || id <= 0) {
    res.json({ "thong bao": "Không biết sản phẩm", id: id });
    return;
  }
  let sql = "SELECT * FROM sanpham WHERE id = ? AND is_delete = 0"; 
  db.query(sql, [id], (err, data) => {
    if (err) {
      res.json({ "thongbao": "Lỗi lấy sản phẩm", err });
    } else if (data.length === 0) {
      res.status(404).json({ "thongbao": "Sản phẩm không tồn tại" });
    } else {
      res.json(data[0]);
    }
  });
});
// Lấy tất cả danh mục
app.get("/danhmuc", function (req, res) {
  let sql = "SELECT * FROM danhmuc WHERE is_delete = 0"; 
  db.query(sql, (err, data) => {
    if (err) {
      res.json({ "thongbao": "Lỗi khi lấy tất cả danh mục", err });
    } else {
      res.json(data);
    }
  });
});
// // lấy sản phẩm theo danh mục
// app.get("/products/danhmuc/:danhmuc_id", (req, res) => {
//   const danhmuc_id = parseInt(req.params.danhmuc_id);
//   if (isNaN(danhmuc_id) || danhmuc_id <= 0) {
//     return res.status(400).json({ "thong bao": "Không biết danh mục", danhmuc_id: danhmuc_id });
//   }

//   const sql = "SELECT * FROM sanpham WHERE danhmuc_id = ? AND is_delete = 0";
//   db.query(sql, [danhmuc_id], (err, data) => {
//     if (err) {
//       return res.status(500).json({ "thongbao": "Lỗi lấy sản phẩm theo danh mục", err });
//     }
//     res.json(data);
//   });
// });

// Lấy tất cả thương hiệu
app.get("/thuonghieu", function (req, res) {
  let sql = "SELECT * FROM thuonghieu WHERE is_delete = 0"; 
  db.query(sql, (err, data) => {
    if (err) {
      res.json({ "thongbao": "Lỗi khi lấy tất cả thương hiệu", err });
    } else {
      res.json(data);
    }
  });
});
// lấy sản phẩm theo thương hiệu
app.get("/thuonghieu/:thuonghieu_id", function (req, res) {
  let thuonghieu_id = parseInt(req.params.thuonghieu_id);
  if (isNaN(thuonghieu_id) || thuonghieu_id <= 0) {
    res.json({ "thong bao": "Không biết thương hiệu", thuonghieu_id: thuonghieu_id });
    return;
  }

  let sql = "SELECT * FROM thuonghieu WHERE id = ? AND is_delete = 0"; // Lọc thương hiệu không bị xóa
  db.query(sql, [thuonghieu_id], (err, data) => {
    if (err) {
      res.json({ "thongbao": "Lỗi lấy thương hiệu", err });
    } else if (data.length === 0) {
      res.status(404).json({ "thongbao": "Thương hiệu không tồn tại" });
    } else {
      res.json(data[0]);
    }
  });
});
// lấy sản phẩm theo danh mục
app.get("/danhmuc/:danhmuc_id", function (req, res) {
  let danhmuc_id = parseInt(req.params.danhmuc_id);
  if (isNaN(danhmuc_id) || danhmuc_id <= 0) {
    res.json({ "thong bao": "Không biết danh mục", danhmuc_id: danhmuc_id });
    return;
  }

  let sql = "SELECT * FROM danhmuc WHERE id = ? AND is_delete = 0"; // Lọc danh mục không bị xóa
  db.query(sql, [danhmuc_id], (err, data) => {
    if (err) {
      res.json({ "thongbao": "Lỗi lấy danh mục theo id", err });
    } else if (data.length === 0) {
      res.status(404).json({ "thongbao": "Danh mục không tồn tại" });
    } else {
      res.json(data[0]);
    }
  });
});
///////////////////////////////////////////////////
// // lấy sản phẩm theo id loại
// app.get("/sptrongloai/:id_loai", function (req, res) {
//   let id_loai = parseInt(req.params.id_loai);
//   if (isNaN(id_loai) || id_loai === 0) {
//     res.json({ "thong bao": "Không biết loại", id_loai: id_loai });
//     return;
//   }

//   let sql =
//     "SELECT id, ten_sp, gia, gia_km, hinh, ngay " +
//     "FROM san_pham WHERE id_loai = ? AND an_hien = 1 " +
//     "ORDER BY id DESC";
//   db.query(sql, [id_loai], (err, data) => {
//     if (err) {
//       res.json({ "thong bao": "Lỗi lấy sp trong loại", err });
//     } else {
//       res.json(data);
//     }
//   });
// });

// // lấy loại sản phẩm theo id loại
// app.get("/loai/:id_loai", function (req, res) {
//   let id_loai = parseInt(req.params.id_loai);
//   if (isNaN(id_loai) || id_loai === 0) {
//     res.json({ "thong bao": "Không biết loại", id_loai: id_loai });
//     return;
//   }

//   let sql = "SELECT id, ten_loai FROM loai WHERE id = ?";
//   db.query(sql, [id_loai], (err, data) => {
//     if (err) {
//       res.json({ "thong bao": "Lỗi lấy loại", error: err });
//     } else {
//       res.json(data[0]);
//     }
//   });
// });
// Lưu đơn hàng
app.post('/donhang', function(req, res) {
  let data = req.body;
  let sql = 'INSERT INTO donhang SET ?';
  db.query(sql, data, function(err, data) {
    if (err) res.json({thongbao: 'Lỗi lưu đơn hàng', err});
    else res.json({thongbao: 'Đã lưu đơn hàng', donhang_id: data.insertId});
  });
});



// // lưu sản phẩm vào giỏ hàng
// app.post('/luugiohang/', function(req, res) {
//   let data = req.body;
//   let sql = 'INSERT INTO don_hang_chi_tiet SET ?';

//   db.query(sql, data, function(err, data) {
//     if (err) {
//       res.json({"thongbao": "Lỗi lưu sản phẩm", "err": err});
//     } else {
//       res.json({"thongbao": "Đã lưu sản phẩm vào db", "id_sp": data.id_sp});
//     }
//   });
// });

//admin
// app.get('/admin/products', function(req, res) {
//   let sql = 'SELECT * FROM sanpham';
//   db.query(sql, function(err, data) {
//     if (err) res.json({thongbao: 'Lỗi lấy sản phẩm', err});
//     else res.json(data);
//   });
// });
// app.get('/admin/sp/:id', function(req, res) {
//   let id = parseInt(req.params.id);
//   if( id <= 0){
//     res.json({thongbao: 'Không biết sản phẩm', id: id});
//     return;
//   }
//   let sql = `SELECT * FROM san_pham WHERE id = ?`;
//   db.query(sql, [id], function(err, data) {
//     if (err) res.json({thongbao: 'Lỗi lấy sản phẩm', err});
//     else res.json(data[0]);
//   });
// });

///////////////////////////////////////////////////ADMIN
// thêm sản phẩm
app.post('/admin/products', function(req, res) {
  let data = req.body;
  let sql = 'INSERT INTO sanpham SET ?';
  db.query(sql, [data], function(err, data) {
    if (err) res.json({thongbao: 'Lỗi thêm sản phẩm', err});
    else res.json({thongbao: 'Đã thêm sản phẩm'});
  });
});
// update sản phẩm
app.put('/admin/products/:id', function(req, res) {
  let data = req.body;
  let id = parseInt(req.params.id);
  delete data.id;
  let sql = 'UPDATE sanpham SET ? WHERE id = ?';
  db.query(sql, [data, id], function(err, data) {
    if (err) res.json({thongbao: 'Lỗi cập nhật sản phẩm', err});
    else res.json({thongbao: 'Đã cập nhật sản phẩm'});
  });
});
// delete sản phẩm
app.delete('/admin/products/:id', function(req, res) {
  let id = req.params.id;
  let sql = 'DELETE FROM sanpham WHERE id = ?';
  db.query(sql, id , (err, data) => {
    if (err) res.json({thongbao: 'Lỗi xóa sản phẩm', err});
    else res.json({thongbao: 'Đã xóa sản phẩm'});
  });
});










app.post('/login', function(req, res) {
  const un = req.body.un;
  const pw = req.body.pw;

  if (checkUserPass(un, pw) === true) {
    const userInfo = getUserInfo(un);
    const jwtBearToken = jwt.sign(
      {},
      PRIVATE_KEY,
      { algorithm: "RS256", expiresIn: 3600, subject: userInfo.id }
    );
    res.status(200).json({ token: jwtBearToken, expiresIn: 3600, userInfo: userInfo });
  } else {
    res.status(401).json({ thongbao: "Đăng nhập thất bại" });
  }
});

// Kiểm tra thông tin đăng nhập
function checkUserPass (un, pw){
  if (un === "aa" && pw === "123") return true;
  if (un === "bb" && pw === "321") return true;
  return false;
}
// Lấy thông tin người dùng
function getUserInfo(username) {
  if (username === "aa") return { id: "1", hoten: "Nguyễn Văn Teo" };
  if (username === "bb") return { id: "2", hoten: "Nguyễn Thụy Lượm" };
  return { id: "1", hoten: "" };
}
// chạy server
app.listen(3001, () => console.log(`Ứng dụng đang chạy với port 3001`));
