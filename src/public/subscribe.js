// Subscribe Form Component
// Import this in your page code to use the subscribe functionality

import wixCRM from 'wix-crm-frontend';

export async function subscribeEmail(email, name = '') {
    try {
        const contactInfo = {
            emails: [{ email: email, tag: 'MAIN' }]
        };
        
        if (name) {
            const parts = name.split(' ');
            contactInfo.name = {
                first: parts[0],
                last: parts.slice(1).join(' ') || ''
            };
        }
        
        // Add to CRM contacts
        const contact = await wixCRM.contacts.appendOrCreateContact(contactInfo);
        
        return {
            success: true,
            message: 'Welcome to the Grid! You are now subscribed.',
            contactId: contact.contactId
        };
    } catch (error) {
        console.error('Subscribe error:', error);
        return {
            success: false,
            message: error.message || 'Something went wrong. Please try again.'
        };
    }
}
