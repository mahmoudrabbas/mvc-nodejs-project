

const getAddProductPage = (req , res) => {

    res.render("add-product.ejs", {title: "Add Product", message:''});

};

// add product controller
const addProduct = (req , res) => {

    if(!req.files) {

        res.render("add-product.ejs", {title: "Add Product", message: `You Should Upload The Picture Of The Product`, err: true});
        
    } else {

        const uploadedImage = req.files.img;
        const imgName = uploadedImage.name;
        const imgx = uploadedImage.name.split('.')[1];

        if(imgx === 'jpg' || imgx === 'png' || imgx === 'jpeg' ) {

            const insertProduct = `INSERT INTO product(title, price, description, image, category, quantity) VALUES ('${req.body.title}', ${req.body.price}, '${req.body.description}', '${uploadedImage.name}', '${req.body.category}', ${req.body.quantity})`;



            db.query(insertProduct, (err, result) => {

                if(err) {
                    return res.status(500).send({ message: "There Is Something Went Wrong" });
                } else {

                    uploadedImage.mv(`public/assets/imgs/products/${result.insertId}.${imgx}`, (err) => {

                        if(err) {
                            return res.status(500).send({ message: "There Is Something Went Wrong" });
                        }

                    });

                    return res.redirect('/');
                }
            });

        } else {
            res.render("add-product.ejs", {title: "Add Product", message: `Allowed Picture format is 'jpg', 'png', 'jpeg'`, err: true});
        }
    }
}


const deleteProduct = (req , res) => {
    const id = req.params.id;
    const deletePro =  `DELETE FROM product WHERE productID = ${id}`;
    db.query(deletePro, (err, result) => {
        if(err) {
            return res.status(500).send({ message: "There Is Something Went Wrong" });
        } else {
            return res.redirect('/');
        }
    })

};

const getEditProduct = (req , res) => {
    const id = req.params.id;
    const getTheProduct =  `SELECT * FROM product WHERE productID = ${id}`;
    db.query(getTheProduct, (err, result) => {
        if(err) {
            return res.status(500).send({ message: "There Is Something Went Wrong" });
        } else {
            res.render("edit-product.ejs", {title: "Add Product", message:"", err: false, result:result[0]});
        }
    })
};

const editProduct = (req , res) => {
    const id = req.params.id;

    
    if(!req.files) {

        res.render("edit-product.ejs", {title: "edit Product", message: `You Should Upload The Picture Of The Product`, err: true});
        
    } else {

        const uploadedImage = req.files.img;
        const imgName = uploadedImage.name;
        const imgx = uploadedImage.name.split('.')[1];

        if(imgx === 'jpg' || imgx === 'png' || imgx === 'jpeg' ) {

            const updateProduct = ` UPDATE product 
                                    SET title='${req.body.title}',
                                        category='${req.body.category}',
                                        description='${req.body.description}',
                                        price=${req.body.price},
                                        image='${req.files.img.name}',
                                        quantity=${req.body.quantity}
                                    WHERE productID = ${id}`;


            db.query(updateProduct, (err, result) => {

                if(err) {
                    return res.status(500).send({ message: "There Is Something Went Wrong" });
                } else {

                    uploadedImage.mv(`public/assets/imgs/products/${id}.${imgx}`, (err) => {

                        if(err) {
                            return res.status(500).send({ message: "There Is Something Went Wrong" });
                        }

                    });

                    return res.redirect('/');
                }
            });

        } else {
            res.render("edit-product.ejs", {title: "Add Product", message: `Allowed Picture format is 'jpg', 'png', 'jpeg'`, err: true});
        }
    }
};



module.exports = {
    getAddProductPage,
    addProduct,
    deleteProduct,
    getEditProduct,
    editProduct
}