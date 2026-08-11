import wixLocationFrontend from "wix-location-frontend";
import { getAttendeeCount } from "backend/attendance.web";

function currentEventSlug() {
    const path = wixLocationFrontend.path;
    return path[path.length - 1] || "";
}

async function renderAttendeeCount() {
    const attendeeCounter = $w("#attendeeCountText");
    attendeeCounter.text = "Loading attendees…";

    try {
        const count = await getAttendeeCount(currentEventSlug());
        attendeeCounter.text = `${count} ${count === 1 ? "attendee" : "attendees"}`;
    } catch (error) {
        console.error("Unable to load attendee count", error);
        attendeeCounter.text = "Attendee count unavailable";
    }
}

$w.onReady(function () {
    renderAttendeeCount();
    wixLocationFrontend.onChange(renderAttendeeCount);
});
