import wixLocationFrontend from "wix-location-frontend";
import { getAttendeeCount } from "backend/attendance.web";

function currentEventSlug() {
    const path = wixLocationFrontend.path;
    return path[path.length - 1] || "";
}

function formatAnonymousAttendees(count) {
    const visibleIcons = Math.min(count, 8);
    const icons = Array(visibleIcons).fill("👤").join(" ");
    const remaining = count - visibleIcons;
    const more = remaining > 0 ? ` +${remaining}` : "";
    const label = `${count} ${count === 1 ? "attendee" : "attendees"}`;

    return `${icons}${more}   ${label}`.trim();
}

async function renderAttendeeCount() {
    const attendeeCounter = $w("#attendeeCountText");
    attendeeCounter.text = "Loading attendees…";

    try {
        const count = await getAttendeeCount(currentEventSlug());
        attendeeCounter.text = formatAnonymousAttendees(count);
    } catch (error) {
        console.error("Unable to load attendee count", error);
        attendeeCounter.text = "Attendee count unavailable";
    }
}

$w.onReady(function () {
    renderAttendeeCount();
    wixLocationFrontend.onChange(renderAttendeeCount);
});
