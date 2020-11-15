//OUTROS
var ambientTemperature = 23, hour = 13, min = 0

//BATERIA
var level_capacity_batery = 1, costLevelUp_capacity_batery = 0.8, currentEnergy = 0, maxCapacity = 100

//GERADOR MANUAL
 var costLevelUp_efficiency_manualGenerator = 0.1, costLevelUp_cooler_manualGenerator = 0.5, manualGeneratorEarn = 0.5, rotHandCrank = 0, velRotHandCrank = 0, heatManualGenerator = 0, heatingManualGenerator = 0.1, level_efficiency_manualGenerator = 1, level_cooler_manualGenerator = 1, manualGeneratorLife = 100, manualGeneratorStatus = "Funcionando"
 
 //GERADOR A CARVÃO
 var coalGeneratorEarn = 0.05, costLevelUp_efficiency_coalGenerator = 2, coalGeneratorStatus = "Quebrado", rotCoalGeneratorRotor = 0, velRotCoalGeneratorRotor = 0, level_efficiency_coalGenerator = 1, fuelCoalGenerator = 5
 
 //GERADOR SOLAR
 var costLevelUp_efficiency_solarGenerator = 0.1, costLevelUp_cooler_solarGenerator = 0.5, solarGeneratorEarn = 0.5, level_efficiency_solarGenerator = 1, level_cooler_solarGenerator = 1, solarGeneratorLife = 100, solarGeneratorStatus = "Funcionando"
 
//ENERGIA	
var eps = 0

//CONVERÇÕES
var conversionEPS = 1, conversionNameEPS = " W", conversionCE = 1, conversionNameCE = " W", conversionMC = 1, conversionNameMC = " W", conversionMoney = 1, conversionNameMoney = "", conversionCost = 1, conversionNameCost = ""

//DINHEIRO
var money = 0, cost = ""

document.getElementById("cost").style.visibility = "hidden"

//VENDER ENERGIA 
document.getElementById("sellEnergy").onmouseover = function a() {
	add(currentEnergy/100)
	document.getElementById("cost").style.visibility = "visible"
}
document.getElementById("sellEnergy").onmouseout = function() {
	document.getElementById("cost").style.visibility = "hidden"
}
document.getElementById("sellEnergy").onclick = function() {
	money += currentEnergy/100
	currentEnergy = 0
}

//GERADOR MANUAL
document.getElementById("manualGenerator").onmouseover = function(){
	if (manualGeneratorLife <= 0){
		remove(costLevelUp_efficiency_manualGenerator + costLevelUp_cooler_manualGenerator*2)
		document.getElementById("cost").style.visibility = "visible"
	}
}
document.getElementById("manualGenerator").onmouseout = function() {
	document.getElementById("cost").style.visibility = "hidden"
}
document.getElementById("manualGenerator").onclick = function() {
	if (manualGeneratorStatus == "Funcionando"){
		heatManualGenerator += heatingManualGenerator
		velRotHandCrank += 10
		eps += manualGeneratorEarn;
		manualGeneratorLife -= 0.01
		} else{
			if (money >= costLevelUp_efficiency_manualGenerator + costLevelUp_cooler_manualGenerator*2){
				money -= costLevelUp_efficiency_manualGenerator + costLevelUp_cooler_manualGenerator*2
				manualGeneratorLife = 100
			} else{
				alert("Você não tem dinheiro suficiente")
			}
		}
}

//EFICIÊNCIA DO GERADOR MANUAL
if (level_efficiency_manualGenerator != "Máx"){
	document.getElementById("levelUp_efficiency_manualGenerator").onmouseover = function() {
		remove(costLevelUp_efficiency_manualGenerator)
		document.getElementById("cost").style.visibility = "visible"
	}
}
document.getElementById("levelUp_efficiency_manualGenerator").onmouseout = function() {
	document.getElementById("cost").style.visibility = "hidden"
}
document.getElementById("levelUp_efficiency_manualGenerator").onclick = function() {
	if (level_efficiency_manualGenerator < 30){
		
		if (money >= costLevelUp_efficiency_manualGenerator){
			money -= costLevelUp_efficiency_manualGenerator
			costLevelUp_efficiency_manualGenerator *= 1.4
			remove(costLevelUp_efficiency_manualGenerator)
			manualGeneratorEarn *= 1.15
			level_efficiency_manualGenerator++
		} else{
			alert("Você não tem dinheiro suficiente")
		}
	} else{
		level_efficiency_manualGenerator = "Máx"
	}
}

