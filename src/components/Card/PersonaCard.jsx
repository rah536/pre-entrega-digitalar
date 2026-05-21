// components/Card/Card.jsx
export function Card({ nombre, puesto, foto }) {
  return (
    <div style={{ 
      border: "1px solid #ccc", 
      borderRadius: "12px", 
      padding: "20px 15px", 
      minWidth: "160px",
      backgroundColor: "white",
      color: "black",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      boxShadow: "0 2px 5px rgba(0,0,0,0.05)"
    }}>
      
      <img 
        src={foto} 
        alt={`Avatar de ${nombre}`} 
        style={{ 
          width: '90px', 
          height: '90px', 
          borderRadius: '50%', 
          objectFit: 'cover',  
          marginBottom: '15px',
          border: '3px solid #b95fe3'
        }} 
      />
      
      <h4 style={{ margin: "0 0 5px 0", fontSize: "1.1rem" }}>{nombre}</h4>
      <p style={{ margin: "0", fontSize: "0.9rem", color: "#666" }}>{puesto}</p>
    </div>
  );
}