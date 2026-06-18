"use strict";

import { getSalesCoffee } from './requirements.js';

/**
 * Procesa la respuesta de getSalesCoffee y muestra las ventas en el Datatable.
 * @returns {Promise<void>}
 */
const processSalesCoffee = async () => {
    const result = await getSalesCoffee();

    if (!result.success) {
        alert(result.body);
        return;
    }

    const tableBody = document.getElementById('coffee-body');
    if (!tableBody) return;

    const salesXML = result.body;
    const rows = salesXML.getElementsByTagName('row');
    let content = '';

    for (let row of rows) {
        const date = row.getElementsByTagName('Date')[0].textContent;
        const time = row.getElementsByTagName('Time')[0].textContent;
        const coffee = row.getElementsByTagName('coffee_name')[0].textContent;
        const money = row.getElementsByTagName('money')[0].textContent;
        const cash = row.getElementsByTagName('cash_type')[0].textContent;
        const timeOfDay = row.getElementsByTagName('Time_of_Day')[0].textContent;
        const weekday = row.getElementsByTagName('Weekday')[0].textContent;

        let rowHTML = `
            <tr>
                <td class="border px-4 py-2">[DATE]</td>
                <td class="border px-4 py-2">[TIME]</td>
                <td class="border px-4 py-2">[COFFEE]</td>
                <td class="border px-4 py-2">[MONEY]</td>
                <td class="border px-4 py-2">[CASH]</td>
                <td class="border px-4 py-2">[TIMEOFDAY]</td>
                <td class="border px-4 py-2">[WEEKDAY]</td>
            </tr>`;

        rowHTML = rowHTML.replaceAll('[DATE]', date);
        rowHTML = rowHTML.replaceAll('[TIME]', time.split('.')[0]);
        rowHTML = rowHTML.replaceAll('[COFFEE]', coffee);
        rowHTML = rowHTML.replaceAll('[MONEY]', money);
        rowHTML = rowHTML.replaceAll('[CASH]', cash);
        rowHTML = rowHTML.replaceAll('[TIMEOFDAY]', timeOfDay);
        rowHTML = rowHTML.replaceAll('[WEEKDAY]', weekday);

        content += rowHTML;
    }

    tableBody.innerHTML = content;

    // Activa el Datatable una vez que la tabla está llena.
    $('#coffee').DataTable();
};

window.addEventListener('load', processSalesCoffee);
