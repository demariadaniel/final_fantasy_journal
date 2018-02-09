$(document).ready(function(){

	$('#submit-entry').click(function (event) {
		event.preventDefault();
		currentJournal.submitentry();
		currentJournal.viewentry();
	});

	$('#search-button').click(function (event) {
		event.preventDefault();		
		currentJournal.searchentry();
	});

	$('#menu-button').click(function (event) {
		event.preventDefault();		
		$('.push').toggleClass("open");
	});

	$('a.delete-button').click(function (event) {
		console.log(event);
		event.preventDefault();		
		currentJournal.deleteentry();
		currentJournal.viewentry();
	});
	$('#dan').click(function (event){
		currentJournal = mainJournal;
		$('.side-menu h1').html('Dan\'s Journal');
		currentJournal.viewentry();
		$('#malboro').removeClass('On');
		$('#cactuar').addClass('On');
		$('#jupiter').removeClass('On');
		$('#serena').removeClass('On');
	});
	$('#richie').click(function (event){
		currentJournal = richiesJournal;
		$('.side-menu h1').html('Richie\'s Journal');
		currentJournal.viewentry();
		$('#malboro').addClass('On');
		$('#cactuar').removeClass('On');
		$('#jupiter').removeClass('On');
		$('#serena').removeClass('On');
	});
	$('#soji').click(function (event){
		currentJournal = sojiJournal;
		$('.side-menu h1').html('Soji\'s Journal');
		currentJournal.viewentry();
		$('#malboro').removeClass('On');
		$('#cactuar').removeClass('On');
		$('#jupiter').removeClass('On');
		$('#serena').addClass('On');
	});
	$('#sylvia').click(function (event){
		currentJournal = ibbyJournal;
		$('.side-menu h1').html('Sylvia\'s Journal');
		currentJournal.viewentry();
		$('#malboro').removeClass('On');
		$('#cactuar').removeClass('On');
		$('#jupiter').addClass('On');
		$('#serena').removeClass('On');
	});

	$('input, textarea, a').focus(function(){
		if (this.name==='title'){
		$('#csra').addClass('On');
	} else if (this.name==='author'){
		$('#csrb').addClass('On');
	} else if (this.name==='tags'){
		$('#csrc').addClass('On');
	} else if (this.name==='content'){
		$('#csrd').addClass('On');
	} else if (this.id==='dan'){
		$('#csre').addClass('On');
	} else if (this.id==='richie'){
		$('#csrf').addClass('On');
	} else if (this.id==='soji'){
		$('#csrg').addClass('On');
	} else if (this.id==='sylvia'){
		$('#csrh').addClass('On');
	};
	$('input, textarea, a').focusout(function(){
		$('.csr').removeClass('On');
	});
});

});
//globals
var mainJournal = new Journal();
var richiesJournal = new Journal();
var ibbyJournal = new Journal();
var sojiJournal = new Journal();
var currentJournal = mainJournal;

function Journal (){
	this.entries = [];
};

function entry(title, author, content, tags, time, entryNo){
	this.title = title;
	this.content = content;
	this.author = author;
	this.tags = tags;
	this.time = time;
};

Journal.prototype.submitentry = function (){
	var title = $("input[name='title']").val();
	var author = $("input[name='author']").val();
	var content = $("textarea[name='content']").val();
	var tags = $("input[name='tags']").val();
	var utcDate = new Date();
	var time = utcDate.toUTCString();
	var newentry = new entry(title, author, content, tags, time);
	currentJournal.entries.unshift(newentry);
	newentry.entryNo = currentJournal.entries.length - 1;
};

Journal.prototype.viewentry = function(){
	var n = this.entries.length;
	var html = "";
	for (var i = 0; i < n; i++){
	html += "<div class='evenEntry'>";
		html += "<h2>"+ this.entries[i].title + "</h2>";
		html += "<h3>"+ this.entries[i].author + "</h3>";
		html += "<p>"+ this.entries[i].content + "</p>";
		html += "<p>"+ "Tags: " + this.entries[i].tags + "</p>";
		html += "<p>"+ "Created at:" + this.entries[i].time + "</p>";
		html += "<a class='delete-button' data-index='" +i+ "''  href='#'>Delete</a>";
		html += "</div>";
	}
	$(".entryview").html(html);
	$('a.delete-button').click(function (event) {
		var deletePoint = $(this).attr("data-index");
		console.log(deletePoint);
		event.preventDefault();		
		currentJournal.deleteentry(deletePoint);
		currentJournal.viewentry();
	});
}

Journal.prototype.searchentry = function(){
	var searchText = $("input[name='search']").val();
	var found = [];
	var html1 = "";
	for (var i = 0; i<this.entries.length; i++){
		var find = this.entries[i].content.indexOf(searchText);
		if (find != -1){
			found.push(this.entries[i]);
			html1 += "<div class='evenEntry'>";
			html1 += "<h2>"+ found[i].title + "</h2>";
			html1 += "<h3>"+ found[i].author + "</h3>";
			html1 += "<p>"+ found[i].content + "</p>";
			html1 += "<p>"+ "Created at:" + found[i].time + "</p>";
			html1 += "</div>";
		}
	}
	$(".searchresults").html(html1);
}

Journal.prototype.deleteentry = function(deletePoint){
	currentJournal.entries.splice(deletePoint, 1);
};