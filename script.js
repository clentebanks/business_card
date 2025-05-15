// Reemplaza con tu CSV exportado automáticamente desde el script
const csvUrl = "https://docs.google.com/spreadsheets/d/XXXXXXXXXXXXXX/export?format=csv";

fetch(csvUrl)
  .then(res => res.text())
  .then(data => {
    const rows = data.trim().split("\n").map(row => row.split(","));
    const content = {};
    for (let i = 1; i < rows.length; i++) {
      content[rows[i][0].trim()] = rows[i][1].trim();
    }

    // Datos
    document.getElementById("nombre").textContent = content["nombre"];
    document.getElementById("profesion").textContent = content["profesion"];
    document.getElementById("empresa").textContent = content["empresa"];
    document.getElementById("correo").href = `mailto:${content["correo"]}`;
    document.getElementById("telefono").href = `tel:${content["telefono"]}`;
    document.getElementById("whatsapp").href = content["whatsapp"];
    document.getElementById("portafolio").href = content["portafolio"];
    document.getElementById("vcard").href = content["vcard"];
    document.getElementById("qr").src = content["qr"];
    document.getElementById("profile-img").src = content["foto"];
    document.getElementById("header-img").src = content["header"];
    document.getElementById("logo").textContent = content["logo"];

    // Colores
    document.body.style.backgroundColor = content["color_fondo"];
    document.body.style.color = content["color_texto"];
    document.querySelectorAll(".contact-icon").forEach(el => {
      el.style.color = content["color_icono"];
    });
    document.querySelector(".badge-brand").style.backgroundColor = content["color_principal"];
    document.querySelectorAll(".boton").forEach(btn => {
      btn.style.backgroundColor = content["color_principal"];
    });
  });
