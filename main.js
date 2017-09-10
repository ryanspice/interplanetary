
const _MAXPAGE_ = 6;



/* Retrieve GET Variables from the URL */

var $_GET = {};

if(document.location.toString().indexOf('?') !== -1) {
    var query = document.location
                .toString()
                // get the query string
                .replace(/^.*?\?/, '')
                // and remove any existing hash string (thanks, @vrijdenker)
                .replace(/#.*$/, '')
                .split('&');

    for(var i=0, l=query.length; i<l; i++) {
    var aux = decodeURIComponent(query[i]).split('=');
    $_GET[aux[0]] = aux[1];
    }
}
var page = $_GET['pages'];
let PAGE = page;



var imageElement = document.getElementsByTagName('current-issue')[0];
var pageNumberElement = document.getElementById('pageNumber');
//imageElement.style="display:block; width:73%; margin:0px auto;background-size: contain;";//background-image:"+bgimage+"";


// Define cissue element
class CurrentIssue extends HTMLElement {
    constructor() {
        // Always call super first in constructor
        super();

        // Create a shadow root
        var shadow = this.attachShadow({mode: 'open'});

        // Create a standard img element and set it's attributes.
        var img = document.createElement('img');
        //img.alt = this.getAttribute('data-name');
        img.style="width:100%;height:auto;";
        img.className = 'comic';


        // Here is where we define the currently selected image 
        img.src = "./comics/interplanetary" + PAGE + ".PNG";

        // Add the image to the shadow root.
        shadow.appendChild(img);

        // Add an event listener to the image.
        img.addEventListener('click', () => {
        //window.location = this.getAttribute('data-url');
        });
        
    }
}

// Define the new element
customElements.define('current-issue', CurrentIssue);

let forward = function(){
    if (page==_MAXPAGE_)
        return;
    PAGE++;
    
    
    window.location = "./index.html?pages=" + (PAGE++);

}

let back = function(){
    PAGE--;
    
    
    window.location = "./index.html?pages=" + (PAGE--);

}

pageNumberElement.innerText = "issue " + PAGE;

if (PAGE==0)
    window.location = "./archive.html";
