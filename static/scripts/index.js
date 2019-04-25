const { ipcRenderer } = require('electron');  
path = require('path')
const fs = require('fs')

const { CREATE_NEW_ARMY, CREATE_NEW_SKILL, SAVE_DB } = require(path.resolve('actions/types'))
const dbStructureBuilder = require(path.resolve('actions/dbStructure'))
const editTab = require(path.resolve('actions/editTab'))


var db = null;

// function buttonClick(){
// 	cons = document.getElementById('cell23');
// 	cons.innerHTML = cons.innerHTML + "AAAAA<br>";

// 	ipcRenderer.send(CREATE_NEW_ARMY, {'dir': "BBBB"});
// }

// ipcRenderer.on(CREATE_NEW_ARMY, (event, data) => {
// 		cons = document.getElementById('cell23');
// 		cons.innerHTML = "<b>B3</b>";
// 		ipcRenderer.send(TEST_MSG_FROM_WINDOW_2_MAIN, {'dir': "CCCC"});
// 	});


ipcRenderer.on(SAVE_DB, (event) => {
	console.log("Save DB");
	let data = JSON.stringify(db, null, 2); 
	
	fs.writeFileSync("db.json", data , (err) => {
		if (err) 
			throw err;
	});
});

ipcRenderer.on(CREATE_NEW_ARMY, (event) => {
	id = db.armies[db.armies.length - 1].id + 1
	db.armies.push({id:id, name:"New Army"});

	document.getElementById(`dbStructDiv`).innerHTML = '';
	dbStructureBuilder.build(db, `dbStructDiv`);

});

ipcRenderer.on(CREATE_NEW_SKILL, (event) => {
	try{
		id = db.skills[db.skills.length - 1].id + 1
	} catch(err) {
		id = 0;
	}
	db.skills.push({id:id, name:"New Skill"});

	document.getElementById(`dbStructDiv`).innerHTML = '';
	dbStructureBuilder.build(db, `dbStructDiv`);
});

function loadDb()
{
    let rawData = fs.readFileSync('db.json');
    let db = JSON.parse(rawData);
    return db
}

document.addEventListener('DOMContentLoaded',pageLoaded);

function pageLoaded()
{
	db = loadDb();
	dbStructureBuilder.build(db, `dbStructDiv`);
}

function openArmyTab(army_Id)
{
	editTab.openArmyTab(army_Id, db);
}

function openSkillsTab(skill_id)
{
	editTab.openSkillTab(skill_id, db);
}

function openWeaponMeleeTab(melee_id)
{
	editTab.openWeaponMeleeTab(melee_id, db);
}

function openWeaponRangeTab(melee_id)
{
	editTab.openWeaponRangeTab(melee_id, db);
}

function saveArmy(army_Id)
{
	name = document.getElementById(`army_name_${army_Id}`).value;
	army = editTab.getDBElementById(army_Id, db);
	army['name'] = name;
}

function saveSkill(id)
{
	name = document.getElementById(`skill_name_${id}`).value;
	cost = document.getElementById(`skill_cost_${id}`).value;
	requirements = document.getElementById(`skill_requirements_${id}`).value;
	effects = document.getElementById(`skill_effects_${id}`).value;
	skill = editTab.getDBElementById(id, db);
	skill['name'] = name;
	skill['cost'] = cost;
	skill['requirements'] = requirements;
	skill['effects'] = effects;
}

function saveMeleeWeapon(id)
{
	name = document.getElementById(`melee_weapon_name_${id}`).value;
	cost = parseInt(document.getElementById(`melee_weapon_cost_${id}`).value);
	strength = document.getElementById(`melee_weapon_strength_${id}`).value;
	const selector = `characteristics_list_${id}_[]`;

	var strengthValue = {0:-6, 1:-2, 2:2, 3:6, 4:10, 5:14, 6:18, 7:22, 8:26, 9:30}
	cost = strengthValue[strength]

	characteristics = document.getElementsByClassName(selector);

	meleeWeapon = editTab.getDBElementById(id, db['weapons']);
	meleeWeapon['characteristics'] = []
	for (var i=0; i < characteristics.length; i++) 
	{
    	if (characteristics[i].checked) 
    	{
     		meleeWeapon['characteristics'].push(characteristics[i].value);
    	}
	}

	meleeWeapon['name'] = name;
	meleeWeapon['cost'] = cost;
	meleeWeapon['strength'] = strength;
	console.log(meleeWeapon);
}

function saveRangeWeapon(id)
{
	name = document.getElementById(`range_weapon_name_${id}`).value;
	cost = document.getElementById(`range_weapon_cost_${id}`).value;
	strength = document.getElementById(`range_weapon_cost_${id}`).value;
	rangeWeapon = editTab.getDBElementById(id, db['weapons']);

	const selector = `characteristics_list_${id}_[]`;
	console.log(selector);
	characteristics = document.getElementsByClassName(selector);
	rangeWeapon['characteristics'] = []
	for (var i=0; i < characteristics.length; i++) 
	{
    	if (characteristics[i].checked) 
    	{
     		rangeWeapon['characteristics'].push(characteristics[i].value);
    	}
	}

	rangeWeapon['name'] = name;
	rangeWeapon['cost'] = cost;
	rangeWeapon['strength'] = strength;
}