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

function getDBUnit(url,db)
{
	var urls = url.split(".");
	const army = getDBElementById(`armies.${urls[1]}`,db)
	const unit = getDBElementById(`units.${urls[2]}`, army)
	return unit;
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
    <label for="skill_effects_${skill_Id}">Enter skill effects: </label>
    <textarea id="skill_effects_${skill_Id}" type="text" name="effects_field" value="${skill['effects']}" oninput="saveSkill('${skill_Id}')" rows="8" cols="50">${skill['effects']}</textarea><br>
    `
	return innerHTML;
}

function createSpellEditorHtml(spell_Id, db)
{
	spell = getDBElementById(spell_Id, db);
	var innerHTML = `
    <label for="spell_name_${spell_Id}">Enter spell name: </label>
    <input id="spell_name_${spell_Id}" type="text" name="name_field" value="${spell['name']}" oninput="saveSpell('${spell_Id}')"><br>
    <label for="spell_effects_${spell_Id}">Enter spell effects: </label>
    <textarea id="spell_effects_${spell_Id}" type="text" name="effects_field" value="${spell['effects']}" oninput="saveSpell('${spell_Id}')" rows="8" cols="50">${spell['effects']}</textarea><br>
    `
	return innerHTML;
}

function crateWeaponMeleeEditorHtml(melee_id, db)
{

    const melee = getDBElementById(melee_id, db['weapons']);
    var innerHtml = `
        <label for="melee_weapon_name_${melee_id}">Enter weapon name: </label>
        <input id="melee_weapon_name_${melee_id}" type="text" name="name_field" value="${melee['name']}" oninput="saveMeleeWeapon('${melee_id}')"><br>
        <label for="melee_weapon_sv_${melee_id}">Enter strike value: </label>
        <input id="melee_weapon_sv_${melee_id}" type="text" name="sv_field" value="${melee['sv']}" oninput="saveMeleeWeapon('${melee_id}')"><br>
        <label for="melee_weapon_special_rules_${melee_id}">Enter special rules: </label>
        <input id="melee_weapon_special_rules_${melee_id}" type="text" name="special_rules_field" value="${melee['special_rules']}" oninput="saveMeleeWeapon('${melee_id}')"><br>
    `;
    return innerHtml;
}

function crateWeaponRangeEditorHtml(range_id, db)
{
    const range = getDBElementById(range_id, db['weapons']);


    var innerHtml = `
        <label for="range_weapon_name_${range_id}">Enter weapon name: </label>
        <input id="range_weapon_name_${range_id}" type="text" name="name_field" value="${range['name']}" oninput="saveRangeWeapon('${range_id}')"><br>

        <label for="range_weapon_short_${range_id}">Enter short range: </label>
        <input id="range_weapon_short_${range_id}" type="text" name="short_field" value="${range['short']}" oninput="saveRangeWeapon('${range_id}')"><br>
        <label for="range_weapon_long_${range_id}">Enter long range: </label>
        <input id="range_weapon_long_${range_id}" type="text" name="long_field" value="${range['long']}" oninput="saveRangeWeapon('${range_id}')"><br>
        <label for="range_weapon_extreme_${range_id}">Enter extreme range: </label>
        <input id="range_weapon_extreme_${range_id}" type="text" name="extreme_field" value="${range['extreme']}" oninput="saveRangeWeapon('${range_id}')"><br>

        <label for="range_weapon_sv_${range_id}">Enter strike value: </label>
        <input id="range_weapon_sv_${range_id}" type="text" name="sv_field" value="${range['cost']}" oninput="saveRangeWeapon('${range_id}')"><br>

        <label for="range_weapon_special_rules_${range_id}">Enter special rules: </label>
        <input id="range_weapon_special_rules_${range_id}" type="text" name="special_rules_field" value="${range['special_rules']}" oninput="saveRangeWeapon('${range_id}')"><br>
    `;
    return innerHtml;
}

function createUnitEditHtml(id, db)
{
	var unit = getDBUnit(id, db);
	
	var innerHtml = `
		<label for="unit_name_${id}">Enter weapon name: </label>
        <input id="unit_name_${id}" type="text" name="name_field" value="${unit['name']}" oninput="saveUnit('${id}')"><br>
		<label for="unit_point_value_${id}">Enter point value: </label>
        <input id="unit_point_value_${id}" type="text" name="name_field" value="${unit['point_value']}" oninput="saveUnit('${id}')"><br>
		<label for="unit_type_${id}">Enter point value: </label>
        <input id="unit_type_${id}" type="text" name="name_field" value="${unit['type']}" oninput="saveUnit('${id}')"><br>
        
		<table border="1">
		  <tr>
			<th>Ammount</th>
			<th>Name</th>
			<th>Ag</th>
			<th>Acc</th>
			<th>Str</th>
			<th>Res</th>
			<th>Init</th>
			<th>Co</th>
			<th>Special</th>
		  </tr>`
		  
		for(x = 0; x < 5; x++)
		{
			innerHtml += `
			<tr>
				<td>
					<input id="unit_${id}_${x}_ammount" type="text" value="x" oninput="saveUnit('${id}')" size="2">
				</td>
				<td>
					<input id="unit_${id}_${x}_name" type="text" value="x" oninput="saveUnit('${id}')" size="25">
				</td>
				<td>
					<input id="unit_${id}_${x}_ag" type="text" value="x" oninput="saveUnit('${id}')" size="2">
				</td>
				<td>
					<input id="unit_${id}_${x}_acc" type="text" value="x" oninput="saveUnit('${id}')" size="2">
				</td>
				<td>
					<input id="unit_${id}_${x}_str" type="text" value="x" oninput="saveUnit('${id}')" size="2">
				</td>
				<td>
					<input id="unit_${id}_${x}_res" type="text" value="x" oninput="saveUnit('${id}')" size="5">
				</td>
				<td>
					<input id="unit_${id}_${x}_init" type="text" value="x" oninput="saveUnit('${id}')" size="2">
				</td>
				<td>
					<input id="unit_${id}_${x}_co" type="text" value="x" oninput="saveUnit('${id}')" size="2">
				</td>
				<td>
					<textarea id="unit_${id}_${x}_special" oninput="saveUnit('${id}')" rows="4" cols="25">
					x
					</textarea>
				</td>
			</tr>`
		}
	innerHtml += `</table>`;
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

function openSpellTab(spell_id, db)
{
	openFullTab(spell_id, db, createSpellEditorHtml);
}

function openWeaponMeleeTab(melee_id, db)
{
    openFullTab(melee_id, db, crateWeaponMeleeEditorHtml);
}

function openWeaponRangeTab(melee_id, db)
{
    openFullTab(melee_id, db, crateWeaponRangeEditorHtml);
}

function openUnitEditTab(unitId, db)
{
	openFullTab(unitId, db, createUnitEditHtml);
}

module.exports.openArmyTab = openArmyTab
module.exports.openUnitEditTab = openUnitEditTab
module.exports.openSkillTab = openSkillTab
module.exports.openSpellTab = openSpellTab
module.exports.getDBElementById = getDBElementById;
module.exports.getDBUnit = getDBUnit;
module.exports.openWeaponMeleeTab = openWeaponMeleeTab
module.exports.openWeaponRangeTab = openWeaponRangeTab
