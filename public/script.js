document.getElementById('fetch-users').addEventListener('click', function() {
    fetch('/api/users')
        .then(response => response.json())
        .then(users => {
            const userList = document.getElementById('user-list');
            userList.innerHTML = '';
            users.forEach(user => {
                const div = document.createElement('div');
                div.textContent = `User: ${user.nom}`;
                userList.appendChild(div);
            });
        })
        .catch(error => {
            console.error('Error fetching users:', error);
        });
});
