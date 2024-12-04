const express = require('express')
const router = express.Router()

// import database
const koneksi = require('../config/database')

// insert data & validasi
const {body, validationResult} =require('express-validator')


// membaca data
router.get('/', function(req,res){
    koneksi.query('SELECT * FROM posts ORDER BY id desc',
    function(error,rows){
        if(error){
            return res.status(500).json({
                status: false,
                message: 'Database mu error',
            })
        }else{
            return res.status(200).json({
                status:true,
                message: 'Menampilkan data dari table posts',
                data:rows
            })
        }    
    })
})

//insert data
router.post('/store',
    [
        body('name').notEmpty(),
        body('role').notEmpty(),
        body('type').notEmpty(),
        body('description').notEmpty(),
        body('spell').notEmpty(),
        body('price').notEmpty(),
    ],(req,res)=>{
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(422).json({errors:errors.array()})
        }

        //mendefinisikan formData

        let formData = {
            name: req.body.name,
            role: req.body.role,
            type: req.body.type,
            description: req.body.description,
            spell: req.body.spell,
            price: req.body.price,

        }

        //masukkan data / query
        koneksi.query('INSERT INTO posts SET ?', formData,
            function(err,rows){
                if(err){
                    return res.status(500).json({
                        status: false,
                        message: 'Server mu error bro',
                    })
                }else{
                    return res.status(201).json({
                        status: true,
                        message: 'Berhasil meng-input data',
                        data: rows[0]
                    })
                }
            }
        )
    })

//Detail
router.get('/:id', function(req,res){
    let id = req.params.id

    koneksi.query(`SELECT * FROM posts WHERE ID=${id}`,
        function(error, rows){
            if(error){
                return res.status(500).json({
                    status:false,
                    message:'Server Error'
                })
            }

            //pencarian posts
            if(rows.length <= 0){
                return res.status(404).json({
                    status: false,
                    message: 'Data tidak tersedia'
                })
            } else {
                return res.status(200).json({
                    status: true,
                    message: 'menampilkan data posts',
                    data: rows[0],
                })
            }
        }
     )

})

// Update
router.patch('/update/:id',[
    //validasi
    body('name').notEmpty(),
    body('role').notEmpty(),
    body('type').notEmpty(),
    body('description').notEmpty(),
    body('spell').notEmpty(),
    body('price').notEmpty(),
],(req,res)=>{
    const errors = validationResult (req)
    if(!errors.isEmpty()){
        return res.status(442).json({
            errors:errors.array()
        })
    }

    //id
    let id = req.params.id

    //data post
    let formData={
        name: req.body.name,
        role: req.body.role,
        type: req.body.type,
        description: req.body.description,
        spell: req.body.spell,
        price: req.body.price,
    }

    // update query
    koneksi.query(`UPDATE posts set ? WHERE id=${id}`,
       formData,function(error,rows){
        if(error){
            return res.status(500).json({
                status: false,
                message: 'server error bro',
            })
        } else {
            return res.status(200).json({
                status: true,
                message: 'Berhasil meng-update data'
            })
        }
       } 
    )
})

//Delete
router.delete('/delete/(:id)',
    function(req,res){
        let id = req.params.id

        koneksi.query(`DELETE FROM posts WHERE id=${id}`,
            function(error,rows){
                if(error) {
                    return res.status(500).json({
                        status: false,
                        message: 'Server sedang error'
                    })
                } else {
                    return res.status(200).json({
                        status: true,
                        message: 'data sudah terhapus'
                    })
                }
            }
        )
    })

module.exports = router