//RESFRIADOR DO GERADOR MANUAL
if (level_cooler_manualGenerator != "Máx"){
	document.getElementById("levelUp_cooler_manualGenerator").onmouseover = function() {
		remove(costLevelUp_cooler_manualGenerator)
		document.getElementById("cost").style.visibility = "visible"
	}
}
document.getElementById("levelUp_cooler_manualGenerator").onmouseout = function() {
	document.getElementById("cost").style.visibility = "hidden"
}
document.getElementById("levelUp_cooler_manualGenerator").onclick = function() {
	if (level_cooler_manualGenerator < 15){
		if (money >= costLevelUp_cooler_manualGenerator){
			money -= costLevelUp_cooler_manualGenerator
			costLevelUp_cooler_manualGenerator *= 1.3
			remove(costLevelUp_cooler_manualGenerator)
			heatingManualGenerator /= 1.1
			level_cooler_manualGenerator++
		} else{
			alert("Você não tem dinheiro suficiente")
		}
	} else{
		level_cooler_manualGenerator = "Máx"	
	}
}

//CAPACIDADE DA BATERIA
if (level_capacity_batery != "Máx"){
	document.getElementById("levelUp_capacity_batery").onmouseover = function() {
		remove(costLevelUp_capacity_batery)
		document.getElementById("cost").style.visibility = "visible"
	}
}
document.getElementById("levelUp_capacity_batery").onmouseout = function() {
	document.getElementById("cost").style.visibility = "hidden"
}
document.getElementById("levelUp_capacity_batery").onclick = function() {
	if (level_capacity_batery < 40){
		if (money >= costLevelUp_capacity_batery){
			money -= costLevelUp_capacity_batery
			costLevelUp_capacity_batery *= 1.4
			remove(costLevelUp_capacity_batery)
			maxCapacity *= 1.2
			level_capacity_batery++
		} else{
			alert("Você não tem dinheiro suficiente")
		} 	
	} else{
		level_capacity_batery = "Máx"
	}
}


//GERADOR A VAPOR
document.getElementById("coalGenerator").onmouseover = function() {
	if (coalGeneratorStatus == "Funcionando" || coalGeneratorStatus == "Sem combustível"){
		remove(-(fuelCoalGenerator - 100) / 40)
		document.getElementById("cost").style.visibility = "visible"
	} else{
		remove(10)
		document.getElementById("cost").style.visibility = "visible"
	}
}
document.getElementById("coalGenerator").onmouseout = function() {
	document.getElementById("cost").style.visibility = "hidden"
}
document.getElementById("coalGenerator").onclick = function() {
	if (coalGeneratorStatus == "Funcionando" || coalGeneratorStatus == "Sem combustível"){
		if (money >= -(fuelCoalGenerator - 100) / 40){
			money -= -(fuelCoalGenerator - 100) / 40
			fuelCoalGenerator = 100
		} else{
			alert("Você não tem dinheiro suficiente")
		} 	
	} else{
		if (money >= 10){
			money -= 10
			coalGeneratorStatus = "Funcionando"
		} else{
			alert("Você não tem dinheiro suficiente")
		}
	}
		
}

//EFICIÊNCIA DO GERADOR A VAPOR
if (level_efficiency_coalGenerator != "Máx"){
	document.getElementById("levelUp_efficiency_coalGenerator").onmouseover = function() {
		remove(costLevelUp_efficiency_coalGenerator)
		document.getElementById("cost").style.visibility = "visible"
	}
}
document.getElementById("levelUp_efficiency_coalGenerator").onmouseout = function() {
	document.getElementById("cost").style.visibility = "hidden"
}
document.getElementById("levelUp_efficiency_coalGenerator").onclick = function() {
	if (coalGeneratorStatus != "Quebrado"){
		if (level_efficiency_coalGenerator < 20){

			if (money >= costLevelUp_efficiency_coalGenerator){
				money -= costLevelUp_efficiency_coalGenerator
				costLevelUp_efficiency_coalGenerator *= 1.3
				remove(costLevelUp_efficiency_coalGenerator)
				coalGeneratorEarn *= 1.15
				level_efficiency_coalGenerator++
			} else{
				alert("Você não tem dinheiro suficiente")
			}
		} else{
			level_efficiency_coalGenerator = "Máx"
		}
	} else{
		alert("Conserte antes de atualizar")
	}
}

