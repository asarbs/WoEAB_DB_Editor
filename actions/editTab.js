const fs = require("fs");

function getDBElementById(id, db)
{
	var url = id.split(".");
	elementsList = db[url[0]];
	id = url[1];

	for(var element in elementsList)
	{
		var b = elementsList[element][`id`] == id;
		if(b)
		{
			return elementsList[element];
		}
	}	
}

function createArmyEditorHtml(army_Id, db)
{
	army = getDBElementById(army_Id, db);
	var innerHTML = `
    <label for="army_name_${army_Id}">Enter army name: </label>
    <input id="army_name_${army_Id}" type="text" name="name_field" value="${army['name']}" oninput="saveArmy('${army_Id}')">`
	return innerHTML;
}

function createSkillEditorHtml(skill_Id, db)
{
	skill = getDBElementById(skill_Id, db);
	var innerHTML = `
    <label for="skill_name_${skill_Id}">Enter skill name: </label>
    <input id="skill_name_${skill_Id}" type="text" name="name_field" value="${skill['name']}" oninput="saveSkill('${skill_Id}')"><br>
    <label for="skill_cost_${skill_Id}">Enter skill cost: </label>
    <input id="skill_cost_${skill_Id}" type="text" name="cost_field" value="${skill['cost']}" oninput="saveSkill('${skill_Id}')"><br>
    <label for="skill_requirements_${skill_Id}">Enter skill requirements: </label>
    <textarea id="skill_requirements_${skill_Id}" type="text" name="requirements_field" value="${skill['requirements']}" oninput="saveSkill('${skill_Id}')" rows="8" cols="50">${skill['requirements']}</textarea><br>
    <label for="skill_effects_${skill_Id}">Enter skill effects: </label>
    <textarea id="skill_effects_${skill_Id}" type="text" name="effects_field" value="${skill['effects']}" oninput="saveSkill('${skill_Id}')" rows="8" cols="50">${skill['effects']}</textarea><br>
    `
	return innerHTML;
}

function crateWeaponMeleeEditorHtml(melee_id, db)
{

    const melee = getDBElementById(melee_id, db['weapons']);
    var innerHtml = `
        <label for="melee_weapon_name_${melee_id}">Enter weapon name: </label>
        <input id="melee_weapon_name_${melee_id}" type="text" name="name_field" value="${melee['name']}" oninput="saveMeleeWeapon('${melee_id}')"><br>
        <label for="melee_weapon_cost_${melee_id}">Enter strike value: </label>
        <input id="melee_weapon_cost_${melee_id}" type="text" name="sv_field" value="${melee['sv']}" oninput="saveMeleeWeapon('${melee_id}')" readonly><br>
    `;
    return innerHtml;
}

function crateWeaponRangeEditorHtml(range_id, db)
{
    const range = getDBElementById(range_id, db['weapons']);
    var characteristics = "";
    for(var c in db['characteristics'])
    {
        var checked = range['characteristics'].indexOf(db['characteristics'][c]['id']) > -1 ? "checked" : "";
        characteristics += `<input type="checkbox" 
        class="characteristics_list_${range_id}_[]"  
        name="characteristics_list_${range_id}_[]" 
        value="${db['characteristics'][c]['id']}" 
        onclick="saveRangeWeapon('${range_id}')" ${checked}>
        <label>${db['characteristics'][c]['name']}</label><br/>`
    }

    var innerHtml = `
        <label for="range_weapon_name_${range_id}">Enter weapon name: </label>
        <input id="range_weapon_name_${range_id}" type="text" name="name_field" value="${range['name']}" oninput="saveRangeWeapon('${range_id}')"><br>
        <label for="range_weapon_cost_${range_id}">Enter weapon cost: </label>
        <input id="range_weapon_cost_${range_id}" type="text" name="cost_field" value="${range['cost']}" oninput="saveRangeWeapon('${range_id}')"><br>
        <label for="range_weapon_strength_${range_id}">Enter weapon strength: </label>
        <input id="range_weapon_strength_${range_id}" type="text" name="cost_field" value="${range['strength']}" oninput="saveRangeWeapon('${range_id}')"><br>
        <label for="range_weapon_characteristics_${range_id}">Weapon characteristics:</label>
        ${characteristics}
    `;
    return innerHtml;
}

function openFullTab(id, db, editorFun)
{
	var tabIsOpen = document.getElementsByClassName(`tabId_${id}`);
	if(tabIsOpen.length == 0)
	{
		var tabContainer = document.getElementById("tab_content_container");
		var div = document.createElement("div");
		div.setAttribute('id', `tab_${id}`);
		div.classList.add("tabcontent");
		div.classList.add(`tabId_${id}`)
		div.innerHTML = editorFun(id, db);
		tabContainer.appendChild(div)

		var tab_header_container = document.getElementById("tab_header");
		var button = document.createElement("button");
		button.classList.add("tab_button");
		button.classList.add(`tabButtonId_${id}`);
		button.setAttribute('onclick', `openTab(event, '${id}')`);
		button.innerHTML = id;

		tab_header_container.appendChild(button);
	}
	openTab(null, id);
}

function openArmyTab(army_Id, db)
{
	openFullTab(army_Id, db, createArmyEditorHtml);

}

function openSkillTab(skill_id, db)
{
	openFullTab(skill_id, db, createSkillEditorHtml);
}

function openWeaponMeleeTab(melee_id, db)
{
    openFullTab(melee_id, db, crateWeaponMeleeEditorHtml);
}

function openWeaponRangeTab(melee_id, db)
{
    openFullTab(melee_id, db, crateWeaponRangeEditorHtml);   
}

module.exports.openArmyTab = openArmyTab
module.exports.openSkillTab = openSkillTab
module.exports.getDBElementById = getDBElementById;
module.exports.openWeaponMeleeTab = openWeaponMeleeTab
module.exports.openWeaponRangeTab = openWeaponRangeTab
