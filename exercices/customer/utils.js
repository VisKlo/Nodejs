export const prixTTC = (data) => {
    data.forEach(fruit => {
        const prixTTC = fruit.priceHT * 1.2
        fruit.priceTTC = prixTTC.toFixed(2)
    });
}