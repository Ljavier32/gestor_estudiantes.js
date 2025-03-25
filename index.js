import GestorEstudiantes from "./modules/GestorEstudiantes.js";
import mostrarMenuReportes from "./modules/Menureportes.js"
import readline from "readline";



const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


GestorEstudiantes.cargarEstudiantesDesdeJSON();


function mostrarMenu() {

    console.log("\n--- Sistema CRUD de Estudiantes ---");
    console.log("1. Agregar estudiante");
    console.log("2. Listar estudiantes");
    console.log("3. Buscar estudiante");
    console.log("4. Generar reportes");
    console.log("5. Actualizar estudiante");
    console.log("6. Eliminar estudiante");
    console.log("7. Salir");

    rl.question("Seleccione una opción: ", opcion => {
        switch (opcion) {
            case "1":
                GestorEstudiantes.agregarEstudiante();
                mostrarMenu();
                break;
            case "2":
                console.table(GestorEstudiantes.listarEstudiantes());
                mostrarMenu();
                break;
            case "3":
                rl.question("Introduzca criterio de busqueda: ", opcion => {console.log(GestorEstudiantes.buscarEstudiante(opcion));  mostrarMenu();});
                break;
            case "4":
                mostrarMenuReportes();
                break;
            case "5":
                rl.question("Ingrese el ID del estudiante a actualizar: ", id => {
                    GestorEstudiantes.actualizarEstudiante(parseInt(id), rl, mostrarMenu);
                });
                break;
            case "6":
                rl.question("Ingrese el ID del estudiante a eliminar: ", id => {
                    GestorEstudiantes.eliminarEstudiante(parseInt(id));
                    mostrarMenu();
                });
                break;
            case "7":
                console.log("Saliendo...");
                rl.close();
                break;
            default:
                console.log("Opción no válida.");
                mostrarMenu();
        }
    });
}

mostrarMenu();