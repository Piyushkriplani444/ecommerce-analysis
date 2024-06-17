const { default: axios } = require("axios");

const { Ecommerce } = require("../models/index");

async function getData(req, res) {
  try {
    console.log("Hello world");
    const user = await axios.get(
      "https://s3.amazonaws.com/roxiler.com/product_transaction.json"
    );

    const dataset = user.data;

    const insertion = dataset.map((data) => {
      return {
        title: data.title,
        price: data.price,
        description: data.description,
        category: data.category,
        image: data.image,
        sold: data.sold,
        dateOfSale: data.dateOfSale,
      };
    });

    await Ecommerce.bulkCreate(insertion);
    return res.send(user.data);
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  getData,
};
