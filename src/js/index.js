let clickableElem = document.querySelectorAll(".filter-item");
let conForLi = document.querySelector(".filter-category-top");

conForLi.style.display = "none";

clickableElem.forEach(item => {
    item.addEventListener("click", (event) => {
        // Prevent the document-wide click event from triggering
        event.stopPropagation();

        clickableElem.forEach(elem => {
            elem.classList.remove("active-purple");
            elem.style.color = "black";
        });

        item.classList.add("active-purple");
        item.style.color = "purple"; // Example color when active

        fetch("https://momentum.redberryinternship.ge/api/departments")
            .then(rez => rez.json())
            .then(json => {
                conForLi.innerHTML = "";

                json.forEach(item => {
                    let newLi = document.createElement("li");
                    newLi.textContent = item.name;
                    conForLi.appendChild(newLi);
                });

                conForLi.style.display = "flex";
                conForLi.style.position = "absolute";
            });
    });
});

// Hide the list and reset the colors if clicking outside
document.addEventListener("click", () => {
    // Hide the list
    conForLi.style.display = "none";

    // Reset color of all filter items to black
    clickableElem.forEach(elem => {
        elem.style.color = "black";
    });
});
