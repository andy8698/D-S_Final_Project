const SomeApp = {
    data() {
      return {
        students: [],
        selectedStudent: null,
        offers: [],
        selectedTable: null,
        Referee_tables: [],
        Referee_form: {}
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

        
        selectReferee(t) {
            if (t == this.selectedReferee) {
                return;
            }
            this.selectedReferee = t;
            this.Referee_tables = [];
            this.fetchRefereeData(this.selectedReferee);
        },
        fetchRefereeData() {
            fetch('/api/Referee_table/')
            .then( response => response.json() )
            .then( (responseJson) => {
                console.log(responseJson);
                this.Referee_tables = responseJson;
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
        postNewReferee(evt) {
            console.log("Posting!", this.book_form);

            fetch('api/Referee_table/create.php', {
                method:'POST',
                body: JSON.stringify(this.book_form),
                headers: {
                    "Content-Type": "application/json; charset=utf-8"
                }
            })
            .then( response => response.json() )
            .then( json => {
                console.log("Returned from post:", json);
                this.Referee_tables = json;
                this.Referee_form = {};
            });
        }
    },
    created() {
        this.fetchStudentData();
        this.fetchRefereeData();
    }
  
  }
  
  Vue.createApp(SomeApp).mount('#offerApp');
  