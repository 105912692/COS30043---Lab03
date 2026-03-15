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
        // add code here
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
