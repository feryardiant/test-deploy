import Alpine from 'alpinejs'

Object.values(import.meta.glob('./modules/*.js', { eager: true })).forEach((i) => {
  Promise.resolve(i.install())
})

window.Alpine = Alpine

Alpine.start()
