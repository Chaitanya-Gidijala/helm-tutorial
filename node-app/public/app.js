const API_URL = '/api/items';

document.addEventListener('DOMContentLoaded', () => {
    fetchItems();

    const addForm = document.getElementById('addForm');
    addForm.addEventListener('submit', handleAdd);

    const editForm = document.getElementById('editForm');
    editForm.addEventListener('submit', handleEditSubmit);

    // Modal logic
    const modal = document.getElementById('editModal');
    const span = document.getElementsByClassName('close')[0];
    span.onclick = () => modal.style.display = 'none';
    window.onclick = (event) => {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    };
});

async function fetchItems() {
    try {
        const res = await fetch(API_URL);
        const items = await res.json();
        renderItems(items);
    } catch (err) {
        console.error('Error fetching items:', err);
    }
}

function renderItems(items) {
    const grid = document.getElementById('itemsGrid');
    grid.innerHTML = '';
    items.forEach(item => {
        const card = document.createElement('div');
        card.className = 'item-card';
        card.innerHTML = `
            <span class="item-badge badge-${item.difficulty}">${item.difficulty}</span>
            <h3>${item.name}</h3>
            <div class="item-category"><i class="fa-solid fa-tag"></i> ${item.category}</div>
            <div class="card-actions">
                <button class="btn-icon btn-edit" onclick="openEditModal(${item.id})"><i class="fa-solid fa-pen"></i></button>
                <button class="btn-icon btn-delete" onclick="deleteItem(${item.id})"><i class="fa-solid fa-trash"></i></button>
            </div>
        `;
        grid.appendChild(card);
    });
}

async function handleAdd(e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const category = document.getElementById('category').value;
    const difficulty = document.getElementById('difficulty').value;

    const newItem = { name, category, difficulty };

    try {
        const res = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newItem)
        });
        if (res.ok) {
            document.getElementById('addForm').reset();
            fetchItems();
        }
    } catch (err) {
        console.error('Error adding item:', err);
    }
}

async function deleteItem(id) {
    if (!confirm('Are you sure you want to delete this item?')) return;
    try {
        const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
        if (res.ok) {
            fetchItems();
        }
    } catch (err) {
        console.error('Error deleting item:', err);
    }
}

let currentEditId = null;

async function openEditModal(id) {
    // Ideally fetch single item to fill form, but for now we iterate local data if we had it, or just fetch all again.
    // Let's quickly fetch the specific item details from the list or server.
    // Since we don't have get-one in DOM easily without passing data, let's just fetch full list and find it or implement get-one endpoint.
    // For simplicity, I'll allow "editing" based on what I can see or just fetch items to memory.
    // Let's fetch all (since it's small) to find the object.
    const res = await fetch(API_URL);
    const items = await res.json();
    const item = items.find(i => i.id === id);

    if (item) {
        currentEditId = id;
        document.getElementById('editId').value = id;
        document.getElementById('editName').value = item.name;
        document.getElementById('editCategory').value = item.category;
        document.getElementById('editDifficulty').value = item.difficulty;

        const modal = document.getElementById('editModal');
        modal.style.display = 'block';
    }
}

async function handleEditSubmit(e) {
    e.preventDefault();
    const id = currentEditId;
    const name = document.getElementById('editName').value;
    const category = document.getElementById('editCategory').value;
    const difficulty = document.getElementById('editDifficulty').value;

    try {
        const res = await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, category, difficulty })
        });
        if (res.ok) {
            document.getElementById('editModal').style.display = 'none';
            fetchItems();
        }
    } catch (err) {
        console.error('Error updating item:', err);
    }
}
