document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('#address-field').addEventListener('input', () => draw_filtered_data());
});

// Data JSON URL
const DATA_URL = 'https://data.gov.il/api/action/datastore_search?resource_id=3f06e2f2-e2ad-41ac-9665-37d0625537f2';

// Global JS object to be built from the input data only once (to prevent excessive network traffic)
let records_obj;

// Fetch data and draw it as a table on the page loading
fetch_data();


/* ================ Functions Section ================ */

/**
 * Fetch data and call the table drawing routine.
 * Should be executed only once to prevent multiple HTTP requests
 */
function fetch_data(){
    fetch(DATA_URL)
    .then((response) => response.json())
    .then((json) => {
        records_obj = json.result.records;
        draw_filtered_data();
    })
    .catch((error) => {
        console.log(error);
    });    
}


/**
 * Get the input field value and iterate throu the returned data objects to find a match
 * in the 'ktovet' field.
 * If match is found or the input value is empty string, draw the record.
 * Clear the data and the HTML table each time the function is called.
 */
function draw_filtered_data() {
    clear_data();
    document.querySelector('#address-field').focus();
    const filter = document.querySelector('#address-field').value;
    records_obj.forEach((record) => {
        if (record.ktovet.includes(filter) || record.ezor.includes(filter) || filter === '')
            draw_row (record);
    }); 
}   


/**
 * Draw the record as a table row
 * @param {*} record a single record from the returned data (a single driving school)
 */
function draw_row(record){
    let row = document.createElement('tr');
    for (const key in record) {
        let cell = document.createElement('td');
        let text = document.createTextNode(record[key]);
        //check if the current key is related to one of the '1/0' properties
        if (
                key === 'prati' ||
                key === 'masa' ||
                key === 'traktor' ||
                key === 'otobus' ||
                key === 'ofnoa' ||
                key === 'grar'
            ) text = createCheckBox(record[key]);     
    
        cell.appendChild(text);
        row.appendChild(cell);
		}
    document.querySelector('#table-body').appendChild(row);
}


/**
 * Checks the value and returns accordingly the FontAwsome checkbox (for '1') or dash (for '0') 
 * @param {*} value '1' or '0'
 * @returns '<i>' element with the relevant FontAwesome class name
 */
function createCheckBox (value) {
    let checker;
    if (value === '1') {
        checker = document.createElement('i');
        checker.className = 'fa-regular fa-square-check';
    } else {
        checker = document.createElement('i');
        checker.className = 'fa-solid fa-minus';
    }
    return checker;
}


/**
 * Clear the HTML table body
 */
function clear_data () {
    document.querySelector('#table-body').innerHTML = '';
}
