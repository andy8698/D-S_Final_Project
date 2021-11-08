const Offer = {
  data() {
    return {
      assignments: [],
      assignments2: [],
      selectedAssignment: null,
      assignment_form: {},
      Games: [],
      selectedGame: null,
      Game_form: {},
      selectedReferee: null,
      Referee_tables: [],
      Referee_form: {}
      }
  },
  methods: {
    selectGame(s) {
      if (s == this.selectedGame) {
          return;
      }
      this.selectedGame = s;
      console.log(s);
      this.assignments = [];
      this.fetchAssignmentData(this.selectedGame);
  },
      fetchAssignmentData(g){
        console.log("game datat:", g);
          fetch('/api/assignment/?Game=' + g.id)
          .then( response => response.json() )
          .then( (responseJson) => {
              console.log(responseJson);
              this.assignments = responseJson;
          })
          .catch( (err) => {
              console.error(err);
          })
      },
      fetchAssignmentData2(){
          fetch('/api/assignment/index2.php')
          .then( response => response.json() )
          .then( (responseJson) => {
              console.log(responseJson);
              this.assignments2 = responseJson;
          })
          .catch( (err) => {
              console.error(err);
          })
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

      postNewAssignment(evt) {
          this.assignment_form.gameid = this.selectedGame.id;
          
          console.log("Posting:", this.assignment_form);
      
          fetch('api/assignment/create.php', {
              method:'POST',
              body: JSON.stringify(this.assignment_form),
              headers: {
                "Content-Type": "application/json; charset=utf-8"
              }
            })
            .then( response => response.json() )
            .then( json => {
                console.log("Returned from post:", json);
                this.assignments = json;
                this.handleResetEditAssignment();
            })
            .catch( err => {
              alert("Something went horribly wrong.");
            });
        },

    postAssignment(evt) {
          console.log ("Test:", this.selectedAssignment);
          if (this.selectedAssignment) {
              this.postEditAssignment(evt);
          } else {
              this.postNewAssignment(evt);
          }
      },

  postEditAssignment(evt) {
      this.assignment_form.id = this.selectedAssignment.id;
      this.assignment_form.gameid = this.selectedGame.id;


      console.log("Editing")
      fetch('api/assignment/update.php', {
          method:'POST',
          body: JSON.stringify(this.assignment_form),
          headers: {
              "Content-Type": "application/json; charset=utf-8"
              }
          })
          .then( response => response.json() )
          .then( json => {
          console.log("Returned from post:", json);
          // TODO: test a result was returned!
          this.assignments = json;

          // reset the form
          this.handleResetEditAssignment();
          });
      },

  postDeleteAssignment(s) {  
      if ( !confirm("Are you sure you want to delete the referee "  + s.Name +"?") ) {
          return;
      }  

      console.log("Delete!", s);

      fetch('api/assignment/delete.php', {
          method:'POST',
          body: JSON.stringify(s),
          headers: {
              "Content-Type": "application/json; charset=utf-8"
          }
          })
          .then( response => response.json() )
          .then( json => {
          console.log("Returned from post:", json);
          // TODO: test a result was returned!
          this.assignments = json;
          
          // reset the form
          this.handleResetEditAssignment();
          });
      },

  
        handleEditAssignment(assignment) {
          console.log("selecting", assignment);
          this.selectedAssignment = assignment;
          this.assignment_form = Object.assign({}, this.selectedAssignment);
        },
        handleResetEditAssignment() {
          this.selectedAssignment = null;
          this.assignment_form = {};
        }
  },
  created () {
      this.fetchGameData();
      this.fetchRefereeData();
  } 
} 
Vue.createApp(Offer).mount('#assign');