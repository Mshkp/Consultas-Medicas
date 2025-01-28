document.addEventListener('DOMContentLoaded', function () {
	var modeSwitch = document.querySelector('.mode-switch');
	modeSwitch.addEventListener('click', function () { document.documentElement.classList.toggle('dark');
	modeSwitch.classList.toggle('active');
	});
    
	var listView = document.querySelector('.list-view');
	var gridView = document.querySelector('.grid-view');
	var projectsList = document.querySelector('.project-boxes');
	listView.addEventListener('click', function () {
	gridView.classList.remove('active');
	listView.classList.add('active');
	projectsList.classList.remove('jsGridView');
	projectsList.classList.add('jsListView');
	});
	gridView.addEventListener('click', function () {
	gridView.classList.add('active');
	listView.classList.remove('active');
	projectsList.classList.remove('jsListView');
	projectsList.classList.add('jsGridView');
	});
	document.querySelector('.messages-btn').addEventListener('click', function () {
	document.querySelector('.messages-section').classList.add('show');
	});
	document.querySelector('.messages-close').addEventListener('click', function() {
	document.querySelector('.messages-section').classList.remove('show');
	});
	});


	const subMenus = document.querySelectorAll(".sub-menu"),
  buttons = document.querySelectorAll(".sidebar ul button");

const onClick = (item) => {
  subMenus.forEach((menu) => (menu.style.height = "0px"));
  buttons.forEach((button) => button.classList.remove("active"));

  if (!item.nextElementSibling) {
    item.classList.add("active");
    return;
  }

  const subMenu = item.nextElementSibling,
    ul = subMenu.querySelector("ul");

  if (!subMenu.clientHeight) {
    subMenu.style.height = `${ul.clientHeight}px`;
    item.classList.add("active");
  } else {
    subMenu.style.height = "0px";
    item.classList.remove("active");
  }
};