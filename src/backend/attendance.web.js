import { elevate } from "wix-auth";
import { wixEvents } from "wix-events-backend";
import { guests } from "wix-events.v2";
import { Permissions, webMethod } from "wix-web-module";

const elevatedQueryGuests = elevate(guests.queryGuests);

/**
 * Returns only the public attendance total for an event. Guest records never
 * leave the backend, so names and contact details remain private.
 */
export const getAttendeeCount = webMethod(
    Permissions.Anyone,
    async (slug) => {
        if (typeof slug !== "string" || slug.length === 0 || slug.length > 200) {
            return 0;
        }

        const eventResults = await wixEvents
            .queryEvents()
            .eq("slug", slug)
            .limit(1)
            .find({ suppressAuth: true });

        const event = eventResults.items[0];
        if (!event) {
            return 0;
        }

        let results = await elevatedQueryGuests()
            .eq("eventId", event._id)
            .eq("attendanceStatus", "ATTENDING")
            .limit(1000)
            .find();

        let count = results.length;
        while (results.hasNext()) {
            results = await results.next();
            count += results.length;
        }

        return count;
    },
);
