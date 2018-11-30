(function () {
    const fs = require('fs');
    fs.readFile('./data/periodic_table_adjustedWeights.json', (err, data) => {
        if (err) throw err;
        let parsedJson = JSON.parse(data);
        let selector;
        let elementDiv
        for (let i = 1; i <= 118; i++) {
            selector = "li[data-pos='" + i + "']";
            elementDiv = document.querySelector(selector);

            if (elementDiv != null) {
                elementDiv.setAttribute('data-nb', parsedJson[i - 1].atomic_weight1);
                elementDiv.innerHTML = parsedJson[i - 1].symbol;
            }
        }
    });


    // Get the modal
    var modal = document.getElementById('myModal');

    // Get the button that opens the modal
    const elementList = document.querySelectorAll("ul.main > li, #lan-ac>li");

    // Get the  element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    // When the user clicks on the button, open the modal 
    elementList.forEach(element => {
        element.addEventListener('click', AddModalData);
    });

    // When the user clicks on  (x), close the modal
    span.onclick = function () {
        modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    /** 
     * Adds data to the modal
     * @function 
     * @param {string} element - an html string with the target element data-pos
     */

    function AddModalData(element) {
        modal.style.display = "block";
        const el = Number(element.target.getAttribute('data-pos'));
        return queryElementData(el)
            .then(insertModalData)
            .catch(logError);

    }

    /** 
     * Queries json data for a matching element
     * @function 
     * @param {string} matchingElement - the Element we want to match, using it\'s atomic weight
     */

    function queryElementData(matchingElement) {
        return new Promise((resolve, reject) => {
            fs.readFile('./data/periodic_table_adjustedWeights.json', (err, data) => {
                if (err) reject('Cannot not read the file');
                let parsedJson = JSON.parse(data);
                let queryVal;
                parsedJson.map(element => {
                    queryVal = element.atomic_number;
                    if (queryVal === matchingElement) {
                        resolve(element);
                    }
                });
            })
        })
    }

    /** 
     * Inserts matched data into the modal
     * @function
     * @param {object} element - the matched element we want to display
     */

    function insertModalData(element) {
        const modal_title = document.getElementById('modal_title');
        const modal_symbol = document.getElementById('modal_symbol');
        const modal_appearance = document.getElementById('modal_appearance');
        const modal_discovery = document.getElementById('modal_discovery');
        const modal_melting_point = document.getElementById('modal_melting_point');
        const modal_boiling_point = document.getElementById('modal_boiling_point');
        const modal_crystal_structure = document.getElementById('modal_crystal_structure');

        //check for any undefined
        for (val in element) {
            if (element[val] == undefined) {
                element[val] = "n/a";
            }
        }

        modal_title.innerHTML = element.name;
        modal_symbol.innerHTML = element.symbol;
        modal_appearance.innerHTML = element.appearance;
        modal_discovery.innerHTML = element.discovery;
        modal_melting_point.innerHTML = element.melting_point;
        modal_boiling_point.innerHTML = element.boiling_point;
        modal_crystal_structure.innerHTML = element.crystal_structure;
    }

    /** 
     * Logs errors
     * @function
     * @param {string} error - the error to log
     */

    function logError(error) {
        console.error(error);
    }
}())