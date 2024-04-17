const inputTarea = document.querySelector('#input');
const list = document.querySelector('#list');
const buttonInput = document.querySelector('#input-btn');
const buttonTotal = document.querySelector('.btn-1');
const buttonCompletas = document.querySelector('.btn-2');
const buttonIncompletas = document.querySelector('.btn-3');
const form = document.querySelector('#form');



let tareas = [];

const contador = () => {
    console.log(tareas);
    const totalTareas = tareas.length; // Total de tareas
    const totalTareasCompletadas= tareas.filter(tarea => tarea.completada).length; //Tareas completadas
    const totalIncompletas=  tareas.filter(tarea => !tarea.completada).length; //Tareas incompletas 
    console.log(tareas.filter(tarea => !tarea.completeda));
    console.log('Total de tareas:', totalTareas);
    console.log('Total de tareas completas:', totalTareasCompletadas);
    console.log('Total de tareas incompletas:', totalIncompletas);

    buttonTotal.innerHTML= `Total : ${totalTareas}`;
    buttonCompletas.innerHTML= `Completadas: ${totalTareasCompletadas}`;
    buttonIncompletas.innerHTML= `Incompletas: ${totalIncompletas}`

};



const renderTareas = () => { 
    list.innerHTML = '';
    tareas.forEach(tarea  => {
        const li = document.createElement('li');
        li.id = tarea.id;
        if (tarea.completada) {
            li.classList.add('listo-btn')
        }
        li.innerHTML = `
            <button class="btn-eliminar">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                </svg>
            </button>
            <p>${tarea.input}</p>
            <button class="btn-check">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                </svg>
            </button>
        `;
       list.append(li);
    });
    contador();
};
const getTareas = () => {
    const tareasDb = localStorage.getItem('tareas');
    if (tareasDb) {
      tareas = JSON.parse(tareasDb); // obtiene las tareas del navegador 
    }
    renderTareas(); //renderiza las taareas
}
  
  getTareas();

  const agregarTarea = () => {
    const tareaTexto = input.value.trim();
    if (tareaTexto !== '') {
        const nuevaTarea = {
            id: crypto.randomUUID(),
            input: tareaTexto,
            completada: false,
        };
        tareas = tareas.concat(nuevaTarea); //Agrega al array la tarea
        localStorage.setItem('tareas', JSON.stringify(tareas)); //Lo guarda en el navegador 
        renderTareas();
  //Llamar a contador después de renderizar las tareas
        input.value = ''; // Limpiar el input después de agregar la tarea
    }
};

buttonInput.addEventListener('click', agregarTarea);

list.addEventListener('click', e => {
    const deleteBtn = e.target.closest('.btn-eliminar');

if (deleteBtn) {
    const id = deleteBtn.parentElement.id;
    tareas = tareas.filter(tarea => {
      if (tarea.id !== id) {
        return tarea;
      }
    });
    localStorage.setItem('tareas', JSON.stringify(tareas));
    renderTareas();
    
  }
});

list.addEventListener('click', e => {
    const checkbtn = e.target.closest('.btn-check');
    if (checkbtn) {
        const tarea = checkbtn.parentElement;
        // tarea.classList.toggle('listo-btn');// Toggle: agrega la clase si no está presente, la elimina si ya está presente
        // Actualizar el estado de la tarea en localStorage
        const id = tarea.id; //obtiene el id de la tarea selecionada
        /// Aquí se utiliza el método findIndex en el arreglo tareas para encontrar el índice de la tarea que tenga el mismo id que el id obtenido de la tarea seleccionada
      //
      tareas = tareas.map(tarea => {
        if (tarea.id === id) {
          return {
            ...tarea, 
            completada: !tarea.completada, 
          }
        } else {
          return tarea;
        }
      });
      localStorage.setItem('tareas', JSON.stringify(tareas));
      renderTareas();
    }
    
});






