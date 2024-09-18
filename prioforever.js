// ==UserScript==
// @name         PrioForever
// @namespace    prioforever
// @version      2024-09-16
// @description  Manger en prio tous les jours
// @author       Kilt
// @match        *://*.index-education.net/pronote/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        GM_xmlhttpRequest
// ==/UserScript==

function initMobile() {
    // Get all the courses of the day
    var liste = document.querySelectorAll(".liste-cours > li");
    for (var i = 0; i < liste.length; i++) { // iterate over all courses
        // get the hours of the course
        var li = liste[i];
        var hours = li.querySelectorAll(".container-heures div");
        // if the hours are 12h10 and 13h55
        if (hours.length == 2 && hours[0].textContent == "12h10" && hours[1].textContent == "13h55") {
            console.log("basic executed...");
            // add the class to the schedule
            let liste_cours = document.querySelector(".liste-cours");

            let classe = document.createElement("li");
            classe.className = "flex-contain";
            classe.setAttribute("tabindex", "0");

            classe.innerHTML = '<span class="sr-only">de 13h00 à 13h55 ACCOMPAGNEMT. PERSO.</span><div class="container-heures" aria-hidden="true"><div>13h00</div><div>13h55</div></div><div class="trait-matiere" style="background-color :#EC6719;"></div><ul class="container-cours "><li class="libelle-cours flex-contain" aria-hidden="true">ACCOMPAGNEMT. PERSO.</li><li>DU PEYRAT A.</li><li>C129 MATHS</li></ul>';

            liste_cours.insertBefore(classe, li.nextSibling);
            hours[1].textContent = "13h00"; // change the hours to 13h00
            break;
        }
        else if (hours.length == 1 && hours[0].textContent == "12h10" && li.classList.contains("cours-annule")) {
            console.log("cours-annule executed");
            li.innerHTML = '<span class="sr-only">de 12h10 à 13h00 Pause Déjeuner</span><div class="container-heures" aria-hidden="true"><div>12h10</div><div>13h00</div></div><div class="trait-matiere"></div><ul class="container-cours demi-pension" aria-label="Pause Déjeuner"><li class="libelle-cours flex-contain" aria-hidden="true"></li></ul>'
            li.classList.add("greyed");

            // add the class to the schedule
            if (liste.length > i+1)
            {
                liste[i+1].innerHTML = '<span class="sr-only">de 13h00 à 13h55 ACCOMPAGNEMT. PERSO.</span><div class="container-heures" aria-hidden="true"><div>13h00</div><div>13h55</div></div><div class="trait-matiere" style="background-color :#EC6719;"></div><ul class="container-cours "><li class="libelle-cours flex-contain" aria-hidden="true">ACCOMPAGNEMT. PERSO.</li><li>DU PEYRAT A.</li><li>C129 MATHS</li></ul>';
                liste[i+1].classList.remove("greyed");
            }
            break;
        }
    }
}
setInterval(initMobile, 1000);
