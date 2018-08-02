import * as Koa from 'koa';
import * as Router from 'koa-router';
import * as bodyParser from 'koa-bodyparser';
import * as mongoose from 'mongoose';

import { db, port } from './config';

import cors from './middlewares/cors';
import errorCatcher from './middlewares/errorCatcher';

import { getRoot } from './controllers/root';
import { getUsers, getUserByUserId, postUser } from './controllers/users';

class App {
    router = new Router();
    koaInstance = new Koa();
    /**
     * 连接 mongodb
     */
    async connectMongoose() {
        // https://github.com/typeorm/mongo-typescript-example/issues/1
        await mongoose.connect(db, { useNewUrlParser: true }).catch((err) => {
            console.error(`Connect to ${db} error: ${err.message}`);
            process.exit(1);
        });

        console.log(`Successfully connected to ${db}`);
    }
    /**
     * 设置路由
     */
    setRoutes() {
        this.router.get('/', getRoot);
        // 获取用户列表
        this.router.get('/users', getUsers);
        // 获取单个用户
        this.router.get('/users/:user_id', getUserByUserId);
        // 新增用户
        this.router.post('/users', bodyParser(), postUser);
    }
    /**
     * 应用中间件
     */
    applyMiddlewares() {
        this.koaInstance.use(errorCatcher());
        this.koaInstance.use(cors());
        this.koaInstance.use(this.router.routes());
    }
    /**
     * 开启服务
     */
    serve() {
        this.koaInstance.listen(port, () => {
            console.log(`Server listening on 0.0.0.0 port ${port}`);
        });
    }
    /**
     * 启动应用
     */
    async run() {
        await this.connectMongoose();
        this.setRoutes();
        this.applyMiddlewares();
        this.serve();
    }
}

const app = new App();
app.run();
