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

});