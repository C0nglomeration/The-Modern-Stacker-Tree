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

    upgrades: {
        11: {
            title: "Doubles",
            description: "Learn how to clear doubles (5% boost)",
            cost: new Decimal(4),
        },
        12: {
            title: "Quads",
            description: "Learn how to clear quads (15% boost)",
            cost: new Decimal(8),
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
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "p", description: "P: Reset for prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],

    layerShown(){return true}
})