//GERADOR SOLAR
/*if (level_efficiency_solarGenerator != "Máx"){
	document.getElementById("levelUp_efficiency_solarGenerator").onmouseover = function() {
		remove(costLevelUp_efficiency_solarGenerator)
		document.getElementById("cost").style.visibility = "visible"
	}
}
document.getElementById("levelUp_efficiency_solarGenerator").onmouseout = function() {
	document.getElementById("cost").style.visibility = "hidden"
}
document.getElementById("levelUp_efficiency_solarGenerator").onclick = function() {
	if (solarGeneratorStatus != "Quebrado"){
		if (level_efficiency_solarGenerator < 20){

			if (money >= costLevelUp_efficiency_solarGenerator){
				money -= costLevelUp_efficiency_solarGenerator
				costLevelUp_efficiency_solarGenerator *= 1.3
				remove(costLevelUp_efficiency_solarGenerator)
				solarGeneratorEarn *= 1.15
				level_efficiency_coalGenerator++
			} else{
				alert("Você não tem dinheiro suficiente")
			}
		} else{
			level_efficiency_coalGenerator = "Máx"
		}
	} else{
		alert("Conserte antes de atualizar")
	}
}*/


update();

function update(){
	conversion()
	gameLogic()
	displayUpdate()
	window.requestAnimationFrame(update)
}

function conversion(){
	// <1000
	if (eps < 1000){
		conversionEPS = 1
		conversionNameEPS = " W"
	}

	if (currentEnergy < 1000){
		conversionCE = 1
		conversionNameCE = " W"
	}
	if (maxCapacity < 1000){
		conversionMC = 1
		conversionNameMC = " W"
	}
	
	// >=1000
	if (eps >= 1000 && eps < 1000000){
		conversionEPS = 1000
		conversionNameEPS = " kW"
	}
	if (currentEnergy >= 1000 && currentEnergy < 1000000){
		conversionCE = 1000
		conversionNameCE = " kW"
	}
	if (maxCapacity >= 1000 && maxCapacity < 1000000){
		conversionMC = 1000
		conversionNameMC = " kW"
	}
	
	// >=1000000
	if (eps >= 1000000){
		conversionEPS = 1000000
		conversionNameEPS = " mW"
	}
	if (currentEnergy >= 1000000){
		conversionCE = 1000000
		conversionNameCE = " mW"
	}
	if (maxCapacity >= 1000000){
		conversionMC = 1000000
		conversionNameMC = " mW"
	}
	//MONEY
	if (money < 1000){
		conversionMoney = 1
		conversionNameMoney = ""
	}
	if (money >= 1000 && money < 1000000){
		conversionMoney = 1000
		conversionNameMoney = " k"
	}
	if (money >= 1000000){
		conversionMoney = 1000000
		conversionNameMoney = " m"
	}
	
	if (cost < 1000){
		conversionCost = 1
		conversionNameCost = ""
	}
	if (cost >= 1000 && cost < 1000000){
		conversionCost = 1000
		conversionNameCost = " k"
	}
	if (cost >= 1000000){
		conversionCost = 1000000
		conversionNameCost = " m"
	}
}

