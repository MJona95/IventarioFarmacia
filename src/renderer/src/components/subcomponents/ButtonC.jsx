// src/components/Button.jsx
import '../css/ButtonC.css'; // Opcional: crea un archivo CSS para tus estilos de botón

function ButtonC({ children, onClick, variant = 'primary', disabled = false }) {
  // `children` contendrá lo que esté dentro de las etiquetas <Button> (ej. el texto del botón)
  // `onClick` será la función que se ejecutará cuando se haga clic en el botón
  // `variant` puede ser 'primary', 'secondary', 'danger', etc., para diferentes estilos
  // `disabled` para deshabilitar el botón

  const buttonClasses = `button ${variant}`; // Combina la clase base con la variante

  return (
    <button
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
      
    </button>
  );
}

export default ButtonC;