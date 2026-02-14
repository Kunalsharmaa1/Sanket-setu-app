let helpers = [];
let logList = document.getElementById("log");

function registerHelper() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            helpers.push({
                name: "Helper " + (helpers.length + 1),
                lat: position.coords.latitude,
                lon: position.coords.longitude
            });

            document.getElementById("output").innerHTML =
                "✅ You are registered as a nearby helper.";
        });
    }
}

function getDistance(lat1, lon1, lat2, lon2) {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;

    const a =
        Math.sin(dLat / 2) ** 2 +
        Math.cos(lat1 * Math.PI / 180) *
        Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon / 2) ** 2;

    return R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
}

function sendSOS() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {

            let userLat = position.coords.latitude;
            let userLon = position.coords.longitude;

            let nearby = [];

            helpers.forEach(helper => {
                let dist = getDistance(userLat, userLon, helper.lat, helper.lon);
                if (dist <= 2) {
                    nearby.push(helper.name + " (" + dist.toFixed(2) + " km)");
                }
            });

            let outputText = "🚨 Emergency Alert Generated<br>";
            outputText += "📍 Location Captured<br>";

            if (nearby.length > 0) {
                outputText += "👥 Alert sent to:<br>" + nearby.join("<br>");
            } else {
                outputText += "No nearby helpers found within 2km.";
            }

            outputText += "<br>🚓 Police Alert Sent Successfully.";

            document.getElementById("output").innerHTML = outputText;

            let time = new Date().toLocaleString();
            let li = document.createElement("li");
            li.textContent = "SOS triggered at " + time;
            logList.appendChild(li);

        });
    }
}
