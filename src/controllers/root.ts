import * as Koa from 'koa';

export function getRoot(ctx: Koa.Context) {
    ctx.body = {
        users_url: `/users{/user_id}`
    };
}