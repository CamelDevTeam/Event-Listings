(function(){
    async function listRecords() {
       const getAirTableEvents = await $.ajax({
           url: 'get-table.php',
           type: 'GET',
       });
       
       let x = JSON.parse(getAirTableEvents);//CONVERT TO ARRAY OBJECT
       let eventData = x.records;
       let j = eventData.map(function(i){
        let etags = i.fields['Event Tag'];
        
               return {
                    'eventName':i.fields['Event Name'],//
                    'eventCategory':i.fields['Event Category'],//
                    'eventDesp':i.fields['Event Description'],//
                    'eventLocation':i.fields['Event Location'],//
                    'eventStartDate':i.fields['Event Start Date'],//
                    'eventEndDate':i.fields['Event End Date'],//
                    'eventStartTime':i.fields['Event Start Time'],//
                    'eventEndTime':i.fields['Event End Time'],//
                    'eventImage':i.fields['Event Image'][0].url,//
                    'eventTags':etags.split(','),//
                    'eventOrganizer':i.fields['Event Organizer'],//
                    'eventOrgaEmail':i.fields['Organizer Email'],//
                    'eventOrgaPhone':i.fields['Organizer Phone'],//
                    'eventPageUrl':i.fields['page_item_url'],//
               }
       });
       return j;
   }
   listRecords()
   .then(value => {
       let eventList = value; //WILL BE data.config.jobList in Duda
       console.log(eventList)
   });


}());