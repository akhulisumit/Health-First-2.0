const API_KEY = 'AIzaSyC56g30u8bjTqn4cHd5P1eolfe5iwHMc7E'; // 🔥 Replace with your real API key

const form = document.getElementById('symptomForm');
const loading = document.getElementById('loading');
const results = document.getElementById('results');
const resultContent = document.getElementById('resultContent');

// Initially hide loading and results
loading.style.display = 'none';
results.style.display = 'none';

// Handle symptom button clicks
document.querySelectorAll('.symptom-button').forEach(button => {
    button.addEventListener('click', () => {
        button.classList.toggle('selected');
    });
});

// Handle medical history button clicks
document.querySelectorAll('.medical-history-button').forEach(button => {
    button.addEventListener('click', () => {
        button.classList.toggle('selected');
    });
});

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Collect input data
    const age = document.getElementById('age').value.trim();
    const gender = document.getElementById('gender').value;
    const additionalInfo = document.getElementById('additionalInfo').value.trim();

    const selectedSymptoms = Array.from(document.querySelectorAll('.symptom-button.selected')).map(btn => btn.dataset.symptom);
    const selectedMedicalHistory = Array.from(document.querySelectorAll('.medical-history-button.selected')).map(btn => btn.dataset.history);

    // Basic validation
    if (!age || !gender || selectedSymptoms.length === 0) {
        alert('Please fill out all required fields and select at least one symptom.');
        return;
    }

    // Construct prompt
    const prompt = `
Patient details:
- Age: ${age}
- Gender: ${gender}
- Symptoms: ${selectedSymptoms.join(', ')}
- Medical History: ${selectedMedicalHistory.length ? selectedMedicalHistory.join(', ') : 'None'}
${additionalInfo ? '- Additional Info: ' + additionalInfo : ''}

Based on the above, provide:
1. Possible conditions or diseases.
2. Recommended do's and don'ts.
3. Suggested next steps.
`;

    // Show loading
    loading.style.display = 'block';
    results.style.display = 'none';
    resultContent.innerHTML = '';

    // Call Gemini API
    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{ text: prompt }]
                }]
            })
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => null);
            console.error('API Error:', errorData);
            throw new Error(errorData?.error?.message || `API call failed with status ${response.status}`);
        }

        const data = await response.json();
        console.log('Gemini Response:', data);

        const answer = data.candidates?.[0]?.content?.parts?.[0]?.text || "No answer received from AI.";

        // Show result
        loading.style.display = 'none';
        results.style.display = 'block';
        resultContent.innerHTML = answer.replace(/\n/g, '<br>'); // Format newlines nicely

    } catch (error) {
        console.error('Error:', error);
        loading.style.display = 'none';
        results.style.display = 'block';
        resultContent.innerHTML = `<span style="color:red;">Error: ${error.message}</span>`;
    }
});
