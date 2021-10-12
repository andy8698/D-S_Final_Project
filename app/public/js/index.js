const SomeApp = {
    data() {
      return {
        students: [],
        selectedStudent: null,
        offers: [],
        selectedTable: null,
        book_tables: [],
        book_form: {}
      }
    },
    computed: {},
    methods: {
        prettyData(d) {
            return dayjs(d)
            .format('D MMM YYYY')
        },
        prettyDollar(n) {
            const d = new Intl.NumberFormat("en-US").format(n);
            return "$ " + d;
        },
        selectStudent(s) {
            if (s == this.selectedStudent) {
                return;
            }
            this.selectedStudent = s;
            this.offers = [];
            this.fetchOfferData(this.selectedStudent);
        },

        
        selectTable(t) {
            if (t == this.selectedTable) {
                return;
            }
            this.selectedTable = t;
            this.book_tables = [];
            this.fetchTableData(this.selectedTable);
        },
        fetchTableData() {
            fetch('/api/book_table/')
            .then( response => response.json() )
            .then( (responseJson) => {
                console.log(responseJson);
                this.book_tables = responseJson;
            })
            .catch( (err) => {
                console.error(err);
            })
        },

        fetchStudentData() {
            fetch('/api/student/')
            .then( response => response.json() )
            .then( (responseJson) => {
                console.log(responseJson);
                this.students = responseJson;
            })
            .catch( (err) => {
                console.error(err);
            })
        },
        fetchOfferData(s) {
            console.log("Fetching offer data for ", s);
            fetch('/api/offer/?student=' + s.id)
            .then( response => response.json() )
            .then( (responseJson) => {
                console.log(responseJson);
                this.offers = responseJson;
            })
            .catch( (err) => {
                console.error(err);
            })
            .catch( (error) => {
                console.error(error);
            });
        },
        postNewBook(evt) {
            console.log("Posting!", this.book_form);

            fetch('api/book_table/create.php', {
                method:'POST',
                body: JSON.stringify(this.book_form),
                headers: {
                    "Content-Type": "application/json; charset=utf-8"
                }
            })
            .then( response => response.json() )
            .then( json => {
                console.log("Returned from post:", json);
                this.book_tables = json;
                this.book_form = {};
            });
        }
    },
    created() {
        this.fetchStudentData();
        this.fetchTableData();
    }
  
  }
  
  Vue.createApp(SomeApp).mount('#offerApp');
  