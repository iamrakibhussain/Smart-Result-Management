const openMenu = document.getElementById("openMenu");
const closeMenu = document.getElementById("closeMenu");
const menuitem = document.getElementById("menu-item");

openMenu.addEventListener('click', () => {
    menuitem.style.left = "0";
    closeMenu.style.display = "block";
    openMenu.style.display = "none";
});

closeMenu.addEventListener('click', () => {
    menuitem.style.left = "-100%";
    closeMenu.style.display = "none";
    openMenu.style.display = "block";
});
