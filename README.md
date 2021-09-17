# SalesApi
Prueba técnica BRM de API para ventas

Dependencias a instalar:

* bcryptjs: Encriptación de passwords.
* express: Framework para facilitar la interacción con el servidor NodeJS
* express-validator: Validación de campos entrantes
* jwt-simple: Simplificación de codificar y decodificar tokens JWT
* moment: Librería para la manipulación de fecha y hora
* mysql2: Driver para la base de datos MySQL
* sequelize: ORM para interactuar con las bases de datos

La carpeta models contiene la declaración de los modelos que generarán las tablas en la base de datos. Aquí se encuentran los modelos:

* products.js: Estructura de los productos
* users.js: Estructura de los usuarios
* sales.js: Estructura de la tabla ventas
* sales_det.js: Estructura de la tabla de detalle de la venta

La carpeta routes tiene los archivos que manejan las rutas del API. En cada endpoint están configurados sus prefijos y el middleware que protege la aplicación con autenticación y un token JWT.

* api.js: Declara las rutas generales del API, con sus respectivos prefijos y agrega el middleware en los endpoints necesarios.
* middleware.js: Sirve para evaluar y decodificar el JWT, con base en ello permite la ejecución del endpoint.
* Carpeta api: Esta contiene las rutas que ejecutan el crud de ventas y productos. También contiene los endpoints necesarios para hacer el login.
  * products.js: Contiene el CRUD de productos con los campos requeridos en la prueba técnica. Valida la entrada de campos con valores y que estén en el formato y tipo de campos requerido.
  * sales.js: Aquí se maneja el CRUD de las ventas y genera listados con los históricos filtrados por fechas usando el endpoint /history. Valida de igual manera el evitar el envío de campos en blanco y en el formato que no se haya requerido.
  * users.js: Contiene los endpoints de login y register, para iniciar sesión y crear un usuario respectivamente. Se hace validación de campos igualmente que en los otros endpoints. Aquí con el login se genera el JWT que se usará para el resto del API. Para registrar un usuario se necesitan los siguientes campos: nombre de usuario, email, password y role
 
 Para la ejecución correcta de esta API hay que seguir los siguientes pasos:
 
 * Bajar el repositorio.
 * Correr el npm install para instalar las dependencias.
 * Ejecutar el API con nodemon index.js
 * Iniciar el primer endpoint para crear el usuario: http://localhost:3000/api/users/register y pasar por POST los campos de username, password, email, role.
 * Hacer login con el usuario usando el endpoing http://localhost:3000/api/users/login y pasar por POST los campos de username, email y password.
 * Copiar el token generado y usarlo como cabecera de nombre user-token en todas las peticiones que vaya a hacer.
 * Crear productos usando el endpoint http://localhost:3000/api/products y pasar por POST un JSON con el siguiente formato:
    
    {
        "numlote": "LOT696",
        "nombre": "Correa",
        "precio": 15.99,
        "cantdisp": 30,
        "fechaing": "2021-09-16T17:20:00.000Z"
    }
    
   Devuelve como resultado un JSON con la ejecución de la operación.
    
 * Se crearán las ventas usando el endpoint http://localhost:3000/api/sales y se deberá pasar por la cabecera user-token y en el cuerpo de la petición el JSON

   {
        "user_id": 1,
        "total": 187.92,
        "datesale": "2021-09-17T17:20:00.000Z",
        "sale_detail": [
            {
                "product_id": 1,
                "cant": 2,
                "subtotal": 71.98
            },
            {
                "product_id": 2,
                "cant": 2,
                "subtotal": 31.98
            },
            {
                "product_id": 3,
                "cant": 2,
                "subtotal": 51.98
            }
            ,
            {
                "product_id": 4,
                "cant": 2,
                "subtotal": 31.98
            }
        ]
    }
    
    Se obtendrá una respuesta mostrando el encabezado y detalle del producto creado.
    
 * Para consultar el historial de las ventas realizadas se utilizará el endpoint http://localhost:3000/api/sales/history , usando como cabecera el token y por POST se pasarán los datos de fecha inicial y final de la búsqueda de la siguiente manera:

   {
      "inidate": "2021-09-16",
      "enddate": "2021-09-16"
   }
   
   Como resultado se obtendrá un listado de ventas con encabezado y detalle.
