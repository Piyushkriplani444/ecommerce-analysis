const { default: axios } = require("axios");
const Sequelize = require("sequelize");

const { Ecommerce } = require("../models/index");

const { Op } = Sequelize;
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
    throw error;
  }
}
async function getPagination(page, size) {
  const newPage = Math.abs(page - 1);
  const limit = size ? +size : 3;
  const offset = page ? newPage * limit : 0;
  return { limit, offset };
}

async function getFilterData(req, res) {
  try {
    const page = req.body.page || 1;
    const pageSize = req.body.pageSize || 10;
    const { search } = req.body;

    const { limit, offset } = await getPagination(page || 1, pageSize || 10);

    let query = "";

    if (search) {
      query = {
        [Op.or]: [
          {
            title: {
              [Op.iLike]: `%${search}%`,
            },
          },
          {
            description: {
              [Op.iLike]: `%${search}%`,
            },
          },
        ],
      };
    }

    const getDetail = await Ecommerce.findAndCountAll({
      where: query,
      limit,
      offset,
    });
    let totalPages = Math.ceil(getDetail.count / limit);
    totalPages = totalPages < 1 ? 1 : totalPages;

    const groupData = (data) => {
      const groupData = data.reduce((acc, curr) => {
        const key = `${curr.id}${curr.title}`;
        if (!acc[key]) {
          acc[key] = {
            id: curr.id,
            title: curr.title,
            price: curr.price,
            description: curr.description,
            category: curr.category,
            image: curr.image,
            sold: curr.sold,
            dateOfSale: curr.dateOfSale,
          };
        }
        return acc;
      }, {});
      return Object.values(groupData);
    };

    const groupDatas = groupData(getDetail.rows);

    return res.send({
      data: groupDatas,
      totalItems: getDetail.count,
      currentPage: page,
      totalPages,
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
}

module.exports = {
  getData,
  getFilterData,
};
