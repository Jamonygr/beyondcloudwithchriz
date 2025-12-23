// API Reference: https://www.wix.com/velo/reference/api-overview/introduction

import { subscribeEmail } from 'public/subscribe.js';

$w.onReady(function () {
    // Subscribe button handler
    // Make sure you have an HTML component with id 'subscribeForm' or use Wix elements
    
    // If using Wix native elements (recommended):
    // - Add a Text Input with ID: #emailInput
    // - Add a Button with ID: #subscribeButton  
    // - Add a Text element with ID: #subscribeMessage
    
    const emailInput = $w('#emailInput');
    const subscribeBtn = $w('#subscribeButton');
    const messageText = $w('#subscribeMessage');
    
    if (subscribeBtn) {
        subscribeBtn.onClick(async () => {
            const email = emailInput.value;
            
            if (!email || !email.includes('@')) {
                if (messageText) {
                    messageText.text = '⚠️ Please enter a valid email address';
                    messageText.show();
                }
                return;
            }
            
            // Disable button while processing
            subscribeBtn.disable();
            subscribeBtn.label = 'Subscribing...';
            
            try {
                const result = await subscribeEmail(email);
                
                if (result.success) {
                    emailInput.value = '';
                    if (messageText) {
                        messageText.text = '✨ Welcome to the Grid! You are now subscribed.';
                        messageText.show();
                    }
                } else {
                    if (messageText) {
                        messageText.text = '❌ ' + result.message;
                        messageText.show();
                    }
                }
            } catch (error) {
                console.error('Subscribe error:', error);
                if (messageText) {
                    messageText.text = '❌ Something went wrong. Please try again.';
                    messageText.show();
                }
            } finally {
                subscribeBtn.enable();
                subscribeBtn.label = 'Subscribe';
            }
        });
    }
});
