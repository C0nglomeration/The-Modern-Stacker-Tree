addLayer("t", {
    name: "tetriminoes", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "t", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#4BDC13",
    requires: new Decimal(6), // Can be a function that takes requirement increases into account
    resource: "lines", // Name of prestige currency
    baseResource: "tetriminoes", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 1.0, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "p", description: "P: Reset for prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],

    

    doReset(resettingLayer) {
        let keep = [];
        //have any conditions here such as hasMilestone and keep.push("thing") to keep all of a single feature, such as "upgrades"
        keep.push("upgrades")
        
        if (layers[resettingLayer].row > this.row) { 
            layerDataReset(this.layer, keep);
        }
        //anything u place here is for keeping specific things, like if(hasUpgrade('x',99))player.y.upgrades.push(11) if that makes sense
    },

    upgrades: {
        11: {
            title: "Doubles",
            description: "Learn how to clear doubles (5% boost, raise hardcap by 6)",
            cost: new Decimal(4),
        },
        12: {
            title: "Quads",
            description: "Learn how to clear quads (15% boost, raise hardcap by 12)",
            cost: new Decimal(8),
        },
        21: {
            title: "Clean Stacking",
            description: "Learn how to setup quads (remove hardcap)",
            cost: new Decimal(40),
        },
    },
    layerShown(){return true}
})
addLayer("g", {

    name: "games", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "g", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#1B5583",
    requires: new Decimal(40), // Can be a function that takes requirement increases into account
    resource: "games", // Name of prestige currency
    baseResource: "lines", // Name of resource prestige is based on
    baseAmount() {return player.t.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 1.0, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if (hasUpgrade('g', 11)) mult = mult.times(upgradeEffect('g', 11))
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    displayRow: 0,
    hotkeys: [
        {key: "p", description: "P: Reset for prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],

    upgrades: {
        11: {
            title: "Intuition",
            description: "Learn from your previous games (1% boost per game)",
            cost: new Decimal(1),
            effect() {
                return player[this.layer].points.times(0.01).add(1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            pay() {new Decimal(0)}
        },
        12: {
            title: "Studying",
            description: "Record your past games and study them in your free time (placed tetriminoes boost logarithmically)",
            cost: new Decimal(4),
            effect: () => Decimal.max(Decimal.log(player.points.add(19), 20), 1),
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },

            pay() {new Decimal(0)}
        }
    },

    layerShown(){return true}
})