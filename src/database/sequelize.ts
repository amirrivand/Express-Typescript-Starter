import { Namespace, createNamespace } from 'cls-hooked';
import 'reflect-metadata';
import { Op, Sequelize } from 'sequelize';

const transaction_ns: Namespace = createNamespace('db-transaction');

Sequelize.useCLS(transaction_ns);

const sequelize = new Sequelize({
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT,
    database: process.env.DB_DBNAME,
    dialect: 'mysql',
    pool: {
        min: 1,
        max: 5,
    },
    logging: process.env.NODE_ENV === 'development',
    operatorsAliases: {
        $eq: Op.eq,
        $ne: Op.ne,
        $gt: Op.gt,
        $gte: Op.gte,
        $lt: Op.lt,
        $lte: Op.lte,
        $in: Op.in,
        $nin: Op.notIn,
        $like: Op.like,
        $ilike: Op.iLike,
        $notLike: Op.notLike,
        $iLike: Op.iLike,
        $overlap: Op.overlap,
        $contains: Op.contains,
        $contained: Op.contained,
    },
});

export default sequelize;
