class Rover {
   constructor(position, generatorWatts=110) {
     this.position = position;
     this.mode = "NORMAL";
     this.generatorWatts = generatorWatts;
   }
   receiveMessage(message){
     let newObject = {};
     newObject["message"] = message.name;

    let results = [];
    let resultsObject = {};
    let statusObject = {};
    for (var i = 0; i<message.commands.length; i++){
      if(message.commands[i].commandType == "STATUS_CHECK"){
        resultsObject["completed"] = true;
        statusObject["mode"] = this.mode;
        statusObject["generatorWatts"]=this.generatorWatts;
        statusObject["position"] = this.position;
        resultsObject["roverStatus"] = statusObject;
        results[i] = resultsObject;
      } else if(message.commands[i].commandType == "MODE_CHANGE"){
        this.mode = message.commands[i].value;
        resultsObject["completed"] = true;
        results[i] = resultsObject;
      } else if(message.commands[i].commandType == "MOVE"){
        if(this.mode == "NORMAL"){
          this.position = message.commands[i].value;
          resultsObject["completed"] = true;
        } else {
          resultsObject["completed"] = false;
        } results[i] = resultsObject;
      }
    }
     newObject["results"] = results;
     return newObject;
   }
}

module.exports = Rover;