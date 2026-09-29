document.addEventListener("DOMContentLoaded", () => {
  // 1. Menú desplegable móvil
  const menuToggle = document.querySelector(".menu-toggle");
  const mainNav = document.querySelector(".main-nav");

  if (menuToggle && mainNav) {
    menuToggle.addEventListener("click", () => {
      const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
      menuToggle.setAttribute("aria-expanded", String(!isExpanded));
      mainNav.classList.toggle("is-open", !isExpanded);
    });
  }

  // 2. Gestión y validación del formulario de stands
  const formStands = document.getElementById("form-stands");

  if (formStands) {
    const submitBtn = formStands.querySelector(".form-submit");

    // Limpieza de errores en tiempo real cuando el usuario interactúa
    formStands.querySelectorAll("input, select, textarea").forEach((field) => {
      field.addEventListener("input", () => {
        clearFieldError(field);
      });
      field.addEventListener("change", () => {
        clearFieldError(field);
      });
    });

    formStands.addEventListener("submit", (e) => {
      e.preventDefault();
      let isValid = true;

      // Limpia errores previos
      clearErrors();

      // Referencias a los campos
      const nombre = document.getElementById("stand-nombre");
      const correo = document.getElementById("stand-correo");
      const telefono = document.getElementById("stand-telefono");
      const rubro = document.getElementById("stand-rubro");
      const dia = document.getElementById("stand-dia");
      const tamanoRadios = document.querySelectorAll('input[name="stand-tamano"]');
      const acepto = document.getElementById("stand-acepto");
      const mensajeExito = document.getElementById("stand-mensaje");

      // Validar Nombre
      if (!nombre.value.trim()) {
        showError("error-stand-nombre", "Por favor, ingresá el nombre del vendedor o librería.");
        isValid = false;
      }

      // Validar Correo Electrónico
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!correo.value.trim()) {
        showError("error-stand-correo", "Por favor, ingresá tu correo electrónico.");
        isValid = false;
      } else if (!emailRegex.test(correo.value.trim())) {
        showError("error-stand-correo", "Ingresá un correo electrónico válido (ej. usuario@dominio.com).");
        isValid = false;
      }

      // Validar Teléfono
      const phoneRegex = /^[0-9\s\+\-\(\)]{7,20}$/;
      if (!telefono.value.trim()) {
        showError("error-stand-telefono", "Por favor, ingresá un número de teléfono.");
        isValid = false;
      } else if (!phoneRegex.test(telefono.value.trim())) {
        showError("error-stand-telefono", "Ingresá un teléfono válido (mínimo 7 dígitos).");
        isValid = false;
      }

      // Validar Rubro
      if (!rubro.value) {
        showError("error-stand-rubro", "Seleccioná un rubro.");
        isValid = false;
      }

      // Validar Día
      if (!dia.value) {
        showError("error-stand-dia", "Seleccioná un día de participación.");
        isValid = false;
      }

      // Validar Tamaño (Radio Buttons)
      const tamanoSeleccionado = Array.from(tamanoRadios).some((radio) => radio.checked);
      if (!tamanoSeleccionado) {
        showError("error-stand-tamano", "Seleccioná un tamaño para el stand.");
        isValid = false;
      }

      // Validar Aceptación de Condiciones
      if (!acepto.checked) {
        showError("error-stand-acepto", "Debés aceptar las condiciones de participación.");
        isValid = false;
      }

      // 3. Confirmación visual y respuesta si todo es correcto
      if (isValid) {
        // Efecto visual en el botón de envío
        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.textContent = "Procesando...";
          submitBtn.style.opacity = "0.75";
        }

        setTimeout(() => {
          // Mostrar mensaje dentro del formulario
          if (mensajeExito) {
            mensajeExito.removeAttribute("hidden");
          }

          // Alerta o notificación flotante
          alert("¡Reserva enviada con éxito! Nos pondremos en contacto a la brevedad.");

          // Restaurar botón y limpiar formulario
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = "Reservar mi stand";
            submitBtn.style.opacity = "1";
          }

          formStands.reset();
        }, 600);
      }
    });
  }

  // Funciones auxiliares para mensajes de error
  function showError(errorElementId, message) {
    const errorElement = document.getElementById(errorElementId);
    if (errorElement) {
      errorElement.textContent = message;
    }
  }

  function clearErrors() {
    const errorElements = document.querySelectorAll(".field-error");
    errorElements.forEach((el) => (el.textContent = ""));

    const mensajeExito = document.getElementById("stand-mensaje");
    if (mensajeExito) {
      mensajeExito.setAttribute("hidden", "true");
    }
  }

  function clearFieldError(field) {
    const fieldName = field.name || field.id;
    if (!fieldName) return;

    // Asocia el input con su respectivo mensaje de error (<small id="error-...">)
    const errorId = `error-${fieldName}`;
    const errorElement = document.getElementById(errorId);
    if (errorElement) {
      errorElement.textContent = "";
    }
  }
});

