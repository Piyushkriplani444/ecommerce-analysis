const { default: axios } = require("axios");
const Sequelize = require("sequelize");

const { Ecommerce } = require("../models/index");
const db = require("../models/index");
const { QueryTypes } = require("sequelize");

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

async function GetAllInfo(req, res) {
  try {
    console.log("appple");
    const getStaticticsss = await getStatictics(req, res);
    console.log("ball");
    const getBarCharts = await getBarChart(req, res);
    console.log("Cat");
    const getcategoryCounts = await getcategoryCount(req, res);
    res.send({
      getStat: getStaticticsss,
      getBar: getBarCharts,
      getcategory: getcategoryCounts,
    });
  } catch (error) {
    throw error;
  }
}

async function getStatictics(req, res) {
  try {
    let { month } = req.body;
    if (!month || month.length == 0) {
      month = 3;
    }
    const datas = await db.sequelize.query(
      `SELECT * FROM public.ecommerce where extract(month from "dateOfSale") = ${month} `
    );
    let total_no_sold = 0;
    let total_no_unsold = 0;
    let total_sold = 0;
    for (let x of datas[0]) {
      if (x.sold) {
        total_no_sold = total_no_sold + 1;
        total_sold = total_sold + x.price;
      } else {
        total_no_unsold += 1;
      }
    }
    // console.log("apple mango");

    return {
      total_sold,
      total_no_sold,
      total_no_unsold,
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function getBarChart(req, res) {
  try {
    const priceRanges = [
      { min: 0, max: 100 },
      { min: 101, max: 200 },
      { min: 201, max: 300 },
      { min: 301, max: 400 },
      { min: 401, max: 500 },
      { min: 501, max: 600 },
      { min: 601, max: 700 },
      { min: 701, max: 800 },
      { min: 801, max: 900 },
      // { min: 901, max: Infinity },
    ];

    let { month } = req.body;
    if (!month || month.length == 0) {
      month = 3;
    }
    const ranges = await Promise.all(
      priceRanges.map(async (range) => {
        const query = `SELECT COUNT(*) as itemCount FROM public.ecommerce where price between ? and ? and extract(month from "dateOfSale") = ?`;

        const replacement1 = {
          replacements: [
            range.min,
            range.max === Infinity ? "Infinity" : range.max,
            month,
          ],
          type: QueryTypes.SELECT,
        };

        const rows = await db.sequelize.query(query, replacement1);
        // console.log(rows[0].itemcount);
        return {
          range: `${range.min}-${range.max === Infinity ? "above" : range.max}`,
          count: parseInt(rows[0].itemcount, 10),
        };
      })
    );

    const rows = await db.sequelize.query(
      `SELECT COUNT(*) as itemCount FROM public.ecommerce where price>=900 and extract(month from "dateOfSale") = ${month}`
    );
    // console.log(rows[0][0].itemcount);
    ranges.push({
      range: "901-above",
      count: parseInt(rows[0][0].itemcount, 10),
    });

    return ranges;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function getcategoryCount(req, res) {
  try {
    const { month } = req.body;
    const categorycount = {};

    const rows = await db.sequelize.query(
      `SELECT *  FROM public.ecommerce where extract(month from "dateOfSale") = ${month}`
    );

    for (let data of rows[0]) {
      // console.log(data);
      if (categorycount[data.category]) {
        const datas = categorycount[data.category];
        datas.count += 1;
      } else {
        categorycount[data.category] = {
          category: data.category,
          count: 1,
        };
      }
    }

    // console.log(Object.values(categorycount));

    return Object.values(categorycount);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

module.exports = {
  getData,
  getFilterData,
  getStatictics,
  getBarChart,
  getcategoryCount,
  GetAllInfo,
};
