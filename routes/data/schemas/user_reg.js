/**
 * Created by Phi on 3/11/2015.
 */
var mongoose=require('mongoose');
var user_reg=new mongoose.Schema({
    ma_sinh_vien:String,
    tai_khoan:String,
    email: String,
    mat_khau: String,
    gioi_tinh: String,
    ho_va_ten: String,
    lop_khoa_hoc: String,
    active: Number,
    ngay_sinh: Date
});
module.exports=user_reg;