document.addEventListener('DOMContentLoaded', function() {
    const promptSign = document.getElementById('promptSign');
    const promptBox = document.getElementById('promptBox');
    const promptInput = document.querySelector('.prompt-input');
    const cancelBtn = document.querySelector('.prompt-cancel');
    const submitBtn = document.querySelector('.prompt-submit');
    const editor = document.getElementById('editor');
    
    // Toggle prompt box visibility
    promptSign.addEventListener('click', function() {
        promptBox.style.display = promptBox.style.display === 'block' ? 'none' : 'block';
        if (promptBox.style.display === 'block') {
            promptInput.focus();
        }
    });
    
    // Cancel button
    cancelBtn.addEventListener('click', function() {
        promptBox.style.display = 'none';
        promptInput.value = '';
    });
    
    // Submit button
    submitBtn.addEventListener('click', function() {
        const command = promptInput.value.trim();
        if (command) {
            processCommand(command);
            promptInput.value = '';
            promptBox.style.display = 'none';
        }
    });
    
    // Submit on Enter key
    promptInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            submitBtn.click();
        }
    });
    
    // Close prompt box when clicking outside
    document.addEventListener('click', function(e) {
        if (promptBox.style.display === 'block' && 
            !promptBox.contains(e.target) && 
            !promptSign.contains(e.target)) {
            promptBox.style.display = 'none';
            promptInput.value = '';
        }
    });
    
    // Process user commands
    function processCommand(command) {
        const placeholder = document.querySelector('.placeholder-text');
        if (placeholder) {
            placeholder.remove();
        }
        
        // Add user command
        const userDiv = document.createElement('div');
        userDiv.innerHTML = `<p><strong>You:</strong> ${command}</p>`;
        userDiv.style.marginTop = '20px';
        userDiv.style.padding = '10px';
        userDiv.style.backgroundColor = '#f0f4ff';
        userDiv.style.borderRadius = '8px';
        editor.appendChild(userDiv);
        
        // Simulate AI response
        setTimeout(() => {
            const responseDiv = document.createElement('div');
            responseDiv.innerHTML = `<p><strong>AetherWrite:</strong> I've created that for you. What would you like to do next?</p>`;
            responseDiv.style.marginTop = '10px';
            responseDiv.style.padding = '10px';
            responseDiv.style.backgroundColor = '#f0fff4';
            responseDiv.style.borderRadius = '8px';
            editor.appendChild(responseDiv);
            
            editor.scrollTop = editor.scrollHeight;
        }, 1000);
        
        editor.scrollTop = editor.scrollHeight;
    }
});