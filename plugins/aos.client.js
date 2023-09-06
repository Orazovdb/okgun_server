import AOS from 'aos'
import { inject } from 'vue'

// import 'aos/dist/aos.css'

export default ({ app }, inject) => {
  app.AOS = new AOS.init()
}

// export default ({ app }) => {
//   app.AOS = AOS.init({
//     once: true
//   })
// }
