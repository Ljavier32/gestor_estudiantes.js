import estudiantes from "./GestorEstudiantes.js"

  // 1️⃣ Listado de Estudiantes
export const listarEstudiantes = (estudiantes) => {
  
  return estudiantes.map(est => ({
      nombre: est.nombre,
      id: est.id,
      área: est.área
  }));
};
  
  // 2️⃣ Búsqueda de Estudiante por Nombre o ID
  export const buscarEstudiante = (criterio, estudiantes) => {
     var f = estudiantes.filter(est => est.id == criterio || est.nombre == criterio)
    return f.map(est => ({
      ID: est.id,
      Nombre: est.nombre,
      Edad: est.edad,
      area: est.area,
      Matemáticas: est.calificaciones?.Matematicas || "N/A",
      Naturales: est.calificaciones?.CienciasNaturales || "N/A",
      Sociales: est.calificaciones?.CienciasSociales || "N/A",
      Español: est.calificaciones?.LenguaEspañola || "N/A"
  })) || null;
  };
  
  // 3️⃣ Promedio de Calificaciones por Estudiante
  export const calcularPromedioPorEstudiante = (estudiantes) => {
    return estudiantes.map(est => {
        const calificaciones = Object.values(est.calificaciones);
        const promedio = calificaciones.reduce((acc, nota) => acc + nota, 0) / calificaciones.length;
        return { nombre: est.nombre, promedio: parseFloat(promedio.toFixed(2)), area: est.area, };
    });
  };
  
  // 4️⃣ Listado de Estudiantes con Promedio Mayor a un Umbral
  export const estudiantesConPromedioMayorA = (umbral, estudiantes) => {
    return calcularPromedioPorEstudiante(estudiantes).filter(est => est.promedio > umbral);
  };
  
  // 5️⃣Aprobados y Reprobados por Materia
  export const aprobadosYReprobadosPorMateria = (materia, estudiantes, umbral = 60) => {
    return estudiantes.reduce((res, est) => {
        const calificacion = est.calificaciones[materia];
        if (calificacion !== undefined) {
            if (calificacion >= umbral) {
                res.aprobados.push({ nombre: est.nombre, calificación: calificacion, area: est.area });
            } else {
                res.reprobados.push({ nombre: est.nombre, calificación: calificacion, area: est.area });
            }
        }
        return res;
    }, { aprobados: [], reprobados: [] });
  };
  
  // 6️⃣ Calcular Promedio General del Grupo
  export const calcularPromedioGeneral = (estudiantes) => {
      const totalPromedios = calcularPromedioPorEstudiante(estudiantes).reduce((acc, est) => acc + est.promedio, 0);
      return estudiantes.length ? parseFloat((totalPromedios / estudiantes.length).toFixed(2)) : 0;
  };
  
  // 7️⃣ Promedio General por area de Estudio
  export const promedioGeneralPorAreaDeEstudio = (estudiantes) => {
    const promedios = estudiantes.reduce((areas, est) => {
        const promedio = calcularPromedioPorEstudiante(estudiantes).find(e => e.nombre === est.nombre).promedio;
        if (!areas[est.area]) {
            areas[est.area] = { total: 0, cantidad: 0 };
        }
        areas[est.area].total += promedio;
        areas[est.area].cantidad++;
        return areas;
    }, {});
  
    return Object.keys(promedios).map(area => ({
        area: area,
        "Promedio General": parseFloat((promedios[area].total / promedios[area].cantidad).toFixed(2))
    }));
  };
  
  
  // 8️⃣ Distribución de Estudiantes por area
  export const distribucionEstudiantesPorArea = (estudiantes) => {
    return estudiantes.reduce((acc, est) => {
      if (!acc[est.area]) {
        acc[est.area] = [];
      }
      acc[est.area].push(est.nombre);
      return acc;
    }, {});
  };
  
  
  // 9️⃣ Promedio de Cada Materia por area de Estudio
  export const promedioPorMateriaYArea = (estudiantes) => {
    const materias = Object.keys(estudiantes[0].calificaciones);  // Obtener las materias
    return estudiantes.reduce((acc, est) => {
      materias.forEach(materia => {
        if (!acc[est.area]) {
          acc[est.area] = {};
        }
        if (!acc[est.area][materia]) {
          acc[est.area][materia] = { total: 0, cantidad: 0 };
        }
        acc[est.area][materia].total += est.calificaciones[materia];
        acc[est.area][materia].cantidad++;
      });
      return acc;
    }, {});
  };
  
  // 🔟 Mejores y Peores Estudiantes por area
  export const mejoresYPeoresPorArea = (estudiantes) => {
    const estudiantesOrdenadosPorArea = estudiantes.reduce((acc, est) => {
    const promedioEstudiante = Object.values(est.calificaciones).reduce((sum, nota) => sum + nota, 0) / Object.values(est.calificaciones).length;
        if (!acc[est.area]) {
            acc[est.area] = [];
        }
        acc[est.area].push({ nombre: est.nombre, promedio: promedioEstudiante, area: est.area });
        return acc;
    }, {});
  
    Object.keys(estudiantesOrdenadosPorArea).forEach(area => {
        estudiantesOrdenadosPorArea[area].sort((a, b) => b.promedio - a.promedio);
    });
  
    return Object.keys(estudiantesOrdenadosPorArea).reduce((acc, area) => {
        acc[area] = {
            mejores: estudiantesOrdenadosPorArea[area].slice(0, 2),
            peores: estudiantesOrdenadosPorArea[area].slice(-2)
        };
        return acc;
    }, {});
  };
  
  // 1️⃣1️⃣ Ranking de Estudiantes por Promedio
  export const rankingPorPromedio = (estudiantes) => {
    return estudiantes.map(est => {
    const promedioEstudiante = Object.values(est.calificaciones).reduce((sum, nota) => sum + nota, 0) / Object.values(est.calificaciones).length;
        return { ...est, promedio };
    }).sort((a, b) => b.promedio - a.promedio);
  };
  
  // 1️⃣2️⃣ Cantidad de Aprobados y Reprobados en la Clase
  export const cantidadAprobadosYReprobados = (estudiantes) => {
    return estudiantes.reduce((acc, est) => {
        const promedio = Object.values(est.calificaciones).reduce((sum, nota) => sum + nota, 0) / 3;
        promedio >= 60 ? acc.aprobados++ : acc.reprobados++;
        return acc;
    }, { aprobados: 0, reprobados: 0 });
  };
  
  // 1️⃣3️⃣ Reporte de Rendimiento Académico
  export const reporteDeRendimiento = (estudiantes) => {
    const totalEstudiantes = estudiantes.length;
  
    const calcularPromedio = (estudiante) => {
        const calificaciones = Object.values(estudiante.calificaciones);
        return calificaciones.reduce((sum, nota) => sum + nota, 0) / calificaciones.length;
    };
  
    const promedioGeneral = estudiantes.reduce((sum, est) => sum + calcularPromedio(est), 0) / totalEstudiantes;
    const mejoresEstudiantes = estudiantes.filter(est => calcularPromedio(est) > 85);
    const peoresEstudiantes = estudiantes.filter(est => calcularPromedio(est) < 60);
    
  
    return {
        totalEstudiantes,
        promedioGeneral,
        mejoresEstudiantes,
        peoresEstudiantes
    };
  };