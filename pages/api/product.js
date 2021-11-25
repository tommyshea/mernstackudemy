import Product from '../../models/Product'

const handleGetRequest = async (req, res) => {
    const { _id } = req.query
    const product = await Product.findOne({ _id: _id})
    res.status(200).json(product)
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