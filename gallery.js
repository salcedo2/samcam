// ------------------
// Filtro de secciones
// ------------------
const filterButtons = document.querySelectorAll('.btn-filter');
const sections = document.querySelectorAll('.gallery-section');

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    const filter = button.getAttribute('data-filter');
    
    // Actualizar estilos de los botones
    filterButtons.forEach(btn => {
      btn.classList.remove('btn-primary');
      btn.classList.add('btn-secondary');
    });
    button.classList.remove('btn-secondary');
    button.classList.add('btn-primary');
    
    // Ocultar todas las secciones y mostrar solo la correspondiente
    sections.forEach(section => {
      section.style.display = 'none';
    });
    const sectionToShow = document.getElementById(`section-${filter}`);
    if (sectionToShow) {
      sectionToShow.style.display = 'block';
    }
  });
});

// ------------------
// Agregar foto mediante modal (carga de archivo)
// ------------------
document.getElementById('savePhotoButton').addEventListener('click', function() {
  const category = document.getElementById('photoCategory').value;
  const fileInput = document.getElementById('photoFile');
  const file = fileInput.files[0];

  if (!file) {
    alert('Por favor, selecciona un archivo.');
    return;
  }

  const reader = new FileReader();
  reader.onload = function(e) {
    const dataURL = e.target.result;
    addPhotoToCategory(category, dataURL);
    clearModalInputs();
    $('#addPhotoModal').modal('hide');
  }
  reader.onerror = function(error) {
    console.error('Error al leer el archivo:', error);
  }
  reader.readAsDataURL(file);
});

function addPhotoToCategory(category, imageURL) {
  const newCard = document.createElement('div');
  newCard.className = 'col-md-4 mb-4';
  newCard.innerHTML = `
    <div class="card">
      <img src="${imageURL}" class="card-img-top gallery-img" alt="Foto agregada">
      <div class="card-body">
        <h5 class="card-title">Foto Nueva</h5>
      </div>
    </div>
  `;
  const section = document.getElementById(`section-${category}`);
  if (section) {
    const row = section.querySelector('.row');
    if (row) {
      row.appendChild(newCard);
    } else {
      console.error('No se encontró el contenedor "row" en la sección:', category);
    }
  } else {
    console.error('No se encontró la sección para la categoría:', category);
  }
}

function clearModalInputs() {
  document.getElementById('photoFile').value = '';
}
