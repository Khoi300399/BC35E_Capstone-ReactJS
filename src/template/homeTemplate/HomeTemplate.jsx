import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../../components/footer/Footer'
import Header from '../../components/header/Header'

const HomeTemplate = () => {
  return (
    <>
    <Header />
    <section className='content' style={{minHeight: '75vh'}}>
      <Outlet />
    </section>
    <Footer />
    </>
  )
}

export default HomeTemplate