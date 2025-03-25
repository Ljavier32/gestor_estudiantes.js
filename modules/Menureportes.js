import readline from "readline";
import {
  listarEstudiantes,
  buscarEstudiante,
  calcularPromedioPorEstudiante,
  estudiantesConPromedioMayorA,
  aprobadosYReprobadosPorMateria,
  calcularPromedioGeneral,
  promedioGeneralPorAreaDeEstudio,
  distribucionEstudiantesPorArea,
  promedioPorMateriaYArea,
  mejoresYPeoresPorArea,
  rankingPorPromedio,
  cantidadAprobadosYReprobados,
  reporteDeRendimiento
} from "./reportes.js";
import fs from "fs";


const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function cargarData() {
  const data = fs.readFileSync("./Estudiantes.json", "utf8");
  const estudiantesJSON = JSON.parse(data);
  return Object.values(estudiantesJSON);
}

function mostrarMenuReportes() {

  console.log("\n📊 MENÚ DE REPORTES:");
  console.log("1️⃣ - Listar Estudiantes");
  console.log("2️⃣ - Buscar Estudiante por Nombre o ID");
  console.log("3️⃣ - Mostrar Promedios");
  console.log("4️⃣ - Estudiantes con Promedio Mayor a un Umbral");
  console.log("5️⃣ - Aprobados y Reprobados por Materia");
  console.log("6️⃣ - Promedio General del Grupo");
  console.log("7️⃣ - Promedio General por Área");
  console.log("8️⃣ - Distribución de Estudiantes por Área");
  console.log("9️⃣ - Promedio por Materia y Área");
  console.log("🔟 - Mejores y Peores Estudiantes por Área");
  console.log("1️⃣1️⃣ - Ranking de Estudiantes por Promedio");
  console.log("1️⃣2️⃣ - Cantidad de Aprobados y Reprobados");
  console.log("1️⃣3️⃣ - Reporte de Rendimiento");
  console.log("0️⃣ - Volver al Menú Principal");

  rl.question("Elige una opción: ", (opcion) => {
    manejarOpcion(opcion);
  });
}

const manejarOpcion = (opcion) => {
  let data = cargarData();
  switch (opcion) {
    case "1":
      console.table(listarEstudiantes(data));
      mostrarMenuReportes();
      break;
    case "2":
      rl.question("🔍 Ingresa el ID o Nombre del estudiante: ", (criterio) => {
        const resultado = buscarEstudiante(isNaN(criterio) ? criterio : Number(criterio), data);
        console.table(resultado ? [resultado] : ["No encontrado"]);
        mostrarMenuReportes();
      });
      break;
    case "3":
      console.table(calcularPromedioPorEstudiante(data));
      mostrarMenuReportes();
      break;
    case "4":
      rl.question("📈 Ingresa el umbral de promedio: ", (umbral) => {
        console.table(estudiantesConPromedioMayorA(Number(umbral), data));
        mostrarMenuReportes();
      });
      return;
    case "5":
      rl.question("📚 Ingresa la materia: ", (materia) => {
        console.table(aprobadosYReprobadosPorMateria(materia, data));
        mostrarMenuReportes();
      });
      return;
    case "6":
      console.log("📊 Promedio General del Grupo:", calcularPromedioGeneral(data));
      mostrarMenuReportes();
      break;
    case "7":
      console.table(promedioGeneralPorAreaDeEstudio(data));
      mostrarMenuReportes();
      break;
    case "8":
      console.table(distribucionEstudiantesPorArea(data));
      mostrarMenuReportes();
      break;
    case "9":
      console.table(promedioPorMateriaYArea(data));
      mostrarMenuReportes();
      break;
    case "10":
      console.table(mejoresYPeoresPorArea(data));
      mostrarMenuReportes();
      break;
    case "11":
      console.table(rankingPorPromedio(data));
      mostrarMenuReportes();
      break;
    case "12":
      console.table(cantidadAprobadosYReprobados(data));
      mostrarMenuReportes();
      break;
    case "13":
      console.table(reporteDeRendimiento(data));
      mostrarMenuReportes();
      break;
    case "0":
      console.log("🔙 Volviendo al menú principal...");
      rl.close();
      return;
    default:
      console.log("❌ Opción no válida, intenta de nuevo.");
  }
  // setTimeout(mostrarMenuReportes, 1000);
};

export default mostrarMenuReportes;