const { ipcRenderer } = require('electron');  
path = require('path')
const fs = require('fs')

const { CREATE_NEW_ARMY, CREATE_NEW_SKILL, CREATE_NEW_SPELL, CREATE_NEW_MELEE_WEAPON, CREATE_NEW_RANGE_WEAPON, SAVE_DB } = require(path.resolve('actions/types'))
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

ipcRenderer.on(CREATE_NEW_SPELL, (event) => {
	try{
		id = db.spells[db.spells.length - 1].id + 1
	} catch(err) {
		id = 0;
	}
	db.spells.push({id:id, name:"New spell"});

	document.getElementById(`dbStructDiv`).innerHTML = '';
	dbStructureBuilder.build(db, `dbStructDiv`);
});

ipcRenderer.on(CREATE_NEW_MELEE_WEAPON, (event) => {
    try {
        id = db.weapons.melee[db.weapons.melee.length - 1].id + 1
    } catch(err) {
        id = 0
    }
    db.weapons.melee.push({id:id, name:"New melee weapon"})

    document.getElementById(`dbStructDiv`).innerHTML = '';
    dbStructureBuilder.build(db, `dbStructDiv`);
});

ipcRenderer.on(CREATE_NEW_RANGE_WEAPON, (event) => {
    try {
        id = db.weapons.range[db.weapons.range.length - 1].id + 1
    } catch(err) {
        id = 0
    }
    db.weapons.range.push({id:id, name:"New range weapon"})

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

function unitEditTab(unitId)
{
	editTab.openUnitEditTab(unitId, db);
}

function openSkillsTab(skill_id)
{
	editTab.openSkillTab(skill_id, db);
}

function openSpellsTab(spell_id)
{
	editTab.openSpellTab(spell_id, db);
}

function openWeaponMeleeTab(melee_id)
{
	editTab.openWeaponMeleeTab(melee_id, db);
}

function openWeaponRangeTab(range_id)
{
	editTab.openWeaponRangeTab(range_id, db);
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
	effects = document.getElementById(`skill_effects_${id}`).value;
	
	skill = editTab.getDBElementById(id, db);
	skill['name'] = name;
	skill['effects'] = effects;
}

function saveSpell(id)
{
	name = document.getElementById(`spell_name_${id}`).value;
	effects = document.getElementById(`spell_effects_${id}`).value;
	
	spell = editTab.getDBElementById(id, db);
	spell['name'] = name;
	spell['effects'] = effects;
}

function saveMeleeWeapon(id)
{
	name = document.getElementById(`melee_weapon_name_${id}`).value;
	sv = parseInt(document.getElementById(`melee_weapon_sv_${id}`).value);
	special_rules = document.getElementById(`melee_weapon_special_rules_${id}`).value;

	meleeWeapon = editTab.getDBElementById(id, db['weapons']);
	meleeWeapon['name'] = name;
	meleeWeapon['sv'] = sv;
	meleeWeapon['special_rules'] = special_rules;

}

function saveRangeWeapon(id)
{
	name = document.getElementById(`range_weapon_name_${id}`).value;
	sv = document.getElementById(`range_weapon_sv_${id}`).value;
	
	short = document.getElementById(`range_weapon_short_${id}`).value;
	long = document.getElementById(`range_weapon_long_${id}`).value;
	extreme = document.getElementById(`range_weapon_extreme_${id}`).value;
	
	special_rules = document.getElementById(`range_weapon_special_rules_${id}`).value;
	
	rangeWeapon = editTab.getDBElementById(id, db['weapons']);
	rangeWeapon['name'] = name;
	
	rangeWeapon['short'] = short;
	rangeWeapon['long'] = long;
	rangeWeapon['extreme'] = extreme;
	
	rangeWeapon['sv'] = sv;
	rangeWeapon['special_rules'] = special_rules;
}

function feachSelectedWeapons(id, x)
{
	weapon = []
	
	var select_weapon = document.getElementById(`unit_${id}_${x}_weapon`)
	var options_weapon = select_weapon.getElementsByTagName('option')
	
	
	for(var i = options_weapon.length; i--;)
	{
		if (options_weapon[i].selected)
		{
			weapon.push(options_weapon[i].value)
		}
	}
	
	return weapon
}

function feachSelectedSpecial(id, x)
{
	weapon = []
	
	var select_weapon = document.getElementById(`unit_${id}_${x}_special`)
	var options_weapon = select_weapon.getElementsByTagName('option')
	
	
	for(var i = options_weapon.length; i--;)
	{
		if (options_weapon[i].selected)
		{
			weapon.push(options_weapon[i].value)
		}
	}
	
	return weapon
}

function saveUnit(id) 
{
	name = document.getElementById(`unit_name_${id}`).value;
	point_value = document.getElementById(`unit_point_value_${id}`).value;
	type = document.getElementById(`unit_type_${id}`).value;
	
	stats = []
	
	for(x = 0 ; x < 5 ; x++)
	{
		var stat = {}
		stat[`ammount`] = document.getElementById(`unit_${id}_${x}_ammount`).value;
		stat[`name`] = document.getElementById(`unit_${id}_${x}_name`).value;
		stat[`weapon`] = feachSelectedWeapons(id, x);
		stat[`ag`] = document.getElementById(`unit_${id}_${x}_ag`).value;
		stat[`acc`] = document.getElementById(`unit_${id}_${x}_acc`).value;
		stat[`str`] = document.getElementById(`unit_${id}_${x}_str`).value;
		stat[`res`] = document.getElementById(`unit_${id}_${x}_res`).value;
		stat[`init`] = document.getElementById(`unit_${id}_${x}_init`).value;
		stat[`co`] = document.getElementById(`unit_${id}_${x}_co`).value;
		stat[`special`] = feachSelectedSpecial(id, x)
		stats.push(stat)
	}
	
	unit = editTab.getDBUnit(id, db);
	unit['name'] = name;
	unit['point_value'] = point_value
	unit['type'] = type
	unit['stats'] = stats
	console.log(unit)
}
