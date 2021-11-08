const reportApp = {
    data() {
      return {
        Games: [],
        Game_form: {},
        Referee_tables : [],
        gameReports: {}
            
      
      }
    },
    computed: {},
    methods: {
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
    downloadGame(){
      console.log("download");
      let csv = "data:text/csv;charset=utf-8,";
      console.log("download", this.Games[0]);
      csv += Object.keys(this.Games[0]).join(",")+"\r\n";
      this.Games.forEach(function(rObj) {
      let r = Object.values(rObj).join(",");
      csv += r + "\r\n";
      console.log("csv",csv);
      });
      var enc = encodeURI(csv);
      var download = document.createElement("a");
      download.setAttribute("href", enc);
      download.setAttribute("download", "game_list_unassigned.csv");
      document.body.appendChild(download);
        console.log("download");
        download.click();
    },
      futureGame(evt) {

            fetch('api/report/report2.php', {
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
              })
              .catch( err => {
                alert("Something went horribly wrong.");
              });
          },

          dateRange(evt) {
             fetch('api/report/report1.php', {
                method:'POST',
                body: JSON.stringify(this.gameReports),
                headers: {
                  "Content-Type": "application/json; charset=utf-8"
                }
              })
              .then( response => response.json() )
              .then( json => {
                console.log("Returned from post:", json);
                this.Games = json;
                
              
              })
              .catch( err => {
                alert("Something went horribly wrong.");
              });
          }, 

    },
    created() {
        this.fetchRefereeData(); 
    }
   
  
  }
  
  Vue.createApp(reportApp).mount('#report');
  
