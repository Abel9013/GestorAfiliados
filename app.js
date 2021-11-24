const afiliarse = document.querySelector('#btn-afiliarse');
const tableAfiliados = document.querySelector('#table tbody')
const inputAfiliados = document.querySelector('#buttonAfiliados');
const form = document.querySelector('form');
const btnOro = document.querySelector('#buttonOro');
const btnAfiliados = document.querySelector('#buttonAfiliados');
document.addEventListener('DOMContentLoaded',()=> {

    // domAfiliados(afiliados); //**Anda para uncorporar nuevos usuarios, con LS */
    let afiliadosStorage = JSON.parse(localStorage.getItem('afiliados'));
    afiliados = afiliadosStorage || afiliados;
    console.log('Entorno listo');
    renderAfiliados(afiliados);
});
btnAfiliados.addEventListener('click', todos);
btnOro.addEventListener('click',MostrarOro);
function todos(){
    renderAfiliados(afiliados);
    console.log(afiliados);

}
function MostrarOro(){
    let nuevos = afiliados.filter(afiliado => afiliado.plan== 'oro');
    renderAfiliados (nuevos);
}

afiliarse.addEventListener('click',afiliadoArray);
tableAfiliados.addEventListener('click',modificar)
function modificar(e){
    if(e.target.classList.contains('bi-trash')){  //classList.contains quiere decir que contiene la clase 
        console.log('aca es...');
         const index = afiliados.findIndex(afiliado=>afiliado.id == e.target.parentElement.dataset.id);//*Me devuelve el index del elem de la coincidencia 
         if(index >= 0) {  //*Si es if(index) cuando el index sea == 0 no va a entrar al if 
            console.log(index);
            
             //Actualizar el arreglo de afiliados
             afiliados.splice(index, 1);
            // Actualizar el LS
            localStorage.setItem('afiliados',JSON.stringify(afiliados));
            e.target.parentElement.parentElement.parentElement.remove();//Elimino del DOM  //*Aca nos estamos moviendo, en el arbol del DOM iriamos de un elemento a su padre
        }}


}
function afiliadoArray(e){
    e.preventDefault();

    // afiliados= afiliados || []
    const inputNombre = document.querySelector('#nombre').value;
    const inputApellido = document.querySelector('#apellido').value;
    const inputEdad = document.querySelector('#edad').value;
    const inputPlan = document.querySelector('#plan').value;
    const afiliado = {
        id : afiliados.length,
        nombre: inputNombre,
        apellido: inputApellido,
        edad: inputEdad,
        plan: inputPlan,
    }
    // console.log(`nombre: ${inputNombre}, edad: ${inputEdad}, plan: ${inputPlan}`);
    afiliados.push(afiliado);
    actualizarLocalStorage();
    renderAfiliados(afiliados);
    // console.log(afiliados);
    form.reset();
}

function renderAfiliados(afiliados){
    // console.log(afiliados);
    // console.log('RenderAfiliados');
        tableAfiliados.innerHTML = ' ';
        afiliados.forEach(afiliado => {
            const row = document.createElement('tr');
            const {id, nombre, apellido, edad, plan} = afiliado;
            row.innerHTML=`
            <td>
                
            </td>
            <td>
                ${nombre} ${apellido} 
            </td>
            <td>
                ${edad}
            </td>
            <td>
                ${plan}
            </td>
             <td>
                 <a href='#' class='borrar-producto' data-id='${id}'><i class="bi bi-trash text-danger"></i></a>
             </td>
           `
           tableAfiliados.appendChild(row);
        });
}
function actualizarLocalStorage(){
    localStorage.setItem('afiliados',JSON.stringify(afiliados));
}
