let mysql = require('mysql')

let koneksi = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'tugas_api_gio'
})

koneksi.connect(function(error){
    if(!!error){
        console.log(error)
    }else{
        console.log('Connection Success')
    }
})

module.exports = koneksi