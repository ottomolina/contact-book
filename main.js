let row = null;
function submit() {
    const data = getData();
    if(data == null) {
        return;
    }
    if(row == null) {
        add(data);
    } else {
        update(data);
        clearFields();
    }
}

function getData() {
    let data = {
        name: document.getElementById('names').value,
        lastname: document.getElementById('lastname').value,
        phone: document.getElementById('phone').value
    }
    if(data.name.trim() === '') {
        alert('Please write your name.');
        focusElement('names');
        data = null;
    } else if(data.lastname.trim() === '') {
        alert('Please write your last name.');
        focusElement('lastname');
        data = null;
    } else if(data.phone.trim() === '') {
        alert('Please write your phone.');
        focusElement('phone');
        data = null;
    }
    return data;
}

const add = (data) => {
    const table = document.getElementById('tblData').getElementsByTagName('tbody')[0];
    const row = table.insertRow(table.length);
    row.insertCell(0).innerHTML = data.name;
    row.insertCell(1).innerHTML = data.lastname;
    row.insertCell(2).innerHTML = data.phone;
    row.insertCell(3).innerHTML = `
        <input class="submit btn-option" type="button" onClick="edit(this)" value="Edit">
        <input class="submit btn-option" type="button" onClick="del(this)" value="Delete">`;
    focusElement('names');
    clearFields();
}

const update = (data) => {
    row.cells[0].innerHTML = data.name;
    row.cells[1].innerHTML = data.lastname;
    row.cells[2].innerHTML = data.phone;
    focusElement('names');
}

const clearFields = () => {
    document.getElementById('names').value = '';
    document.getElementById('lastname').value = '';
    document.getElementById('phone').value = '';
    row = null;
}

function focusElement(elementId) {
    document.getElementById(elementId).focus();
}

const edit = (td) => {
    row = td.parentElement.parentElement
    document.getElementById('names').value = row.cells[0].innerHTML;
    document.getElementById('lastname').value = row.cells[1].innerHTML;
    document.getElementById('phone').value = row.cells[2].innerHTML;
    focusElement('names');
}

const del = (td) => {
    if(confirm('¿Are you sure to delete this row?')) {
        row = td.parentElement.parentElement;
        document.getElementById('tblData').deleteRow(row.rowIndex);
        clearFields();
    }
}