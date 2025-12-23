// Subscribe API - Backend HTTP Function
// This handles newsletter subscriptions

import { ok, badRequest } from 'wix-http-functions';
import wixCRM from 'wix-crm-backend';

export function post_subscribe(request) {
    return request.body.json()
        .then((body) => {
            const email = body.email;
            const name = body.name || '';
            
            if (!email || !email.includes('@')) {
                return badRequest({ body: { error: 'Invalid email' } });
            }
            
            // Create contact in Wix CRM
            const contactInfo = {
                emails: [{ email: email, primary: true }]
            };
            
            if (name) {
                const parts = name.split(' ');
                contactInfo.name = {
                    first: parts[0],
                    last: parts.slice(1).join(' ') || ''
                };
            }
            
            return wixCRM.contacts.createContact(contactInfo)
                .then((contact) => {
                    return ok({ 
                        body: { 
                            success: true, 
                            message: 'Subscribed successfully!',
                            contactId: contact._id 
                        } 
                    });
                })
                .catch((error) => {
                    // Contact might already exist
                    if (error.message.includes('already exists')) {
                        return ok({ body: { success: true, message: 'Already subscribed!' } });
                    }
                    return badRequest({ body: { error: error.message } });
                });
        });
}
