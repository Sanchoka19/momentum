let clickableElem = document.querySelectorAll(".filter-item");
let conForLi = document.querySelector(".filter-category-top");

conForLi.style.display = "none";

clickableElem.forEach(item => {
    item.addEventListener("click", (event) => {
        // Prevent the document-wide click event from triggering
        event.stopPropagation();
        let navId = event.target.id;

        let swithdNav = navId == 1 ? "departments" : navId == 2 ? "priorities" : "employees";

        clickableElem.forEach(elem => {
            elem.classList.remove("active-purple");
            elem.style.color = "black";
        });

        item.classList.add("active-purple");
        item.style.color = "purple"; // Example color when active

        let token = "9e6e9cdd-b866-4d38-b10b-561a35fa37a1";

        fetch(`https://momentum.redberryinternship.ge/api/${swithdNav}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
            .then(rez => rez.json())
            .then(json => {
                conForLi.innerHTML = "";

                json.forEach(item => {
                    let newLi = document.createElement("li");
                    // let checkBox = document.createElement("input")
                    // checkBox.type = "checkbox";
                    // newLi.appendChild(checkBox);
                    newLi.textContent = item.name;
                    conForLi.appendChild(newLi);
                });
                let chooseBtn = document.createElement("button");
                chooseBtn.className = "choose"

                chooseBtn.textContent = "არჩევა";

                conForLi.appendChild(chooseBtn);

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