document.addEventListener("DOMContentLoaded", () => {
  // 1. Menú desplegable para dispositivos móviles
  const menuToggle = document.querySelector(".menu-toggle");
  const mainNav = document.querySelector(".main-nav");

  if (menuToggle && mainNav) {
    menuToggle.addEventListener("click", () => {
      const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
      menuToggle.setAttribute("aria-expanded", String(!isExpanded));
      mainNav.classList.toggle("is-open", !isExpanded);
    });
  }

  // 2. Validación y respuesta interactiva del formulario de Preinscripción
  const formPreinscripcion = document.getElementById("form-preinscripcion");

  if (formPreinscripcion) {
    const submitBtn = formPreinscripcion.querySelector(".form-submit");

    // Limpieza de errores en tiempo real conforme el usuario escribe o interactúa
    formPreinscripcion.querySelectorAll("input, select, textarea").forEach((field) => {
      field.addEventListener("input", () => clearFieldError(field));
      field.addEventListener("change", () => clearFieldError(field));
    });

    formPreinscripcion.addEventListener("submit", (e) => {
      e.preventDefault(); // Evita el envío automático de la página
      let isValid = true;

      // Limpia mensajes de error previos
      clearErrors();

      // Referencias a los campos del formulario
      const nombre = document.getElementById("pre-nombre");
      const correo = document.getElementById("pre-correo");
      const telefono = document.getElementById("pre-telefono");
      const actividad = document.getElementById("pre-actividad");
      const asistentes = document.getElementById("pre-asistentes");
      const acepto = document.getElementById("pre-acepto");
      const mensajeExito = document.getElementById("pre-mensaje");

      // Validar Nombre y Apellido
      if (!nombre.value.trim()) {
        showError("error-pre-nombre", "Por favor, ingresá tu nombre y apellido.");
        isValid = false;
      }

      // Validar Correo Electrónico
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!correo.value.trim()) {
        showError("error-pre-correo", "Por favor, ingresá tu correo electrónico.");
        isValid = false;
      } else if (!emailRegex.test(correo.value.trim())) {
        showError("error-pre-correo", "Ingresá un correo electrónico válido (ej. nombre@dominio.com).");
        isValid = false;
      }

      // Validar Teléfono
      const phoneRegex = /^[0-9\s\+\-\(\)]{7,20}$/;
      if (!telefono.value.trim()) {
        showError("error-pre-telefono", "Por favor, ingresá tu número de teléfono.");
        isValid = false;
      } else if (!phoneRegex.test(telefono.value.trim())) {
        showError("error-pre-telefono", "Ingresá un número de teléfono válido.");
        isValid = false;
      }

      // Validar Actividad elegida
      if (!actividad.value) {
        showError("error-pre-actividad", "Seleccioná la actividad a la que querés asistir.");
        isValid = false;
      }

      // Validar Cantidad de Asistentes (Entre 1 y 5)
      const numAsistentes = parseInt(asistentes.value, 10);
      if (isNaN(numAsistentes) || numAsistentes < 1 || numAsistentes > 5) {
        showError("error-pre-asistentes", "Ingresá una cantidad de asistentes válida (mínimo 1, máximo 5).");
        isValid = false;
      }

      // Validar Checkbox de aceptación
      if (!acepto.checked) {
        showError("error-pre-acepto", "Debés aceptar el uso de tus datos para completar la preinscripción.");
        isValid = false;
      }

      // 3. Confirmación visual si todos los campos son válidos
      if (isValid) {
        // Efecto visual en el botón durante el envío
        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.textContent = "Enviando...";
          submitBtn.style.opacity = "0.75";
        }

        setTimeout(() => {
          // Mostrar mensaje de éxito en pantalla
          if (mensajeExito) {
            mensajeExito.removeAttribute("hidden");
          }

          // Alerta emergente de confirmación
          alert("¡Preinscripción recibida! Te enviamos los detalles de la reserva a tu correo.");

          // Restaurar estado del botón y resetear formulario
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = "Enviar preinscripción";
            submitBtn.style.opacity = "1";
          }

          formPreinscripcion.reset();
        }, 600);
      }
    });
  }

  // Funciones auxiliares para la gestión de errores
  function showError(errorElementId, message) {
    const errorElement = document.getElementById(errorElementId);
    if (errorElement) {
      errorElement.textContent = message;
    }
  }

  function clearErrors() {
    const errorElements = document.querySelectorAll("#form-preinscripcion .field-error");
    errorElements.forEach((el) => (el.textContent = ""));

    const mensajeExito = document.getElementById("pre-mensaje");
    if (mensajeExito) {
      mensajeExito.setAttribute("hidden", "true");
    }
  }

  function clearFieldError(field) {
    const fieldId = field.id;
    if (!fieldId) return;

    const errorElement = document.getElementById(`error-${fieldId}`);
    if (errorElement) {
      errorElement.textContent = "";
    }
  }
});