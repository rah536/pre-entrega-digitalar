import Navbar from './Navbar';

function Header() {
    return (
        <header style={{ backgroundColor: '#eee5e5', padding: '10px 0' }}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '0' }}>
                {/* Reemplazá con la ruta de tu logo */}
                <img 
                    src="/images/digitalar.png" 
                    alt="Logo" 
                    style={{ height: '130px', objectFit: 'contain' }} 
                />
            </div>
        <Navbar/>
        </header>
    );
}
export default Header;