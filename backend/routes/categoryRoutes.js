const router = require('express').Router;
const {Category} = require('../models/Category');

router.get('/', async (req, res) => {
    try {
        const categories = await Category.find()
        categories.exec()
        .then((data, err) => {
            if (err) return res.status(400).json({status: false,err});
            return res.status(200).json({status:true,
                message: "Get category successfully",
                data,
        });
    });

        
    } catch (err) {
        res.status(500).json({message: err.message});
    }
});

router.post('/create', async (req, res) => {
   try{ const category = new Category(req.body);
    category.save((err,data)=>{
        if (err) return res.status(400).json({status: false, err});
        return res.status(201).json({status: true,
            message: "Category created successfully",
            data,
        });
    });
} catch (err) {
    res.status(500).json({message: err.message});
}
});
module.exports =router;

