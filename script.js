document.addEventListener('DOMContentLoaded', function() {
    const editor = document.getElementById('editor');
    const aiCursor = document.querySelector('.ai-cursor');
    const promptBox = document.getElementById('promptBox');
    const overlay = document.getElementById('overlay');
    const promptInput = document.querySelector('.prompt-input');
    const cancelBtn = document.querySelector('.prompt-cancel');
    const submitBtn = document.querySelector('.prompt-submit');
    
    // Make editor focusable
    editor.setAttribute('tabindex', '0');
    
    // Click AI cursor to open prompt
    aiCursor.addEventListener('click', function(e) {
        e.stopPropagation();
        openPrompt();
    });
    
    // Click editor to open prompt (if empty)
    editor.addEventListener('click', function(e) {
        if (editor.textContent.trim() === 'AI' || editor.textContent.trim() === '') {
            openPrompt();
        }
    });
    
    // Cancel button
    cancelBtn.addEventListener('click', function() {
        closePrompt();
    });
    
    // Submit button
    submitBtn.addEventListener('click', function() {
        const command = promptInput.value.trim();
        if (command) {
            processCommand(command);
            closePrompt();
        }
    });
    
    // Submit on Enter key
    promptInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            submitBtn.click();
        }
    });
    
    // Close prompt when clicking overlay
    overlay.addEventListener('click', function() {
        closePrompt();
    });
    
    function openPrompt() {
        promptBox.style.display = 'block';
        overlay.style.display = 'block';
        promptInput.focus();
    }
    
    function closePrompt() {
        promptBox.style.display = 'none';
        overlay.style.display = 'none';
        promptInput.value = '';
    }
    
    function processCommand(command) {
        // Remove the AI cursor if it's the only content
        if (editor.innerHTML === '<span class="ai-cursor">AI</span>' || 
            editor.textContent.trim() === 'AI') {
            editor.innerHTML = '';
        }
        
        // Add user command to editor
        const userDiv = document.createElement('div');
        userDiv.innerHTML = `<div style="margin-bottom: 16px; color: #4a5568;">
            <strong>You:</strong> ${command}
        </div>`;
        editor.appendChild(userDiv);
        
        // Simulate AI response
        setTimeout(() => {
            const responseDiv = document.createElement('div');
            responseDiv.innerHTML = `<div style="margin-bottom: 30px; color: #2d3748;">
                <strong>AetherWrite:</strong> I've created that for you. What would you like to do next?
            </div>
            <span class="ai-cursor">AI</span>`;
            editor.appendChild(responseDiv);
            
            // Scroll to bottom
            editor.scrollTop = editor.scrollHeight;
            
            // Re-attach event listener to the new AI cursor
            const newAiCursor = document.querySelector('.ai-cursor');
            newAiCursor.addEventListener('click', function(e) {
                e.stopPropagation();
                openPrompt();
            });
        }, 1000);
        
        // Scroll to bottom
        editor.scrollTop = editor.scrollHeight;
    }
});