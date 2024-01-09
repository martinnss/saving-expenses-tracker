import React from 'react'
import '../Styles/home.css'


const Home = () => {
    return (
    <body>
        <header>
            <div className="header">
                <div className="logo">
                    <img src="https://pngimg.com/uploads/tesla_logo/tesla_logo_PNG21.png" alt="tesla" />
                </div>
                <div className="login">
                    <p>Iniciar sesión</p>
                    <button className='btn-sm'>Empezar</button>
                </div>
            </div>
        </header>

        <section id="inicio">
            <div className="hero">
                <h1>Ahorra sin Preocupaciones </h1>
                <p>Automatiza tus Ahorros <br />   Olvídate de Compartir tus Contraseñas Bancarias </p>
                <button className='btn'>Pruébalo gratis</button>
            </div>
            <img src="https://images.blush.design/QRUjydH8GToOwKBwQPoe?w=920&auto=compress&cs=srgb" alt="two womans in a meeting" />
        </section>

        <section id="frase1">
            <div className="frase1">
                <h2>Enfocate en lo importante</h2>
                <p>
                ¡Libérate de la carga de tener que armar un excel para llevar tus ahorros! 
                </p>
                <p>
                Gracias a XXXXXXXX, , tu gestión financiera será más sencilla. Registra tus gastos y obtén un panorama claro con un <strong>resumen de tus principales categorías de gastos</strong>
                </p>
                <br />
                <p>
                    ¡Controla tu dinero de manera inteligente!
                </p>
            </div>
        </section>



        <section id="users">
            <div className="users">
                <h2>Perfecto para...</h2>
                <p><strong>¡Todos!</strong> Con XXXXXXXX, puedes traer tus ahorros de los ultimos meses y tener una visión clara de inmediato y sin esperar!</p>
                <p className='just-emojis' style={{ fontSize: '32px' }}>👩‍⚕️👨‍🔧👩‍🍳👩‍🎓👨‍💼👩‍🔬👨‍🎨👩‍✈️👨‍🚀👩‍⚖️👨‍🚒👩‍🏭👨‍🌾👩‍🔧👨‍⚕️</p>

            </div>
            <button className='btn'>Pruébalo gratis</button>
        </section>

        <footer>
            <div className="footer">
                <div class="footer-section contact">
                        <h2 className='footer-contact'>Contacto</h2>
                        <p className='footer-contact'>info@tustartup.com</p>
                </div>
                <div className="footer-bottom">
                    <p className='footer-contact'>&copy; 2023 XXXXXX. Todos los derechos reservados.</p>
                </div>
            </div>
        </footer>
    </body>
    );
};


export default Home