function gameLogic(){
	//AMBIENTE
	
	if (min >= 5.9){
		hour++
		min = 0
	}
	if (hour == 24){
		hour = 0
	}
	min += 0.21
	
	//ENERGIA
	if (currentEnergy < maxCapacity){
		currentEnergy += eps/2
	} else{
		currentEnergy = maxCapacity
	}
	eps /= 2
	
	//GERADOR MANUAL
	rotHandCrank += velRotHandCrank
	velRotHandCrank /= 1.5
	heatManualGenerator = (heatManualGenerator / 1.0001 + heatManualGenerator/500000)
	if (heatManualGenerator + ambientTemperature > 60){
		manualGeneratorLife -= heatManualGenerator/8000
		document.getElementById("heatManualGenerator").style.color = "red"
	} else{
		document.getElementById("heatManualGenerator").style.color = "black"
	}
	if (manualGeneratorLife <= 0){
		manualGeneratorLife = 0
		document.getElementById("manualGeneratorName").style.textDecoration = "line-through"
		document.getElementById("manualGeneratorStatus").style.color = "red"
		document.getElementById("manualGenerator").style.backgroundColor = "rgba(108,108,108,1)"
		manualGeneratorStatus = "Quebrado"
	} else{
		document.getElementById("manualGeneratorName").style.textDecoration = "none"
		document.getElementById("manualGeneratorStatus").style.color = "green"
		manualGeneratorStatus = "Funcionando"
		document.getElementById("manualGenerator").style.backgroundColor = "rgba(108,108,108,0.4)"
		
	}
	
	//GERADOR A VAPOR
	velRotCoalGeneratorRotor /= 1.015
	if (coalGeneratorStatus == "Funcionando"){
		rotCoalGeneratorRotor += velRotCoalGeneratorRotor
		velRotCoalGeneratorRotor += 0.1
		eps += coalGeneratorEarn
		fuelCoalGenerator -= 0.005
		document.getElementById("coalGeneratorFire").style.opacity = 1
	} else{
		document.getElementById("coalGeneratorFire").style.opacity = 0.5
	}
	if (fuelCoalGenerator <= 0){
		fuelCoalGenerator = 0
		coalGeneratorStatus = "Sem combustível"
	}
	if (fuelCoalGenerator > 0 && coalGeneratorStatus != "Quebrado"){
		coalGeneratorStatus = "Funcionando"
	}
	if (coalGeneratorStatus == "Quebrado" || coalGeneratorStatus == "Sem combustível" ){
		document.getElementById("coalGeneratorName").style.textDecoration = "line-through"
		document.getElementById("coalGeneratorStatus").style.color = "red"
		document.getElementById("coalGenerator").style.backgroundColor = "rgba(108,108,108,1)"
	} else{
		document.getElementById("coalGeneratorName").style.textDecoration = "none"
		document.getElementById("coalGeneratorStatus").style.color = "green"
		document.getElementById("coalGenerator").style.backgroundColor = "rgba(108,108,108,0.4)"
		
	}
	
	//GERADOR SOLAR
	
}

function displayUpdate(){
	document.getElementById("energyPerSecondBatery").innerHTML = (eps/conversionEPS).toFixed(2) + conversionNameEPS + "/s"
	document.getElementById("currentEnergyBatery").innerHTML = (currentEnergy/conversionCE).toFixed(2) + conversionNameCE
	document.getElementById("maxCapacityBatery").innerHTML = (maxCapacity/conversionMC).toFixed(2) + conversionNameMC
	document.getElementById("capacity").style.height = currentEnergy * 200/maxCapacity+"px"
	document.getElementById("handCrank").style.transform = "rotate("+rotHandCrank+"deg)"
	document.getElementById("coalGeneratorRotor").style.transform = "rotate("+rotCoalGeneratorRotor+"deg)"
	document.getElementById("heatManualGenerator").innerHTML = (heatManualGenerator+ambientTemperature).toFixed(2)
	document.getElementById("moneyDisplay").innerHTML = (money/conversionMoney).toFixed(2) + conversionNameMoney
	document.getElementById("cost").innerHTML = (cost/conversionCost).toFixed(2) + conversionNameCost
	document.getElementById("levelUp_efficiency_manualGenerator").innerHTML = level_efficiency_manualGenerator
	document.getElementById("levelUp_cooler_manualGenerator").innerHTML = level_cooler_manualGenerator
	document.getElementById("levelUp_capacity_batery").innerHTML = level_capacity_batery
	document.getElementById("manualGeneratorLife").innerHTML = manualGeneratorLife.toFixed(1)
	document.getElementById("manualGeneratorStatus").innerHTML = manualGeneratorStatus
	document.getElementById("levelUp_efficiency_coalGenerator").innerHTML = level_efficiency_coalGenerator
	document.getElementById("fuelCoalGenerator").innerHTML = fuelCoalGenerator.toFixed()
	document.getElementById("coalGeneratorStatus").innerHTML = coalGeneratorStatus
	document.getElementById("time").innerHTML = hour.toString() + ":" + min.toFixed(1).replace('.','')
}

function remove(a){
	cost = a
	document.getElementById("cost").style.color = "red"
}
function add(a){
	cost = a
	document.getElementById("cost").style.color = "green"
}

