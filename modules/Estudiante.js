let currentId = 1; 

function crearEstudiante(nombre, edad, area, calificaciones = {}) {
    const id = currentId++;

    function calcularPromedio() {
        const valores = Object.values(calificaciones);
        return valores.length ? valores.reduce((acc, nota) => acc + nota, 0) / valores.length : 0;
    }

    return {
        id,
        nombre,
        edad,
        area,
        calificaciones,
        calcularPromedio
    };
}

export default crearEstudiante;