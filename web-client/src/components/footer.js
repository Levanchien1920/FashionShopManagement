import React from 'react'

function footer() {
    return (
        <div>
             <div class="footer">
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-lg-3 col-md-6">
                            <div class="footer-widget">
                                <h2>Get in Touch</h2>
                                <div class="contact-info">
                                    <p><i class="fa fa-map-marker"></i>123 E Store, Los Angeles, USA</p>
                                    <p><i class="fa fa-envelope"></i>email@example.com</p>
                                    <p><i class="fa fa-phone"></i>+123-456-7890</p>
                                </div>
                            </div>
                        </div>
                        
                        <div class="col-lg-3 col-md-6">
                            <div class="footer-widget">
                                <h2>Follow Us</h2>
                                <div class="contact-info">
                                    <div class="social">
                                        <a href="https://www.facebook.com/chien.le.52090008"><i class="fab fa-twitter"></i></a>
                                        <a href="https://www.facebook.com/vietthanh1999"><i class="fab fa-facebook-f"></i></a>
                                        <a href="https://www.facebook.com/van.hoang.99er/"><i class="fab fa-linkedin-in"></i></a>
                                        <a href="https://www.facebook.com/lvc150599"><i class="fab fa-instagram"></i></a>
                                        <a href="https://www.facebook.com/quangnhan.nguyen.771"><i class="fab fa-youtube"></i></a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="col-lg-3 col-md-6">
                            <div class="footer-widget">
                                <h2>Company Info</h2>
                                <ul>
                                    <li><a href="abc">About Us</a></li>
                                    <li><a href="abc">Privacy Policy</a></li>
                                    <li><a href="abc">Terms Condition</a></li>
                                </ul>
                            </div>
                        </div>

                        <div class="col-lg-3 col-md-6">
                            <div class="footer-widget">
                                <h2>Purchase Info</h2>
                                <ul>
                                    <li><a href="abc">Pyament Policy</a></li>
                                    <li><a href="a">Shipping Policy</a></li>
                                    <li><a href="a">Return Policy</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    
                    <div class="row payment align-items-center">
                        <div class="col-md-6">
                            <div class="payment-method">
                                <h2>We Accept:</h2>
                                <img src="img/payment-method.png" alt="Payment Method" />
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="payment-security">
                                <h2>Secured By:</h2>
                                <img src="img/godaddy.svg" alt="Payment Security" />
                                <img src="img/norton.svg" alt="Payment Security" />
                                <img src="img/ssl.svg" alt="Payment Security" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="footer-bottom">
                <div class="container">
                    <div class="row color1">
                        <p>demo</p>
                    </div>
                </div>
            </div>
            <a href="a" className="back-to-top"><i class="fa fa-chevron-up"></i></a>
           
        </div>
    )
}
export default footer
