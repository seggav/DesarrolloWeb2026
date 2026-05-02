import { useState } from "react";
import SingleTask from "./SingleTask";
 
const tareasIniciales = [
  { id: 1, texto: "Hacer tareas Desarrollo Web", colorFondo: "blue", estaCompletada: false },
  { id: 2, texto: "Ir por estudios", colorFondo: "blue", estaCompletada: false },
  { id: 3, texto: "Estudiar para el examen", colorFondo: "blue", estaCompletada: false },
  { id: 4, texto: "Ir al super", colorFondo: "blue", estaCompletada: false },
  { id: 5, texto: "Lavar el coche", colorFondo: "blue", estaCompletada: false },
];
 
function TodoScreen() {
  const [tareas, setTareas] = useState(tareasIniciales);
 
  function completarTarea(id) { 
    setTareas(tareas.map((t) => t.id === id ? { ...t, estaCompletada: !t.estaCompletada } : t));
  }
 
  return (
    <div style={{
      maxWidth: "400px",
      margin: "40px auto",
      padding: "30px",
      border: "1px solid white",
      borderRadius: "12px",
      fontFamily: "Times New Roman, serif",
      backgroundColor: "white",
    }}>
      <h2 style={{ textAlign: "center", color: "blue", fontSize: "28px", marginBottom: "4px" }}>
        To Do List
      </h2>
      <h3 style={{ textAlign: "center", color: "blue", fontSize: "22px", marginTop: 0 }}>
        Checklist
      </h3>
      <hr style={{ marginBottom: "20px" }} />
 
      {tareas.map((tarea) => (
        <SingleTask
          key={tarea.id}
          texto={tarea.texto}
          colorFondo={tarea.colorFondo}
          estaCompletada={tarea.estaCompletada}
          onCompletar={() => completarTarea(tarea.id)}
        />
      ))}
    </div>
  );
}
 
export default TodoScreen;