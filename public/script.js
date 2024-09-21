document.getElementById('submit-btn').addEventListener('click', async () => {
    const prompt = document.getElementById('prompt').value;
    
    if (prompt) {
        const responseDiv = document.getElementById('response');
        responseDiv.textContent = 'Loading...';

        try {
            const res = await fetch('/api/openai', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ prompt }),
            });
            
            const data = await res.json();
            responseDiv.textContent = data.response;
        } catch (error) {
            responseDiv.textContent = 'Error fetching the response';
        }
    } else {
        alert('Please enter a prompt.');
    }
});