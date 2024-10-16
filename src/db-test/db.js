import './../styles.css';

async function loadDatabase() {
    const SQL = await initSqlJs({ locateFile: filename => `https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.6.2/${filename}` });
    
    const response = await fetch('/songs.db'); //path to db
    const buffer = await response.arrayBuffer();
    const db = new SQL.Database(new Uint8Array(buffer));

    // query played_titles
    const stmt = db.prepare("SELECT * FROM played_titles");
    const results = [];

    while (stmt.step()) {
        const row = stmt.get();
        results.push(row);
    }

    // close
    stmt.free();

    // insert table
    const tableBody = document.querySelector('#songsTable tbody');
    results.forEach(row => {
        const newRow = tableBody.insertRow();
        newRow.insertCell().textContent = row[0]; // ID
        newRow.insertCell().textContent = row[1]; // Song Name
        newRow.insertCell().textContent = row[2]; // Artist
    });

    db.close();
}

// load db
window.onload = loadDatabase;
