import '../css/style.css'
import "bootstrap/dist/css/bootstrap.css"

function MyApp({ Component, pageProps }): JSX.Element {
    return <Component {...pageProps} />
  }

export default MyApp