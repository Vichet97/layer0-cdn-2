import { CACHE_ASSETS } from './cache'
import routeHandler from './route-handler'
import { Router } from '@edgio/core/router'
import { starterRoutes } from '@edgio/starter'

export default new Router()
  .noIndexPermalink()
  .use(starterRoutes)
  // example routes for cacheable pages
  .get('/', routeHandler)
  .get('/insights', routeHandler)
  .get('/post/:path*', routeHandler)
  // example route for cacheable assets
  // .match('/images/:path*', ({ cache, proxy }) => {
  //  cache(CACHE_ASSETS)
  //  return proxy('origin')
  // })
  // useful configs for generated outputs
  .get('/service-worker.js', ({ cache, serviceWorker }) => {
    cache(CACHE_ASSETS)
    serviceWorker('dist/service-worker.js')
  })
  .match('/main.js', ({ serveStatic, cache }) => {
    cache(CACHE_ASSETS)
    return serveStatic('dist/browser.js')
  })
  // fallback route for all other requests:
  .fallback(({ proxy }) => {
    proxy('origin', {
      transformRequest: (req) => {
        req.setHeader("cookie", "_gcl_au=1.1.2043340608.1664296993; _ga=GA1.2.2075536561.1632547407; GCLB=CLLx9Ofo7a-btgE; __ew_fiddle_preview=4f1a176d5ca49788097ca45336cd2b753a484d70e12eabcda0109bb59301668b1calm-sun-4e37.cfnc.workers.dev")
      }
    })
  })
