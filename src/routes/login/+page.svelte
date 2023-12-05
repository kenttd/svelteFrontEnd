<script>
    async function submitForm() {
        // Prevent the form from submitting normally
        console.log("masuk");

        // Get the form data
        const formData = new FormData();
        formData.append('username', username);
    formData.append('password', password);

        try {
            // Make an AJAX request
            const response = await fetch("https://quacker-1fcd875a5802.herokuapp.com/api/login", {
                method: 'POST',
                body: formData
            });

            // Check if the request was successful (status code 2xx)
            if (response.ok) {
                const data = await response.json();
                console.log(data.message); // Log the server's response
                // You can add more logic here based on the server's response
            } else {
                console.error('Error:', response.statusText);
                // Handle errors here
            }
        } catch (error) {
            console.error('Error:', error);
            // Handle any other errors that occurred during the fetch
        }
    }
</script>

<form id="loginForm" action="https://quacker-1fcd875a5802.herokuapp.com/api/login" method="POST" on:submit={submitForm}>
    <!-- Your input fields for username and password go here -->
    <input type="text" name="username" placeholder="Username" required>
    <input type="password" name="password" placeholder="Password" required>

    <!-- Your submit button -->
    <button type="submit">Submit</button>
</form>

<!-- <script>
    function submitForm(event) {
        event.preventDefault(); // Prevent the form from submitting normally
        console.log("masuk");
        // Get the form data
        var formData = new FormData(event.target);

        // Make an AJAX request
        fetch(event.target.action, {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            // Handle the response from the server
            console.log(data.message); // Log the server's response
            // You can add more logic here based on the server's response
        })
        .catch(error => {
            console.error('Error:', error);
            // Handle any errors that occurred during the fetch
        });
    } -->
<!-- </script> -->

<!-- <form id="loginForm" action="https://quacker-1fcd875a5802.herokuapp.com/api/login" method="POST" on:submit={submitForm()}>
    <input type="text" name="username" placeholder="Username" required>
    <input type="password" name="password" placeholder="Password" required>

    <button type="submit">Submit</button>
</form> -->