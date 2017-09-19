var app = new Vue({
    el: "#app",
    data: {
        message: null,
        next: null,
        previous: null
    },
    methods: {
        nextID: function() {
            axios.get(`/verse/${this.next}`)
                .then(function(results){
                    app.next = results.data.response.verses[0].next.verse.id;
                    app.previous = results.data.response.verses[0].previous.verse.id;
                    app.message = results.data.response.verses[0].text;
                })
                .catch(function(err){
                }) 
        },
        previousID: function() {
            axios.get(`/verse/${this.previous}`)
                .then(function(results){
                    app.next = results.data.response.verses[0].next.verse.id;
                    app.previous = results.data.response.verses[0].previous.verse.id;
                    app.message = results.data.response.verses[0].text;
                })
                .catch(function(err){
                }) 
        }
    }
})

axios.get('/random/verse/')
    .then(function(results){
        app.next = results.data.response.verses[0].next.verse.id;
        app.previous = results.data.response.verses[0].previous.verse.id;
        app.message = results.data.response.verses[0].text;
    })
    .catch(function(err){
    })