async function multiplyTensors() {
    // Crear dos tensores de 10x10 con números del 1 al 9
    const tensor1 = tf.range(1, 101).reshape([10, 10]);
    const tensor2 = tf.range(1, 101).reshape([10, 10]);
  
    let result = tensor1.mul(tensor2);
  
    // Realizar múltiples multiplicaciones hasta que el tamaño del tensor sea mayor a 64MB
    while (result.size * result.dataSync().byteLength < 64 * 1024 * 1024) {
      result = result.mul(result);
    }
  
    // Obtener el array de valores del resultado
    const resultArray = await result.array();
  
    // Liberar la memoria de los tensores
    tensor1.dispose();
    tensor2.dispose();
    result.dispose();
  
    // Mostrar el resultado en el navegador
    const preElement = document.getElementById('result');
    preElement.textContent = JSON.stringify(resultArray);
  }
  
  multiplyTensors();
  