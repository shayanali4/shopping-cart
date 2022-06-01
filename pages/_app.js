import '../styles/globals.css'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
import React, { useState, useContext, createContext } from 'react'


export const getCountContext = createContext();
export const setCountContext = createContext();
function MyApp({ Component, pageProps }) {
 // const [getCount, setCount] = useState(0);
  const [total, setTotal] = useState(0)
  return (

    <>
      <getCountContext.Provider value={total}>
        <setCountContext.Provider value={setTotal}>
          <NavBar />
          <Component {...pageProps} />
          <Footer />
        </setCountContext.Provider>
      </getCountContext.Provider>
    </>
  )
}

export default MyApp

/*

add product total
clean up code and understand everything properly
organize shopcart structure
split into more components
*/