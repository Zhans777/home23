const replaceTemplate = (temp, car)=>{
    let output = temp.replace(/{% id %}/g, car.id);
    output = output.replace(/{% carName %}/g, car.carName);
    output = output.replace(/{% imageUrl %}/g, car.imageUrl);
    output = output.replace(/{% description %}/g, car.description);
    output = output.replace(/{% price %}/g, car.price);
    output = output.replace(/{% motor %}/g, car.motor);
    if (car.isInStock) output = output.replace(/{% isInStock %}/g, 'out-of-stock');
    return output;
}

export default  replaceTemplate;