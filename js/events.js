Vue.createApp({
    data: function () {
        return {
            eventObj: {
                eID: "",
                eName: "",
                eDur: "",
                category: "All"
            },
            events: []
        };
    },

    computed: {
        filteredEvents: function () {
            var self = this;

            return self.events.filter(function (eventItem) {
                var matchesID = true;
                var matchesName = true;
                var matchesDuration = true;
                var matchesCategory = true;

                if (self.eventObj.eID.trim() !== "") {
                    matchesID = eventItem.eventid.toLowerCase().includes(self.eventObj.eID.toLowerCase().trim());
                }

                if (self.eventObj.eName.trim() !== "") {
                    matchesName = eventItem.eventname.toLowerCase().includes(self.eventObj.eName.toLowerCase().trim());
                }

                if (self.eventObj.eDur.trim() !== "") {
                    matchesDuration = String(eventItem.durationhour).includes(self.eventObj.eDur.trim());
                }

                if (self.eventObj.category !== "All") {
                    matchesCategory = eventItem.category === self.eventObj.category;
                }

                if (matchesID === true && matchesName === true && matchesDuration === true && matchesCategory === true) {
                    return true;
                }
                else {
                    return false;
                }
            });
        }
    },

    methods: {
        loadEvents: function () {
            var self = this;

            fetch("events.json")
                .then(function (response) {
                    if (response.ok === true) {
                        return response.json();
                    }
                    else {
                        throw new Error("Could not load events.json");
                    }
                })
                .then(function (data) {
                    self.events = data;
                })
                .catch(function (error) {
                    console.error("Error loading event data:", error);
                });
        }
    },

    mounted: function () {
        this.loadEvents();
    }
}).mount("#app");
