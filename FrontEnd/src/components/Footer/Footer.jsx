import './Footer.css'
function Footer(){
    return(<div className='footer' id='footer'>
        <div className='footer-content'>
            <div className='footer-content-left'>
                <p>CanteenCraft<span>.</span></p>
                <p>Copyright 2020</p>
                <div className='footer-social-icons'>
                    <a href='https://www.instagram.com/canteen_craft/' target='_blank'>Instagram</a><br></br>
                    <a href='https://www.facebook.com/canteen.craft.1/' target='_blank'>Facebook</a>
                </div>
            </div>
            <div className="footer-content-center">
                <h2>COMPANY</h2>
                <ul>
                    <li>Home</li>
                    <li>Menu</li>
                    <li>Contact Us</li>
                </ul>
            </div>
            <div className="footer-content-right">
                <h2>GET IN TOUCH</h2>
                <ul>
                    <li>9800000000</li>
                    <li>email@email.com</li>
                </ul>
            </div>
        </div>
        <hr/>
        <p className="footer-copyright">
            &copy; 2020 CanteenCraft. All rights reserved.
        </p>
    </div>)
}
export default Footer