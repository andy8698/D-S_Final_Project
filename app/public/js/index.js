const SomeApp = {
    data() {
      return {
        Games: [],
        selectedGame: null,
        Game_form: {},
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

        postNewGame(evt) {
            console.log("Posting:", this.Game_form);
        
            fetch('api/Game/create.php', {
                method:'POST',
                body: JSON.stringify(this.Game_form),
                headers: {
                  "Content-Type": "application/json; charset=utf-8"
                }
              })
              .then( response => response.json() )
              .then( json => {
                  console.log("Returned from post:", json);
                  this.Games = json;
                  this.handleResetEditGame();
              })
              .catch( err => {
                alert("Something went horribly wrong.");
              });
  
          },


        postGame(evt) {
                console.log ("Test:", this.selectedGame);
                if (this.selectedGame) {
                    this.postEditGame(evt);
                } else {
                    this.postNewGame(evt);
                }
            },

        postEditGame(evt) {
            this.Game_form.id = this.selectedGame.id;       

            console.log("Editing")
            fetch('api/Game/update.php', {
                method:'POST',
                body: JSON.stringify(this.Game_form),
                headers: {
                    "Content-Type": "application/json; charset=utf-8"
                    }
                })
                .then( response => response.json() )
                .then( json => {
                console.log("Returned from post:", json);
                // TODO: test a result was returned!
                this.Games = json;

                // reset the form
                this.handleResetEditGame();
                });
            },

            postDeleteGame(g) {  
                if ( !confirm("Are you sure you want to delete the game " + g.gameName + "?") ) {
                    return;
                }  

                console.log("Delete!", g);

                fetch('api/Game/delete.php', {
                    method:'POST',
                    body: JSON.stringify(g),
                    headers: {
                        "Content-Type": "application/json; charset=utf-8"
                    }
                    })
                    .then( response => response.json() )
                    .then( json => {
                    console.log("Returned from post:", json);
                    // TODO: test a result was returned!
                    this.Games = json;

                    // reset the form
                    this.handleResetEditGame();
                    });
                },

    
          handleEditGame(Game) {
            console.log("selecting", Game);
            this.selectedGame = Game;
            this.Game_form = Object.assign({}, this.selectedGame);
          },
          handleResetEditGame() {
            this.selectedGame = null;
            this.Game_form = {};
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
                this.handleResetEdit();
            })
            .catch( err => {
              alert("Something went horribly wrong.");
            });
        },
        postDeleteReferee(o) {  
            if ( !confirm("Are you sure you want to delete the referee " + o.Name + "?") ) {
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
        this.fetchRefereeData();
        this.fetchGameData();
    }
  
  }
  
  Vue.createApp(SomeApp).mount('#offerApp');
  