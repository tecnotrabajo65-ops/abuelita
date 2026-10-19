// =========================================================================
// CONTROL LÓGICO DE LA MÚSICA DE FONDO (REPRODUCTOR INTERACTIVO PREMIUM)
// =========================================================================

// 1. Obtener las referencias de los elementos del DOM (Document Object Model)
const musicToggle = document.getElementById('music-toggle');
const bgMusic = document.getElementById('bg-music');
const musicIcon = document.getElementById('music-icon');

// 2. Escuchar el evento de clic en el botón flotante
musicToggle.addEventListener('click', () => {
    
    // Verificamos el estado actual del reproductor de audio nativo
    if (bgMusic.paused) {
        
        // Si está pausado, lo reproducimos de forma asíncrona (promesa nativa de JS)
        bgMusic.play()
            .then(() => {
                // Si la reproducción es exitosa, actualizamos la interfaz visual
                musicIcon.textContent = '⏸️'; // Icono de Pausa
                musicToggle.style.background = 'rgba(212, 175, 55, 0.25)'; // Fondo más brillante
                musicToggle.style.boxShadow = '0 0 15px rgba(212, 175, 55, 0.4)'; // Efecto de brillo activo
            })
            .catch(err => {
                console.error("Error al intentar reproducir el archivo de audio:", err);
            });
            
    } else {
        
        // Si el audio se estaba reproduciendo, aplicamos la pausa nativa
        bgMusic.pause();
        
        // Restauramos los valores estéticos originales del botón flotante
        musicIcon.textContent = '🎵'; // Icono de Nota Musical
        musicToggle.style.background = 'rgba(212, 175, 55, 0.08)'; // Fondo atenuado original
        musicToggle.style.boxShadow = 'none'; // Quitamos el brillo activo
        
    }
});
// =========================================================================
// CONTROL LÓGICO DE LA VENTANA EMERGENTE (MODAL) PARA EL VIDEO
// =========================================================================

// 1. Referencias del DOM para el video
const btnVideo = document.getElementById('btn-video');
const videoModal = document.getElementById('video-modal');
const closeModal = document.getElementById('close-modal');
const memorialVideo = document.getElementById('memorial-video');

// 2. Abrir el Modal al presionar el botón
btnVideo.addEventListener('click', () => {
    // Si la música de fondo está activa, la pausamos temporalmente
    if (!bgMusic.paused) {
        bgMusic.pause();
        musicIcon.textContent = '🎵';
        musicToggle.style.background = 'rgba(212, 175, 55, 0.08)';
        musicToggle.style.boxShadow = 'none';
    }
    
    // Mostramos la ventana flotante agregando la clase CSS
    videoModal.classList.add('active');
});

// 3. Cerrar el Modal al presionar la (X)
closeModal.addEventListener('click', () => {
    videoModal.classList.remove('active');
    memorialVideo.pause(); // Detiene el video para que no siga sonando oculto
    memorialVideo.currentTime = 0; // Reinicia el video al segundo cero
});

// 4. Cerrar también si el usuario hace clic fuera de la caja del video
videoModal.addEventListener('click', (e) => {
    if (e.target === videoModal) {
        videoModal.classList.remove('active');
        memorialVideo.pause();
        memorialVideo.currentTime = 0;
    }
});
