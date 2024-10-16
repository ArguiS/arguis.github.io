import './../../styles.css';

async function loadDatabase() {
    const SQL = await initSqlJs({ locateFile: filename => `https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.6.2/${filename}` });
    
    const response = await fetch('/latest.db'); //path to db
    const buffer = await response.arrayBuffer();
    const db = new SQL.Database(new Uint8Array(buffer));

    // query xyz
    const stmt = db.prepare("SELECT * FROM table_name");
    const results = [];

    while (stmt.step()) {
        const row = stmt.get();
        results.push(row);
    }

    // close
    stmt.free();

    // insert table
    const tableBody = document.querySelector('#rating1Table tbody');
    results.forEach(row => {
        const newRow = tableBody.insertRow();
        newRow.insertCell().textContent = row[0]; // row 1
        newRow.insertCell().textContent = row[1]; // row 2
    });

    db.close();
}

// load db
window.onload = loadDatabase;
