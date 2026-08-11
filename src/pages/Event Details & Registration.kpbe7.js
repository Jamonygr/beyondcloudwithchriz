import wixLocationFrontend from "wix-location-frontend";
import { getAttendeeCount } from "backend/attendance.web";

function currentEventSlug() {
    const path = wixLocationFrontend.path;
    return path[path.length - 1] || "";
}

function formatAnonymousAttendees(count) {
    const visibleIcons = Math.min(count, 6);
    const icons = Array(visibleIcons).fill("👤").join(" ");
    const remaining = count - visibleIcons;
    const more = remaining > 0 ? ` +${remaining}` : "";
    const label = count === 1 ? "attendee" : "attendees";

    return [
        '<p style="text-align: center; line-height: 1.2;">',
        `<span style="font-size: 32px; font-weight: 700;">${count}</span>`,
        `<span style="font-size: 20px; font-weight: 600;"> ${label}</span><br>`,
        `<span style="font-size: 16px; color: #4f5660;">${icons}${more}</span>`,
        "</p>"
    ].join("");
}

async function renderAttendeeCount() {
    const attendeeCounter = $w("#attendeeCountText");
    attendeeCounter.text = "Loading attendees…";

    try {
        const count = await getAttendeeCount(currentEventSlug());
        attendeeCounter.html = formatAnonymousAttendees(count);
    } catch (error) {
        console.error("Unable to load attendee count", error);
        attendeeCounter.text = "Attendee count unavailable";
    }
}

$w.onReady(function () {
    renderAttendeeCount();
    wixLocationFrontend.onChange(renderAttendeeCount);
});
