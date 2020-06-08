$(() => {
  console.log("app.js", $);

  let $div = $("div");

  let sheetUrl =
    "https://docs.google.com/spreadsheets/d/1N0Lh8_H1klacQsz1raOYf-k9fTBUUEsk1rrIgE8Spos/edit?usp=sharing";
  let sheetAsJSON =
    "https://spreadsheets.google.com/feeds/list/1N0Lh8_H1klacQsz1raOYf-k9fTBUUEsk1rrIgE8Spos/od6/public/values?alt=json";

  $.ajax({ url: sheetAsJSON }).then((data) => {
    console.log("data", data);

    let projects = data.feed.entry.map((project) => {
      return {
        title: project.gsx$title.$t,
        image: project.gsx$image.$t,
        description: project.gsx$description.$t,
        url: project.gsx$url.$t,
      };
    });
    app(projects);
  });
  //this function is called from within the ajax method so that it has access to the projects variable. All the stuff you want to do should be in here.
  function app(projects) {
    // for (let i = 0; i < projects.length; i++) {
    //   let imgUrl = "url('" + projects[i].image + "')";
    //   $("#" + i).css("background-image", imgUrl);
    // }

    projects.forEach((project, index) => {
      let imgUrl = "url('" + projects[index].image + "')";
      let $div = 
      $('#project-wrapper').append($('<div>').addClass('project-tile').attr("id", `tile-${index}`).css("background-image", imgUrl))
    })

  }
});
