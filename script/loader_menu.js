async function loadMenu(containerId, htmlPath, cssPath) {
    try {
      const res = await fetch(htmlPath);
      const html = await res.text();
  
      const container = document.getElementById(containerId);
      if (container) {
        container.innerHTML = html;
      }
  
      // Garante que o CSS seja carregado antes de aplicar efeitos
      const cssAlreadyLoaded = Array.from(document.styleSheets)
        .some(sheet => sheet.href && sheet.href.includes(cssPath));
  
      if (!cssAlreadyLoaded) {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = cssPath;
        document.head.appendChild(link);
  
        // Aguarda o CSS carregar
        await new Promise(resolve => {
          link.onload = resolve;
        });
      }
  
      // Aguarda o DOM renderizar completamente o novo conteúdo
      await new Promise(resolve => setTimeout(resolve, 50));
  
      // Agora sim, inicializa os elementos
      initializeSidebar();
  
      // Força recálculo de layout (simula resize)
      window.dispatchEvent(new Event('resize'));
  
    } catch (error) {
      console.error("Erro ao carregar menu:", error);
    }
  }
  
  function initializeSidebar() {
    const sidebar = document.querySelector(".sidebar");
    const sidebarToggler = document.querySelector(".sidebar-toggler");
    const menuToggler = document.querySelector(".menu-toggler");
  
    if (!sidebar) return;
  
    if (sidebarToggler) {
      sidebarToggler.addEventListener("click", () => {
        sidebar.classList.toggle("collapsed");
      });
    }
  
    if (menuToggler) {
      menuToggler.addEventListener("click", () => {
        sidebar.classList.toggle("menu-active");
      });
    }
  
    // Ativa modo mobile se for necessário
    if (window.innerWidth <= 1024) {
      sidebar.classList.add("menu-active");
    }
  }
  
  document.addEventListener("DOMContentLoaded", () => {
    loadMenu("menu-container", "../pages/base_menu.html", "../style/base_menu.css");
  });
  