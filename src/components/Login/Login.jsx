// src/componentes/Login/Login.jsx
import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
        const user = userCredential.user;
        console.log("Usuario logueado:", user);
        alert("¡Inicio de sesión exitoso!");
        navigate('/'); //
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error("Error en el login:", errorCode, errorMessage);
        alert("Error: " + errorMessage);
    });
};

const styles = {
        container: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "70vh", // Lo centra verticalmente en la pantalla
            fontFamily: "sans-serif"
        },
        card: {
            display: "flex",
            flexDirection: "column",
            gap: "15px",
            width: "320px",
            padding: "30px",
            border: "1px solid #e0e0e0",
            borderRadius: "8px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
            backgroundColor: "#fff"
        },
        title: {
            margin: "0 0 10px 0",
            textAlign: "center",
            color: "#333",
            fontSize: "24px"
        },
        input: {
            padding: "10px 12px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            fontSize: "14px",
            outline: "none"
        },
        button: {
            padding: "12px",
            backgroundColor: '#b95fe3',
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "16px",
            fontWeight: "bold",
            marginTop: "10px"
        }
    };

return (
    <div style={styles.container}>
            <form onSubmit={handleLogin} style={styles.card}>
                <h2 style={styles.title}>Iniciar Sesión</h2>
                
                <input
                    type="email"
                    placeholder="Correo electrónico"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={styles.input}
                    required
                    maxLength={30}
                />

                <input
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={styles.input}
                    required
                    maxLength={20}
                />
                
                <button type="submit" style={styles.button}>Ingresar</button>
            </form>
        </div>
    );
};

export default Login;