// console.log(self)
self.addEventListener("message", function(e) {
    console.log("add message event", e);
    e.waitUntil(self.clients.matchAll().then(function(clients) {
        if (!clients || clients.length === 0) {
            return;
        }
        clients.forEach(client => {
            client.postMessage(e.data)
        });
    }))
})