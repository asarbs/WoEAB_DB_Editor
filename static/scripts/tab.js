function openContentTab(tab_Id)
{	
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) 
  {
	tabcontent[i].style.display = "none";
  }

  tab = document.getElementsByClassName(`tabId_${tab_Id}`);
  tab[0].style.display = "block";
}

function openContentTabButton(tab_Id)
{
  tabButtons = document.getElementsByClassName("tab_button");
  for (i = 0; i < tabButtons.length; i++) 
  {
    tabButtons[i].classList.remove("tab_active");
  }
  tabButton = document.getElementsByClassName(`tabButtonId_${tab_Id}`);	
  tabButton[0].classList.add("tab_active");
}


function openTab(event, tab_Id)
{
  openContentTab(tab_Id);
  openContentTabButton(tab_Id);
}

function openNewTab(event)
{
	tab_header = document.getElementsByClassName("tab_header");
	var nextId = tab_header[0].childElementCount + 1;
	tab_header[0].innerHTML = tab_header[0].innerHTML + `<button class="tab_button tabButtonId_${nextId}" onclick="openTab(event, ${nextId})"> Button #${nextId} </button>`;


	tab_container = document.getElementsByClassName("tab_content_container")[0];
	tab_container.innerHTML += `<div class="tabcontent tabId_${nextId}">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris consectetur ligula mi, porta fermentum felis blandit quis. Etiam eros orci, posuere nec maximus eu, tempus ut leo. Fusce eu purus at odio tempus facilisis. Vivamus commodo mauris fringilla, malesuada risus eu, ultrices augue. Morbi felis enim, molestie condimentum pulvinar ac, dictum et est. Nulla feugiat tortor at pulvinar pulvinar. Proin at leo sit amet est consequat cursus sed in felis. Vivamus sit amet tincidunt metus. Vivamus interdum velit laoreet elementum iaculis. Nunc vitae nisl sit amet eros pretium venenatis. Aliquam blandit placerat metus, vel vestibulum nibh consectetur id.
					</div>`
}