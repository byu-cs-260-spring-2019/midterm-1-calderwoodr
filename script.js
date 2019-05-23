let app = new Vue({

    el: "#app",
    data: {
        
        search_term: '',
        books: '',
        num_found: '',
        loading: false,
        cur_book: '',
        favorites: new Set([]),
        print_fav: [],
        master: []
    },
    created() {
        this.loading = false;
    },
    methods: {
        async getBook() {
            try {
                this.loading = true;
                console.log("searching", this.search_term);
                console.log("what");
                const response = await axios.get("https://openlibrary.org/search.json?q=" + this.search_term);
                console.log("response: ", response);
                
                this.books = response.data.docs;
                this.num_found = response.data.num_found;
                this.master.push(response.data.docs);
                
                this.loading = false;
                
                


                //const thumbnail = await axios.get('https://openlibrary.org/api/books?bibkeys=ISBN:' + isbn_num + '&jscmd=details&format=json');
                
            }
            catch (error) {
                console.log(error);
            }

            return;

        },
        // addFavorite: function(book) {
            
        //     console.log("here", book);
        //     this.favorites.push(book);
        // },
        addFavorite: function(book) {
            console.log(book);
            this.favorites = this.favorites.add(book);
            this.print_fav = Array.from(this.favorites);
            console.log(this.favorites);
        
        },
        removeFavorite: function(book) {
            this.favorites.delete(book);
            console.log(this.favorites);
            this.print_fav = Array.from(this.favorites);
        }
    }




})