import cookie from 'js-cookie'
import Router from 'next/router'

export const handleLogin = (token) => {
    cookie.set('merntoken', token)
    Router.push('/account')
}

export const handleLogout = () => {
    cookie.remove('merntoken')
    window.localStorage.setItem('logout', Date.now())
    Router.push('/login')
}

export function redirectUser(ctx, location) {
    //if on server
    if (ctx.req) {
        ctx.res.writeHead(302, { Location: location })
        ctx.res.end()
    } 
    //if on client
    else {
        Router.push(location)
    }
}