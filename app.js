'use strict'
const afiliarse = document.querySelector('#btn-afiliarse');
const tableAfiliados = document.querySelector('#table tbody')
const inputAfiliados = document.querySelector('#buttonAfiliados');
const form = document.querySelector('form');
const btnOro = document.querySelector('#buttonOro');
const btnAfiliados = document.querySelector('#buttonAfiliados');
const btnCancelar = document.querySelector('#buttonCancelar');
let edit = false;
let afiliadoEdit = {};
let idEdit = null;
document.addEventListener('DOMContentLoaded',()=> {

    // domAfiliados(afiliados); //**Anda para uncorporar nuevos usuarios, con LS */
    let afiliadosStorage = JSON.parse(localStorage.getItem('afiliados'));
    afiliados = afiliadosStorage || afiliados;
    console.log('Entorno listo');
    console.log(afiliados);
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
        // console.log('aca es...');
            const index = afiliados.findIndex(afiliado=>afiliado.id == e.target.parentElement.dataset.id);//*Me devuelve el index del elem de la coincidencia 
            if(index >= 0) {  //*Si es if(index) cuando el index sea == 0 no va a entrar al if 
            console.log(index);
            
             //Actualizar el arreglo de afiliados
             afiliados.splice(index, 1);
            // Actualizar el LS
            localStorage.setItem('afiliados',JSON.stringify(afiliados));
            e.target.parentElement.parentElement.parentElement.remove();//Elimino del DOM  //*Aca nos estamos moviendo, en el arbol del DOM iriamos de un elemento a su padre
        }}
        
    if(e.target.classList.contains('bi-pencil-square')){
        edit = true;
        console.log('Clickeaste el lapiz de editar');
        let afiliadoEdit = afiliados.find(afiliado=>afiliado.id == e.target.parentElement.dataset.id);//*Me devuelve el index del elem de la coincidencia    
        // console.log(typeof(afiliadoEdit1)); objeto 
    
            console.log(`Este es afiliadoEdit ${afiliadoEdit.nombre} ${afiliadoEdit.plan} ${afiliadoEdit.edad}`);
            let inputNombre = document.querySelector('#nombre')
            inputNombre.value = afiliadoEdit.nombre;
        
            let inputEdad = document.querySelector('#edad');
            inputEdad.value = afiliadoEdit.edad;
            let inputPlan = document.querySelector('#plan');
            inputPlan.value = afiliadoEdit.plan;
            let inputApellido = document.querySelector('#apellido');
            inputApellido.value = afiliadoEdit.apellido;
            btnCancelar.classList.toggle('d-none');
            afiliarse.value = 'Confirmar Edicion';
            idEdit = afiliadoEdit.id; //Guardo idEdit 
    }
}
function afiliadoArray(e){
    
    e.preventDefault();
    const inputNombre = document.querySelector('#nombre').value;
    const inputApellido = document.querySelector('#apellido').value;
    const inputEdad = document.querySelector('#edad').value;
    const inputPlan = document.querySelector('#plan').value;
    if(edit){
        console.log(`Este es el idEdit: ${idEdit}`);
        edit = false;
        //Actualizar la tarea en el  arreglo 
        // afiliadoEdit.nombre = inputNombre.value;
            
        const afiliadosEdit = afiliados.map(afiliado =>{
        if( idEdit == afiliado.id){
            console.log(`hay una coincidencia ${afiliadoEdit}`);
            return  {
                    id : idEdit,
                    nombre: inputNombre,
                    apellido: inputApellido,
                    edad: inputEdad,
                    plan: inputPlan,
                }
            }
        else{
            return afiliado;
        }
            } )
        console.log(`Este es el array modificado ${afiliadosEdit}`)
        //ACtualizar el LS
        localStorage.setItem('afiliados',JSON.stringify(afiliadosEdit));//Siempre actualizo el arreglo en el storage
        renderAfiliados(afiliadosEdit);
        btnCancelar.classList.toggle('d-none');
        afiliarse.value = "afiliarse";
    
    }else{
    // afiliados= afiliados || []
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
}   }

function renderAfiliados(afiliados){
    // console.log(afiliados);
    // console.log('RenderAfiliados');    
        tableAfiliados.innerHTML = ' ';
    // if(edit){
    //     edit = false;
    //     //Actualizar la tarea en el  arreglo 
    //     // afiliadoEdit.nombre = inputNombre.value;
    //     const afiliadosEditados = afiliados.map(afiliado =>{
    //         if(afiliado.id === tareaEdit.id){
    //             return afiliadoEdit;
    //         }else{
    //             return afiliado;
    //         }
    //     } )
    //     //ACtualizar el LS
    //     localStorage.setItem('tareas',JSON.stringify(tareas));//Siempre actualizo el arreglo en el storage
    //     cargarhTML(tareasEditadas);
    //     btnCancelar.classList.toggle('d-none');
    //     btnForm.value = "Enviar";
    // } else{  
        afiliados.forEach(afiliado => {
            const row = document.createElement('tr');
            const {id, nombre, apellido, edad, plan} = afiliado;
            row.innerHTML=`
            
            <td>
                <a href='#' class='borrar-producto' data-id='${id}'> <i class="bi bi-pencil-square"></i></a>
                
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