/**
 * Created by PHI on 4/25/2015.
 */
var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var deepPopulate = require('mongoose-deep-populate');
var lich_thi=new mongoose.Schema({
    ma_sinh_vien:String,
    ho_va_ten: String,
    ngay_sinh: String,
    lop_khoa_hoc: String,
    sbd: String,
    ma_lop: String,
    ten_mon_hoc:String,
    ngay_thi:String,
    gio_thi: String,
    ca_thi: Number,
    phong_thi: String,
    dia_diem: String,
    hinh_thuc_thi: String
});
module.exports=lich_thi;