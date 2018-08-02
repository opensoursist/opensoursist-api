import * as Koa from 'koa';

import User, { UserType } from '../models/User';
import createError from '../utils/createError';

/**
 * 获取用户列表
 */
export async function getUsers(ctx: Koa.Context) {
    const users = await User.find({}).exec();

    if (!users) {
        return Promise.reject(createError(404));
    }

    ctx.body = users;
}

/**
 * 获取单个用户
 */
export async function getUserByUserId(ctx: Koa.Context) {
    const { user_id } = ctx.params;
    const user = await User.findOne({ user_id }).exec();

    if (!user) {
        return Promise.reject(createError(404));
    }

    ctx.body = user.toJSON();
}

/**
 * 创建一个用户
 */
export async function postUser(ctx: Koa.Context) {
    const { user_id, email } = ctx.request.body as Partial<UserType>;
    const newUser = new User({
        user_id,
        email
    });

    await newUser.save();

    // 201 Created
    ctx.status = 201;
    ctx.body = newUser.toJSON();
}