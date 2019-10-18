(function(){
loadFuseJS(document, 'script', 'fuseJS');
  //CREATE FONT AWESOME LINK SOURCE
  const cssId = 'fontAwesomeSource';
  if (!document.getElementById(cssId))
  {
      var head  = document.getElementsByTagName('head')[0];
      var link  = document.createElement('link');
      link.id   = 'fontAwesomeSource';
      link.rel  = 'stylesheet';
      link.type = 'text/css';
      link.href = 'https://use.fontawesome.com/releases/v5.5.0/css/all.css';
      link.integrity = 'sha384-B4dIYHKNBt8Bc12p+WXckhzcICo0wtJAoU8YZTY5qE0Id1GSseTk6S+L3BlXeVIU';
      link.crossOrigin = 'anonymous';
      head.appendChild(link);
  }

  //CREATE FUSE JS SOURCE
    function loadFuseJS(d, s, a) {
        var b = d.getElementsByTagName(s)[0];
        if (d.getElementById(a)) {
            return;
        }
        js = d.createElement(s);
        js.id = a;
        js.src = "https://irp-cdn.multiscreensite.com/e70fa563a8d442bc81646ad9d635638a/files/uploaded/fuse.js";
        b.parentNode.insertBefore(js, b);
    }

    async function listRecords() {
       const getAirTableEvents = await $.ajax({
           url: 'get-table.php',
           type: 'GET',
       });
       
       let airTableData = JSON.parse(getAirTableEvents);//CONVERT TO ARRAY OBJECT
       let eventData = airTableData.records;
       let events = eventData.map(function(i){
       let etags = i.fields['Event Tag'];
               return {
    
                    'eventName':i.fields['Event Name'],
                    'eventCategory':i.fields['Event Category'],
                    'eventDesp':i.fields['Event Description'],
                    'eventLocation':i.fields['Event Location'],
                    'eventStartDate':i.fields['Event Start Date'],
                    'eventEndDate':i.fields['Event End Date'],
                    'eventStartTime':i.fields['Event Start Time'],
                    'eventEndTime':i.fields['Event End Time'],
                    'eventImage':i.fields['Event Image'][0].url,
                    'eventTags':etags.split(','),
                    'eventOrganizer':i.fields['Event Organizer'],
                    'eventOrgaEmail':i.fields['Organizer Email'],
                    'eventOrgaPhone':i.fields['Organizer Phone'],
                    'eventPageUrl':i.fields['page_item_url'],
               }
       });
       return events;
   }

   listRecords()
   .then(eventList => {
     // let eventList = value; //WILL BE data.config.jobList in Duda
       eventList.map(function(i){
        let dateData = i.eventStartDate.split('-');
        console.log(dateData);
        let eDay = dateData[2];
        let date = new Date(i.eventStartDate);  // 2009-11-10
        let month = date.toLocaleString('default', { month: 'long' });
        let monthData = month.substring(0, 3);

        let evData =  `<div class="evWrapper">
                        <div class="evInnerWrapper">
                                <div class="evDateWrap">
                                        <div class="evDay">${eDay}</div>
                                        <div class="evMonth">${monthData}.</div>
                                    </div>
                            <div class="evImgWrap" style="background-image: url(${i.eventImage});"></div>
                            <div class="evInfoWrap">
                                <div class="evDetailsWrap">
                                    <div class="evTitle">${i.eventName}</div>
                                    <div class="evTimeWrap">
                                        <div class="evTimeIconWrap">
                                            <i class="far fa-clock"></i>
                                        </div>
                                        <div class="evTimeTextWrap">
                                            ${i.eventStartTime} - ${i.eventEndTime}
                                        </div>
                                    </div>
                                    <div class="evLocationWrap">
                                        <div class="evLocationIconWrap">
                                            <i class="fas fa-map-marker-alt"></i>
                                        </div>
                                        <div class="evLocationTextWrap">
                                            ${i.eventLocation}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>`;
        $('.evMainWrapper').append(evData);
       });

       $('#asd').keyup(function(){
        let value = $(this).val();
        let result = initFuse(eventList,value);
        console.log(result)

    });


   });
  ;
   function initFuse(eventList,keyword){
    var options = {
        shouldSort: true,
        threshold: 0.3,
        location: 0,
        distance: 100,
        maxPatternLength: 32,
        minMatchCharLength: 1,
        keys: [
          "eventName",
          "eventTags",
          "eventOrganizer",
          "eventCategory",
          "eventLocation"
        ]
      };
      var fuse = new Fuse(eventList, options); // "list" is the item array
      var result = fuse.search(keyword);
      return result;
   }

}());