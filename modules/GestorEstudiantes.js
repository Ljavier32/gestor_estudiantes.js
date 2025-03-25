import crearEstudiante from "./Estudiante.js";
import fs from "fs";

const GestorEstudiantes = (() => {
    let estudiantes = {};

    const cargarEstudiantesDesdeJSON = () => {
        try {
            const data = fs.readFileSync("./Estudiantes.json", "utf8");
            const estudiantesJSON = JSON.parse(data);
           
            estudiantesJSON.forEach(est => {
                agregarEstudiante(est.nombre, est.edad, est.area, est.calificaciones);
            });
           
            console.log("✅ Estudiantes precargados desde JSON correctamente.");
        } catch (error) {
            console.error("⚠️ Error al cargar el archivo JSON:", error.message);
        }
    };

    const agregarEstudiante = (nombre, edad, area, calificaciones) => {
        if (!calificaciones.Matematicas || !calificaciones.CienciasNaturales || !calificaciones.CienciasSociales || !calificaciones.LenguaEspañola) {
            console.log("Error: Debe proporcionar calificaciones para todas las materias básicas.");
            return;
        }
        const estudiante = crearEstudiante(nombre, edad, area, calificaciones);
        estudiantes[estudiante.id] = estudiante;
        console.log(`Estudiante agregado: ${estudiante.nombre}`);
    };

    const listarEstudiantes = () => {
        return Object.values(estudiantes).map(est => ({
            ID: est.id,
            Nombre: est.nombre,
            Edad: est.edad,
            Área: est.area,
            Matemáticas: est.calificaciones?.Matematicas || "N/A",
            Naturales: est.calificaciones?.CienciasNaturales || "N/A",
            Sociales: est.calificaciones?.CienciasSociales || "N/A",
            Español: est.calificaciones?.LenguaEspañola || "N/A",
            EducaciónFísica: est.calificaciones?.EducaciónFísica || "N/A"
            
        }));
    };

    const buscarEstudiante = (criterio) => {
        var res = Object.values(estudiantes).find(est => est.id == criterio || est.nombre.toLowerCase() == criterio.toLowerCase());
        return  res ?? "Estudiante no encontrado";
    };
    

    const actualizarEstudiante = (id, nombre, edad, area, calificaciones) => {
        if (!estudiantes[id]) {
            console.log("⚠️ Estudiante no encontrado.");
            return;
        }
       
        const estudiante = estudiantes[id];
        estudiante.nombre = nombre || estudiante.nombre;
        estudiante.edad = edad ? parseInt(edad) : estudiante.edad;
        estudiante.area = area || estudiante.area;
        estudiante.calificaciones = {
            Matematicas: calificaciones?.Matematicas ?? estudiante.calificaciones.Matematicas,
            Naturales: calificaciones?.Naturales ?? estudiante.calificaciones.CienciasNaturales,
            Sociales: calificaciones?.Sociales ?? estudiante.calificaciones.CienciasSociales,
            Espanol: calificaciones?.Espanol ?? estudiante.calificaciones.LenguaEspañola
        };
        console.log(`✅ Estudiante ${nombre} actualizado correctamente.`);
    };

    const eliminarEstudiante = (id) => {
        if (!estudiantes[id]) {
            console.log("⚠️ Estudiante no encontrado.");
            return;
        }
        delete estudiantes[id];
        console.log(`✅ Estudiante con ID ${id} eliminado correctamente.`);
    };


    // cargarEstudiantesDesdeJSON();

    return {
        agregarEstudiante,
        listarEstudiantes,
        buscarEstudiante,
        actualizarEstudiante,
        eliminarEstudiante,
        cargarEstudiantesDesdeJSON,
        estudiantes
    };
})();

export default GestorEstudiantes;