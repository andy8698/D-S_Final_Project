const SomeApp = {
    data() {
      return {
        Games: [],
        selectedGame: null,
        selectedReferee: null,
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
        selectGame(s) {
            if (s == this.selectedGame) {
                return;
            }
            this.selectedGame = s;
            this.Referee_tables = [];
            this.fetchRefereeData(this.selectedGame);
        },

        fetchGameData() {
            fetch('/api/Game/')
            .then( response => response.json() )
            .then( (responseJson) => {
                console.log(responseJson);
                this.Games = responseJson;
            })
            .catch( (err) => {
                console.error(err);
            })
        },
        fetchRefereeData(s) {
            console.log("Fetching referee data for ", s);
            fetch('/api/Referee_table/?Game=' + s.RefereeID)
            .then( response => response.json() )
            .then( (responseJson) => {
                console.log(responseJson);
                this.Referee_tables = responseJson;
            })
            .catch( (err) => {
                console.error(err);
            })
            .catch( (error) => {
                console.error(error);
            });
        },
        postReferee(evt) {
            console.log ("Test:", this.selectedReferee);
          if (this.selectedReferee) {
              this.postEditReferee(evt);
          } else {
              this.postNewReferee(evt);
          }
        },
        postEditReferee(evt) {
            this.Referee_form.RefereeID = this.selectedReferee.RefereeID;
            this.Referee_form.GameID = this.selectedGame.id;        
            
            console.log("Editing!", this.Referee_form);
    
            fetch('api/Referee_table/update.php', {
                method:'POST',
                body: JSON.stringify(this.Referee_form),
                headers: {
                  "Content-Type": "application/json; charset=utf-8"
                }
              })
              .then( response => response.json() )
              .then( json => {
                console.log("Returned from post:", json);
                // TODO: test a result was returned!
                this.Referee_tables = json;
                
                // reset the form
                this.handleResetEdit();
              });
          },
        postNewReferee(evt) {
            this.Referee_form.GameID = this.selectedGame.id;
            console.log("Posting!", this.Referee_form);

            fetch('api/Referee_table/create.php', {
                method:'POST',
                body: JSON.stringify(this.Referee_form),
                headers: {
                    "Content-Type": "application/json; charset=utf-8"
                }
            })
            .then( response => response.json() )
            .then( json => {
                console.log("Returned from post:", json);
                this.Referee_tables = json;
                this.handleEditReferee();
            })
            .catch( err => {
              alert("Something went horribly wrong.");
            });
        },
        postDeleteReferee(o) {  
            if ( !confirm("Are you sure you want to delete the referee from " + o.Name + "?") ) {
                return;
            }  
            
            console.log("Delete!", o);
    
            fetch('api/Referee_table/delete.php', {
                method:'POST',
                body: JSON.stringify(o),
                headers: {
                  "Content-Type": "application/json; charset=utf-8"
                }
              })
              .then( response => response.json() )
              .then( json => {
                console.log("Returned from post:", json);
                // TODO: test a result was returned!
                this.Referee_tables = json;
                
                // reset the form
                this.handleResetEdit();
              });
          },
        handleEditReferee(Referee_table) {
            this.selectedReferee = Referee_table;
            this.Referee_form = Object.assign({}, this.selectedReferee);
        },
        handleResetEdit() {
            this.selectedReferee = null;
            this.Referee_form = {};
        }
    },
    created() {
        this.fetchGameData();
        this.fetchRefereeData();
    }
  
  }
  
  Vue.createApp(SomeApp).mount('#offerApp');
  