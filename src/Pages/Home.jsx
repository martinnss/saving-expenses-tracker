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
                <h1>Toma decisiones informadas y ahorra tiempo</h1>
                <p>Maximiza la eficacia de tus reuniones gracias a resúmenes automáticos impulsados por IA</p>
                <button className='btn'>Pruébalo gratis</button>
            </div>
            <img src="https://images.blush.design/QRUjydH8GToOwKBwQPoe?w=920&auto=compress&cs=srgb" alt="two womans in a meeting" />
        </section>

        <section id="frase1">
            <div className="frase1">
                <h2>Enfocate en lo importante</h2>
                <p>
                Libérate de la carga de tomar notas y asegúrate de capturar cada detalle relevante. 
                </p>
                <p>
                Gracias a Resumia, solo necesitas grabar tu reunión y <strong> nosotros nos encargaremos de proporcionarte un resumen</strong> organizado que destacará los puntos más importantes discutidos.
                </p>
            </div>
        </section>

        <section id="how-it-works">
            <div className="how-it-works">
                <h2>How it works?</h2>
                <p>
                Pantallazos que expliquen como se usa
                </p>
            </div>
        </section>

        <section id="users">
            <div className="users">
                <h2>Perfecto para...</h2>
                <p><strong>¡Todos!</strong> Con Resumia, puedes resumir tus reuniones, entrevistas, charlas o cualquier tipo de encuentro, sin importar la industria o el ámbito en el que te desenvuelvas</p>
                <p className='just-emojis' style={{ fontSize: '32px' }}>👩‍⚕️👨‍🔧👩‍🍳👩‍🎓👨‍💼👩‍🔬👨‍🎨👩‍✈️👨‍🚀👩‍⚖️👨‍🚒👩‍🏭👨‍🌾👩‍🔧👨‍⚕️</p>

            </div>
            <button className='btn'>Pruébalo gratis</button>
        </section>

        <footer>
        <div className="container">
            <p>Derechos de Autor &copy; 2023 Tu Startup</p>
        </div>
        </footer>
    </body>
    );
};


export default Home