let order = [
  { itemName: "Hot cakes", quantity: 1, unitPricePence: 232 },
  { itemName: "Apple Pie", quantity: 2, unitPricePence: 139 },
  { itemName: "Egg McMuffin", quantity: 1, unitPricePence: 280 },
  { itemName: "Sausage McMuffin", quantity: 1, unitPricePence: 300 },
  { itemName: "Hot Coffee", quantity: 2, unitPricePence: 100 },
  { itemName: "Hash Brown", quantity: 4, unitPricePence: 40 },
];
function printReceipt(arr) {
  console.log("QTY       ITEM                    TOTAL");

  let totalPence = 0;

  for (const { itemName, quantity, unitPricePence } of arr) {
    const itemTotalPence = quantity * unitPricePence;
    totalPence += itemTotalPence;
    const itemTotalPounds = (itemTotalPence / 100).toFixed(2);
    console.log(
      `${quantity.toString().padEnd(8)}  ${itemName.padEnd(22)}  £${itemTotalPounds}`
    );
  }
  const totalPounds = (totalPence / 100).toFixed(2);
  console.log(`\nTotal: £${totalPounds}`);
}

printReceipt(order);
