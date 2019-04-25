function buildDBStructure(db, itemToAdd)
{
	var dbStructDiv = document.getElementById(itemToAdd);
	dbStructUl = document.createElement("ul");
	dbStructUl.setAttribute("id", "dbStructure"); // added line
	for(var key in db) 
	{
		var li = document.createElement("li");
		li.appendChild( document.createTextNode(key.charAt(0).toUpperCase() + key.slice(1) ));
		const newItemId = `dbStructUl_element_${key}`;
		li.setAttribute("id", newItemId); // added line
		dbStructUl.appendChild(li);
	}
	dbStructDiv.appendChild(dbStructUl);
	buildMenu(db, 'armies', `dbStructUl_element_armies`, 'openArmyTab');
	buildMenu(db, 'skills', `dbStructUl_element_skills`, 'openSkillsTab');
	buildWeaponMenu(db['weapons'], `dbStructUl_element_weapons`);
}

function buildMenu(db, type, itemToAdd, js_onclickFunction)
{
	var dbStruct = document.getElementById(itemToAdd);
	dbStructUl = document.createElement("ul");
	dbStructUl.setAttribute("id", "dbStructureUlArmies"); // added line
	db[type].map( (item) => {
		var li = document.createElement("li");
		li.appendChild( document.createTextNode( item.name ));
		const fullId = `${type}.${item.id}` 
		li.setAttribute('onclick', `${js_onclickFunction}("${fullId}")`);
		dbStructUl.appendChild(li);
	});
	dbStruct.appendChild(dbStructUl);
}

function buildWeaponMenu(db, itemToAdd, js_onclickFunction)
{
	var menuMainItem = document.getElementById(itemToAdd);
	dbStructUl = document.createElement("ul");
	dbStructUl.setAttribute("id", "dbStructureUlWeapons"); // added line
	var li = document.createElement("li");
	li.appendChild(document.createTextNode("Melee"));
	li.setAttribute('id', 'dbStructureUlWeapons.melee');
	dbStructUl.appendChild(li);
	li = document.createElement("li");
	li.appendChild(document.createTextNode("Range"));
	li.setAttribute('id', 'dbStructureUlWeapons.range');
	dbStructUl.appendChild(li)
	menuMainItem.appendChild(dbStructUl);


	buildMenu(db, 'melee', 'dbStructureUlWeapons.melee', 'openWeaponMeleeTab');
	buildMenu(db, 'range', 'dbStructureUlWeapons.range', 'openWeaponRangeTab');
}

module.exports.build = buildDBStructure