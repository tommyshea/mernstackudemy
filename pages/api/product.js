import Product from '../../models/Product'
import connectDb from '../../utils/connectDb'

connectDb()

const handleGetRequest = async (req, res) => {
    const { _id } = req.query
    const product = await Product.findOne({ _id: _id})
    res.status(200).json(product)
}

const handlePostRequest = async (req, res) => {
    const { name, price, description, mediaUrl } = req.body
    try {
        if (!name || !price || !description || !mediaUrl) {
            return res.status(422).send("Product missing one or more fields.")
        }
        const product = await new Product({
            name,
            price,
            description,
            mediaUrl
        }).save()
        res.status(201).json(product)
    } catch(error) {
        console.error(error)
        res.status(500).json("Server error in creating product: ", error.message)
    }
}

const handleDeleteRequest = async (req, res) => {
    const { _id } = req.query
    await Product.findOneAndDelete({ _id: _id})
    res.status(204).json({})
}

export default async (req, res) => {
    switch(req.method) {
        case "GET": 
            await handleGetRequest(req, res)
            break
        case "POST":
            await handlePostRequest(req, res)
            break
        case "DELETE":
            await handleDeleteRequest(req, res)
            break
        default: 
            res.status(405).send(`Method ${req.method} not allowed.`)
            break
    }
}

// export default async (req, res) => {
//     const { _id } = req.query
//     const product = await Product.findOne({ _id: _id})
//     res.status(200).json(product)
// }