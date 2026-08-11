import wixLocationFrontend from "wix-location-frontend";
import { getAttendeeCount } from "backend/attendance.web";

function currentEventSlug() {
    const path = wixLocationFrontend.path;
    return path[path.length - 1] || "";
}

async function renderAttendeeCount() {
    const attendeeCounter = $w("#guestList3");
    await attendeeCounter.collapse();
    attendeeCounter.setAttribute("preview-state", "empty");
    attendeeCounter.setAttribute("empty-message", "Loading attendees…");

    try {
        const count = await getAttendeeCount(currentEventSlug());
        attendeeCounter.setAttribute(
            "empty-message",
            `${count} ${count === 1 ? "attendee" : "attendees"}`,
        );
    } catch (error) {
        console.error("Unable to load attendee count", error);
        attendeeCounter.setAttribute(
            "empty-message",
            "Attendee count unavailable",
        );
    }

    await attendeeCounter.expand();
}

$w.onReady(function () {
    renderAttendeeCount();
    wixLocationFrontend.onChange(renderAttendeeCount);
});
