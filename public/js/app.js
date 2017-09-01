$(document).ready(function () {
  
	function Application(fname, mname, lname, email, phone, address, zip, state) {
    this.firstname = fname;
    this.middlename = mname;
    this.lastname = lname;
    this.email = email;
    this.contactphone = phone;
    this.address = address;
    this.zip = zip;
    this,state = state;
}

$("#submitAppBtn").on("click", function() {
    let fname = $("#fname").val();
    let mname = $("#mname").val();
    let lname = $("#lname").val();
    let email = $("#email").val();
    let phone = $("#phone").val();
    let address = $("#address").val();
    let zip = $("#zip").val();
    let state = $("#state").val();

    var application = new Application(fname, mname, lname, email, phone, address, zip, state);
    
    $.ajax({
    	url: "http://localhost:3008/applications",
    	type: "POST",
    	data: application,
    	success: function(results) {
    		console.log(results)
    	}
    })
});

$(window).scroll(function() {
    let header = $("#landingHeader");
    let navLinks = $("#landingNav ul li a")
    let applyBtn = $("#apply");
    scroll = $(window).scrollTop();

    if(scroll >= 100) {
        header.css("background", "rgba(255, 255, 255, .7)");
        applyBtn.css("background", "#E8C162");
        applyBtn.css("color", "#fff");
        navLinks.css("color", "#333");
    }
    else {
        header.css("background", "none");
        applyBtn.css("background", "none");
        applyBtn.css("color", "#E8C162");
        navLinks.css("color", "#fff");
    }
})

$(window).scroll(function() {
    let h1 = $("#copyHeading");
    let p = $("#copyPar");
    scroll = $(window).scrollTop();
    console.log(scroll)

    if(scroll >= 100) {
        h1.fadeIn(500, function() {
            h1.css("opacity", "1")
        });
    }

    if(scroll >= 200) {
        p.fadeIn(500, function () {
            p.css("opacity", "1");
        });
    }
})

});