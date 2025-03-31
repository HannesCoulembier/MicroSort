// Removes all fouc-barrier classes in the document
function removeFOUCbarriers() {
    let instances = document.getElementsByClassName("fouc-barrier");
	[...instances].forEach(element => { element.classList.remove("fouc-barrier"); });
}

// Creates a fragment from the given htmlStr
function createFragment(htmlStr) {

    var frag = document.createDocumentFragment();
    var temp = document.createElement('div');
    temp.innerHTML = htmlStr;
    while (temp.firstChild) {
        frag.appendChild(temp.firstChild);
    }
    return frag;
}

// Adds any html code into the specified DOM element (for scripts, use addScript to actually load the scripts when they are added)
function addGeneral(element, htmlStr) {
	const fragment = createFragment(htmlStr);
	element.appendChild(fragment);
}

// Adds, loads and runs a script from a given source address
function addScript(element, src) {
	const script = document.createElement('script');
	script.src = src;
	script.async = false;
	element.appendChild(script);
}

// Finds all instances of the indicator class and applies the template to them
function applyTemplate(indicator, template) {
    const instances = document.getElementsByClassName(indicator);
	
    [...instances].forEach(element => { template(element); element.classList.remove(indicator);});
}

// Once all stylesheets that were added as a template have loaded, this callback will lift the FOUC barrier and show the page
let loadedStyleSheets = 0;
function loadedStylesheetCallback() {
	loadedStyleSheets++;
	
	let instances = document.getElementsByClassName("dynamic-stylesheet")
	let totalStyleSheets = [...instances].length
	if (loadedStyleSheets==totalStyleSheets) {
		removeFOUCbarriers();
	}
}

// This is where all the templates are defined
function applyTemplates() {

    applyTemplate("templates-head",el=>{
		addGeneral(el, `
			<meta name="viewport" content="width=device-width">
			<meta charset="UTF-8">

			<!-- CSS -->
			<link rel="stylesheet" type="text/css" onload="loadedStylesheetCallback();" class="dynamic-stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
			<link rel="stylesheet" type="text/css" onload="loadedStylesheetCallback();" class="dynamic-stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/fullPage.js/2.7.1/jquery.fullPage.css">
			<link rel="stylesheet" type="text/css" onload="loadedStylesheetCallback();" class="dynamic-stylesheet" href="static/stylesheets/style-v1.css">

			<!-- FONTS -->
			<link rel='stylesheet' type='text/css' onload="loadedStylesheetCallback();" class="dynamic-stylesheet" href='https://fonts.googleapis.com/css?family=Open+Sans:100,300,400,700'>
			<link rel='stylesheet' type='text/css' onload="loadedStylesheetCallback();" class="dynamic-stylesheet" href='https://fonts.googleapis.com/css?family=Lato:400,200,700,300'>
			<!-- font awesome icons -->
			<link rel="stylesheet" type='text/css' onload="loadedStylesheetCallback();" class="dynamic-stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css">
			
			<!-- ICONS -->
			<link rel="apple-touch-icon-precomposed" sizes="57x57" href="static/media/ico/apple-touch-icon-57x57.png" />
			<link rel="apple-touch-icon-precomposed" sizes="114x114" href="static/media/ico/apple-touch-icon-114x114.png" />
			<link rel="apple-touch-icon-precomposed" sizes="72x72" href="static/media/ico/apple-touch-icon-72x72.png" />
			<link rel="apple-touch-icon-precomposed" sizes="144x144" href="static/media/ico/apple-touch-icon-144x144.png" />
			<link rel="apple-touch-icon-precomposed" sizes="60x60" href="static/media/ico/apple-touch-icon-60x60.png" />
			<link rel="apple-touch-icon-precomposed" sizes="120x120" href="static/media/ico/apple-touch-icon-120x120.png" />
			<link rel="apple-touch-icon-precomposed" sizes="76x76" href="static/media/ico/apple-touch-icon-76x76.png" />
			<link rel="apple-touch-icon-precomposed" sizes="152x152" href="static/media/ico/apple-touch-icon-152x152.png" />
			<link rel="icon" type="image/png" href="static/media/ico/favicon-196x196.png" sizes="196x196" />
			<link rel="icon" type="image/png" href="static/media/ico/favicon-96x96.png" sizes="96x96" />
			<link rel="icon" type="image/png" href="static/media/ico/favicon-32x32.png" sizes="32x32" />
			<link rel="icon" type="image/png" href="static/media/ico/favicon-16x16.png" sizes="16x16" />
			<link rel="icon" type="image/png" href="static/media/ico/favicon-128.png" sizes="128x128" />
			<meta name="application-name" content="&nbsp;"/>
			<meta name="msapplication-TileColor" content="#FFFFFF" />
			<meta name="msapplication-TileImage" content="mstile-144x144.png" />
			<meta name="msapplication-square70x70logo" content="mstile-70x70.png" />
			<meta name="msapplication-square150x150logo" content="mstile-150x150.png" />
			<meta name="msapplication-wide310x150logo" content="mstile-310x150.png" />
			<meta name="msapplication-square310x310logo" content="mstile-310x310.png" />
		`);
	});

	applyTemplate("templates-copyright",el=>{
		addGeneral(el, `
			<span>©2020-`+new Date().getFullYear()+` BEST Ghent vzw. All rights reserved.</span>
		`);
	});

	applyTemplate("templates-scripts", el=>{
		addScript(el, "https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js");
		addScript(el, "https://cdnjs.cloudflare.com/ajax/libs/fullPage.js/2.7.1/jquery.fullPage.js");
		addScript(el, "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js");
		addScript(el, "https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.2.0/owl.carousel.min.js");
		addScript(el, "static/scripts/script-v1.js");
	});
}

applyTemplates();
window.addEventListener('DOMContentLoaded', ()=>{
	applyTemplates();
})
