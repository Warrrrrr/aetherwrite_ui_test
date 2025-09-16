document.addEventListener('DOMContentLoaded', function() {
    const aiCursor = document.getElementById('aiCursor');
    const typingText = document.getElementById('typingText');
    const promptBox = document.getElementById('promptBox');
    const promptInput = document.getElementById('promptInput');
    const generateBtn = document.getElementById('generateBtn');
    const examples = document.querySelectorAll('.example');
    
    const message = "What do you want to create?";
    let typingInterval;
    let currentState = 'icon'; // 'icon' or 'text'
    
    // Start with the icon
    setTimeout(startTypingAnimation, 1000);
    
    function startTypingAnimation() {
        if (currentState === 'icon') {
            // Switch to text with typing animation
            typeText();
            currentState = 'text';
        } else {
            // Switch back to icon
            typingText.innerHTML = '';
            currentState = 'icon';
            setTimeout(startTypingAnimation, 2000);
        }
    }
    
    function typeText() {
        let index = 0;
        clearInterval(typingInterval);
        
        typingInterval = setInterval(() => {
            if (index < message.length) {
                typingText.innerHTML = message.substring(0, index + 1) + '<span class="cursor"></span>';
                index++;
            } else {
                clearInterval(typingInterval);
                // Wait, then switch back to icon
                setTimeout(startTypingAnimation, 3000);
            }
        }, 100);
    }
    
    // Click handler for AI cursor
    aiCursor.addEventListener('click', function() {
        clearInterval(typingInterval);
        promptBox.style.display = 'block';
        typingText.innerHTML = '';
        
        // Focus on input after a short delay
        setTimeout(() => {
            promptInput.focus();
        }, 100);
    });
    
    // Generate button handler
    generateBtn.addEventListener('click', generateDocument);
    
    // Press Enter to generate
    promptInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            generateDocument();
        }
    });
    
    // Example click handlers
    examples.forEach(example => {
        example.addEventListener('click', function() {
            promptInput.value = this.textContent;
            generateDocument();
        });
    });
    
    function generateDocument() {
        const prompt = promptInput.value.trim();
        if (prompt) {
            // In a real application, this would send the prompt to a backend
            // For this example, we'll just show a success message
            typingText.innerHTML = `Creating: <strong>${prompt}</strong><span class="cursor"></span>`;
            promptBox.style.display = 'none';
            
            // Simulate AI working
            setTimeout(() => {
                typingText.innerHTML = 'Your document is being prepared...<span class="cursor"></span>';
            }, 1500);
            
            // Simulate document completion
            setTimeout(() => {
                typingText.innerHTML = 'Document created successfully!<span class="cursor"></span>';
            }, 3000);
        }
    }
});