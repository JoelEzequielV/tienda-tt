import React from 'react'

const Footer = () => {
  return (
    <footer className='footer bg-dark text-white-50 text-center pt-4'>
        <div className="container">
        <div className="row">
          <div className="col-md-8 col-sm-6 col-xs-12">
            <p className="copyright-text">Copyright &copy; 2025 - Tienda <a href="#"> e-TechX</a>.
            </p>
          </div>

          <div className="col-md-4 col-sm-6 col-xs-12 sociales">
            <ul className="social-icons d-flex" style={{justifyContent: 'center'}}>
              <li><a className="facebook" href="#"><i className="fa fa-facebook"></i></a></li>
              <li><a className="twitter" href="#"><i className="fa fa-twitter"></i></a></li>
              <li><a className="instagram" href="#"><i className="fa fa-instagram"></i></a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
