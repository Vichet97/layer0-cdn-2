module.exports = {
  routes: './src/routes.ts',
  connector: '@edgio/starter',
  backends: {
    origin: {
      domainOrIp: 'httpbin.org',
      hostHeader: 'httpbin.org',
      disableCheckCert: true,
    },
  },
}
