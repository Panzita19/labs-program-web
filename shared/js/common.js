// Configurar botón de chat
function setupChatButton() {
    const chatButton = document.getElementById('chatbotButton');
    
    if (chatButton) {
        chatButton.addEventListener('click', function(e) {
            e.preventDefault();
            
            chatButton.style.animation = 'pulsate 1s cubic-bezier(0.4, 0, 0.2, 1)';
            
            setTimeout(() => {
                chatButton.style.animation = 'desaparecer 1s forwards';
                
                setTimeout(() => {
                    chatButton.classList.add('hidden');
                    
                    setTimeout(() => {
                        chatButton.classList.remove('hidden');
                        chatButton.style.animation = 'reaparecer 0.5s forwards';
                        
                        setTimeout(() => {
                            chatButton.style.animation = '';
                        }, 500);
                    }, 5000);
                }, 1000);
            }, 1000);
        });
    }
}

document.addEventListener('DOMContentLoaded', function() {
    setupChatButton();
    
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    tooltipTriggerList.forEach(tooltipTriggerEl => {
        new bootstrap.Tooltip(tooltipTriggerEl);
    });
});