// DOM Elements
const chatMessages = document.getElementById('chat-messages');
const chatInput = document.getElementById('chat-input');
const sendButton = document.getElementById('send-button');
const bookingModal = document.getElementById('booking-modal');
const bookingIframe = document.getElementById('booking-iframe');
const closeButton = document.querySelector('.close-button');
const modalOverlay = document.querySelector('.modal-overlay');

// Constants
const N8N_WEBHOOK_URL = 'https://stefan0987.app.n8n.cloud/webhook-test/156b9b80-a524-4116-9b0a-f93aa729a5ea';
const BOOKING_URL = 'https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ0QR3uRxVB7rb4ZHqJ1qYmz-T0e2CFtV5MYekvGDq1qyWxsV_Av3nP3zEGk0DrH2HqpTLoXuK0h';

// Generate a unique session ID when the page loads
const sessionId = generateSessionId();

// Event Listeners
sendButton.addEventListener('click', handleSendMessage);
chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSendMessage();
    }
});

// Modal Event Listeners
closeButton.addEventListener('click', hideBookingModal);
modalOverlay.addEventListener('click', hideBookingModal);

// Close modal on escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && bookingModal.classList.contains('show')) {
        hideBookingModal();
    }
});

// Prevent modal body clicks from closing the modal
bookingModal.querySelector('.modal-content').addEventListener('click', (e) => {
    e.stopPropagation();
});

// Generate a unique session ID
function generateSessionId() {
    return 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

// Handle sending messages
async function handleSendMessage() {
    const message = chatInput.value.trim();
    if (!message) return;

    // Add user message to chat
    addMessageToChat(message, 'user');
    chatInput.value = '';

    try {
        // Create URL with query parameters
        const queryParams = new URLSearchParams({
            message: message,
            sessionId: sessionId,
            time: new Date().toISOString()
        });
        
        // Send GET request to n8n webhook
        const response = await fetch(`${N8N_WEBHOOK_URL}?${queryParams.toString()}`);
        const data = await response.json();
        
        // Add bot response to chat
        if (data.response) {
            addMessageToChat(data.response, 'bot');
        }

        // Show booking popup if requested
        if (data.showBookingPopup) {
            showBookingModal();
        }
    } catch (error) {
        console.error('Error:', error);
        addMessageToChat('Sorry, there was an error processing your message.', 'bot');
    }
}

// Add message to chat
function addMessageToChat(message, type) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('chat-message', type);
    messageElement.textContent = message;
    chatMessages.appendChild(messageElement);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Show booking modal
function showBookingModal() {
    // Set iframe src when showing modal
    bookingIframe.src = BOOKING_URL;
    
    // Show modal with animation
    bookingModal.style.display = 'flex';
    // Trigger reflow
    bookingModal.offsetHeight;
    bookingModal.classList.add('show');
    
    // Disable background scrolling
    document.body.style.overflow = 'hidden';
    
    // Focus the modal for accessibility
    bookingModal.focus();
}

// Hide booking modal
function hideBookingModal() {
    // Hide modal with animation
    bookingModal.classList.remove('show');
    
    // Wait for animation to complete before removing display
    setTimeout(() => {
        bookingModal.style.display = 'none';
        // Clear iframe src
        bookingIframe.src = '';
    }, 300); // Match the CSS transition duration
    
    // Re-enable background scrolling
    document.body.style.overflow = '';
} 