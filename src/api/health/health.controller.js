'use strict'

export async function index (ctx, next) {
  const data = {'status': 'OK'}
  ctx.status = 200
  ctx.body = data
  await next()
}
