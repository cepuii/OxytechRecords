$("header").append("<div class='glitch-window'></div>");
//fill div with clone of real header
$( "h1.glitched" ).clone().appendTo( ".glitch-window" );

const releaseContainer = document.querySelector('.release-section');

fetch('https://www.beatport.com/label/oxytech-records/33556')
            .then(response => response.text())
            .then(html => {
                // Insert the content into the specified element
                releaseContainer.innerHTML = html;
            })
            .catch(error => console.error('Error fetching content:', error));
