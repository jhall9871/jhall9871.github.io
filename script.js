$(() => {
  // console.log("app.js", $);

  let $div = $("div");

  let sheetUrl =
    "https://docs.google.com/spreadsheets/d/1N0Lh8_H1klacQsz1raOYf-k9fTBUUEsk1rrIgE8Spos/edit?usp=sharing";
  let sheetAsJSON =
    "https://spreadsheets.google.com/feeds/list/1N0Lh8_H1klacQsz1raOYf-k9fTBUUEsk1rrIgE8Spos/od6/public/values?alt=json";

  $.ajax({ url: sheetAsJSON }).then((data) => {
    // console.log("data", data);

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
    projects.forEach((project, index) => {
      let imgUrl = "url('" + projects[index].image + "')";
      let $a = $("#project-wrapper").append(
        $("<a>")
          .attr("href", projects[index].url)
          .attr("target", "_blank")
          .attr("id", `link-${index}`)
          .append(
            $("<div>")
              .addClass("project-tile")
              .attr("id", `tile-${index}`)
              .css("background-image", imgUrl)
              .append(
                $("<div>")
                  .addClass("tile-overlay")
                  .append(`<p>${projects[index].title}</p>`)
              )
          )
      );
    });
  }


  //this is to handle the hamburger dropdown
  $(".hamburger").click(function () {
    $("#mobile-menu").toggle("fast", "linear");
  });

  //window resize? collapse and remove hamburger
  $(window).on("resize", () => {
    if (window.innerWidth > 453) {
      $("#mobile-menu").css("display", "none");
    }
  });

  //jQuery form validation
  $("#contactForm").validate({
    rules: {
      firstname: {
        required: true,
        minlength: 3,
      },
      lastname: {
        required: true,
        minlength: 3,
      },
      email: {
        required: true,
      },
      message: {
        required: true,
      },
    },
  });
});
